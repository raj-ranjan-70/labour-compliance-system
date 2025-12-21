import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaArrowLeft } from 'react-icons/fa';
import { SiLeetcode, SiCodeforces } from 'react-icons/si';
import './Developers.css';

function Developers() {
    const developers = [
        {
            name: "Raj Ranjan",
            initials: "RR",
            role: "Computer Science & Engineering Student",
            bio: (
                <>
                    👋 Hi, I’m a Computer Science & Engineering student passionate about full-stack web development.<br />
                    💻 I enjoy building clean, efficient, and user-focused applications.<br />
                    🚀 This project reflects my hands-on learning and growth with modern web technologies.
                </>
            ),
            github: "https://www.github.com/raj-ranjan-70",
            linkedin: "https://www.linkedin.com/in/rajranjan70",
            leetcode: "https://www.leetcode.com/u/rajranjan70/",
            codeforces: "https://www.codeforces.com/profile/Raj_Ranjan"
        },
        {
            name: "Ram Arora",
            initials: "RA",
            role: "Full-Stack Developer",
            bio: (
                <>
                    👋 Computer Science & Engineering student specializing in full-stack development.<br />
                    💡 Focused on translating real-world problems into clean, scalable software solutions.<br />
                    🧩 Experienced in integrating intuitive frontends with efficient backend logic.<br />
                    ⚙️ Values code quality, performance optimization, and long-term maintainability.<br />
                    🚀 Continuously upskilling through end-to-end projects and best-practice problem solving.
                </>
            ),
            github: "http://www.github.com/ramarora00",
            linkedin: "http://www.linkedin.com/in/ramar00"
        },
        {
            name: "Harsh Kumar",
            initials: "HK",
            role: "CSE Student",
            bio: (
                <>
                    Hi, I’m Harsh — a CSE student focused on full-stack web development.<br />
                    I enjoy building clean, efficient, and user-focused applications through real-world projects.<br />
                    This project reflects my practical experience and growth with modern web technologies.
                </>
            ),
            github: "http://github.com/HarshKumarLPU",
            linkedin: "https://www.linkedin.com/in/harshkumar-cse/"
        }
    ];

    return (
        <div className="developers-container">
            <Link to="/" className="back-home-btn">
                <FaArrowLeft /> Back to Home
            </Link>

            <div className="developers-header">
                <h2>Meet the Developers</h2>
                <p>The minds behind Labour Compliance Manager</p>
            </div>

            <div className="developers-grid">
                {developers.map((dev, index) => (
                    <div key={index} className="developer-card">
                        <div className="developer-avatar">
                            {dev.initials}
                        </div>
                        <h3 className="developer-name">{dev.name}</h3>
                        <div className="developer-bio">
                            {dev.bio}
                        </div>
                        <div className="developer-links">
                            <a
                                href={dev.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-link github"
                                aria-label={`${dev.name}'s GitHub`}
                            >
                                <FaGithub size={24} />
                            </a>
                            <a
                                href={dev.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-link linkedin"
                                aria-label={`${dev.name}'s LinkedIn`}
                            >
                                <FaLinkedin size={24} />
                            </a>
                            {dev.leetcode && (
                                <a
                                    href={dev.leetcode}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-link leetcode"
                                    aria-label={`${dev.name}'s LeetCode`}
                                >
                                    <SiLeetcode size={24} />
                                </a>
                            )}
                            {dev.codeforces && (
                                <a
                                    href={dev.codeforces}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-link codeforces"
                                    aria-label={`${dev.name}'s CodeForces`}
                                >
                                    <SiCodeforces size={24} />
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Developers;
