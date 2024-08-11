'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Box, Flex, Grid, Heading, HoverCard, Separator, Table, Text } from '@radix-ui/themes'
import backgroundImage from '../images/vest.png'
import backgroundImage2 from '../images/jacket.png'
import backgroundImage3 from '../images/accesory.png'
import backgroundImage4 from '../images/shoe.png'
import backgroundImage5 from '../images/diagonal.png'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const FashionRecommendation = () => {
  const [recommendation, setRecommendation] = useState([]);
  const [filteredRecommendations, setFilteredRecommendations] = useState([]);
  const [selectedFamily, setSelectedFamily] = useState('');
  const [selectedSubFamily, setSelectedSubFamily] = useState('');
  const [families, setFamilies] = useState([]);
  const [subFamilies, setSubFamilies] = useState([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

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

  const handleAssistantClick = () => {
    setLoading(true);
    router.push('/api');
  }

  return (
    <div>
      <div 
        style={{ 
          position: 'relative', 
          height: '100vh', 
          width: '100%', 
          overflow: 'hidden', 
          backgroundImage: `url(${backgroundImage5})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center', 
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div 
          style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            backgroundColor: 'rgba(210, 129, 30, 0.8)'
          }} 
        >
          <div 
            style={{ 
              gridColumn: '1 / 2', 
              padding: '20px', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center', 
              color: 'white' 
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
                        color: 'white', 
                        textDecoration: 'none'
                      }} 
                      className='underline decoration-indigo-500 hover:decoration-indigo-300 hover:text-indigo-300'
                    >
                      Fashion.ai
                    </Link>
                  </HoverCard.Trigger>
                  <HoverCard.Content 
                    maxWidth="300px" 
                    style={{ 
                      transition: 'all 0.3s ease',
                      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', 
                      backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                      color: '#333'
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
                className='hover:transform hover:scale-105 hover:box-shadow-lg Image' 
                alt='image'
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
                className='hover:transform hover:scale-105 hover:box-shadow-lg Image'
                alt='image'
              />
            </Flex>
          </div>

          {/* Right Side Content */}
          <div 
            style={{ 
              gridColumn: '2 / 3', 
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white' 
            }}
          >
            <Text 
              style={{ 
                fontSize: '22px', 
                textAlign: 'center', 
                padding: '20px', 
                backgroundColor: 'rgba(0, 0, 0, 0.6)', 
                borderRadius: '10px'
              }}
            >
              Discover the future of fashion with AI-powered recommendations tailored just for you.
            </Text>
            <Text>
              <button onClick={handleAssistantClick} style={{ fontSize: '18px', padding: "10px 20px", backgroundColor: 'rgba(210, 129, 30, 0.8)', borderRadius: '5px', border: 'none', cursor: 'pointer', color: 'white' }}>
                {loading ? 'Loading...' : 'Chatbot Assistant'} 
              </button>
            </Text>
          </div>
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
        <form style={{ marginBottom: '50px' }}>
          <label style={{ fontSize: '25px', display: 'block', marginBottom: '20px' }}>
            Family:
            <select value={selectedFamily} onChange={handleFamilyChange} style={{ fontSize: '20px', marginLeft: '20px', padding: '5px' }}>
              <option value="" style={{ fontSize: '20px' }}>All Families</option>
              {families.map(family => (
                <option key={family} value={family} style={{fontSize: "18px"}}>{family}</option>
              ))}
            </select>
          </label>
          <label style={{ fontSize: '25px' }}>
            SubFamily:
            <select value={selectedSubFamily} onChange={handleSubFamilyChange} style={{ fontSize: '20px', marginLeft: '20px', padding: '5px' }}>
              <option value="">All SubFamilies</option>
              {subFamilies.map(subFamily => (
                <option key={subFamily} value={subFamily} style={{ fontSize: '18px' }}>{subFamily}</option>
              ))}
            </select>
          </label>
        </form>
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Family</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>SubFamily</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          {filteredRecommendations.map((item, index) => (
          <Table.Body key={index}>
            
              <Table.RowHeaderCell>{item.family}</Table.RowHeaderCell>
              <Table.Cell>{item.subFamily}</Table.Cell>
            
          </Table.Body>
          ))}

        </Table.Root>
      </div>
    </div>
  )
}

export default FashionRecommendation;
