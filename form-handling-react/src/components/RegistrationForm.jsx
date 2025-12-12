import React from "react";

const RegistrationForm = () => {

    const HandleSubmit(e) {
        e.prevent.default;

    }

    return (
        <form onSubmit={}>
            <input 
            type="text"
            placeholder="Enter a name"
            />
            <input 
            type="email" 
            placeholder="Enter an email"
            />
            <input 
            type="password"
            placeholder="Create a password"
            />
            <input 
            type="password"
            placeholder="Confirm the password"
            />
            <button onClick={HandleSubmit}>Submit</button>
        </form>
    );

}

export default RegistrationForm;