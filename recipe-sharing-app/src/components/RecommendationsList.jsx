import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useRecipeStore from './recipeStore';

const RecommendationsList = () => {
    const recommendations = useRecipeStore(state => state.recommendations);
    const generateRecommendations = useRecipeStore(state => state.generateRecommendations);
    const favorites = useRecipeStore(state => state.favorites);
    const recipes = useRecipeStore(state => state.recipes);

    useEffect(() => {
        if (recipes.length > 0) {
            generateRecommendations();
        }
    }, [favorites, recipes, generateRecommendations]);

    if (recommendations.length === 0) {
        return (
            <div style={{ marginTop: '30px' }}>
                <h2>Recommended for You 🌟</h2>
                <p>Add some favorites to get personalized recommendations!</p>
            </div>
        );
    }

    return (
        <div style={{ marginTop: '30px' }}>
            <h2>Recommended for You 🌟</h2>
            <div>
                {recommendations.map(recipe => (
                    <div key={recipe.id} style={{
                        margin: '15px 0',
                        padding: '15px',
                        border: '2px solid #ffd93d',
                        borderRadius: '8px',
                        backgroundColor: '#fffacd'
                    }}>
                        <h3>
                            <Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
                        </h3>
                        <p>{recipe.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecommendationsList;