import useRecipeStore from './recipeStore';
import AddRecipeForm from './AddRecipeForm';
import DeleteRecipeButton from './deleteRecipeButton';

const RecipeDetails = ({ recipeId }) => {
    const recipe = useRecipeStore(state => 
        state.recipes.find(recipe => recipe.id === recipeId)
    );

    return (
        <div>
            <h1>{recipe.title}</h1>
            <p>{recipe.description}</p>
            <AddRecipeForm recipe={recipe} />
            <DeleteRecipeButton recipeId={recipeId} />
        </div>
    )
}

export default RecipeDetails;