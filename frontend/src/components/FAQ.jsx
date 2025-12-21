import React from 'react';
import { Link } from 'react-router-dom';
import './FAQ.css';

function FAQ() {
    const faqs = [
        {
            question: "What is the Labour Compliance Manager?",
            answer: "The Labour Compliance Manager is a comprehensive platform designed to help organizations track, manage, and audit their adherence to Indian Labour Laws. It focuses on privacy, minimizing data intrusion while ensuring full legal compliance."
        },
        {
            question: "Which acts and laws does it cover?",
            answer: "We cover a wide range of acts including The Factories Act, Contract Labour (Regulation & Abolition) Act, Minimum Wages Act, Payment of Bonus Act, EPF & MP Act, ESI Act, and various state-specific Shops & Establishments Acts. Check our Labour Laws page for a full list."
        },
        {
            question: "Is my data secure?",
            answer: "Yes, absolutely. We prioritize 'Privacy by Design'. We minimize the personal data collected from employees and use industry-standard encryption for all stored documents and records. Access is strictly role-based."
        },
        {
            question: "Can I manage multiple locations?",
            answer: "Yes, the system is designed for multi-location enterprises. You can define various branches or sites and track compliance obligations specific to the state and nature of each location."
        },
        {
            question: "How do I get started?",
            answer: "You can sign up for an account directly on our website. Once registered, you can set up your company profile, add locations, and the system will automatically suggest relevant compliance obligations."
        },
        {
            question: "Does it support contractor compliance?",
            answer: "Yes, we have a dedicated module for Contractor Governance that allows you to onboard contractors, track their license validity, and monitor their compliance status to mitigate principal employer liability."
        }
    ];

    return (
        <div className="home-container">
            <header className="home-nav">
                <Link to="/" className="nav-left" style={{ textDecoration: 'none' }}>
                    <div className="brand-mark">LC</div>
                    <div className="brand-text">
                        <p className="brand-kicker">Labour Compliance</p>
                        <h2>Compliance Manager</h2>
                    </div>
                </Link>
                <div className="nav-links">
                    <Link to="/">Home</Link>
                    <Link to="/labour-laws">Labour Laws</Link>
                    <Link to="/login" className="nav-cta">Login</Link>
                </div>
            </header>

            <div className="faq-container">
                <div className="faq-content">
                    <h2 className="faq-title">Frequently Asked Questions</h2>
                    <div className="faq-list">
                        {faqs.map((faq, index) => (
                            <div key={index} className="faq-item">
                                <h3 className="faq-question">{faq.question}</h3>
                                <p className="faq-answer">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <footer className="home-footer">
                <p>&copy; 2025 Labour Compliance Manager. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default FAQ;
