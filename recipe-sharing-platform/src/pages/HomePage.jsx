// src/pages/HomePage.jsx
import React, { useState } from 'react';
import RecipeCard from '../components/RecipeCard';
import { recipeData, featuredRecipe } from '../data/recipeData';
import {
    MagnifyingGlassIcon,
    FunnelIcon,
    StarIcon,
    ChevronRightIcon,
    } from '@heroicons/react/24/outline';

    const HomePage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTag, setSelectedTag] = useState('All');

    // Extract all unique tags
    const allTags = ['All', ...new Set(recipeData.flatMap(recipe => recipe.tags))];

    // Filter logic
    const filteredRecipes = recipeData.filter(recipe => {
        const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            recipe.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            recipe.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesTag = selectedTag === 'All' || recipe.tags.includes(selectedTag);
        return matchesSearch && matchesTag;
    });

    return (
        <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-primary-dark to-primary text-white py-20 px-4">
            <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Find & Share <span className="text-secondary">Amazing</span> Recipes</h1>
            <p className="text-xl mb-10 max-w-3xl mx-auto opacity-95">
                Discover culinary inspirations from around the world. Share your own creations with a community of food lovers.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
                <div className="relative">
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search for recipes, ingredients, or tags..."
                    className="input-field w-full pl-12 pr-44 py-4 text-lg rounded-2xl border-0 shadow-xl"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="btn-secondary absolute right-2 top-2 px-8">
                    Search
                </button>
                </div>
            </div>
            </div>
        </section>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 py-12">
            <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar / Filters */}
            <aside className="lg:w-1/4">
                <div className="card sticky top-24">
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <FunnelIcon className="h-6 w-6 mr-2 text-primary" />
                    Filters
                    </h2>

                    {/* Tag Filter */}
                    <div className="mb-8">
                    <h3 className="font-semibold text-gray-700 mb-4">Categories</h3>
                    <div className="flex flex-wrap gap-2">
                        {allTags.map(tag => (
                        <button
                            key={tag}
                            onClick={() => setSelectedTag(tag)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition ${selectedTag === tag ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                        >
                            {tag}
                        </button>
                        ))}
                    </div>
                    </div>

                    {/* Featured Recipe Preview */}
                    <div className="border-t border-gray-200 pt-6">
                    <h3 className="font-semibold text-gray-700 mb-4">Featured Recipe</h3>
                    <div className="bg-gradient-to-br from-primary/5 to-secondary/5 p-4 rounded-xl">
                        <img src={featuredRecipe.image} alt="Featured" className="w-full h-32 object-cover rounded-lg mb-3" />
                        <h4 className="font-bold text-gray-900">{featuredRecipe.title}</h4>
                        <div className="flex items-center mt-2">
                        <StarIcon className="h-4 w-4 text-amber-500 fill-current mr-1" />
                        <span className="text-sm font-semibold">{featuredRecipe.rating}</span>
                        <ChevronRightIcon className="h-4 w-4 ml-auto text-primary" />
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </aside>

            {/* Recipe Grid */}
            <div className="lg:w-3/4">
                {/* Results Header */}
                <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">All Recipes</h2>
                    <p className="text-gray-600">{filteredRecipes.length} recipes found</p>
                </div>
                <select className="input-field w-48">
                    <option>Sort by: Popularity</option>
                    <option>Sort by: Newest</option>
                    <option>Sort by: Prep Time</option>
                </select>
                </div>

                {/* The Grid */}
                {filteredRecipes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {filteredRecipes.map(recipe => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                </div>
                ) : (
                <div className="text-center py-16 bg-white rounded-2xl shadow-inner">
                    <MagnifyingGlassIcon className="h-20 w-20 text-gray-300 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-gray-700 mb-2">No recipes match your search</h3>
                    <p className="text-gray-500 mb-6">Try adjusting your filters or search term.</p>
                    <button
                    onClick={() => { setSearchTerm(''); setSelectedTag('All'); }}
                    className="btn-primary"
                    >
                    Clear All Filters
                    </button>
                </div>
                )}

                {/* Pagination (Mock) */}
                {filteredRecipes.length > 0 && (
                <div className="flex justify-center items-center space-x-2 mt-16">
                    <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">Previous</button>
                    {[1, 2, 3, '...', 10].map((num, idx) => (
                    <button
                        key={idx}
                        className={`w-10 h-10 flex items-center justify-center rounded-full ${num === 1 ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
                    >
                        {num}
                    </button>
                    ))}
                    <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">Next</button>
                </div>
                )}
            </div>
            </div>
        </main>
        </div>
    );
};

export default HomePage;