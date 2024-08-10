'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Box, Flex, Heading, HoverCard, Text } from '@radix-ui/themes'

const FashionRecommendation = () => {
  const [recommendation, setRecommendation] = useState([]);
  const [filteredRecommendations, setFilteredRecommendations] = useState([]);
  const [selectedFamily, setSelectedFamily] = useState('');
  const [selectedSubFamily, setSelectedSubFamily] = useState('');
  const [families, setFamilies] = useState([]);
  const [subFamilies, setSubFamilies] = useState([]);

  const url = 'https://fashionapi.p.rapidapi.com/Subfamily';
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '653ca72938msh9ab144de9170b72p1f59bdjsneebb411895d3',
      'x-rapidapi-host': 'fashionapi.p.rapidapi.com'
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setRecommendation(result);
        setFilteredRecommendations(result);

        const familySet = new Set(result.map(item => item.family));
        const subFamilySet = new Set(result.map(item => item.subFamily));

        setFamilies(Array.from(familySet));
        setSubFamilies(Array.from(subFamilySet));
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleFamilyChange = (event) => {
    const family = event.target.value;
    setSelectedFamily(family);
    filterRecommendations(family, selectedSubFamily);
  };

  const handleSubFamilyChange = (event) => {
    const subFamily = event.target.value;
    setSelectedSubFamily(subFamily);
    filterRecommendations(selectedFamily, subFamily);
  };

  const filterRecommendations = (family, subFamily) => {
    const filtered = recommendation.filter(item => 
      (family === '' || item.family === family) &&
      (subFamily === '' || item.subFamily === subFamily)
    );
    setFilteredRecommendations(filtered);
  }

  return (
    <div>
      <Text>
      Welcome to{' '}
        <HoverCard.Root>
          <HoverCard.Trigger>
            <Link href="#">
              Fashion.ai
            </Link>
          </HoverCard.Trigger>
          <HoverCard.Content maxWidth="300px">
            <Flex gap="4">
              <Box >
                <Heading size="3" as="h3">
                  Fashion.ai
                </Heading>
                <Text as="div" size="2" color="gray" mb="2">
                  Fashion.ai
                </Text>
                <Text as="div" size="2">
                  AI application providing recommendation of clothing based on families and subfamilies
                </Text>
              </Box>
            </Flex>
          </HoverCard.Content>
        </HoverCard.Root>{' '}
      </Text>
      <form>
        <label>
          Family:
          <select value={selectedFamily} onChange={handleFamilyChange}>
            <option value="">All Families</option>
            {families.map(family => (
              <option key={family} value={family}>{family}</option>
            ))}
          </select>
        </label>
        <label>
          SubFamily:
          <select value={selectedSubFamily} onChange={handleSubFamilyChange}>
            <option value="">All SubFamilies</option>
            {subFamilies.map(subFamily => (
              <option key={subFamily} value={subFamily}>{subFamily}</option>
            ))}
          </select>
        </label>
      </form>
      <ul>
        {filteredRecommendations.map((item, index) => (
          <li key={index}>
            <p>Family: {item.family}</p>
            <p>SubFamily: {item.subFamily}</p>
          </li>
        ))}
      </ul>
      <Link href="/api">Are you undecided of these recommendations?</Link>
    </div>
  )
}

export default FashionRecommendation;
