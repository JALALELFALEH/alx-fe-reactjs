import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import useRecipeStore from "./recipeStore";

const RecipeList = () => {
    const recipes = useRecipeStore(state => state.recipes);
    const filteredRecipes = useRecipeStore(state => state.filteredRecipes);
    const searchTerm = useRecipeStore(state => state.searchTerm);
    const filterRecipes = useRecipeStore(state => state.filterRecipes);
    const favorites = useRecipeStore(state => state.favorites);
    const addFavorite = useRecipeStore(state => state.addFavorite);
    const removeFavorite = useRecipeStore(state => state.removeFavorite);
    
    useEffect(() => {
        filterRecipes();
    }, [recipes, filterRecipes]);

    const displayedRecipes = searchTerm ? filteredRecipes : recipes;
    
    const isFavorite = (recipeId) => favorites.includes(recipeId);
    
    const toggleFavorite = (recipeId) => {
        if (isFavorite(recipeId)) {
            removeFavorite(recipeId);
        } else {
            addFavorite(recipeId);
        }
    };
    
    return (
        <div>
            <h2>All Recipes</h2>
            {displayedRecipes.length === 0 ? (
                <p>
                    {searchTerm 
                        ? 'No recipes found matching your search.' 
                        : 'No recipes yet. Add one above!'}
                </p>
            ) : (
                displayedRecipes.map(recipe => (
                    <div key={recipe.id} style={{ 
                        margin: '15px 0', 
                        padding: '15px', 
                        border: '1px solid #646cff',
                        borderRadius: '8px'
                    }}>
                        <h3>
                            <Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
                        </h3>
                        <p>{recipe.description}</p>
                        <button 
                            onClick={() => toggleFavorite(recipe.id)}
                            style={{
                                backgroundColor: isFavorite(recipe.id) ? '#ff6b6b' : '#646cff',
                                color: 'white',
                                marginTop: '10px'
                            }}
                        >
                            {isFavorite(recipe.id) ? '❤️ Favorited' : '🤍 Add to Favorites'}
                        </button>
                    </div>
                ))
            )}
        </div>
    );
};

export default RecipeList;