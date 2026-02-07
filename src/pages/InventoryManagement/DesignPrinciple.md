
# INVENTORY MANAGEMENT MODULE

## Design Principle (Very Important)

* **A Drug ≠ A Batch**
* A **Drug** is the *master product definition*.
* A **Batch** is a *physical stock instance* of that drug with its own:

  * expiry date
  * batch number
  * quantity
  * cost price

👉 **One Drug → Many Batches**

That’s why **BatchID does NOT live in the Drug table**.

---

## 1. Drug (Master Drug Catalog)

### Purpose

This submodule defines **what the drug is**, not how much you have or when it expires.

Think of it as:

> “Paracetamol 500mg tablets” — regardless of which shipment it came from.

This data is **stable**, shared across branches, and rarely changes.

---

### Fields (Drug)

**Core Identification**

* DrugID (PK)
* DrugName (e.g. Paracetamol)
* GenericName
* BrandName
* Strength (e.g. 500mg)
* DosageForm (Tablet, Syrup, Injection)

**Classification**

* DrugCategoryID
* UnitOfMeasureID
* RequiresPrescription (Boolean)

**Pricing Defaults (Optional)**

* DefaultCostPrice
* DefaultSellingPrice

**Control & Intelligence**

* ReorderLevel (minimum safe stock)
* Barcode (can be shared across batches)
* IsActive

**Audit**

* CreatedAt
* CreatedBy
* UpdatedAt
* UpdatedBy
* IsActive

---

### Why **NO BatchID here**

* A drug can have **multiple batches at the same time**
* Batches change frequently; drugs don’t
* Keeping BatchID here would **break normalization** and make expiry tracking messy

---

## 2. Drug Batches (Actual Stock on Shelves)

### Purpose

This submodule represents **physical stock received** into a branch.

Every expiry check, sale, and stock deduction happens **at batch level**, not drug level.

---

### Fields (DrugBatch)

**Identification**

* BatchID (PK)
* DrugID (FK → Drug)
* BranchID

**Batch Information**

* BatchNumber (as on manufacturer pack)
* ManufactureDate
* ExpiryDate

**Stock Quantities**

* QuantityReceived
* QuantityAvailable
* QuantityReserved (optional, for pending sales)

**Pricing (Batch-Specific)**

* CostPrice
* SellingPrice

**Tracking**

* SupplierName (optional, future-proof)
* ReceivedDate

**Status & Control**

* BatchStatus (Active, Expired, Depleted, Quarantined)
* IsBlockedForSale (auto true when expired)

**Audit**

* CreatedAt
* CreatedBy
* UpdatedAt
* UpdatedBy
* IsActive

---

### Key Logic (Very Important)

* Sales **always deduct from DrugBatch**
* FEFO rule applies:

  > **First-Expire-First-Out**
* Once `ExpiryDate < Today`:

  * BatchStatus → Expired
  * IsBlockedForSale → true

---

## 3. Expired / Near-Expiry Drugs (Derived View, Not a Table)

### Purpose

This is **not a CRUD module**.
It is a **monitoring & alerting view** built from Drug + DrugBatch.

You **do not store this separately**.

---

### Data Source

* Drug
* DrugBatch
* Branch
* System Settings (e.g. “Near Expiry = 90 days”)

---

### Fields (View Output)

**Drug Info**

* DrugID
* DrugName
* BrandName
* DosageForm

**Batch Info**

* BatchID
* BatchNumber
* ExpiryDate

**Stock Info**

* QuantityAvailable
* BranchName

**Expiry Intelligence**

* DaysToExpiry
* ExpiryStatus:

  * Near Expiry
  * Expired

---

### Logic Rules

* **Expired**

  ```text
  ExpiryDate < Today
  ```
* **Near Expiry**

  ```text
  ExpiryDate BETWEEN Today AND (Today + AlertThresholdDays)
  ```

---

### Actions Allowed

* View only
* Block batch from sale
* Generate disposal report
* Transfer to quarantine (optional)

---

## Relationship Diagram (Simple)

```text
Drug (1) ─────────── (∞) DrugBatch
```

* DrugID exists in DrugBatch
* BatchID never exists in Drug

---

## Why This Design Is Correct (Real-World Pharmacy Logic)

✔ Correct expiry handling
✔ Clean offline syncing (batch-level deltas)
✔ Accurate FEFO sales
✔ Scales to multi-branch
✔ Easy to audit
✔ Matches how drugs are actually stocked

---

## What We Can Do Next

If you want, next step can be:

1. **Inventory APIs (C# microservice contracts)**
2. **PostgreSQL table schemas**
3. **Offline sync flow specifically for DrugBatch**
4. **Stock deduction algorithm during POS sale**

Just say the word 👌
