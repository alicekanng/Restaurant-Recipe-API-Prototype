import {useEffect, useState} from 'react'
import axios from 'axios'

// export function useAxiosGet(url){
//     const [request, setRequest] = useState({
//         loading: false,
//         data: null,
//         error: false
//     })

//     useEffect(() => {
//         setRequest({
//             loading: true,
//             data: null,
//             error: false
//         })
//         axios.get(url)
//             .then(response => {
//                 setRequest({
//                     loading: false,
//                     data: response.data,
//                     error: false
//                 })
//             })
//             .catch(() => {
//                 setRequest({
//                     loading: false,
//                     data: null,
//                     error: true
//                 })
//             })
//     }, [url])

//     return request
// }

function DataFetching() {
    const [recipes, setRecipes] = useState([])

    const options = {
        method: 'GET',
        url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random',
        params: {number: '1', tags: 'vegetarian,dessert'},
        headers: {
        'x-rapidapi-key': 'a492223447msh180ccd3e404d1c4p16f620jsn3dd611ff5e60',
        'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
        }
    };

    axios.request(options).then(function (response) {
	    console.log(response.data);
    }).catch(function (error) {
	    console.error(error);
    });

    useEffect(() => {
        axios.get("sth")
            .then(res => {
                console.log(res)
                setRecipes(res.data)
            })
            .catch (err => {
                console.log(err)
            })
    }, [])

    return (
        <div>
            <ul>
                {
                    recipes.map(recipe => <li key={recipe.id}>{recipe.title}</li>)
                }
            </ul>
        </div>
    )
}

export default DataFetching