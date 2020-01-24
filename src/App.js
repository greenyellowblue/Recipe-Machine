import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Recipe from './Recipe';

const App = () => {
  const API_ID = "cf685f3c";
  const API_KEY = "ddbfabeff33ca1a8d17c770bcaada2f8";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState('ramen')


  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
        const response  = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${API_ID}&app_key=${API_KEY}`);
        const data = await response.json();
        setRecipes(data.hits);
        console.log(data.hits);
    };

    const updateSearch = e => {
        setSearch(e.target.value);
        
    };

    const getSearch = e => {
        e.preventDefault(); // Only search on submit button
        setQuery(search);
        setSearch('');
    };

  return( // Main Page
    <div className = "App">
      <form onSubmit = {getSearch} className="search-form">
        <input className = "search-bar" type = "text" value = {search} onChange = {updateSearch}/>
        <button className = "search-button" type = "submit">
          Search
        </button>
      </form>
      <div className = "recipes">
      {recipes.map(recipe =>(
          // Pass down information flow
          <Recipe 
            key = {recipe.recipe.label}
            title ={recipe.recipe.label} 
            calories = {"Total Calories: ".concat(Math.floor(recipe.recipe.calories))} // Stay healthy!
            image = {recipe.recipe.image}
            ingredients = {recipe.recipe.ingredients}
          />
      ))}
      </div>
    </div>
  );
}

export default App;
