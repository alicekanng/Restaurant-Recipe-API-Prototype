import React, {useState} from 'react';
import axios from 'axios';
import Recipe from './components/Recipe';
import {v4 as uuidv4} from 'uuid';

const App = () => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([])

  const APP_ID = "fb6aaae0";
  const APP_KEY = "2109ff29457095dd6b94dc233b61e5a5";

  const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=3&calories=591-722&health=alcohol-free`;
  
  const getData = async () => {
    const result = await axios.get(url);
    setRecipes(result.data.hits);
    console.log(result);
    setQuery("");
  }

  const onSubmit = (e) => {
    e.preventDefault();
    getData();
  }

  const onChange = (e) => {
    setQuery(e.target.value);
  }

  return (
    <div className="App">
      <h1>Food Searching App</h1>
      <form className="search-form" onSubmit={onSubmit}>
        <input type="text" placeholder="Search Food" autoComplete="off" onChange={onChange} value={query}/>
        <input type="submit" value="search" />
      </form>
      <div className="recipes">
        {recipes !== [] && recipes.map(recipe => <Recipe key = {uuidv4()} recipe={recipe}/>)}
      </div>
    </div>
  );
}

export default App;
