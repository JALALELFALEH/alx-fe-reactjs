import { useState } from "react";
import useRecipeStore from "./recipeStore";

const EditRecipeForm = ({ recipe }) => {
    const updateRecipe = useRecipeStore(state => state.updateRecipe);
    const [title, setTitle] = useState(recipe.title);
    const [description, setDescription] = useState(recipe.description);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        updateRecipe({
            id: recipe.id,
            title,
            description
        });
        alert('Recipe updated successfully!');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Edit Recipe</h3>
            <div>
                <input 
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={'Recipe Title'}
                required
                />
            </div>
            <div>
                <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Recipe Description"
                required
                />
            </div>
            <button type="submit">Update Recipe</button>
        </form>
    )
};

export default EditRecipeForm;