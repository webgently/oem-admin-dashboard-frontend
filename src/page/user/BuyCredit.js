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
import toast from 'react-hot-toast'

const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

export default function BuyCredit() {
   const [Radiovalue, setRadioValue] = useState('')
   const [allData, setAllData] = useState([])

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
                        <RadioJoy
                           sx={{ color: 'black', m: '15px 0px' }}
                           value="female"
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
                                       100
                                    </Box>
                                 </Grid>
                                 <Grid item xs={2} sm={2} md={2}>
                                    100
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
                                    <EuroIcon sx={{ fontSize: '20px' }} /> 100
                                 </Grid>
                              </Grid>
                           }
                        />
                        <Divider />
                        <RadioJoy
                           sx={{ color: 'black', m: '15px 0px' }}
                           value="female2"
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
                                       100
                                    </Box>
                                 </Grid>
                                 <Grid item xs={2} sm={2} md={2}>
                                    100
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
                                    <EuroIcon sx={{ fontSize: '20px' }} /> 100
                                 </Grid>
                              </Grid>
                           }
                        />
                        <Divider />
                        <RadioJoy
                           sx={{ color: 'black', m: '15px 0px' }}
                           value="mail"
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
                                       100
                                    </Box>
                                 </Grid>
                                 <Grid item xs={2} sm={2} md={2}>
                                    100
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
                                    <EuroIcon sx={{ fontSize: '20px' }} /> 100
                                 </Grid>
                              </Grid>
                           }
                        />
                        <Divider />
                        <RadioJoy
                           sx={{ color: 'black', m: '15px 0px' }}
                           value="other"
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
                                       100
                                    </Box>
                                 </Grid>
                                 <Grid item xs={2} sm={2} md={2}>
                                    100
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
                                    <EuroIcon sx={{ fontSize: '20px' }} /> 100
                                 </Grid>
                              </Grid>
                           }
                        />
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
                              <EuroIcon sx={{ fontSize: '20px' }} /> 50
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
                              <EuroIcon sx={{ fontSize: '20px' }} /> 100
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
                              <EuroIcon sx={{ fontSize: '20px' }} /> 120
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
                              defaultValue="stripe"
                              name="controlled-radio-buttons-group"
                              onChange={handleChangeRadio}
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
                           <Checkbox {...label} />
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
      </Box>
   )
}
