
import React from "react";
import { Link } from "react-router-dom";

import UserToken from "../../Services/UserToken/UserToken";
import AppContext from "../../Contexts/AppContext/AppContext";
import ReactLoadingIcon from "../ReactLoadingIcon/ReactLoadingIcon";

import "./Login.css";

export default class Login extends React.Component {
    static contextType = AppContext;

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            showPassword: false,
            loading: false,
            error: "",
            touched: {
                email: false,
                password: false
            }
        };

        this.emailRef = React.createRef();
        this.passwordRef = React.createRef();
        this.abortController = null;
    }

    componentWillUnmount() {
        if (this.abortController) {
            this.abortController.abort();
        }
    }

    handleTextInput = (event) => {
        const { name, value } = event.target;

        this.setState({
            [name]: value,
            error: ""
        });
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

    togglePasswordVisibility = () => {
        this.setState((previousState) => ({
            showPassword: !previousState.showPassword
        }));
    };

    validateForm = () => {
        const { email, password } = this.state;

        if (!email.trim()) {
            return {
                valid: false,
                field: "email",
                message: "Please enter your email address."
            };
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            return {
                valid: false,
                field: "email",
                message: "Please enter a valid email address."
            };
        }

        if (!password) {
            return {
                valid: false,
                field: "password",
                message: "Please enter your password."
            };
        }

        return {
            valid: true
        };
    };

    handleSubmit = async (event) => {
        event.preventDefault();

        if (this.state.loading) {
            return;
        }

        const validation = this.validateForm();

        if (!validation.valid) {
            this.setState({
                error: validation.message,
                loading: false,
                touched: {
                    email: true,
                    password: true
                }
            });

            const inputRef = validation.field === "email"
                ? this.emailRef
                : this.passwordRef;

            if (inputRef.current) {
                inputRef.current.focus();
            }

            return;
        }

        this.setState({
            error: "",
            loading: true
        });

        this.abortController = new AbortController();

        try {
            const response = await fetch(
                `${process.env.REACT_APP_FETCH_API_URL}/api/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: this.state.email.trim(),
                        password: this.state.password
                    }),
                    signal: this.abortController.signal
                }
            );

            let responseData = {};

            try {
                responseData = await response.json();
            } catch (error) {
                if (response.ok) {
                    throw new Error(
                        "The server returned an invalid response."
                    );
                }
            }

            if (!response.ok) {
                throw new Error(
                    responseData.error ||
                    "Unable to log in. Please check your credentials."
                );
            }

            if (!responseData.token) {
                throw new Error(
                    "Login succeeded, but no authentication token was returned."
                );
            }

            UserToken.setToken(responseData.token);

            if (
                this.context.userContext &&
                this.context.userContext.handleLogIn
            ) {
                await this.context.userContext.handleLogIn();
            }

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
            if (this.abortController &&
                !this.abortController.signal.aborted) {
                this.setState({
                    loading: false
                });
            }
        }
    };

    render() {
        const {
            email,
            password,
            showPassword,
            loading,
            error,
            touched
        } = this.state;

        const emailInvalid = touched.email && !email.trim();
        const passwordInvalid = touched.password && !password;

        return (
            <main className="serenta-login-page">
                <div className="serenta-login-container">
                    <section
                        className="serenta-login-intro"
                        aria-labelledby="serenta-login-intro-title"
                    >
                        <div className="serenta-login-intro-content">
                            <span className="serenta-login-eyebrow">
                                WELCOME TO SERENTA
                            </span>

                            <h1 id="serenta-login-intro-title">
                                Your next connection
                                <span> starts here.</span>
                            </h1>

                            <p>
                                Access your account to manage your
                                property listings and continue
                                exploring rental opportunities.
                            </p>

                            <div className="serenta-login-intro-features">
                                <div className="serenta-login-feature">
                                    <span
                                        className="serenta-login-feature-icon"
                                        aria-hidden="true"
                                    >
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="m3 10 9-7 9 7" />
                                            <path d="M5 9v12h14V9" />
                                            <path d="M9 21v-8h6v8" />
                                        </svg>
                                    </span>

                                    <div>
                                        <strong>Manage your listings</strong>
                                        <p>
                                            Keep your property advertisements
                                            organized in one place.
                                        </p>
                                    </div>
                                </div>

                                <div className="serenta-login-feature">
                                    <span
                                        className="serenta-login-feature-icon"
                                        aria-hidden="true"
                                    >
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <circle cx="11" cy="11" r="7" />
                                            <path d="m20 20-4-4" />
                                        </svg>
                                    </span>

                                    <div>
                                        <strong>Explore opportunities</strong>
                                        <p>
                                            Discover rental listings and
                                            connect with new possibilities.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="serenta-login-intro-bottom">
                            <span className="serenta-login-intro-line" />
                            Find a place. Make a connection.
                        </div>
                    </section>

                    <section
                        className="serenta-login-form-section"
                        aria-labelledby="serenta-login-heading"
                    >
                        <div className="serenta-login-form-wrapper">
                            <div className="serenta-login-form-header">
                                <span className="serenta-login-form-eyebrow">
                                    YOUR ACCOUNT
                                </span>

                                <h2 id="serenta-login-heading">
                                    Welcome back
                                </h2>

                                <p>
                                    Enter your details to sign in
                                    to your account.
                                </p>
                            </div>

                            <form
                                id="login-form"
                                className="serenta-login-form"
                                onSubmit={this.handleSubmit}
                                noValidate
                            >
                                <div className="serenta-login-field">
                                    <label htmlFor="login-email">
                                        Email address
                                    </label>

                                    <input
                                        ref={this.emailRef}
                                        id="login-email"
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={this.handleTextInput}
                                        onBlur={this.handleBlur}
                                        placeholder="you@example.com"
                                        autoComplete="username"
                                        autoCapitalize="none"
                                        spellCheck={false}
                                        required
                                        aria-invalid={emailInvalid}
                                        aria-describedby={
                                            emailInvalid
                                                ? "login-email-error"
                                                : undefined
                                        }
                                        disabled={loading}
                                    />

                                    {emailInvalid && (
                                        <span
                                            id="login-email-error"
                                            className="serenta-login-field-error"
                                        >
                                            Email address is required.
                                        </span>
                                    )}
                                </div>

                                <div className="serenta-login-field">
                                    <div className="serenta-login-label-row">
                                        <label htmlFor="login-password">
                                            Password
                                        </label>
                                    </div>

                                    <div className="serenta-login-password-wrap">
                                        <input
                                            ref={this.passwordRef}
                                            id="login-password"
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            name="password"
                                            value={password}
                                            onChange={this.handleTextInput}
                                            onBlur={this.handleBlur}
                                            placeholder="Enter your password"
                                            autoComplete="current-password"
                                            required
                                            aria-invalid={passwordInvalid}
                                            aria-describedby={
                                                passwordInvalid
                                                    ? "login-password-error"
                                                    : undefined
                                            }
                                            disabled={loading}
                                        />

                                        <button
                                            type="button"
                                            className="serenta-login-password-toggle"
                                            onClick={this.togglePasswordVisibility}
                                            aria-label={
                                                showPassword
                                                    ? "Hide password"
                                                    : "Show password"
                                            }
                                            aria-pressed={showPassword}
                                            disabled={loading}
                                        >
                                            {showPassword ? "Hide" : "Show"}
                                        </button>
                                    </div>

                                    {passwordInvalid && (
                                        <span
                                            id="login-password-error"
                                            className="serenta-login-field-error"
                                        >
                                            Password is required.
                                        </span>
                                    )}
                                </div>

                                {error && (
                                    <div
                                        className="serenta-login-error"
                                        role="alert"
                                    >
                                        <span aria-hidden="true">!</span>
                                        <p>{error}</p>
                                    </div>
                                )}

                                <button
                                    id="login-submit"
                                    className="serenta-login-submit"
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <ReactLoadingIcon />
                                            <span>Signing in...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Sign In</span>
                                            <span aria-hidden="true">→</span>
                                        </>
                                    )}
                                </button>

                                <p className="serenta-login-signup">
                                    New to Serenta?{" "}
                                    <Link to="/signup">
                                        Create an account
                                    </Link>
                                </p>
                            </form>

                            <div className="serenta-login-form-footer">
                                <span>
                                    Connecting renters and property owners.
                                </span>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        );
    }
}
