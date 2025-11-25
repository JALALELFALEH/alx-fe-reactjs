import { useState } from "react";
import { fetchUserData } from "../services/githubService";

const Search = () => {
  // State for search inputs
    const [username, setUsername] = useState("");
    const [location, setLocation] = useState("");
    const [minRepos, setMinRepos] = useState("");

    // State for API results and status
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setResults([]);

        try {
        // Fetch users based on advanced search criteria
        const data = await fetchUserData(username, location, minRepos);
        setResults(data);
        } catch {
        setError("Looks like we can't find the user(s)");
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto p-4">
        {/* Search Form */}
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 w-full max-w-md mx-auto"
        >
            <input
            type="text"
            placeholder="Enter a Github username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            className="border p-2 w-full rounded"
            />

            <input
            type="text"
            placeholder="Location (optional)"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
            className="border p-2 w-full rounded"
            />

            <input
            type="text"
            placeholder="Min Repositories (optional)"
            onChange={(e) => setMinRepos(e.target.value)}
            value={minRepos}
            className="border p-2 w-full rounded"
            />

            <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded w-full hover:bg-blue-700 transition-colors"
            >
            Search
            </button>
        </form>

        {/* Status messages */}
        <div className="mt-4">
            {loading && <p className="text-gray-400 text-center">Loading...</p>}
            {error && <p className="text-red-500 text-center">{error}</p>}
        </div>

        {/* Results Grid */}
        {results.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {results.map((user) => (
                <div
                key={user.id}
                className="p-4 border rounded shadow flex flex-col items-center"
                >
                <img
                    src={user.avatar_url}
                    alt={user.login}
                    width="80"
                    className="rounded-full mb-2"
                />
                <h3 className="font-bold">{user.login}</h3>
                <a
                    href={user.html_url}
                    className="text-blue-600 underline mt-1"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    View Profile
                </a>
                </div>
            ))}
            </div>
        )}
        </div>
    );
};

export default Search;
