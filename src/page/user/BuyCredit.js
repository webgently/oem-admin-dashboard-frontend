import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import { Divider } from '@mui/material'
import StripeCheckout from 'react-stripe-checkout'
import FormControlJoy from '@mui/joy/FormControl'
import RadioJoy from '@mui/joy/Radio'
import RadioGroupJoy from '@mui/joy/RadioGroup'
import EuroIcon from '@mui/icons-material/Euro'
import LocalAtmIcon from '@mui/icons-material/LocalAtm'
import stripe from '../../assets/img/stripe.png'
import Checkbox from '@mui/material/Checkbox'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

export default function BuyCredit() {
   const account = useSelector((state) => state.account)
   const navigate = useNavigate()
   const [allData, setAllData] = useState([])
   const [stripeMethod, setStripeMethod] = useState(false)
   const [term, setTerm] = useState(false)
   const [open, setOpen] = useState(true)
   const [creditsData, setCreditsData] = useState([])
   const [selectIndex, setSelectIndex] = useState(0)
   const [handleFee, setHandleFee] = useState(0)
   const [credits, setCredits] = useState(0)
   const [price, setPrice] = useState(0)
   const [total, setTotal] = useState(0)

   const handleChangeRadio = (event) => {
      setSelectIndex(event.target.value)
   }

   const getAllPriceList = async () => {
      try {
         await axios
            .post(`${process.env.REACT_APP_API_URL}getAllPrice`)
            .then((result) => {
               if (result) {
                  setAllData(result.data)
               } else {
                  toast.error('Interanal server error')
               }
            })
      } catch (error) {
         if (process.env.REACT_APP_MODE) console.log(error)
      }
   }

   const getHandlingFee = async () => {
      try {
         await axios
            .post(`${process.env.REACT_APP_API_URL}getFee`)
            .then((result) => {
               if (result) {
                  setHandleFee(result.data.fee)
               } else {
                  toast.error('Interanal server error')
               }
            })
      } catch (error) {
         if (process.env.REACT_APP_MODE) console.log(error)
      }
   }

   const handleToken = async (token, addresses) => {
      const data = {
         token: token,
         account: account,
         other: {
            userId: account._id,
            name: account.name,
            email: account.email,
            vatNumber: account.vatNumber,
            receipt: '',
            credits: credits,
            netAmount: total,
            date: getCustomDate(),
            method: '',
            fee: handleFee,
            vatCharge: 0,
         },
      }
      try {
         await axios
            .post(`${process.env.REACT_APP_API_URL}buyCredit`, { data })
            .then((result) => {
               if (result.data.stauts) {
                  toast.success(
                     `You have bought ${credits} credits for €${total}`
                  )
               } else {
                  toast.error('Something went wrong')
               }
            })
      } catch (error) {
         if (process.env.REACT_APP_MODE) console.log(error)
      }
   }

   const getCustomDate = () => {
      const d = new Date()
      let year = d.getFullYear()
      let month = d.getMonth() + 1
      let day = d.getDate()
      if (month < 10) month = '0' + month
      if (day < 10) day = '0' + day

      const result = `${day}-${month}-${year}`
      return result
   }

   const getAllCredit = async () => {
      try {
         await axios
            .post(`${process.env.REACT_APP_API_URL}getAllCredit`)
            .then((result) => {
               if (result) {
                  setCreditsData(result.data)
               } else {
                  toast.error('Interanal server error')
               }
            })
      } catch (error) {
         if (process.env.REACT_APP_MODE) console.log(error)
      }
   }

   const handleChange = () => {
      if (term) setTerm(false)
      else setTerm(true)
   }

   useEffect(() => {
      if (selectIndex > 0) {
         const sum =
            Number(creditsData[selectIndex - 1].price) + Number(handleFee)
         setTotal(sum.toFixed(2))
         setCredits(creditsData[selectIndex - 1].credit)
         setPrice(creditsData[selectIndex - 1].price)
      }
   }, [selectIndex, credits, price])

   useEffect(() => {
      if (selectIndex === 0) {
         setOpen(true)
         return
      }
      if (!stripeMethod) {
         setOpen(true)
         return
      }
      if (!term) {
         setOpen(true)
         return
      }
      setOpen(false)
   }, [term, selectIndex, stripeMethod])

   useEffect(() => {
      getAllPriceList()
      getHandlingFee()
      getAllCredit()
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
            <Grid item xs={12} sm={12} md={8}>
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
                     <Grid item xs={6} sm={6} md={6}>
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
                     <Grid item xs={3.5} sm={3.5} md={3.5}>
                        Credits
                     </Grid>
                     <Grid item xs={2.5} sm={2.5} md={2.5}>
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
                        value={selectIndex}
                        onChange={handleChangeRadio}
                        sx={{ my: 1 }}
                     >
                        {creditsData.map((item, index) => {
                           return (
                              <RadioJoy
                                 sx={{ color: 'black', m: '15px 0px' }}
                                 value={index + 1}
                                 key={item._id}
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
                                          xs={6}
                                          sm={6}
                                          md={6}
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
                                             {item.credit}
                                          </Box>
                                       </Grid>
                                       <Grid item xs={3.5} sm={3.5} md={3.5}>
                                          {item.credit}
                                       </Grid>
                                       <Grid
                                          item
                                          xs={2.5}
                                          sm={2.5}
                                          md={2.5}
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
                              justifyContent: 'space-between',
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
                           <Grid
                              item
                              xs={2.5}
                              sm={2.5}
                              md={2.5}
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
                              justifyContent: 'space-between',
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
                           <Grid
                              item
                              xs={2.5}
                              sm={2.5}
                              md={2.5}
                              sx={{
                                 display: 'flex',
                                 alignItems: 'center',
                              }}
                           >
                              <EuroIcon sx={{ fontSize: '20px' }} /> {price}
                           </Grid>
                        </Grid>
                        <Divider />
                        <Grid
                           container
                           sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
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
                           <Grid
                              item
                              xs={2.5}
                              sm={2.5}
                              md={2.5}
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
            <Grid item xs={12} sm={12} md={4}>
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
                              onChange={handleChange}
                              {...label}
                           />
                           <a
                              style={{
                                 color: '#ffb100',
                                 textDecoration: 'underline',
                                 cursor: 'pointer',
                              }}
                              onClick={() => navigate('/policy')}
                           >
                              I have read the Privacy Policy and agree to the
                              Terms of Service.
                           </a>
                        </Box>
                        <Box sx={{ mt: '20px' }}>
                           <StripeCheckout
                              stripeKey={
                                 process.env.REACT_APP_STRIPE_PUBLIC_KEY || ''
                              }
                              token={handleToken}
                              amount={total * 100}
                              currency="EUR"
                              name={`You are paying €${total}`}
                           >
                              <button
                                 className={
                                    open ? 'btn-disable' : 'btn-primary'
                                 }
                                 disabled={open}
                              >
                                 Continue to Payment
                              </button>
                           </StripeCheckout>
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
      </Box>
   )
}
