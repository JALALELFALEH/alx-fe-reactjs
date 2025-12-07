// src/components/RecipeCard.jsx
import React from 'react';
import { ClockIcon, UserIcon, FireIcon } from '@heroicons/react/24/outline';

const RecipeCard = ({ recipe }) => {
    return (
        <article className="card group hover:-translate-y-1 transition-all duration-300">
        {/* Image Container */}
        <div className="relative h-56 overflow-hidden">
            <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="font-bold text-secondary">{recipe.difficulty}</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <div className="flex items-center text-white">
                <FireIcon className="h-5 w-5 text-amber-300 mr-1" />
                <span className="font-semibold">{recipe.rating.toFixed(1)}</span>
                <span className="text-gray-300 ml-1">/ 5.0</span>
            </div>
            </div>
        </div>

        {/* Content */}
        <div className="p-6">
            <div className="flex flex-wrap gap-2 mb-3">
            {recipe.tags.map((tag) => (
                <span
                key={tag}
                className="inline-block px-3 py-1 text-xs font-semibold bg-primary bg-opacity-10 text-primary rounded-full"
                >
                {tag}
                </span>
            ))}
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">{recipe.title}</h3>
            <p className="text-gray-600 mb-4 line-clamp-2">{recipe.description}</p>

            {/* Meta Data */}
            <div className="flex items-center justify-between text-sm text-gray-500 border-t border-gray-100 pt-4">
            <div className="flex items-center space-x-4">
                <div className="flex items-center">
                <ClockIcon className="h-4 w-4 mr-1" />
                <span>{recipe.prepTime + recipe.cookTime} min</span>
                </div>
                <div className="flex items-center">
                <UserIcon className="h-4 w-4 mr-1" />
                <span>{recipe.servings} servings</span>
                </div>
            </div>
            <div className="text-right">
                <p className="font-medium text-gray-900">{recipe.author}</p>
            </div>
            </div>

            {/* Action Button */}
            <button className="btn-primary w-full mt-6">
            View Recipe
            </button>
        </div>
        </article>
    );
};

export default RecipeCard;