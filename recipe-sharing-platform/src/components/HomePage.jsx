// In src/components/HomePage.jsx
import RecipeCard from './RecipeCard';  // Add this import if using separate component

// Then in the grid section, use:
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
    ))}
</div>