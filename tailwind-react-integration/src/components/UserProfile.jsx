function UserProfile() {
    return (
        <div className="bg-gray-100 sm:p-4 sm:p-6 md:p-8 max-w-xs sm:max-w-sm md:max-w-sm mx-auto my-20 rounded-lg shadow-lg hover:shadow-xl">
            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face" alt="User" className="rounded-full w-36 h-36 sm:w-24 sm:h-24 md:w-36 md:h-36 mx-auto hover:scale-110 transition-transform duration-300 ease-in-out hover:shadow-xl transition-transform duration-300 ease-in-out"/>
            <h1 className="text-xl text-blue-800 my-4 sm:text-lg md:text-xl sm:text-sm md:text-base text hover:text-blue-500">John Doe</h1>
            <p className="text-gray-600 text-base sm:text-lg md:text-xl sm:text-sm md:text-base">Developer at Example Co. Loves to write code and explore new technologies.</p>
        </div>
    );
}

export default UserProfile;