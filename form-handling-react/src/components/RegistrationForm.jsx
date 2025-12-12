import { useState } from "react"
import { resumeAndPrerender } from "react-dom/static";

const RegistrationForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);


    const HandleSubmit = (e) => {
        e.preventDefault();
        alert(`Username: ${username}\nEmail: ${email}\nPassword: ${password}`);
    }

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={HandleSubmit}>
                <div>
                    <h3>Username : </h3>
                    <input 
                    type="text"
                    name="username"
                    placeholder="Enter a name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <h3>Email : </h3>
                    <input 
                    type="email" 
                    placeholder="Enter an email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <h3>Password : </h3>
                    <input 
                    type="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />                    
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    );

}

export default RegistrationForm;