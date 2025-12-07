// src/components/RecipeCard.jsx
import { Link } from 'react-router-dom';

function RecipeCard({ recipe }) {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
        {/* Image Container with Link */}
        <Link to={`/recipe/${recipe.id}`} className="block">
            <div className="relative h-48 overflow-hidden bg-gray-100">
            <img 
                src={recipe.image} 
                alt={recipe.title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                onError={(e) => {
                e.target.src = `https://via.placeholder.com/300x200/cccccc/666666?text=${encodeURIComponent(recipe.title)}`;
                }}
            />
            <div className="absolute top-3 right-3 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                #{recipe.id}
            </div>
            </div>
        </Link>
        
        {/* Content */}
        <div className="p-5">
            {/* Title with Link */}
            <Link to={`/recipe/${recipe.id}`} className="block">
            <h3 className="text-xl font-bold text-gray-800 mb-3 hover:text-blue-600 transition-colors">
                {recipe.title}
            </h3>
            </Link>
            
            <p className="text-gray-600 mb-4 h-12 overflow-hidden">
            {recipe.summary}
            </p>
            
            <div className="flex justify-between items-center">
            <Link 
                to={`/recipe/${recipe.id}`}
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 active:scale-95"
            >
                View Details →
            </Link>
            
            <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                <span key={i} className={`text-sm ${i < 4 ? 'text-yellow-500' : 'text-gray-300'}`}>
                    ★
                </span>
                ))}
            </div>
            </div>
        </div>
        </div>
    );
}

export default RecipeCard;