import { useState } from "react"

const RegistrationForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const HandleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};
        if (!username) {
            newErrors.username = 'Enter a Username' ;            
        };
        if (!email) {
            newErrors.email = 'Enter a valid email';
        };
        if (!password) {
            newErrors.password = 'enter a password';
        };

        if (Object.keys(newErrors).length > 0 ) {
            setErrors(newErrors);
            return;
        }

        alert('Submitted!');
        setUsername('');
        setEmail('');
        setPassword('');
        setErrors({});
    }

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={HandleSubmit}>
                <div>
                    <label>Username : </label>
                    <input 
                    type="text"
                    name="username"
                    placeholder="Enter a name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    />
                    {errors.username && <p style={{color: 'red'}}>{errors.username}</p>}
                </div>
                <div>
                    <label>Email : </label>
                    <input 
                    type="email" 
                    placeholder="Enter an email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <p style={{color: 'red'}}>{errors.email}</p>}
                </div>
                <div>
                    <label>Password : </label>
                    <input 
                    type="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />   
                    {errors.password && <p style={{color: 'red'}}>{errors.password}</p>}                 
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    );

}

export default RegistrationForm;