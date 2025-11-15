import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import useRecipeStore from "./recipeStore";

const RecipeList = () => {
    const recipes = useRecipeStore(state => state.recipes);
    const filtredRecipes = useRecipeStore(state => state.filteredRecipes);
    const searchTerm = useRecipeStore(state => state.searchTerm);
    const filterRecipes = useRecipeStore(state => state.filterRecipes)
    
    useEffect(() => {
        filterRecipes();
    }, [recipes, filterRecipes]);

    const displayedRecipes = searchTerm ? filtredRecipes : recipes;
    
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
                    </div>
                ))
            )}
        </div>
    );
};

export default RecipeList;