import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import './Developers.css';

function Developers() {
    const developers = [
        {
            name: "Raj Ranjan",
            github: "https://www.github.com/raj-ranjan-70",
            linkedin: "https://www.linkedin.com/in/rajranjan70",
            initials: "RR"
        },
        {
            name: "Ram Arora",
            github: "http://www.github.com/ramarora00",
            linkedin: "http://www.linkedin.com/in/ramar00",
            initials: "RA"
        },
        {
            name: "Harsh Kumar",
            github: "http://github.com/HarshKumarLPU",
            linkedin: "https://www.linkedin.com/in/harshkumar-cse/",
            initials: "HK"
        }
    ];

    const bio = (
        <>
            👋 Hi, I’m a Computer Science and Engineering student passionate about full-stack web development.<br />
            💻 I enjoy building practical applications with clean design and efficient functionality.<br />
            🚀 This project reflects my hands-on learning with modern web technologies and backend integration.<br />
            🧠 I continuously improve my skills through projects and problem-solving.<br />
            🎯 I aim to grow as a software engineer by creating impactful, real-world solutions.
        </>
    );

    return (
        <div className="developers-container">
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
                            {bio}
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
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Developers;
