'use client'
import { Box, Button, InputAdornment, Stack, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function Home() {

  const router = useRouter();
  // content chatbot
  const [messages, setMessages] = useState([
    {'role': 'system', 'content': `My name is Jessi. The Stylist assistant. How can I help you today?`}
  ])

  const handleGoBack = () => {
    router.push('/');
  }

  const sendMessage = async () => {
    setMessage('')
    setMessages((messages) =>[...messages, {'role': 'user', 'content': message}, {'role': 'assistant', 'content': ''}])
    const response = fetch('/api/chat', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([...messages, {'role': 'user', 'content': message}]),
  }).then(async (res) => {
    const reader = res.body.getReader()
    const decoder = new TextDecoder()
    let result = ''
    return reader.read().then(function processText({done, value}) {
      if (done) {
        return result
      }
      const text = decoder.decode(value || new Uint8Array(), {stream: true})

      setMessages((messages) => {
        let lastMessage = messages[messages.length - 1]
        let otherMessage = messages.slice(0, messages.length - 1)

        // other messages
        return [...otherMessage, {...lastMessage, content: lastMessage.content + text}]
      })

      return reader.read().then(processText)
    })
  })
  }

  const [message, setMessage] = useState('');

  return (
    <Box
    width="100vw"
    height="100vh"
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    bgcolor="#f5f5f5"  // Light gray background
  >
    <Box position='absolute' top={16} left={16}>
      <Button
        onClick={handleGoBack}
        sx={{
          bgcolor: '#FF7043',
          color: 'white',
          borderRadius: '8px',
          px: 3,
          py: 1,
          boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
          '&:hover': {
            bgcolor: '#FF5722'
          }
        }}
      >
        Go Back
      </Button>
    </Box>
    <Stack 
      direction="column" 
      width="500px" 
      border="1px solid #FFA500" 
      p={2} 
      spacing={3} 
      borderRadius="16px"
      bgcolor="white"
      boxShadow="0px 4px 20px rgba(0, 0, 0, 0.1)"
    >
      <Stack 
        direction="column" 
        spacing={2} 
        flexGrow={1} 
        overflow="auto" 
        height="500px"
        pr={1} 
        sx={{
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#FFA500',
            borderRadius: '8px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#f0f0f0',
          }
        }}
      >
        {
          messages.map((message, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent={message.role === 'assistant' ? 'flex-start' : 'flex-end'}
            >
              <Box
                bgcolor={message.role === 'assistant' ? '#FFA500' : '#FF7043'}  // Orange and dark orange for user messages
                color="white"
                borderRadius="16px"
                p={2}
                maxWidth="80%"
                sx={{
                  wordWrap: 'break-word',
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                }}
              >
                {message.content}
              </Box>
            </Box>
          ))
        }
      </Stack>
      {/* Send button stack */}
      <Stack direction="row" spacing={2}>
        <TextField 
          label="Message" 
          fullWidth 
          value={message} 
          onChange={(e) => setMessage(e.target.value)}
          variant="outlined"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '16px',
              '& fieldset': {
                borderColor: '#FFA500',
              },
              '&:hover fieldset': {
                borderColor: '#FF7043',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#FFA500',
              },
            }
          }}
        />
        <Button 
          onClick={sendMessage} 
          sx={{
            bgcolor: '#FFA500',
            color: 'white',
            borderRadius: '16px',
            px: 3,
            '&:hover': {
              bgcolor: '#FF7043',
            }
          }}
        >
          Send
        </Button>
      </Stack>
    </Stack>
  </Box>
  );
}
