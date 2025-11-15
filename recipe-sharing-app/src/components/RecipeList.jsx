import { Link } from 'react-router-dom';
import useRecipeStore from "./recipeStore";
import AddRecipeForm from "./AddRecipeForm";

const RecipeList = () => {
    const recipes = useRecipeStore(state => state.recipes);

    return (
        <div>
            <h2>All recipes</h2>
            {recipes.map( recipe => (
                <div key={recipe.id}>
                    <h3>
                        <Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
                    </h3>
                    <p>{recipe.description}</p>
                </div>
            ))}
        </div>
    );
};

export default RecipeList;