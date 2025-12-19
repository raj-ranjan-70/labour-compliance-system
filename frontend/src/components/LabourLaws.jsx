import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function LabourLaws() {
    const laws = [
        {
            category: "Wages & Benefits",
            acts: [
                { name: "The Minimum Wages Act, 1948", desc: "Ensures payment of minimum rates of wages to workers." },
                { name: "The Payment of Wages Act, 1936", desc: "Regulates the payment of wages to certain classes of employed persons." },
                { name: "The Payment of Bonus Act, 1965", desc: "Provides for the payment of bonus to persons in certain establishments." },
                { name: "The Equal Remuneration Act, 1976", desc: "Provides for payment of equal remuneration to men and women workers." }
            ]
        },
        {
            category: "Social Security",
            acts: [
                { name: "The Employees' Provident Funds & MP Act, 1952", desc: "Institution of provident funds, pension fund and deposit-linked insurance fund for employees." },
                { name: "The Employees' State Insurance Act, 1948", desc: "Benefits to employees in case of sickness, maternity and employment injury." },
                { name: "The Payment of Gratuity Act, 1972", desc: "Scheme for payment of gratuity to employees engaged in factories, mines, etc." },
                { name: "The Maternity Benefit Act, 1961", desc: "Regulates the employment of women in certain establishments for certain periods before and after child-birth." }
            ]
        },
        {
            category: "Industrial Relations",
            acts: [
                { name: "The Industrial Disputes Act, 1947", desc: "Provisions for the investigation and settlement of industrial disputes." },
                { name: "The Trade Unions Act, 1926", desc: "Registration of Trade Unions and dealing with their rights and liabilities." },
                { name: "The Industrial Employment (Standing Orders) Act, 1946", desc: "Requires employers to define with precision the conditions of employment." }
            ]
        },
        {
            category: "Working Conditions",
            acts: [
                { name: "The Factories Act, 1948", desc: "Consolidates and amends the law regulating labour in factories." },
                { name: "The Contract Labour (R&A) Act, 1970", desc: "Regulates the employment of contract labour in certain establishments." },
                { name: "The Shops and Establishments Act (State-wise)", desc: "Regulates conditions of work and employment in shops and commercial establishments." },
                { name: "The Sexual Harassment of Women at Workplace (POSH) Act, 2013", desc: "Prevention, prohibition and redressal of sexual harassment of women at workplace." }
            ]
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
                    <Link to="/faq">FAQ</Link>
                    <Link to="/login" className="nav-cta">Login</Link>
                </div>
            </header>

            <div className="features-section" style={{ minHeight: '100vh', paddingTop: '4rem' }}>
                <h2 className="section-title">Major Labour Laws Covered</h2>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gap: '3rem' }}>
                    {laws.map((section, idx) => (
                        <div key={idx} className="law-category">
                            <h3 style={{
                                fontSize: '1.8rem',
                                marginBottom: '1.5rem',
                                color: '#0f172a',
                                borderBottom: '2px solid #0ea5e9',
                                display: 'inline-block',
                                paddingBottom: '0.5rem'
                            }}>
                                {section.category}
                            </h3>
                            <div className="features-grid">
                                {section.acts.map((act, i) => (
                                    <div key={i} className="feature-card" style={{ textAlign: 'left' }}>
                                        <h4 style={{ color: '#0ea5e9', fontSize: '1.1rem', marginBottom: '0.8rem' }}>{act.name}</h4>
                                        <p style={{ fontSize: '0.9rem' }}>{act.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <footer className="home-footer">
                <p>&copy; 2025 Labour Compliance Manager. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default LabourLaws;
