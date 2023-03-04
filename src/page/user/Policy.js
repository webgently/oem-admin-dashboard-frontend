import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import axios from 'axios'

export default function Policy() {
   const getPrivacy = async () => {
      try {
         await axios
            .post(`${process.env.REACT_APP_API_URL}getPrivacy`)
            .then((result) => {
               document.getElementById('description').innerHTML = result.data.privacy
            })
      } catch (error) {
         if (process.env.REACT_APP_MODE) console.log(error)
      }
   }

   useEffect(() => {
      getPrivacy()
   }, [])

   return (
      <Box
         sx={{
            flexGrow: 1,
            p: 3,
            bgcolor: 'rgb(229, 229, 229)',
            overflowY: 'overlay',
         }}
      >
         <Box sx={{ mt: '80px' }}>
            <h2 style={{ color: '#1976d2', margin: '0px' }}>Privacy Policy</h2>
         </Box>
         <Box
            sx={{
               mt: '10px',
               borderTop: '5px solid #1976d2',
               bgcolor: 'white',
               borderBottomRightRadius: '5px',
               borderBottomLeftRadius: '5px',
               p: '10px',
               height: '60vh',
            }}
            id='description'
         >
         </Box>
      </Box>
   )
}
