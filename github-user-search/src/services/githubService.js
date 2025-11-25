import axios from 'axios';

export const fetchUserData  = async (username, location, minRepos) => {
    let query = "";

    if (username) query += `${username} in:login `;
    if (location) query += `location:${location} `;
    if (minRepos) query += `repos:>${minRepos}`;

    const response = await axios.get(
        `https://api.github.com/search/users?q=${query}`
    );

  return response.data.items; // GitHub returns an array in "items"
};
