// src/data/recipeData.js
export const recipeData = [
    {
        id: 1,
        title: "Creamy Garlic Parmesan Pasta",
        description: "A rich and creamy pasta dish with a bold garlic parmesan sauce, ready in 20 minutes.",
        prepTime: 10,
        cookTime: 15,
        servings: 4,
        difficulty: "Easy",
        image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        rating: 4.7,
        tags: ["Pasta", "Italian", "Vegetarian"],
        author: "Maria Chen",
    },
    {
        id: 2,
        title: "Spicy Thai Basil Chicken (Pad Krapow)",
        description: "A fiery and aromatic Thai street food classic, best served over jasmine rice.",
        prepTime: 15,
        cookTime: 10,
        servings: 2,
        difficulty: "Medium",
        image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        rating: 4.9,
        tags: ["Thai", "Spicy", "Chicken", "Quick"],
        author: "Anong Sharma",
    },
    {
        id: 3,
        title: "Decadent Chocolate Avocado Mousse",
        description: "A surprisingly healthy yet indulgent dessert made with ripe avocados and dark cocoa.",
        prepTime: 15,
        cookTime: 0,
        servings: 6,
        difficulty: "Easy",
        image: "https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        rating: 4.5,
        tags: ["Dessert", "Vegan", "Healthy", "No-Bake"],
        author: "Leo Costa",
    },
    // Add 6-7 more detailed recipes here...
];

export const featuredRecipe = recipeData[0];