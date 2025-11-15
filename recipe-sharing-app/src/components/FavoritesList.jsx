import { Link } from 'react-router-dom';
import useRecipeStore from './recipeStore';

const FavoritesList = () => {
    const recipes = useRecipeStore(state => state.recipes);
    const favorites = useRecipeStore(state => state.favorites);
    const removeFavorite = useRecipeStore(state => state.removeFavorite);


    const favoriteRecipes = favorites.map(id =>
        recipes.find(recipe => recipe.id === id)
    ).filter(recipe => recipe !== undefined); 

    return (
        <div style={{ marginTop: '30px' }}>
            <h2>My Favorites ❤️</h2>
            {favoriteRecipes.length === 0 ? (
                <p>No favorite recipes yet. Start adding some!</p>
            ) : (
                <div>
                    {favoriteRecipes.map(recipe => (
                        <div key={recipe.id} style={{
                            margin: '15px 0',
                            padding: '15px',
                            border: '2px solid #ff6b6b',
                            borderRadius: '8px',
                            backgroundColor: '#ffe0e0'
                        }}>
                            <h3>
                                <Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
                            </h3>
                            <p>{recipe.description}</p>
                            <button 
                                onClick={() => removeFavorite(recipe.id)}
                                style={{
                                    backgroundColor: '#ff6b6b',
                                    color: 'white',
                                    marginTop: '10px'
                                }}
                            >
                                Remove from Favorites
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FavoritesList;