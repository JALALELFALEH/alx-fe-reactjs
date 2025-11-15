import { create } from 'zustand';

const useRecipeStore = create(set => ({
    recipes: [],
    addRecipe: (newRecipe) => set(state => ({recipe: [ ...state.recipe, newRecipe] })),
    setRecipe: (recipes) => set({ recipes })
}));

export default useRecipeStore;