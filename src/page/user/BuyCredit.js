import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import { Button, Divider } from '@mui/material'

import FormControlJoy from '@mui/joy/FormControl'
import RadioJoy from '@mui/joy/Radio'
import RadioGroupJoy from '@mui/joy/RadioGroup'
import EuroIcon from '@mui/icons-material/Euro'
import LocalAtmIcon from '@mui/icons-material/LocalAtm'
import stripe from '../../assets/img/stripe.png'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import Checkbox from '@mui/material/Checkbox'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'

const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

const rows = [
   { category: 100, credits: 100, price: 120, value: 120 },
   { category: 200, credits: 200, price: 220, value: 220 },
   { category: 300, credits: 300, price: 300, value: 300 },
   { category: 50, credits: 50, price: 65, value: 65 },
   { category: 100, credits: 100, price: 50, value: 50 },
   { category: 33234, credits: 33234, price: 23423423, value: 23423423 },
   { category: 453, credits: 453, price: 2147483647, value: 2147483647 },
   { category: 324234, credits: 324234, price: 23423423, value: 23423423 },
]

export default function BuyCredit() {
   const [allData, setAllData] = useState([])
   const [handleFee, setHandleFee] = useState(123.23)
   const [Radiovalue, setRadioValue] = useState(0)
   const [total, setTotal] = useState(0)
   const [stripeMethod, setStripeMethod] = useState(false)
   const [term, setTerm] = useState(false)

   const handleChangeRadio = (event) => {
      setRadioValue(event.target.value)
   }

   const getAllPriceList = async () => {
      await axios
         .post(`${process.env.REACT_APP_API_Url}getAllPrice`)
         .then((result) => {
            if (result) {
               setAllData(result.data)
            } else {
               toast.error('Interanal server error')
            }
         })
   }

   const buyCredit = () => {
      if (Radiovalue === 0) {
         toast.error('Choose the credit from category')
         return
      }
      if (!stripeMethod) {
         toast.error('Select the payment method')
         return
      }
      if (!term) {
         toast.error('Agree to the terms of service')
         return
      }
   }

   useEffect(() => {
      if (Radiovalue === 0) {
         setTotal(0)
      } else {
         const sum = Number(Radiovalue) + Number(handleFee)
         setTotal(sum.toFixed(2))
      }
   }, [Radiovalue])

   useEffect(() => {
      getAllPriceList()
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
            <h3 style={{ color: 'red', margin: '0px' }}>Buy Credits</h3>
            <span>Individual tuning file service credit</span>
         </Box>
         <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
         >
            <Grid item xs={12} sm={8} md={8}>
               <Box
                  sx={{
                     mt: '10px',
                     borderTop: '5px solid #ffc800',
                     bgcolor: 'white',
                     borderBottomRightRadius: '5px',
                     borderBottomLeftRadius: '5px',
                     p: '30px',
                  }}
               >
                  <Grid
                     container
                     spacing={{ xs: 2, md: 3 }}
                     columns={{ xs: 4, sm: 8, md: 12 }}
                  >
                     <Grid item xs={8} sm={8} md={8}>
                        <Box
                           sx={{
                              display: 'flex',
                              justifyContent: 'flex-start',
                              flexDirection: 'column',
                           }}
                        >
                           Choose Credit from Category
                        </Box>
                     </Grid>
                     <Grid item xs={2} sm={2} md={2}>
                        Credits
                     </Grid>
                     <Grid item xs={2} sm={2} md={2}>
                        Price
                     </Grid>
                  </Grid>
                  <Divider />
                  <br />
                  <Divider />

                  <FormControlJoy>
                     <RadioGroupJoy
                        defaultValue="female"
                        name="controlled-radio-buttons-group"
                        value={Radiovalue}
                        onChange={handleChangeRadio}
                        sx={{ my: 1 }}
                     >
                        {rows.map((item, ind) => {
                           return (
                              <RadioJoy
                                 sx={{ color: 'black', m: '15px 0px' }}
                                 value={item.value}
                                 key={ind}
                                 label={
                                    <Grid
                                       container
                                       spacing={{ xs: 2, md: 3 }}
                                       columns={{ xs: 4, sm: 8, md: 12 }}
                                       sx={{
                                          display: 'flex',
                                          alignItems: 'center',
                                       }}
                                    >
                                       <Grid
                                          item
                                          xs={8}
                                          sm={8}
                                          md={8}
                                          sx={{
                                             display: 'flex',
                                             alignItems: 'center',
                                          }}
                                       >
                                          <Box
                                             sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                             }}
                                          >
                                             <LocalAtmIcon />
                                             {item.category}
                                          </Box>
                                       </Grid>
                                       <Grid item xs={2} sm={2} md={2}>
                                          {item.credits}
                                       </Grid>
                                       <Grid
                                          item
                                          xs={2}
                                          sm={2}
                                          md={2}
                                          sx={{
                                             display: 'flex',
                                             alignItems: 'center',
                                          }}
                                       >
                                          <EuroIcon sx={{ fontSize: '20px' }} />{' '}
                                          {item.price}
                                       </Grid>
                                    </Grid>
                                 }
                              />
                           )
                        })}
                        <Grid
                           container
                           sx={{
                              display: 'flex',
                              alignItems: 'center',
                              m: '15px 0px 15px 30px',
                           }}
                        >
                           <Grid
                              item
                              xs={8}
                              sm={8}
                              md={8}
                              sx={{
                                 display: 'flex',
                                 alignItems: 'center',
                              }}
                           >
                              <Box
                                 sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                 }}
                              >
                                 Handling Fee
                              </Box>
                           </Grid>
                           <Grid item xs={2} sm={2} md={2}></Grid>
                           <Grid
                              item
                              xs={2}
                              sm={2}
                              md={2}
                              sx={{
                                 display: 'flex',
                                 alignItems: 'center',
                              }}
                           >
                              <EuroIcon sx={{ fontSize: '20px' }} /> {handleFee}
                           </Grid>
                        </Grid>
                        <Divider />
                        <Grid
                           container
                           sx={{
                              display: 'flex',
                              alignItems: 'center',
                              m: '15px 0px 15px 30px',
                           }}
                        >
                           <Grid
                              item
                              xs={8}
                              sm={8}
                              md={8}
                              sx={{
                                 display: 'flex',
                                 alignItems: 'center',
                              }}
                           >
                              <Box
                                 sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                 }}
                              >
                                 Subtotal
                              </Box>
                           </Grid>
                           <Grid item xs={2} sm={2} md={2}></Grid>
                           <Grid
                              item
                              xs={2}
                              sm={2}
                              md={2}
                              sx={{
                                 display: 'flex',
                                 alignItems: 'center',
                              }}
                           >
                              <EuroIcon sx={{ fontSize: '20px' }} />{' '}
                              {Radiovalue}
                           </Grid>
                        </Grid>
                        <Divider />
                        <Grid
                           container
                           sx={{
                              display: 'flex',
                              alignItems: 'center',
                              m: '15px 0px 15px 30px',
                           }}
                        >
                           <Grid
                              item
                              xs={8}
                              sm={8}
                              md={8}
                              sx={{
                                 display: 'flex',
                                 alignItems: 'center',
                              }}
                           >
                              <Box
                                 sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                 }}
                              >
                                 Total
                              </Box>
                           </Grid>
                           <Grid item xs={2} sm={2} md={2}></Grid>
                           <Grid
                              item
                              xs={2}
                              sm={2}
                              md={2}
                              sx={{
                                 display: 'flex',
                                 alignItems: 'center',
                              }}
                           >
                              <EuroIcon sx={{ fontSize: '20px' }} /> {total}
                           </Grid>
                        </Grid>
                        <Divider />
                     </RadioGroupJoy>
                  </FormControlJoy>
               </Box>
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
               <Box
                  sx={{
                     mt: '10px',
                     borderTop: '5px solid #05bdf9',
                     bgcolor: 'white',
                     borderBottomRightRadius: '5px',
                     borderBottomLeftRadius: '5px',
                     p: '10px',
                  }}
               >
                  <Grid
                     container
                     spacing={{ xs: 2, md: 3 }}
                     columns={{ xs: 4, sm: 8, md: 12 }}
                  >
                     <Grid item xs={12} sm={12} md={12}>
                        <Box
                           sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              p: '20px 0px 0px 20px',
                           }}
                        >
                           <span style={{ fontSize: '25px' }}>
                              Select Payment Method
                           </span>
                        </Box>

                        <FormControlJoy sx={{ pl: '20px' }}>
                           <RadioGroupJoy
                              name="controlled-radio-buttons-group"
                              value={stripeMethod}
                              onChange={(e) => setStripeMethod(e.target.value)}
                              sx={{
                                 display: 'flex',
                                 justifyContent: 'center',
                              }}
                           >
                              <RadioJoy
                                 sx={{
                                    color: 'black',
                                    m: '15px 0px',
                                    display: 'flex',
                                    alignItems: 'center',
                                 }}
                                 value="stripe"
                                 label={
                                    <Box
                                       sx={{
                                          display: 'flex',
                                          alignItems: 'center',
                                          m: '0',
                                       }}
                                    >
                                       <img
                                          src={stripe}
                                          style={{
                                             width: '100px',
                                          }}
                                       />
                                       Stripe
                                    </Box>
                                 }
                              />
                           </RadioGroupJoy>
                        </FormControlJoy>
                        <Box sx={{ pl: '10px' }}>
                           <Checkbox
                              value={term}
                              onChange={(e) => setTerm(e.target.value)}
                              {...label}
                           />
                           <a style={{ color: '#ffb100' }} href="#">
                              I have read the Privacy Policy and agree to the
                              Terms of Service.
                           </a>
                        </Box>
                        <Box sx={{ mt: '20px' }}>
                           <Button
                              variant="contained"
                              className="btn_red"
                              endIcon={<ArrowForwardIcon />}
                              fullWidth
                              onClick={buyCredit}
                           >
                              Continue to Payment
                           </Button>
                        </Box>
                     </Grid>
                  </Grid>
               </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
               <Box sx={{ color: 'red', fontSize: '20px' }}>Price List</Box>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
               <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                     <TableHead>
                        <TableRow>
                           <TableCell
                              style={{ fontWeight: 'bold', fontSize: '16px' }}
                           >
                              File services type
                           </TableCell>
                           <TableCell
                              align="right"
                              style={{ fontWeight: 'bold', fontSize: '16px' }}
                           >
                              Services
                           </TableCell>
                           <TableCell
                              align="right"
                              style={{ fontWeight: 'bold', fontSize: '16px' }}
                           >
                              Credit
                           </TableCell>
                        </TableRow>
                     </TableHead>
                     <TableBody>
                        {allData.map((row) => (
                           <TableRow
                              key={row._id}
                              sx={{
                                 '&:last-child td, &:last-child th': {
                                    border: 0,
                                 },
                              }}
                           >
                              <TableCell component="th" scope="row">
                                 {row.serviceType}
                              </TableCell>
                              <TableCell align="right">{row.service}</TableCell>
                              <TableCell align="right">{row.credit}</TableCell>
                           </TableRow>
                        ))}
                     </TableBody>
                  </Table>
               </TableContainer>
            </Grid>
         </Grid>
         <Toaster />
      </Box>
   )
}
