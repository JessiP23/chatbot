'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Box, Flex, Grid, Heading, HoverCard, Separator, Text } from '@radix-ui/themes'
import backgroundImage from '../images/vest.png'
import backgroundImage2 from '../images/jacket.png'
import backgroundImage3 from '../images/accesory.png'
import backgroundImage4 from '../images/shoe.png'
import backgroundImage5 from '../images/diagonal.png'
import Image from 'next/image'

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
      <div 
  style={{ 
    display: 'grid', 
    gridTemplateColumns: '1fr 1fr', 
    height: '100vh', 
    overflow: 'hidden' 
  }} 
  className='bg-amber-500'
>
  <div 
    style={{ 
      gridColumn: '1 / 2', 
      padding: '20px', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center' 
    }}
  >
    <Box style={{ textAlign: 'center', marginBottom: '100px' }}>
      <Text>
        <Text 
          style={{ 
            fontSize: '28px', 
            lineHeight: '1.4', 
            letterSpacing: '0.5px' 
          }} 
          weight='medium'
        >
          Welcome to
        </Text>
        <HoverCard.Root>
          <HoverCard.Trigger>
            <Link 
              href="#" 
              style={{ 
                fontSize: '28px', 
                display: 'block', 
                marginTop: '10px',
                transition: 'all 0.3s ease',
                color: 'indigo',
                textDecoration: 'none'
              }} 
              className='underline decoration-indigo-500 hover:decoration-indigo-700 hover:text-indigo-700'
            >
              Fashion.ai
            </Link>
          </HoverCard.Trigger>
          <HoverCard.Content 
            maxWidth="300px" 
            style={{ 
              transition: 'all 0.3s ease',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' 
            }}
          >
            <Flex gap="4">
              <Box>
                <Heading 
                  size="3" 
                  as="h2" 
                  style={{ 
                    fontSize: '24px', 
                    marginBottom: '10px' 
                  }}
                >
                  Fashion.ai
                </Heading>
                <Text 
                  as="div" 
                  size="2" 
                  color="gray" 
                  mb="2"
                  style={{ 
                    fontSize: '16px', 
                    color: '#6b7280' 
                  }}
                >
                  Fashion.ai
                </Text>
                <Text 
                  as="div" 
                  size="2" 
                  style={{ 
                    fontSize: '16px', 
                    color: '#4b5563' 
                  }}
                >
                  AI application providing recommendations of clothing based on families and subfamilies.
                </Text>
              </Box>
            </Flex>
          </HoverCard.Content>
        </HoverCard.Root>
      </Text>
    </Box>
    <Flex 
      gap='20px' 
      style={{ 
        marginBottom: '25px', 
        flexWrap: 'wrap', 
        justifyContent: 'center' 
      }}
    >
      <Image 
        src={backgroundImage2} 
        style={{ 
          height: '300px', 
          width: '300px', 
          borderRadius: '10%', 
          border: 'none', 
          boxShadow: '0px 8px 16px rgba(0,0,0,0.3)', 
          objectFit: 'cover',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease'
        }} 
        className='hover:transform hover:scale-105 hover:box-shadow-lg' 
      />
      <Image 
        src={backgroundImage3} 
        style={{ 
          height: '300px', 
          width: '300px', 
          borderRadius: '10%', 
          border: 'none', 
          boxShadow: '0px 8px 16px rgba(0,0,0,0.3)', 
          objectFit: 'cover',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease'
        }} 
        className='hover:transform hover:scale-105 hover:box-shadow-lg'
      />
    </Flex>
  </div>

  {/* Right Side Diagonal Image */}
  <div 
    style={{ 
      gridColumn: '2 / 3', 
      position: 'relative' 
    }}
  >
    <Image 
      src={backgroundImage5} 
      style={{ 
        height: '100%', 
        width: '100%', 
        objectFit: 'cover', 
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 50%)',
        transition: 'clip-path 0.5s ease'
      }} 
      className='hover:clip-path[polygon(0 0, 100% 0, 100% 100%, 0% 50%)]'
    />
  </div>
</div>
      <Box style={{ textAlign: 'center', padding: '40px 0' }}>
        <Text size='2' style={{ fontSize:'18px' }}>
          Bring and experience new families and subfamilies of clothing of your desire
          <Separator my='3' size='4' />
          <Flex gap='3' align='center' justify='center' style={{ fontSize: '15px' }}>
            Chaqueta
            <Separator orientation='vertical' />
            Blasier
            <Separator orientation='vertical' />
            Abrigo
            <Separator orientation='vertical' />
            Cazadora
            <Separator orientation='vertical' />
            Chaleco
            <Separator orientation='vertical' />
            Vestido
            <Separator orientation='vertical' />
            And more...
          </Flex>
        </Text>
      </Box>
      <div style={{ textAlign: 'center', fontSize: '18px' }}>
        <form>
          <label>
            Family:
            <select value={selectedFamily} onChange={handleFamilyChange}>
              <option value="">All Families</option>
              {families.map(family => (
                <option key={family} value={family} style={{fontSize: "18px"}}>{family}</option>
              ))}
            </select>
          </label>
          <label>
            SubFamily:
            <select value={selectedSubFamily} onChange={handleSubFamilyChange}>
              <option value="">All SubFamilies</option>
              {subFamilies.map(subFamily => (
                <option key={subFamily} value={subFamily} style={{ fontSize: '18px' }}>{subFamily}</option>
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
    </div>
  )
}

export default FashionRecommendation;
