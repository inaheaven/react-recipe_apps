import React, {useEffect, useState} from 'react';

import Recipe from './Recipe';
import './App.css';

const App = () => {
  const api = {
    id: '4b24670a',
    key: 'ddcc7feb09f0f9a78744f40214d09912',
    base: 'https://api.edamam.com/'
  }

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState(search)
  useEffect(()=> {
    getRecipes()
  }, [query]);

  const updateSearch = (e) => {
    setSearch(e.target.value);
  }

  const getRecipes = async() => {
    const response = await fetch(`${api.base}search?q=${query}&app_id=${api.id}&app_key=${api.key}`)
    const data = await response.json()
    setRecipes(data.hits);
    setSearch('');
    console.log(data)
    // fetch(base).then(response=>response.json())
  }

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search)
  }

  return(
    <div className="App">
      <form className="search-form" onSubmit={getSearch}>
        <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
        <button className="search-button" type="submit">search</button>
      </form>
      <div className="recipes">
        {recipes.map(recipe => (
          <Recipe key={recipe.recipe.label} title={recipe.recipe.label} calories={recipe.recipe.calories} image={recipe.recipe.image} ingredients={recipe.recipe.ingredients}/>
        ))}
      </div>
    </div>
  )
}

export default App;
