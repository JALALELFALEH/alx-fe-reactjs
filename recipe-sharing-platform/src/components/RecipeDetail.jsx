// src/components/RecipeDetail.jsx
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import recipesData from '../data.json';

function RecipeDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('ingredients');

    useEffect(() => {
        const loadRecipe = () => {
        try {
            // Find recipe by ID
            const foundRecipe = recipesData.find(r => r.id === parseInt(id));
            
            if (!foundRecipe) {
            setError('Recipe not found');
            setRecipe(null);
            } else {
            setRecipe(foundRecipe);
            setError(null);
            }
            
            setLoading(false);
        } catch (err) {
            console.error('Error loading recipe:', err);
            setError('Failed to load recipe details');
            setLoading(false);
        }
        };

        loadRecipe();
    }, [id]);

    // Loading state
    if (loading) {
        return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
            <p className="mt-6 text-xl text-gray-600">Loading recipe details...</p>
            </div>
        </div>
        );
    }

    // Error state
    if (error || !recipe) {
        return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
            <div className="text-6xl mb-6">😕</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Recipe Not Found</h2>
            <p className="text-gray-600 mb-6">
                {error || "The recipe you're looking for doesn't exist or has been removed."}
            </p>
            <div className="space-y-3">
                <button
                onClick={() => navigate('/')}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition duration-200"
                >
                Back to Home
                </button>
                <Link
                to="/"
                className="inline-block w-full border border-blue-500 text-blue-500 hover:bg-blue-50 font-medium py-3 px-6 rounded-lg transition duration-200"
                >
                Browse All Recipes
                </Link>
            </div>
            </div>
        </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-4">
            <div className="max-w-6xl mx-auto">
            <Link 
                to="/" 
                className="inline-flex items-center text-white/90 hover:text-white mb-8 transition"
            >
                <span className="mr-2">←</span>
                Back to all recipes
            </Link>
            
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
                <div className="lg:w-2/3">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{recipe.title}</h1>
                <p className="text-xl mb-6">{recipe.description}</p>
                
                {/* Quick Stats */}
                <div className="flex flex-wrap gap-4 mb-6">
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3">
                    <div className="text-sm opacity-90">Prep Time</div>
                    <div className="text-xl font-bold">{recipe.prepTime}</div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3">
                    <div className="text-sm opacity-90">Cook Time</div>
                    <div className="text-xl font-bold">{recipe.cookTime}</div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3">
                    <div className="text-sm opacity-90">Servings</div>
                    <div className="text-xl font-bold">{recipe.servings}</div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3">
                    <div className="text-sm opacity-90">Difficulty</div>
                    <div className="text-xl font-bold">{recipe.difficulty}</div>
                    </div>
                </div>
                
                {/* Rating */}
                <div className="flex items-center">
                    <div className="flex">
                    {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-2xl ${i < Math.floor(recipe.rating) ? 'text-yellow-400' : 'text-white/40'}`}>
                        ★
                        </span>
                    ))}
                    </div>
                    <span className="ml-3 text-lg">{recipe.rating}/5.0</span>
                </div>
                </div>
                
                <div className="lg:w-1/3">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <img 
                    src={recipe.image} 
                    alt={recipe.title}
                    className="w-full h-64 object-cover rounded-lg shadow-lg"
                    />
                </div>
                </div>
            </div>
            </div>
        </div>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column - Tabs Content */}
            <div className="lg:w-2/3">
                {/* Tab Navigation */}
                <div className="border-b border-gray-200 mb-8">
                <nav className="flex space-x-8">
                    <button
                    onClick={() => setActiveTab('ingredients')}
                    className={`py-4 px-1 font-medium text-lg border-b-2 transition ${activeTab === 'ingredients' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                    >
                    Ingredients
                    </button>
                    <button
                    onClick={() => setActiveTab('instructions')}
                    className={`py-4 px-1 font-medium text-lg border-b-2 transition ${activeTab === 'instructions' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                    >
                    Instructions
                    </button>
                    <button
                    onClick={() => setActiveTab('tips')}
                    className={`py-4 px-1 font-medium text-lg border-b-2 transition ${activeTab === 'tips' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                    >
                    Tips & Notes
                    </button>
                </nav>
                </div>

                {/* Tab Content */}
                <div className="bg-white rounded-xl shadow-lg p-8">
                {/* Ingredients Tab */}
                {activeTab === 'ingredients' && (
                    <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Ingredients</h3>
                    <p className="text-gray-600 mb-6">For {recipe.servings} servings</p>
                    <ul className="space-y-4">
                        {recipe.ingredients.map((ingredient, index) => (
                        <li key={index} className="flex items-start">
                            <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3 mt-1">
                            ✓
                            </span>
                            <span className="text-gray-700 text-lg">{ingredient}</span>
                        </li>
                        ))}
                    </ul>
                    </div>
                )}

                {/* Instructions Tab */}
                {activeTab === 'instructions' && (
                    <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Cooking Instructions</h3>
                    <div className="space-y-8">
                        {recipe.instructions.map((step, index) => (
                        <div key={index} className="flex">
                            <div className="flex-shrink-0">
                            <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
                                {index + 1}
                            </div>
                            </div>
                            <div className="flex-grow">
                            <h4 className="font-bold text-lg text-gray-800 mb-2">Step {index + 1}</h4>
                            <p className="text-gray-700 text-lg leading-relaxed">{step}</p>
                            </div>
                        </div>
                        ))}
                    </div>
                    </div>
                )}

                {/* Tips Tab */}
                {activeTab === 'tips' && (
                    <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Chef's Tips & Notes</h3>
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-8">
                        <h4 className="font-bold text-lg text-blue-800 mb-4">Pro Tips for Success</h4>
                        <ul className="space-y-3">
                        {recipe.tips.map((tip, index) => (
                            <li key={index} className="flex items-start">
                            <span className="text-blue-500 mr-3">💡</span>
                            <span className="text-gray-700">{tip}</span>
                            </li>
                        ))}
                        </ul>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-green-50 border border-green-100 rounded-xl p-6">
                        <h4 className="font-bold text-lg text-green-800 mb-4">Nutrition Info</h4>
                        <ul className="space-y-2">
                            <li className="flex justify-between">
                            <span className="text-gray-700">Calories:</span>
                            <span className="font-bold">{recipe.calories} kcal</span>
                            </li>
                            <li className="flex justify-between">
                            <span className="text-gray-700">Prep Time:</span>
                            <span className="font-bold">{recipe.prepTime}</span>
                            </li>
                            <li className="flex justify-between">
                            <span className="text-gray-700">Total Time:</span>
                            <span className="font-bold">{recipe.totalTime}</span>
                            </li>
                        </ul>
                        </div>
                        
                        <div className="bg-purple-50 border border-purple-100 rounded-xl p-6">
                        <h4 className="font-bold text-lg text-purple-800 mb-4">Recipe Notes</h4>
                        <ul className="space-y-2">
                            <li className="flex justify-between">
                            <span className="text-gray-700">Difficulty:</span>
                            <span className="font-bold">{recipe.difficulty}</span>
                            </li>
                            <li className="flex justify-between">
                            <span className="text-gray-700">Best Served:</span>
                            <span className="font-bold">Hot/Fresh</span>
                            </li>
                            <li className="flex justify-between">
                            <span className="text-gray-700">Storage:</span>
                            <span className="font-bold">3 days refrigerated</span>
                            </li>
                        </ul>
                        </div>
                    </div>
                    </div>
                )}
                </div>
            </div>

            {/* Right Column - Summary Card */}
            <div className="lg:w-1/3">
                <div className="sticky top-8">
                {/* Summary Card */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Summary</h3>
                    <div className="space-y-4">
                    <div>
                        <div className="text-sm text-gray-500">Category</div>
                        <div className="font-medium">Main Course</div>
                    </div>
                    <div>
                        <div className="text-sm text-gray-500">Cuisine</div>
                        <div className="font-medium">Italian</div>
                    </div>
                    <div>
                        <div className="text-sm text-gray-500">Dietary</div>
                        <div className="font-medium">
                        {recipe.id === 3 ? 'Vegetarian' : 'Non-Vegetarian'}
                        </div>
                    </div>
                    <div>
                        <div className="text-sm text-gray-500">Equipment Needed</div>
                        <div className="font-medium">Large pot, Pan, Oven</div>
                    </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Actions</h3>
                    <div className="space-y-3">
                    <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center">
                        <span className="mr-2">📋</span>
                        Print Recipe
                    </button>
                    <button className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center">
                        <span className="mr-2">⭐</span>
                        Save to Favorites
                    </button>
                    <button className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center">
                        <span className="mr-2">🔔</span>
                        Set Cooking Timer
                    </button>
                    </div>
                </div>

                {/* Related Recipes */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">You Might Also Like</h3>
                    <div className="space-y-4">
                    {recipesData
                        .filter(r => r.id !== recipe.id)
                        .slice(0, 3)
                        .map(related => (
                        <Link 
                            key={related.id}
                            to={`/recipe/${related.id}`}
                            className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition group"
                        >
                            <img 
                            src={related.image} 
                            alt={related.title}
                            className="w-16 h-16 object-cover rounded-lg mr-4"
                            />
                            <div>
                            <h4 className="font-medium text-gray-800 group-hover:text-blue-600 transition">
                                {related.title}
                            </h4>
                            <div className="flex items-center mt-1">
                                <span className="text-yellow-500 text-sm">★</span>
                                <span className="text-sm text-gray-600 ml-1">{related.rating}</span>
                            </div>
                            </div>
                        </Link>
                        ))}
                    </div>
                </div>
                </div>
            </div>
            </div>

            {/* Share Section */}
            <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
                <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Enjoyed this recipe?</h3>
                <p className="text-gray-600">Share it with friends and family!</p>
                </div>
                <div className="flex space-x-4 mt-4 md:mt-0">
                <button className="w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition">
                    📘
                </button>
                <button className="w-12 h-12 bg-blue-400 hover:bg-blue-500 text-white rounded-full flex items-center justify-center transition">
                    🐦
                </button>
                <button className="w-12 h-12 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition">
                    📷
                </button>
                <button className="w-12 h-12 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center transition">
                    📱
                </button>
                </div>
            </div>
            </div>
        </main>
        </div>
    );
}

export default RecipeDetail;