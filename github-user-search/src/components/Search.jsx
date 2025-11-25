import { useState } from "react";
import { fetchUserData } from "../services/githubService";

const Search = () => {
    const [username, setUsername] = useState('');
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    const handleChange = (e) => {
        setUsername(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setUserData(null);
        try {
            const data = await fetchUserData(username);
            setUserData(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {/*Search form*/}
            <form onSubmit={handleSubmit}>
                <input 
                type="text" 
                placeholder="Enter a Github username"
                onChange={handleChange}
                value={username}
                />
                <button type="submit">Search</button>
            </form>
            {/*Search result*/}
            {loading && <p>Loading...</p>}
            {error && <p>Looks like we cant find the user</p>}
            {userData && (
                <div>
                    <img src={userData.avatar_url} alt={userData.login} width="100"/>
                    <p>{userData.name}</p>
                    <a href={userData.html_url} target="_blank" rel="noopener noreferrer">GitHub Profile</a>
                </div>
            )}
        </div>
    );
};

export default Search;
