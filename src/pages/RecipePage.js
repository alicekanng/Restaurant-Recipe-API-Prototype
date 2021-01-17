import React, { useEffect, useState } from "react";
import axios from "axios";
import Recipe from "../components/Recipe";
import { v4 as uuidv4 } from "uuid";
import Restaurant from "../components/Restaurant";

const RecipePage = () => {
  const [recipes1, setRecipes1] = useState([]);
  const [recipes2, setRecipes2] = useState([]);
  const [recipes3, setRecipes3] = useState([]);

  // Recipe Search Edamam API
  const APP_ID_1 = "5774a64d";
  const APP_KEY_1 = "ab7d0b5def33dfec061b2eb366072014";

  const APP_ID_2 = "f52fe420";
  const APP_KEY_2 = "a291778e2e3bdd6cddd1030500e5f563";

  const APP_ID_3 = "38c6f696";
  const APP_KEY_3 = "b1458abdffa7bede3e5b702ed7b100dc";

  let query1 = localStorage.getItem(0);
  let query2 = localStorage.getItem(1);
  let query3 = localStorage.getItem(2);

  const onClick = async () => {
    getData();
  };

  let one = `https://api.edamam.com/search?q=${query1}&app_id=${APP_ID_1}&app_key=${APP_KEY_1}&from=0&to=3&calories=591-722&health=alcohol-free`;
  let two = `https://api.edamam.com/search?q=${query2}&app_id=${APP_ID_2}&app_key=${APP_KEY_2}&from=0&to=3&calories=591-722&health=alcohol-free`;
  let three = `https://api.edamam.com/search?q=${query3}&app_id=${APP_ID_3}&app_key=${APP_KEY_3}&from=0&to=3&calories=591-722&health=alcohol-free`;

  // get recipe calls
  const getData = async () => {
    const result1 = await axios.get(one);
    const result2 = await axios.get(two);
    const result3 = await axios.get(three);

    console.log(result1);
    console.log(result2);
    console.log(result3);

    setRecipes1(result1.data.hits);
    setRecipes2(result2.data.hits);
    setRecipes3(result3.data.hits);

    // axios
    //   .all([result1, result2, result3])
    //   .then(
    //     axios.spread((...responses) => {
    //       const result1 = responses[0];
    //       const result2 = responses[1];
    //       const result3 = responses[2];

    //     })
    //   )
    //   .catch((errors) => {
    //     console.log(errors);
    //   });
    query1 = "";
    query2 = "";
    query3 = "";
  };

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   getData();
  // };

  return (
    <div className="RecipePage">
      {/* <form className="search-form" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Search Food"
          autoComplete="off"
          onChange={onChange}
          value={query}
        />
        <input type="submit" value="search" />
      </form> */}
      <button onClick={onClick}>GET RECIPE</button>
      <div className="recipes">
        {recipes1 !== [] &&
          recipes1.map((recipe) => <Recipe key={uuidv4()} recipe={recipe} />)}
        {recipes2 !== [] &&
          recipes2.map((recipe) => <Recipe key={uuidv4()} recipe={recipe} />)}
        {recipes3 !== [] &&
          recipes3.map((recipe) => <Recipe key={uuidv4()} recipe={recipe} />)}
      </div>
    </div>
  );
};

export default RecipePage;
