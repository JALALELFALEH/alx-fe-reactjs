import { create } from 'zustand';

const useRecipeStore = create(set => ({
    recipes: [],
    addRecipe: (newRecipe) => set(state => ({recipe: [ ...state.recipe, newRecipe] })),
    setRecipes: (recipes) => set({ recipes })
}));

export default useRecipeStore;