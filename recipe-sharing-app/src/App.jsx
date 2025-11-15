import { BrowserRouter, Routes, Router, Route } from 'react-router-dom';
import AddRecipeForm from './components/AddRecipeForm'
import RecipeList from './components/RecipeList'
import RecipeDetails from './components/RecipeDetails';
import './App.css'

function App() {

  return (
    <div>
      <BrowserRouter>
        <div className='App'>
          <h1>Recipe Sharing Application</h1>
          <Routes>
            <Route path='/' element={
              <>
              <AddRecipeForm />
              <RecipeList />
              </>
            } />
            <Route path='/recipe/:id' element={<RecipeDetails />}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
