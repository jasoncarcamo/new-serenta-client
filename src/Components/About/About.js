
import React, { Component } from "react";
import { Link } from "react-router-dom";

import DocTitleService from "../../Services/DocTitleService/DocTitleService";

import "./About.css";

export default class About extends Component {
    componentDidMount() {
        DocTitleService.setDocTitle(
            "About Serenta | Connecting Renters and Property Owners"
        );
    }

    render() {
        return (
            <main className="serenta-about">
                <section
                    className="serenta-about-hero"
                    aria-labelledby="about-heading"
                >
                    <div className="serenta-about-container">
                        <div className="serenta-about-hero-content">
                            <span className="serenta-about-eyebrow">
                                ABOUT SERENTA
                            </span>

                            <h1 id="about-heading">
                                Connecting people with
                                <span> places to call home.</span>
                            </h1>

                            <p className="serenta-about-hero-description">
                                Serenta is a rental listing platform
                                designed to bring renters and property
                                owners together. We believe discovering
                                a place to live and sharing available
                                properties should be simple, accessible,
                                and convenient.
                            </p>

                            <div className="serenta-about-hero-actions">
                                <Link
                                    to="/find-rent"
                                    className="serenta-about-button serenta-about-button--primary"
                                >
                                    Explore Rentals
                                    <span aria-hidden="true">→</span>
                                </Link>

                                <Link
                                    to="/post-ad"
                                    className="serenta-about-button serenta-about-button--secondary"
                                >
                                    List Your Property
                                </Link>
                            </div>
                        </div>

                        <div
                            className="serenta-about-hero-visual"
                            aria-hidden="true"
                        >
                            <div className="serenta-about-visual-frame">
                                <div className="serenta-about-visual-content">
                                    <span className="serenta-about-visual-label">
                                        A BETTER WAY TO CONNECT
                                    </span>

                                    <div className="serenta-about-visual-icon">
                                        <svg
                                            viewBox="0 0 64 64"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M9 29L32 10l23 19" />
                                            <path d="M15 26v28h34V26" />
                                            <path d="M26 54V37h12v17" />
                                            <path d="M23 29h4" />
                                            <path d="M37 29h4" />
                                        </svg>
                                    </div>

                                    <strong>
                                        Find your next place.
                                    </strong>

                                    <p>
                                        Discover opportunities.
                                        Make connections.
                                        Feel at home.
                                    </p>
                                </div>
                            </div>

                            <div className="serenta-about-visual-accent" />
                        </div>
                    </div>
                </section>

                <section
                    className="serenta-about-intro"
                    aria-labelledby="about-mission-heading"
                >
                    <div className="serenta-about-container">
                        <div className="serenta-about-intro-grid">
                            <div>
                                <span className="serenta-about-eyebrow">
                                    OUR PURPOSE
                                </span>

                                <h2 id="about-mission-heading">
                                    Making rental connections easier.
                                </h2>
                            </div>

                            <div className="serenta-about-intro-copy">
                                <p>
                                    Finding the right rental can take
                                    time, and reaching interested
                                    renters can be challenging for
                                    property owners.
                                </p>

                                <p>
                                    Serenta brings both sides together
                                    in one place, creating a straightforward
                                    experience for exploring rental
                                    opportunities and advertising
                                    available properties.
                                </p>

                                <p>
                                    Our goal is to make the process
                                    more approachable through clear
                                    information, practical tools,
                                    and an easy-to-use platform.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section
                    className="serenta-about-benefits"
                    aria-labelledby="about-benefits-heading"
                >
                    <div className="serenta-about-container">
                        <div className="serenta-about-section-heading">
                            <span className="serenta-about-eyebrow">
                                HOW SERENTA HELPS
                            </span>

                            <h2 id="about-benefits-heading">
                                Built around better connections.
                            </h2>

                            <p>
                                Whether you're searching for a rental
                                or sharing a property, Serenta helps
                                you take the next step.
                            </p>
                        </div>

                        <div className="serenta-about-benefits-grid">
                            <article className="serenta-about-benefit-card">
                                <div className="serenta-about-benefit-number">
                                    01
                                </div>

                                <h3>Discover Rentals</h3>

                                <p>
                                    Browse rental listings and explore
                                    properties that may suit your
                                    location, needs, and preferences.
                                </p>

                                <Link to="/find-rent">
                                    Find a Rental
                                    <span aria-hidden="true">→</span>
                                </Link>
                            </article>

                            <article className="serenta-about-benefit-card">
                                <div className="serenta-about-benefit-number">
                                    02
                                </div>

                                <h3>Share Your Property</h3>

                                <p>
                                    Create a property advertisement
                                    and make your rental opportunity
                                    visible to people looking for
                                    their next home.
                                </p>

                                <Link to="/post-ad">
                                    Post an Ad
                                    <span aria-hidden="true">→</span>
                                </Link>
                            </article>

                            <article className="serenta-about-benefit-card">
                                <div className="serenta-about-benefit-number">
                                    03
                                </div>

                                <h3>Make Connections</h3>

                                <p>
                                    Bring renters and property owners
                                    closer together through a platform
                                    focused on rental discovery
                                    and communication.
                                </p>

                                <Link to="/signup">
                                    Get Started
                                    <span aria-hidden="true">→</span>
                                </Link>
                            </article>
                        </div>
                    </div>
                </section>

                <section
                    className="serenta-about-values"
                    aria-labelledby="about-values-heading"
                >
                    <div className="serenta-about-container">
                        <div className="serenta-about-values-grid">
                            <div className="serenta-about-values-content">
                                <span className="serenta-about-eyebrow">
                                    WHAT MATTERS TO US
                                </span>

                                <h2 id="about-values-heading">
                                    A simpler experience,
                                    from search to connection.
                                </h2>

                                <p>
                                    We believe a useful rental platform
                                    should focus on the people using it.
                                    That's why our approach centers on
                                    clarity, accessibility, and
                                    practical functionality.
                                </p>
                            </div>

                            <div className="serenta-about-values-list">
                                <article>
                                    <span>01</span>

                                    <div>
                                        <h3>Simplicity</h3>
                                        <p>
                                            Straightforward navigation
                                            and an easy-to-understand
                                            experience.
                                        </p>
                                    </div>
                                </article>

                                <article>
                                    <span>02</span>

                                    <div>
                                        <h3>Accessibility</h3>
                                        <p>
                                            A responsive experience
                                            designed for different
                                            devices and users.
                                        </p>
                                    </div>
                                </article>

                                <article>
                                    <span>03</span>

                                    <div>
                                        <h3>Connection</h3>
                                        <p>
                                            Helping people discover
                                            rental opportunities and
                                            connect with one another.
                                        </p>
                                    </div>
                                </article>
                            </div>
                        </div>
                    </div>
                </section>

                <section
                    className="serenta-about-cta"
                    aria-labelledby="about-cta-heading"
                >
                    <div className="serenta-about-container">
                        <div className="serenta-about-cta-content">
                            <span className="serenta-about-eyebrow">
                                GET STARTED
                            </span>

                            <h2 id="about-cta-heading">
                                Your next connection starts here.
                            </h2>

                            <p>
                                Explore available rentals or share
                                your property with people looking
                                for a place to call home.
                            </p>

                            <div className="serenta-about-hero-actions">
                                <Link
                                    to="/find-rent"
                                    className="serenta-about-button serenta-about-button--light"
                                >
                                    Browse Rentals
                                </Link>

                                <Link
                                    to="/post-ad"
                                    className="serenta-about-button serenta-about-button--outline-light"
                                >
                                    Post Your Property
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        );
    }
}
