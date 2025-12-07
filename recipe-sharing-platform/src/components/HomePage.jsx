// src/components/HomePage.jsx
import { useState, useEffect } from 'react';

function HomePage() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Load recipe data from data.json file
    useEffect(() => {
        const fetchRecipes = async () => {
        try {
            // Using import to load the JSON file
            const response = await import('../data.json');
            setRecipes(response.default || response);
            setLoading(false);
        } catch (err) {
            console.error('Error loading recipes:', err);
            setError('Failed to load recipes. Please try again later.');
            setLoading(false);
        }
        };

        fetchRecipes();
    }, []);

    // Loading state
    if (loading) {
        return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-gray-600">Loading delicious recipes...</p>
            </div>
        </div>
        );
    }

    // Error state
    if (error) {
        return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md">
            <div className="text-red-500 text-4xl mb-4">⚠️</div>
            <h2 className="text-xl font-bold text-red-800 mb-2">Error Loading Recipes</h2>
            <p className="text-red-600 mb-4">{error}</p>
            <button 
                onClick={() => window.location.reload()}
                className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded transition duration-200"
            >
                Try Again
            </button>
            </div>
        </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
        {/* Header Section */}
        <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 px-4">
            <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Recipe Sharing Platform</h1>
            <p className="text-xl mb-2">Discover, share, and cook amazing recipes from around the world</p>
            <p className="text-blue-100">Browse our collection of {recipes.length} delicious recipes</p>
            </div>
        </header>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-4 py-8">
            {/* Page Header */}
            <div className="mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Featured Recipes</h2>
            <p className="text-gray-600">Click on any recipe to view detailed instructions and ingredients</p>
            </div>

            {/* Recipe Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
            </div>

            {/* Empty State */}
            {recipes.length === 0 && (
            <div className="text-center py-16">
                <div className="text-gray-400 text-6xl mb-4">🍳</div>
                <h3 className="text-2xl font-bold text-gray-700 mb-2">No Recipes Found</h3>
                <p className="text-gray-500">Check back later for new recipes!</p>
            </div>
            )}

            {/* Footer Stats */}
            <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-wrap justify-center gap-8 text-center">
                <div>
                <div className="text-3xl font-bold text-blue-600">{recipes.length}</div>
                <div className="text-gray-600">Total Recipes</div>
                </div>
                <div>
                <div className="text-3xl font-bold text-green-600">12</div>
                <div className="text-gray-600">Categories</div>
                </div>
                <div>
                <div className="text-3xl font-bold text-purple-600">24/7</div>
                <div className="text-gray-600">Available</div>
                </div>
            </div>
            </div>
        </main>
        </div>
    );
    }

    // Recipe Card Component (nested for organization)
    function RecipeCard({ recipe }) {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
        {/* Recipe Image */}
        <div className="relative h-48 overflow-hidden">
            <img 
            src={recipe.image} 
            alt={recipe.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
            {/* Badge */}
            <div className="absolute top-3 right-3 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            Recipe #{recipe.id}
            </div>
        </div>
        
        {/* Recipe Content */}
        <div className="p-5">
            {/* Title */}
            <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-1 hover:text-blue-600 transition-colors">
            {recipe.title}
            </h3>
            
            {/* Summary */}
            <p className="text-gray-600 mb-4 line-clamp-2 h-12">
            {recipe.summary}
            </p>
            
            {/* Action Button */}
            <div className="flex justify-between items-center">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50">
                View Recipe
            </button>
            
            {/* Quick Stats */}
            <div className="text-sm text-gray-500">
                <span className="flex items-center">
                <span className="text-yellow-500 mr-1">★</span>
                <span>4.5</span>
                </span>
            </div>
            </div>
        </div>
        
        {/* Hover Effect Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </div>
    );
}

export default HomePage;