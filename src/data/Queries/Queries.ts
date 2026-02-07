export const notificationsAndCount = `{
    notificationsByUser {
        count
        notifications {
            notificationId
            userId
            notificationType
            body
            templateId
            isRead
            createdDate
            companyId
            company
        }
    }
}
`;

export const getrolesquery = `
   {
    allRoles {
      id
      role
      roleDescription
      roleGroupId
      roleGroup
      isActive
      statusFlag
      createdBy
      createdDate
      updatedBy
      updatedDate
      companyId
    }
  }
  `;

// Placeholder for other queries as needed
export const allBranchesByColumnValues = `
{
  allBranchesByColumnValues(branchModel: { companyId: 1 }) {
    id
    branchName
    createdDate
    createdBy
    updatedBy
    updatedDate
    companyId
    isWarehouse
    regionId
    region
    }
}
`;
