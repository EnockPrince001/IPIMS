import React, { useState, useContext, useEffect } from "react";
// @ts-ignore
import { useInView } from "react-intersection-observer";
import "./components/LandingPage.css";
// @ts-ignore
import emptycashier from "../../assets/images/emptycashier.jpg";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import StarIcon from "@mui/icons-material/Star";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { Link } from "react-router-dom";
import { ColorModeContext, tokens } from "../../theme";
import {
    Twitter,
    Facebook,
    LinkedIn,
    Instagram,
    WhatsApp,
} from "@mui/icons-material";
import {
    Brightness4 as DarkModeIcon,
    Brightness7 as LightModeIcon,
} from "@mui/icons-material";
import emailjs from "emailjs-com";
import { useTheme, IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
// @ts-ignore
import MCBPOSLogo from "../../assets/images/MCBPOSLogo.png";

const LandingPage = () => {
    const theme = useTheme();
    // @ts-ignore
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const [isTopBarSticky, setIsTopBarSticky] = useState(false);
    const [visibleIndex, setVisibleIndex] = useState(0);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        businessName: "",
        phoneNumber: "",
    });
    const [footerFormData, setFooterFormData] = useState({
        email: "",
    });

    const itemsToShow = 2;

    const testimonials = [
        {
            text: "Our operations have never been more efficient! We love how easy it is to manage our inventory.",
            author: "John D.",
        },
        {
            text: "This POS system is perfect for our team. We can handle transactions and manage orders quickly.",
            author: "Sarah P.",
        },
        {
            text: "A game changer for our business! The inventory tracking is top-notch.",
            author: "Mike R.",
        },
        {
            text: "Great customer support and easy to use. Highly recommended!",
            author: "Emily T.",
        },
    ];

    const handleNext = () => {
        setVisibleIndex((prev) => (prev + itemsToShow) % testimonials.length);
    };

    const handlePrev = () => {
        setVisibleIndex(
            (prev) => (prev - itemsToShow + testimonials.length) % testimonials.length
        );
    };

    const handleFreeTrialClick = () => {
        setIsFormVisible(true);
    };

    const handleFormClose = () => {
        setIsFormVisible(false);
    };

    const { ref: headerRef, inView: headerInView } = useInView({
        triggerOnce: true,
    });
    const { ref: featuresRef, inView: featuresInView } = useInView({
        triggerOnce: true,
    });
    const { ref: testimonialsRef, inView: testimonialsInView } = useInView({
        triggerOnce: true,
    });

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsTopBarSticky(true);
            } else {
                setIsTopBarSticky(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const serviceID = "service_jz7j4vy";
        const templateID = "template_x5i85qc";
        const userID = "1pbzxztR9SmKpmgl4";

        const templateParams = {
            name: formData.name,
            email: formData.email,
            businessName: formData.businessName,
            phoneNumber: formData.phoneNumber,
        };

        emailjs.send(serviceID, templateID, templateParams, userID).then(
            (result) => {
                setSnackbarMessage("Thank you! Your trial request has been submitted.");
                setSnackbarOpen(true);
                setFormData({
                    name: "",
                    email: "",
                    businessName: "",
                    phoneNumber: "",
                });
                handleFormClose();
            },
            (error) => {
                console.error("Failed to send email:", error.text);
                setSnackbarMessage(
                    "Oops! Something went wrong. Please try again later."
                );
                setSnackbarOpen(true);
            }
        );
    };

    const handleFooterFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const serviceID = "service_jz7j4vy";
        const templateID = "template_x5i85qc";
        const userID = "1pbzxztR9SmKpmgl4";

        const templateParams = {
            email: footerFormData.email,
            name: "Demo Request",
            businessName: "N/A",
            phoneNumber: "N/A",
        };

        emailjs.send(serviceID, templateID, templateParams, userID).then(
            (result) => {
                setSnackbarMessage("Thank you! Your demo request has been submitted.");
                setSnackbarOpen(true);
                setFooterFormData({
                    email: "",
                });
            },
            (error) => {
                console.error("Failed to send email:", error.text);
                setSnackbarMessage(
                    "Oops! Something went wrong. Please try again later."
                );
                setSnackbarOpen(true);
            }
        );
    };

    const handleCloseSnackbar = (event: any, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setSnackbarOpen(false);
    };

    const isDarkMode = theme.palette.mode === "dark";

    return (
        <div
            className="landing-page"
            style={{
                backgroundColor: isDarkMode ? "#132939" : colors.primary[700],
                minHeight: "100vh",
            }}
        >
            <div className="container2">
                {/* Topbar Section */}
                <div
                    className={`topbar ${isTopBarSticky ? "sticky" : ""}`}
                    style={{
                        backgroundColor: isDarkMode ? "#193F59" : "#5E98C0",
                        color: colors.text,
                    }}
                >
                    <div>
                        {" "}
                        <a
                            href="https://mcb.co.ke/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img src={MCBPOSLogo} alt="Company Logo" className="logo" />
                        </a>
                    </div>
                    <nav className="topbar-nav">
                        <div className="toggle-icon">
                            <i className="fas-fa-bars"></i>
                        </div>
                        <IconButton
                            size="large"
                            onClick={colorMode.toggleColorMode}
                            sx={{
                                transition: "color 0.3s ease",
                                "&:hover": {
                                    color: theme.palette.mode === "dark" ? "#ffc107" : "#ffeb3b",
                                },
                            }}
                        >
                            {theme.palette.mode === "dark" ? (
                                <DarkModeIcon />
                            ) : (
                                <LightModeIcon />
                            )}
                        </IconButton>
                        <a
                            href="#features"
                            style={{ color: isDarkMode ? "#728084" : colors.text }}
                        >
                            Features
                        </a>
                        <a
                            href="#testimonials"
                            style={{ color: isDarkMode ? "#728084" : colors.text }}
                        >
                            Testimonials
                        </a>
                        <a
                            href="#contact"
                            style={{ color: isDarkMode ? "#728084" : colors.text }}
                        >
                            Contact
                        </a>
                        <Link
                            to="/signin"
                            className="login-btn"
                            style={{ color: colors.text }}
                        >
                            Signin
                        </Link>
                    </nav>
                </div>

                {/* Header Section */}
                <header
                    className={`header ${headerInView ? "fade-in" : ""}`}
                    style={{
                        backgroundColor: isDarkMode ? "#132939" : colors.primary[700],
                        color: isDarkMode ? "#E5E4E2" : colors.text,
                    }}
                    ref={headerRef}
                >
                    <img src={emptycashier} alt="POS System" className="header-image" />
                    <div
                        className="header-text"
                        style={{
                            backgroundColor: isDarkMode ? "#132939" : "",
                            color: isDarkMode ? "#878C96" : colors.text,
                            marginTop: "-153px",
                        }}
                    >
                        <h1>The Ultimate POS for Your Business</h1>
                        <p style={{ fontSize: "1.2rem" }}>
                            From managing inventory to quick transactions, our POS system is
                            built to streamline your business operations and optimize your
                            workflow.
                        </p>
                        <button
                            className="cta"
                            style={{
                                backgroundColor: isDarkMode ? "#1766A2" : "#1766A2",
                                color: colors.text,
                            }}
                            onClick={handleFreeTrialClick}
                        >
                            Start Your Free Trial Today
                        </button>
                    </div>
                </header>

                {/* What We Do Section */}
                <section
                    className={`what-we-do ${headerInView ? "fade-in" : ""}`}
                    style={{
                        backgroundColor: isDarkMode ? "#132939" : colors.primary[700],
                        color: isDarkMode ? "#E5E4E2" : colors.text,
                    }}
                    ref={headerRef}
                >
                    <h2 style={{ color: isDarkMode ? "#878C96" : colors.text }}>
                        What We Do
                    </h2>
                    <p
                        style={{
                            fontSize: "1.3rem",
                            color: isDarkMode ? "#E5E4E2" : colors.text,
                        }}
                    >
                        Our POS system provides seamless solutions for inventory management,
                        order tracking, customer engagement, and sales optimization.
                    </p>
                </section>

                {/* Key Features Section */}
                <section
                    className={`features ${featuresInView ? "fade-in" : ""}`}
                    style={{
                        backgroundColor: isDarkMode ? "#132939" : colors.primary[700],
                        color: isDarkMode ? "#E5E4E2" : colors.text,
                    }}
                    ref={featuresRef}
                    id="features"
                >
                    <h2 style={{ color: isDarkMode ? "#878C96" : colors.text }}>
                        Key Features
                    </h2>
                    <div className="features-card">
                        <div
                            className="feature"
                            style={{
                                backgroundColor: isDarkMode ? "#224A64" : "",
                                color: isDarkMode ? "#E5E4E2" : colors.text,
                            }}
                        >
                            <Inventory2Icon fontSize="large" className="feature-icon" />
                            <h3>Inventory Management</h3>
                            <p style={{ fontSize: "1rem" }}>
                                Manage stock with ease, ensuring you never run out of essential
                                items.
                            </p>
                        </div>
                        <div
                            className="feature"
                            style={{
                                backgroundColor: isDarkMode ? "#224A64" : "",
                                color: isDarkMode ? "#E5E4E2" : colors.text,
                            }}
                        >
                            <TrackChangesIcon fontSize="large" className="feature-icon" />
                            <h3>Order Tracking</h3>
                            <p style={{ fontSize: "1rem" }}>
                                Efficient management of orders to ensure timely service.
                            </p>
                        </div>
                        <div
                            className="feature"
                            style={{
                                backgroundColor: isDarkMode ? "#224A64" : "",
                                color: isDarkMode ? "#E5E4E2" : colors.text,
                            }}
                        >
                            <StarIcon fontSize="large" className="feature-icon" />
                            <h3>Customer Engagement</h3>
                            <p style={{ fontSize: "1rem" }}>
                                Boost loyalty with tailored promotions and feedback.
                            </p>
                        </div>
                        <div
                            className="feature"
                            style={{
                                backgroundColor: isDarkMode ? "#224A64" : "",
                                color: isDarkMode ? "#E5E4E2" : colors.text,
                            }}
                        >
                            <AnalyticsIcon fontSize="large" className="feature-icon" />
                            <h3>Analytics</h3>
                            <p style={{ fontSize: "1rem" }}>
                                Gain insights into sales and customer behavior to optimize your
                                strategies.
                            </p>
                        </div>
                        <div
                            className="feature"
                            style={{
                                backgroundColor: isDarkMode ? "#224A64" : "",
                                color: isDarkMode ? "#E5E4E2" : colors.text,
                            }}
                        >
                            <SupportAgentIcon fontSize="large" className="feature-icon" />
                            <h3>Customer Support</h3>
                            <p style={{ fontSize: "1rem" }}>
                                24/7 support for all your business needs.
                            </p>
                        </div>
                        <div
                            className="feature"
                            style={{
                                backgroundColor: isDarkMode ? "#224A64" : "",
                                color: isDarkMode ? "#E5E4E2" : colors.text,
                            }}
                        >
                            <MonetizationOnIcon fontSize="large" className="feature-icon" />
                            <h3>Flexible Payment Options</h3>
                            <p style={{ fontSize: "1rem" }}>
                                Accept various payment methods for convenience.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section
                    className={`testimonials ${testimonialsInView ? "fade-in" : ""}`}
                    style={{
                        backgroundColor: isDarkMode ? "#132939" : colors.primary[700],
                        color: isDarkMode ? "#E5E4E2" : colors.text,
                    }}
                    ref={testimonialsRef}
                    id="testimonials"
                >
                    <h2 style={{ color: isDarkMode ? "#878C96" : colors.text }}>
                        What Our Customers Say
                    </h2>
                    <div className="testimonial-navigation">
                        <button
                            onClick={handlePrev}
                            disabled={visibleIndex === 0}
                            className="scroll-btn"
                            style={{ color: colors.text }}
                        >
                            ❮
                        </button>
                        <div className="testimonial-container">
                            {testimonials
                                .slice(visibleIndex, visibleIndex + itemsToShow)
                                .map((testimonial, index) => (
                                    <div
                                        className="testimonial"
                                        style={{
                                            backgroundColor: isDarkMode ? "#224A64" : "",
                                            color: isDarkMode ? "#E5E4E2" : colors.text,
                                        }}
                                        key={index}
                                    >
                                        <p style={{ fontSize: "1.1rem" }}>"{testimonial.text}"</p>
                                        <p>- {testimonial.author}</p>
                                    </div>
                                ))}
                        </div>
                        <button
                            onClick={handleNext}
                            disabled={visibleIndex + itemsToShow >= testimonials.length}
                            className="scroll-btn"
                            style={{ color: colors.text }}
                        >
                            ❯
                        </button>
                    </div>
                </section>

                {/* Footer Section */}
                <footer
                    id="contact"
                    style={{
                        backgroundColor: isDarkMode ? "#132939" : colors.primary[700],
                        color: isDarkMode ? "#E5E4E2" : colors.text,
                    }}
                >
                    <h2
                        style={{
                            marginBottom: "-4px",
                            color: isDarkMode ? "#878C96" : colors.text,
                        }}
                    >
                        Interested? Sign Up for a Free Demo
                    </h2>
                    <form className="footer-form" onSubmit={handleFooterFormSubmit}>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            required
                            value={footerFormData.email}
                            onChange={(e) => setFooterFormData({ email: e.target.value })}
                        />
                        <button
                            type="submit"
                            style={{
                                backgroundColor: isDarkMode ? "#1766A2" : "#1766A2",
                                color: colors.text,
                            }}
                        >
                            Request a Demo
                        </button>
                    </form>

                    {/* About MCB Section */}
                    <section className="brand-story">
                        <h2
                            style={{
                                marginTop: "1px",
                                color: isDarkMode ? "#878C96" : colors.text,
                            }}
                        >
                            About MCB
                        </h2>
                        <p
                            style={{
                                fontSize: "1rem",
                                color: colors.text,
                                marginTop: "-12px",
                            }}
                        >
                            Founded with the mission to empower businesses, MCB has been at
                            the forefront of innovative solutions. Our commitment to
                            excellence and customer satisfaction has made us a trusted partner
                            in business operations.
                        </p>
                        <p style={{ fontSize: "1rem", color: colors.text }}>
                            Join us as we continue to revolutionize the way businesses manage
                            their processes and achieve growth.
                        </p>

                        {/* Social Media Icons with Links */}
                        <div className="social-media">
                            <h3 style={{ color: isDarkMode ? "#878C96" : colors.text }}>
                                Contact Us
                            </h3>
                            <p
                                style={{
                                    fontSize: "0.9rem",
                                    color: colors.text,
                                    marginTop: "-4px",
                                }}
                            >
                                For any inquiries or support, feel free to get in touch with us
                                through the following platforms:
                            </p>
                            <a
                                href="https://twitter.com/mcb"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: colors.text }}
                            >
                                <Twitter />
                            </a>
                            <a
                                href="https://facebook.com/mcb"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: colors.text }}
                            >
                                <Facebook />
                            </a>
                            <a
                                href="https://linkedin.com/company/mcb"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: colors.text }}
                            >
                                <LinkedIn />
                            </a>
                            <a
                                href="https://instagram.com/mcb"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: colors.text }}
                            >
                                <Instagram />
                            </a>
                            <a
                                href="https://wa.me/1234567890"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: colors.text }}
                            >
                                <WhatsApp />
                            </a>
                        </div>
                    </section>

                    <p
                        style={{
                            fontSize: "0.9rem",
                            marginTop: "-2px",
                            color: colors.text,
                        }}
                    >
                        © 2024{" "}
                        <Link
                            to="/signin"
                            style={{
                                textDecoration: "underline",
                                color: isDarkMode ? "#E5E4E2" : colors.text,
                            }}
                        >
                            MCB POS System
                        </Link>{" "}
                        | Application Areas: Retail, Hospitality, Butcheries, Restaurants
                    </p>
                </footer>
                {/* Form Modal */}
                {isFormVisible && (
                    <div className="modal-overlay">
                        <div
                            className="modal"
                            style={{
                                backgroundColor: isDarkMode ? "#132939" : colors.primary[700],
                                color: isDarkMode ? "#E5E4E2" : colors.text,
                            }}
                        >
                            <h2 style={{ color: isDarkMode ? "#878C96" : colors.text }}>
                                Start Your Free Trial
                            </h2>
                            <form className="trial-form" onSubmit={handleFormSubmit}>
                                <label>Name:</label>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    required
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({ ...formData, name: e.target.value })
                                    }
                                />
                                <label>Email:</label>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    required
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({ ...formData, email: e.target.value })
                                    }
                                />
                                <label>Business Name:</label>
                                <input
                                    type="text"
                                    placeholder="Enter your business name"
                                    required
                                    value={formData.businessName}
                                    onChange={(e) =>
                                        setFormData({ ...formData, businessName: e.target.value })
                                    }
                                />
                                <label>Phone Number:</label>
                                <input
                                    type="tel"
                                    placeholder="Enter your phone number"
                                    value={formData.phoneNumber}
                                    onChange={(e) =>
                                        setFormData({ ...formData, phoneNumber: e.target.value })
                                    }
                                />
                                <button
                                    type="submit"
                                    className="submit-btn"
                                    style={{
                                        backgroundColor: isDarkMode ? "#1766A2" : "#1766A2",
                                        color: colors.text,
                                    }}
                                >
                                    Submit
                                </button>
                            </form>
                            <button
                                className="close-btn"
                                onClick={handleFormClose}
                                style={{
                                    backgroundColor: isDarkMode ? "#E5E4E2" : "#1766A2",
                                    color: colors.text,
                                }}
                            >
                                Close
                            </button>
                        </div>
                        {/* Snackbar for showing success/error messages */}
                        <Snackbar
                            open={snackbarOpen}
                            autoHideDuration={6000} // Snackbar will auto-hide after 6 seconds
                            onClose={handleCloseSnackbar}
                            message={snackbarMessage}
                            color="success"
                            action={
                                <IconButton
                                    size="small"
                                    aria-label="close"
                                    color="inherit"
                                    onClick={handleCloseSnackbar}
                                >
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            }
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default LandingPage;
