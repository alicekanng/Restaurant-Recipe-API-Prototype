import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Recipe from './components/Recipe';
import {v4 as uuidv4} from 'uuid';
import Restaurant from './components/Restaurant';

const App = () => {
  // Recipe Search Edamam API
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([])

  const APP_ID = "fb6aaae0";
  const APP_KEY = "2109ff29457095dd6b94dc233b61e5a5";

  const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=3&calories=591-722&health=alcohol-free`;
  
  // Zomato Restaurant API
  const [restaurant, setRest] = useState([]);
  const [id, setId] = useState();
  const [search, setSearch] = useState("");
  const [zomatoQuery, setZomQuery] = useState([0, ""])
  const zomatoURL = `https://developers.zomato.com/api/v2.1/search?entity_id=${zomatoQuery[0]}&entity_type=city&q=${zomatoQuery[1]}&count=100`
  const config = {
    headers: {
      'user-key': '2ad63f94902019632381f2df301a60cc'
    }
  };

  // get restaurant calls
  useEffect(() => {
    const getRestaurants = async () => {
      if (!(zomatoQuery[0] == 0 && zomatoQuery[1] === "")) {
        const response = await axios.get(zomatoURL, config)
          
        console.log(response.data.restaurants);
        setRest(response.data.restaurants);
        
      }
    }

    getRestaurants()
  }, [zomatoQuery])

  const updateID = e => {
    setId(e.target.value);
  }

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    setZomQuery([id, search])
  }

  // render restaurants
  let restaurantToRender
  if (restaurant) {
    restaurantToRender = restaurant.map(rest => {
      return (
      <Restaurant
        key = {rest.restaurant.id}
        name = {rest.restaurant.name}
        thumb = {rest.restaurant.thumb}
        locality = {rest.restaurant.location.locality}
        address = {rest.restaurant.location.address}
        cuisines = {rest.restaurant.cuisines}
        cost = {rest.restaurant.average_cost_for_two}
        rating = {rest.restaurant.user_rating.aggregate_rating}
        votes = {rest.restaurant.user_rating.votes}
        rating_color = {rest.restaurant.user_rating.rating_obj.bg_color.type}
      />	  
    )})
  }

  // get recipe calls
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
      <div>
        <form className="search-form" onSubmit={getSearch}>
          <div>
            <select id="select_id" className="city form-control" onChange={updateID}>
                <option value="0" hidden>Select City</option>
                <option value="4">Bengaluru</option>
                <option value="3" >Mumbai</option>
                <option value="1">Delhi</option>
                <option value="6">Hyderabad</option>
                <option value="5">Pune</option>
                <option value="11290">Trivandrum</option>
                <option value="7">Chennai</option>
                <option value="11">Ahmedabad</option>				  
              </select>
              <input type="text" placeholder="Search Restaurant" autoComplete="off" onChange={updateSearch}></input>
              <button id="getMessage" className="search-btn">Search</button>
          </div>
        </form>
      </div>
      <div>{restaurantToRender}</div>
      {/* <form className="search-form" onSubmit={onSubmit}>
        <input type="text" placeholder="Search Food" autoComplete="off" onChange={onChange} value={query}/>
        <input type="submit" value="search" />
      </form>
      <div className="recipes">
        {recipes !== [] && recipes.map(recipe => <Recipe key = {uuidv4()} recipe={recipe}/>)}
      </div> */}
    </div>
  );
}

export default App;
