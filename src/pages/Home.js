import React, { useEffect, useState } from "react";
import axios from "axios";
import Restaurant from "../components/Restaurant";
import { render } from "@testing-library/react";
import { Link } from "react-router-dom";

const Home = () => {
  // Zomato Restaurant API
  const [restaurant, setRest] = useState([]);
  const [id, setId] = useState();
  const [search, setSearch] = useState("");
  const [zomatoQuery, setZomQuery] = useState([0, ""]);
  const zomatoURL = `https://developers.zomato.com/api/v2.1/search?entity_id=${zomatoQuery[0]}&entity_type=city&q=${zomatoQuery[1]}&count=100`;
  const config = {
    headers: {
      "user-key": "2ad63f94902019632381f2df301a60cc",
    },
  };

  // get restaurant calls
  useEffect(() => {
    const getRestaurants = async () => {
      if (!(zomatoQuery[0] == 0 && zomatoQuery[1] === "")) {
        const response = await axios.get(zomatoURL, config);

        console.log(response.data.restaurants);
        setRest(response.data.restaurants);
      }
    };

    getRestaurants();
  }, [zomatoQuery]);

  const updateID = (e) => {
    setId(e.target.value);
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setZomQuery([id, search]);
  };

  // render restaurants
  let restaurantToRender;
  if (restaurant) {
    restaurantToRender = restaurant.map((rest) => {
      {
        console.log("Reached");
      }
      return (
        <Restaurant
          resId={rest.restaurant.id}
          name={rest.restaurant.name}
          thumb={rest.restaurant.thumb}
          locality={rest.restaurant.location.locality}
          address={rest.restaurant.location.address}
          cuisines={rest.restaurant.cuisines}
          cost={rest.restaurant.average_cost_for_two}
          rating={rest.restaurant.user_rating.aggregate_rating}
          votes={rest.restaurant.user_rating.votes}
          rating_color={rest.restaurant.user_rating.rating_obj.bg_color.type}
        />
      );
    });
  }

  return (
    <div className="Home">
      <h1>Food Searching App</h1>
      <div>
        <form className="search-form" onSubmit={getSearch}>
          <div>
            <select
              id="select_id"
              className="city form-control"
              onChange={updateID}
            >
              <option value="0" hidden>
                Select City
              </option>
              <option value="4">Bengaluru</option>
              <option value="3">Mumbai</option>
              <option value="1">Delhi</option>
              <option value="6">Hyderabad</option>
              <option value="5">Pune</option>
              <option value="11290">Trivandrum</option>
              <option value="7">Chennai</option>
              <option value="11">Ahmedabad</option>
            </select>
            <input
              type="text"
              placeholder="Search Restaurant"
              autoComplete="off"
              onChange={updateSearch}
            ></input>
            <button id="getMessage" className="search-btn">
              Search
            </button>
          </div>
        </form>
      </div>
      <div>{restaurantToRender}</div>
    </div>
  );
};

export default Home;
