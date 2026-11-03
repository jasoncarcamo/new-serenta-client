
import React from "react";
import { Link } from "react-router-dom";

import UserToken from "../../Services/UserToken/UserToken";
import ReactLoadingIcon from "../ReactLoadingIcon/ReactLoadingIcon";

import "./SignUp.css";

export default class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            first_name: "",
            last_name: "",
            mobile_number: "",
            email: "",
            password: "",
            confirm_password: "",
            showPassword: false,
            showConfirmPassword: false,
            loading: false,
            error: "",
            errors: {},
            touched: {}
        };

        this.abortController = null;
    }

    componentWillUnmount() {
        if (this.abortController) {
            this.abortController.abort();
        }
    }

    handleTextInput = (event) => {
        const { name, value } = event.target;

        this.setState((previousState) => ({
            [name]: value,
            error: "",
            errors: {
                ...previousState.errors,
                [name]: ""
            }
        }));
    };

    handleBlur = (event) => {
        const { name } = event.target;

        this.setState((previousState) => ({
            touched: {
                ...previousState.touched,
                [name]: true
            }
        }));
    };

    togglePassword = (field) => {
        this.setState((previousState) => ({
            [field]: !previousState[field]
        }));
    };

    getPasswordRequirements = () => {
        const { password } = this.state;

        return [
            {
                label: "At least 9 characters",
                valid: password.length >= 9
            },
            {
                label: "Fewer than 72 characters",
                valid: password.length < 72
            },
            {
                label: "Uppercase and lowercase letters",
                valid: /[A-Z]/.test(password) &&
                    /[a-z]/.test(password)
            },
            {
                label: "At least one number",
                valid: /[0-9]/.test(password)
            },
            {
                label: "At least one special character (!@#$%^&)",
                valid: /[!@#$%^&]/.test(password)
            },
            {
                label: "No leading or trailing spaces",
                valid: password.length > 0 &&
                    password === password.trim()
            }
        ];
    };

    validateForm = () => {
        const {
            first_name,
            last_name,
            mobile_number,
            email,
            password,
            confirm_password
        } = this.state;

        const errors = {};

        if (!first_name.trim()) {
            errors.first_name = "Please enter your first name.";
        }

        if (!last_name.trim()) {
            errors.last_name = "Please enter your last name.";
        }

        if (!mobile_number.trim()) {
            errors.mobile_number = "Please enter your mobile number.";
        }

        if (!email.trim()) {
            errors.email = "Please enter your email address.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            errors.email = "Please enter a valid email address.";
        }

        if (!password) {
            errors.password = "Please create a password.";
        } else if (
            !this.getPasswordRequirements().every(
                (requirement) => requirement.valid
            )
        ) {
            errors.password = "Your password does not meet all requirements.";
        }

        if (!confirm_password) {
            errors.confirm_password = "Please confirm your password.";
        } else if (password !== confirm_password) {
            errors.confirm_password = "Your passwords do not match.";
        }

        return errors;
    };

    handleSubmit = async (event) => {
        event.preventDefault();

        if (this.state.loading) {
            return;
        }

        const errors = this.validateForm();

        if (Object.keys(errors).length > 0) {
            this.setState({
                errors,
                error: "Please correct the highlighted fields."
            });

            return;
        }

        this.setState({
            loading: true,
            error: "",
            errors: {}
        });

        this.abortController = new AbortController();

        try {
            const response = await fetch(
                `${process.env.REACT_APP_FETCH_API_URL}/api/register`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        first_name: this.state.first_name.trim(),
                        last_name: this.state.last_name.trim(),
                        mobile_number: this.state.mobile_number.trim(),
                        email: this.state.email.trim(),
                        password: this.state.password
                    }),
                    signal: this.abortController.signal
                }
            );

            let responseData = {};

            try {
                responseData = await response.json();
            } catch (parseError) {
                throw new Error("The server returned an invalid response.");
            }

            if (!response.ok) {
                throw new Error(
                    responseData.error ||
                    "Unable to create your account. Please try again."
                );
            }

            if (!responseData.token) {
                throw new Error(
                    "Your account was created, but no authentication token was returned."
                );
            }

            UserToken.setToken(responseData.token);

            this.props.history.push("/properties");
        } catch (error) {
            if (error.name === "AbortError") {
                return;
            }

            this.setState({
                error: error.message ||
                    "Something went wrong. Please try again."
            });
        } finally {
            if (
                this.abortController &&
                !this.abortController.signal.aborted
            ) {
                this.setState({
                    loading: false
                });
            }
        }
    };

    renderField = ({
        name,
        label,
        type = "text",
        placeholder,
        autoComplete,
        inputMode
    }) => {
        const { errors, loading } = this.state;

        const error = errors[name];

        return (
            <div className="serenta-signup-field" key={name}>
                <label htmlFor={`signup-${name}`}>
                    {label}
                    <span aria-hidden="true"> *</span>
                </label>

                <input
                    id={`signup-${name}`}
                    name={name}
                    type={type}
                    value={this.state[name]}
                    onChange={this.handleTextInput}
                    onBlur={this.handleBlur}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    inputMode={inputMode}
                    disabled={loading}
                    required
                    aria-invalid={Boolean(error)}
                    aria-describedby={
                        error ? `signup-${name}-error` : undefined
                    }
                />

                {error && (
                    <span
                        id={`signup-${name}-error`}
                        className="serenta-signup-field-error"
                    >
                        {error}
                    </span>
                )}
            </div>
        );
    };

    renderPasswordField = (confirm = false) => {
        const name = confirm ? "confirm_password" : "password";
        const showField = confirm
            ? "showConfirmPassword"
            : "showPassword";

        const { errors, loading } = this.state;

        return (
            <div className="serenta-signup-field">
                <label htmlFor={`signup-${name}`}>
                    {confirm ? "Confirm password" : "Password"}
                    <span aria-hidden="true"> *</span>
                </label>

                <div className="serenta-signup-password-wrap">
                    <input
                        id={`signup-${name}`}
                        name={name}
                        type={this.state[showField] ? "text" : "password"}
                        value={this.state[name]}
                        onChange={this.handleTextInput}
                        onBlur={this.handleBlur}
                        placeholder={
                            confirm
                                ? "Re-enter your password"
                                : "Create a secure password"
                        }
                        autoComplete={
                            confirm ? "new-password" : "new-password"
                        }
                        disabled={loading}
                        required
                        aria-invalid={Boolean(errors[name])}
                        aria-describedby={
                            errors[name]
                                ? `signup-${name}-error`
                                : undefined
                        }
                    />

                    <button
                        type="button"
                        className="serenta-signup-password-toggle"
                        onClick={() => this.togglePassword(showField)}
                        aria-label={
                            this.state[showField]
                                ? "Hide password"
                                : "Show password"
                        }
                        aria-pressed={this.state[showField]}
                        disabled={loading}
                    >
                        {this.state[showField] ? "Hide" : "Show"}
                    </button>
                </div>

                {errors[name] && (
                    <span
                        id={`signup-${name}-error`}
                        className="serenta-signup-field-error"
                    >
                        {errors[name]}
                    </span>
                )}
            </div>
        );
    };

    render() {
        const {
            password,
            confirm_password,
            loading,
            error
        } = this.state;

        const requirements = this.getPasswordRequirements();

        return (
            <main className="serenta-signup-page">
                <div className="serenta-signup-container">
                    <section
                        className="serenta-signup-intro"
                        aria-labelledby="serenta-signup-intro-title"
                    >
                        <div className="serenta-signup-intro-content">
                            <span className="serenta-signup-eyebrow">
                                JOIN SERENTA
                            </span>

                            <h1 id="serenta-signup-intro-title">
                                A simpler way to
                                <span> connect and discover.</span>
                            </h1>

                            <p>
                                Create your Serenta account to
                                explore rental opportunities,
                                share properties, and connect
                                with people looking for their
                                next home.
                            </p>

                            <div className="serenta-signup-intro-divider" />

                            <div className="serenta-signup-feature">
                                <span aria-hidden="true">01</span>

                                <div>
                                    <strong>Discover rental opportunities</strong>
                                    <p>
                                        Explore available property
                                        listings in one convenient place.
                                    </p>
                                </div>
                            </div>

                            <div className="serenta-signup-feature">
                                <span aria-hidden="true">02</span>

                                <div>
                                    <strong>Share your property</strong>
                                    <p>
                                        Advertise rental opportunities
                                        and connect with potential renters.
                                    </p>
                                </div>
                            </div>

                            <div className="serenta-signup-feature">
                                <span aria-hidden="true">03</span>

                                <div>
                                    <strong>Manage your account</strong>
                                    <p>
                                        Keep your property advertisements
                                        and account information organized.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="serenta-signup-intro-bottom">
                            Find a place. Make a connection.
                        </div>
                    </section>

                    <section
                        className="serenta-signup-form-section"
                        aria-labelledby="serenta-signup-heading"
                    >
                        <div className="serenta-signup-form-wrapper">
                            <div className="serenta-signup-form-header">
                                <span className="serenta-signup-form-eyebrow">
                                    CREATE YOUR ACCOUNT
                                </span>

                                <h2 id="serenta-signup-heading">
                                    Get started
                                </h2>

                                <p>
                                    Fill in your details below to
                                    create your Serenta account.
                                </p>
                            </div>

                            <form
                                id="signup-form"
                                className="serenta-signup-form"
                                onSubmit={this.handleSubmit}
                                noValidate
                            >
                                <div className="serenta-signup-name-grid">
                                    {this.renderField({
                                        name: "first_name",
                                        label: "First name",
                                        placeholder: "First name",
                                        autoComplete: "given-name"
                                    })}

                                    {this.renderField({
                                        name: "last_name",
                                        label: "Last name",
                                        placeholder: "Last name",
                                        autoComplete: "family-name"
                                    })}
                                </div>

                                {this.renderField({
                                    name: "email",
                                    label: "Email address",
                                    type: "email",
                                    placeholder: "you@example.com",
                                    autoComplete: "email"
                                })}

                                {this.renderField({
                                    name: "mobile_number",
                                    label: "Mobile number",
                                    type: "tel",
                                    placeholder: "(555) 123-4567",
                                    autoComplete: "tel",
                                    inputMode: "tel"
                                })}

                                {this.renderPasswordField()}

                                <div
                                    className="serenta-signup-requirements"
                                    aria-label="Password requirements"
                                >
                                    <p>Password must include:</p>

                                    <ul>
                                        {requirements.map((requirement, index) => (
                                            <li
                                                key={index}
                                                className={
                                                    password && requirement.valid
                                                        ? "serenta-signup-requirement--valid"
                                                        : ""
                                                }
                                            >
                                                <span aria-hidden="true">
                                                    {password && requirement.valid
                                                        ? "✓"
                                                        : "○"}
                                                </span>

                                                {requirement.label}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {this.renderPasswordField(true)}

                                {confirm_password && (
                                    <p
                                        className={
                                            password === confirm_password
                                                ? "serenta-signup-match serenta-signup-match--valid"
                                                : "serenta-signup-match serenta-signup-match--invalid"
                                        }
                                    >
                                        {password === confirm_password
                                            ? "✓ Passwords match"
                                            : "Passwords do not match"}
                                    </p>
                                )}

                                {error && (
                                    <div
                                        className="serenta-signup-error"
                                        role="alert"
                                    >
                                        <span aria-hidden="true">!</span>
                                        <p>{error}</p>
                                    </div>
                                )}

                                <button
                                    id="signup-submit"
                                    className="serenta-signup-submit"
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <ReactLoadingIcon />
                                            <span>Creating account...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Create Account</span>
                                            <span aria-hidden="true">→</span>
                                        </>
                                    )}
                                </button>

                                <p className="serenta-signup-login">
                                    Already have an account?{" "}
                                    <Link to="/login">
                                        Sign In
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </section>
                </div>
            </main>
        );
    }
}
