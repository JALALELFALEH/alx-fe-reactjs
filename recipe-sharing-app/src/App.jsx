import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';
import SearchBar from './components/SearchBar';
import FavoritesList from './components/FavoritesList';
import RecommendationsList from './components/RecommendationsList';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <h1>Recipe Sharing Application</h1>
        <Routes>
          <Route path='/' element={
            <>
              <AddRecipeForm />
              <SearchBar />
              <RecipeList />
              <FavoritesList />
              <RecommendationsList />
            </>
          } />
          <Route path='/recipe/:id' element={<RecipeDetails />}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;