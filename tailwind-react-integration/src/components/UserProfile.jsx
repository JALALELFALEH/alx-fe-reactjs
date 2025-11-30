function UserProfile() {
    return (
        <div className="bg-gray-100 sm:p-4 sm:p-6 md:p-8 max-w-sm sm:max-w-sm md:max-w-md mx-auto my-20 rounded-lg shadow-lg">
            <img src="https://via.placeholder.com/150" alt="User" className="rounded-full w-36 h-36 sm:w-24 sm:h-24 md:w-24 md:h-24 mx-auto"/>
            <h1 className="text-xl text-blue-800 my-4 sm:text-lg md:text-lg sm:text-sm md:text-base">John Doe</h1>
            <p className="text-gray-600 text-base sm:text-lg md:text-lg sm:text-sm md:text-base">Developer at Example Co. Loves to write code and explore new technologies.</p>
        </div>
    );
}

export default UserProfile;