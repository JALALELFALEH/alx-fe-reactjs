import './About.css';

const About = () => {
    return (
        <div className="about">
        <h1>About This Project</h1>
        
        <div className="content">
            <section className="section">
            <h2>Project Purpose</h2>
            <p>
                This project demonstrates advanced routing techniques in React using React Router v6.
                It implements nested routes, protected routes, and dynamic routing patterns commonly
                used in real-world applications.
            </p>
            </section>

            <section className="section">
            <h2>Technologies Used</h2>
            <ul className="tech-list">
                <li><strong>React 18+</strong> - Frontend library</li>
                <li><strong>React Router DOM v6</strong> - Routing library</li>
                <li><strong>React Icons</strong> - Icon library</li>
                <li><strong>Vite</strong> - Build tool and development server</li>
            </ul>
            </section>

            <section className="section">
            <h2>Key Routing Concepts</h2>
            <div className="concepts">
                <div className="concept">
                <h3>Nested Routes</h3>
                <p>Routes within routes for organized UI structure</p>
                </div>
                <div className="concept">
                <h3>Protected Routes</h3>
                <p>Routes that require authentication before access</p>
                </div>
                <div className="concept">
                <h3>Dynamic Routes</h3>
                <p>Routes with parameters for dynamic content</p>
                </div>
                <div className="concept">
                <h3>Programmatic Navigation</h3>
                <p>Navigation triggered by code, not just links</p>
                </div>
            </div>
            </section>
        </div>
        </div>
    );
};

export default About;