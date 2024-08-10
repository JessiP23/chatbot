'use client'

import axios from 'axios'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const FashionRecommendation = () => {
  const [category, setCategory] = useState('');
  const [style, setStyle] = useState('');
  const [occasion, setOccasion] = useState('');
  const [recommendation, setRecommendation] = useState([]);


  const url = 'https://fashionapi.p.rapidapi.com/Subfamily';
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '653ca72938msh9ab144de9170b72p1f59bdjsneebb411895d3',
      'x-rapidapi-host': 'fashionapi.p.rapidapi.com'
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result);
      setRecommendation(result)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Fashion Lists</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Category:
          <input type='text' value={category} onChange={(event) => setCategory(event.target.value)}/>
        </label>
        <label>
          Style:
          <input type='text' value={style} onChange={(event) => setStyle(event.target.value)}/>
        </label>
        <label>
          Occasion:
          <input type='text' value={occasion} onChange={(event) => setOccasion(event.target.value)}/>
        </label>
        <button type='submit'>Get Recommendations</button>
      </form>
      <ul>
        {recommendation.map((item, index) => (
          <li key={item.subFamily || index}>
            <p>Family: {item.family} </p>
            <p>Subfamily: {item.subFamily} </p>
          </li>
        ))}
      </ul>
      <Link href="/api">Are you undecided of these recommendations?</Link>
    </div>
  )
}

export default FashionRecommendation