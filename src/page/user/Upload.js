import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { Button } from '@mui/material'
import Textarea from '@mui/joy/Textarea'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Fab from '@mui/material/Fab'
import TextField from '@mui/material/TextField'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import FormControlJoy from '@mui/joy/FormControl'
import RadioJoy from '@mui/joy/Radio'
import RadioGroupJoy from '@mui/joy/RadioGroup'
import toast from 'react-hot-toast'
import { BeatLoader } from 'react-spinners'
import axios from 'axios'
import { useSelector } from 'react-redux'
import io from 'socket.io-client'

const socket = io(process.env.REACT_APP_BASE_URL)
export default function Upload() {
   const navigate = useNavigate()
   const [account,setAccount] = useState(null);
   const [supportID, setSupportID] = useState('')
   const [userName, setUserName] = useState('')

   const [vehicleType, setVehicleType] = useState('')
   const [vehicleBrand, setVehicleBrand] = useState('')
   const [vehicleSeries, setVehicleSeries] = useState('')
   const [buildYear, setBuildYear] = useState(new Date())

   const [HP, setHP] = useState('')
   const [KW, setKW] = useState('')
   const [transmission, setTransmission] = useState('')
   const [VINnumber, setVINnumber] = useState('')

   const [tuningType, setTuningType] = useState('')
   const [extras, setExtras] = useState('')
   const [message, setMessage] = useState('')
   const [term, setTerm] = useState('')

   const [userId, setUserID] = useState('')
   const [fileData, setFileData] = useState({})
   const inputElement = useRef('fileInput')

   const [policy, setPolicy] = useState('')
   const [fileOpen, setFileOpen] = useState(false)
   const [termViewFlag, setTermViewFlag] = useState(false)
   const [isLoading, setIsLoading] = useState(false)


   useEffect(()=>{
      const user = localStorage.getItem('user');
      if(user){
         let parse = JSON.parse(user);
         setAccount(parse);
      }
   },[]);


   const getContents = async () => {
      try {
         await axios
            .post(`${process.env.REACT_APP_API_URL}getContents`)
            .then((result) => {
               setPolicy(result.data.privacy)
            })
      } catch (error) {
         if (process.env.REACT_APP_MODE) console.log(error)
      }
   }

   const handleFileload = () => {
      inputElement.current.click()
   }

   const getFile = async (e) => {
      setFileData(e.target.files[0])
   }

   const upload = async () => {
      if (!fileData.name) {
         toast.error('Select the file')
         return
      }
      const arr = fileData.name.split('.')
      const element = arr[arr.length - 1]
      const type = element.toLowerCase()
      if (
         type !== 'bin' &&
         type !== 'bdc' &&
         type !== 'unq' &&
         type !== 'slave' &&
         type !== 'fls' &&
         type !== 'dim' &&
         type !== 'dtf' &&
         type !== 'e2p' &&
         type !== 'ori' &&
         type !== 'bdc' &&
         type !== 'mmf' &&
         type !== 'zip' &&
         type !== 'slv' &&
         type !== 'rar' &&
         type !== 'mtx' &&
         type !== 'fpf' &&
         type !== 'cod' &&
         type !== 'tun' &&
         type !== 'bak' &&
         fileData.name.toLowerCase() !== type
      ) {
         toast.error(`Can't select the file like this type`)
         return
      }
      if (!vehicleType) {
         toast.error('Field the Vehicle type')
         return
      }
      if (!vehicleBrand) {
         toast.error('Field the Vehicle Brand')
         return
      }
      if (!vehicleSeries) {
         toast.error('Field the Vehicle Series')
         return
      }
      if (!buildYear) {
         toast.error('Field the Build Year')
         return
      }
      if (!HP) {
         toast.error('Field the HP')
         return
      }
      if (!KW) {
         toast.error('Field the KW')
         return
      }
      if (!transmission) {
         toast.error('Field the Transmission')
         return
      }
      if (!VINnumber) {
         toast.error('Field the VINnumber')
         return
      }
      if (!tuningType) {
         toast.error('Field the Tuning Type')
         return
      }
      if (!term) {
         toast.error('Accept the term')
         return
      }
      let params = new FormData()
      const data = {
         orderId: '',
         userId,
         email: account?.email,
         client: userName,
         fileName: [fileData.name],
         fileSize: [fileData.size],
         fileType: [fileData.type],
         fileRename: [fileData.lastModified],
         vehicleType,
         vehicleBrand,
         vehicleSeries,
         buildYear,
         HP,
         KW,
         transmission,
         VINnumber,
         tuningType,
         extras,
         message,
         note: '',
         status: 'requested',
         createdAt: getCustomDate(),
         readStatus: false,
      }
      params.append('file', fileData)
      params.append('data', JSON.stringify(data))
      if (!isLoading) {
         setIsLoading(true)
         try {
            await axios
               .post(`${process.env.REACT_APP_API_URL}uploadFile`, params)
               .then((result) => {
                  if (result.data.status) {
                     socket.emit('request', { to: supportID, name: userName })
                     toast.success(result.data.data)
                     setUserName('')
                     setVehicleType('')
                     setVehicleBrand('')
                     setVehicleSeries('')
                     setBuildYear(new Date())
                     setHP('')
                     setKW('')
                     setTransmission('')
                     setVINnumber('')
                     setTuningType('')
                     setExtras('')
                     setMessage('')
                     setTerm('')
                     setFileData({})
                     setIsLoading(false)
                     navigate('/dashboard')
                  } else {
                     toast.error(result.data.data)
                  }
               })
         } catch (error) {
            if (process.env.REACT_APP_MODE) console.log(error)
         }
      } else {
         toast.error('Loading...')
      }
   }

   const getSupportID = async () => {
      try {
         await axios
            .post(`${process.env.REACT_APP_API_URL}getSupportID`)
            .then(async (result) => {
               if (result.data.status) await setSupportID(result.data.data)
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

   const deleteFile = () => {
      setFileData({})
      setFileOpen(false)
   }

   useEffect(() => {
      if (!HP || HP === 0) {
         setHP('')
         setKW('')
      } else {
         setKW(HP * 0.7457)
      }
   }, [HP, KW])

   useEffect(() => {
      if (fileData?.name) setFileOpen(true)
      else setFileOpen(false)
   }, [fileData])

   useEffect(() => {
      getSupportID()
      if (account) {
         setUserName(account?.name)
         setUserID(account?._id)
      }
   }, [account])

   useEffect(() => {
      getContents()
   }, [])

   useEffect(() => { 
      if (termViewFlag) document.getElementById('description').innerHTML = policy;
   }, [termViewFlag])

   return (
      <Box
         sx={{
            flexGrow: 1,
            p: 3,
            bgcolor: 'rgb(229, 229, 229)',
            overflowY: 'overlay',
         }}
      >
         {termViewFlag ? (
            <Box
               sx={{
                  flexGrow: 1,
                  p: 3,
                  bgcolor: 'rgb(229, 229, 229)',
                  overflowY: 'overlay',
               }}
            >
               <Box
                  sx={{
                     mt: '80px',
                     display: 'flex',
                     justifyContent: 'space-between',
                  }}
               >
                  <h2 style={{ color: '#1976d2', margin: '0px' }}>
                     Privacy Policy
                  </h2>
                  <Box>
                     <Fab
                        color="primary"
                        aria-label="add"
                        onClick={() => setTermViewFlag(false)}
                     >
                        <ArrowBackIcon />
                     </Fab>
                  </Box>
               </Box>
               <Box
                  sx={{
                     mt: '10px',
                     borderTop: '5px solid #1976d2',
                     bgcolor: 'white',
                     borderBottomRightRadius: '5px',
                     borderBottomLeftRadius: '5px',
                     overflow: 'auto',
                     p: '10px',
                     height: '60vh',
                  }}
                  id='description'
               >
               </Box>
            </Box>
         ) : (
            <>
               <Box sx={{ mt: '80px' }}>
                  <h3 style={{ color: '#1976d2', margin: '0px' }}>
                     Upload File
                  </h3>
                  <span>Upload here the original file</span>
               </Box>
               <Box
                  sx={{
                     mt: '10px',
                     borderTop: '5px solid #1976d2',
                     bgcolor: 'white',
                     borderBottomRightRadius: '5px',
                     borderBottomLeftRadius: '5px',
                     p: '10px',
                  }}
               >
                  <Grid
                     container
                     spacing={{ xs: 2, md: 3 }}
                     columns={{ xs: 4, sm: 6, md: 12 }}
                  >
                     <Grid item xs={12} sm={6} md={7}>
                        <Box
                           sx={{
                              display: 'flex',
                              justifyContent: 'flex-start',
                              border: '1px dotted',
                              borderRadius: '20px',
                              flexDirection: 'column',
                              p: '30px',
                              gap: '10px',
                              alignItems: 'center',
                           }}
                        >
                           <Box>
                              <CloudUploadIcon
                                 sx={{ color: '#1976d2', fontSize: '70px' }}
                              />
                           </Box>
                           <Box>Drag and Drop your File here</Box>
                           <Box>Or</Box>
                           <Box>
                              <input
                                 ref={inputElement}
                                 type="file"
                                 style={{ display: 'none' }}
                                 onChange={(e) => getFile(e)}
                              />
                              <Button
                                 variant="outlined"
                                 sx={{
                                    border: '1px solid #1976d2',
                                    borderRadius: '12px',
                                    color: '#1976d2',
                                 }}
                                 onClick={handleFileload}
                              >
                                 Browse File
                              </Button>
                           </Box>
                        </Box>
                     </Grid>
                     <Grid item xs={12} sm={6} md={5}>
                        {fileOpen ? (
                           <Box className="select-file" mt={4}>
                              <Box className="file-group-box">
                                 <Box className="upload-img-box">
                                    <UploadFileIcon className="upload-img-icon" />
                                 </Box>
                                 <Box className="file-info">
                                    <Box>
                                       <Box className="filename-string">
                                          {fileData?.name}
                                       </Box>
                                       <Box>
                                          {(fileData?.size / 1000000).toFixed(
                                             4
                                          )}{' '}
                                          MB
                                       </Box>
                                    </Box>
                                 </Box>
                              </Box>
                              <Box className="close-img-box">
                                 <HighlightOffIcon
                                    className="close-img-icon"
                                    onClick={() => deleteFile()}
                                 />
                              </Box>
                           </Box>
                        ) : (
                           <></>
                        )}
                     </Grid>

                     <Grid item xs={12} sm={6} md={6}>
                        Vehicle type
                        <FormControl fullWidth>
                           <Select
                              size="small"
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={vehicleType}
                              onChange={(e) => setVehicleType(e.target.value)}
                           >
                              <MenuItem value="Cars">Cars</MenuItem>
                              <MenuItem value="Motorcycles">
                                 Motorcycles
                              </MenuItem>
                              <MenuItem value="Trucks">Trucks</MenuItem>
                              <MenuItem value="Tractor">Tractor</MenuItem>
                              <MenuItem value="Powersports">
                                 Powersports
                              </MenuItem>
                              <MenuItem value="Boats">Boats</MenuItem>
                              <MenuItem value="Bus">Bus</MenuItem>
                              <MenuItem value="Gearbox">Gearbox</MenuItem>
                           </Select>
                        </FormControl>
                     </Grid>
                     <Grid item xs={12} sm={6} md={6}>
                        Vehicle Brand
                        <FormControl fullWidth>
                           <Select
                              size="small"
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={vehicleBrand}
                              onChange={(e) => setVehicleBrand(e.target.value)}
                           >
                              <MenuItem value="Abarth">Abarth</MenuItem>
                              <MenuItem value="Alfa-Romeo">Alfa-Romeo</MenuItem>
                              <MenuItem value="Alpine">Alpine</MenuItem>
                              <MenuItem value="Aprilia">Aprilia</MenuItem>
                              <MenuItem value="Aston-Martin">
                                 Aston-Martin
                              </MenuItem>
                              <MenuItem value="Audi">Audi</MenuItem>
                              <MenuItem value="BMW">BMW</MenuItem>
                              <MenuItem value="Bentley">Bentley</MenuItem>
                              <MenuItem value="Bugatti">Bugatti</MenuItem>
                              <MenuItem value="BRP">Brp</MenuItem>
                              <MenuItem value="Buick">Buick</MenuItem>
                              <MenuItem value="Cadillac">Cadillac</MenuItem>
                              <MenuItem value="Chevrolet">Chevrolet</MenuItem>
                              <MenuItem value="Chrysler">Chrysler</MenuItem>
                              <MenuItem value="Citroen">Citroen</MenuItem>
                              <MenuItem value="Dodge">Dodge</MenuItem>
                              <MenuItem value="Ducati">Ducati</MenuItem>
                              <MenuItem value="Ferrari">Ferrari</MenuItem>
                              <MenuItem value="Fiat">Fiat</MenuItem>
                              <MenuItem value="Ford">Ford</MenuItem>
                              <MenuItem value="Geely">Geely</MenuItem>
                              <MenuItem value="Harley-Davidson">
                                 Harley-Davidson
                              </MenuItem>
                              <MenuItem value="Honda">Honda</MenuItem>
                              <MenuItem value="Hummer">Hummer</MenuItem>
                              <MenuItem value="Hyosung">Hyosung</MenuItem>
                              <MenuItem value="Hyundai">Hyundai</MenuItem>
                              <MenuItem value="Infiniti">Infiniti</MenuItem>
                              <MenuItem value="Jaguar">Jaguar</MenuItem>
                              <MenuItem value="KTM">KTM</MenuItem>
                              <MenuItem value="Kawasaki">Kawasaki</MenuItem>
                              <MenuItem value="Kia">Kia</MenuItem>
                              <MenuItem value="Lamborghini">
                                 Lamborghini
                              </MenuItem>
                              <MenuItem value="Land Rover">Land Rover</MenuItem>
                              <MenuItem value="Lexus">Lexus</MenuItem>
                              <MenuItem value="Lincoln">Lincoln</MenuItem>
                              <MenuItem value="Lotus">Lotus</MenuItem>
                              <MenuItem value="Maserati">Maserati</MenuItem>
                              <MenuItem value="Mazda">Mazda</MenuItem>
                              <MenuItem value="McLaren">McLaren</MenuItem>
                              <MenuItem value="Mercedes">Mercedes</MenuItem>
                              <MenuItem value="Mini">Mini</MenuItem>
                              <MenuItem value="Mitsubishi">Mitsubishi</MenuItem>
                              <MenuItem value="Mitsuoka">Mitsuoka</MenuItem>
                              <MenuItem value="Nio">Nio</MenuItem>
                              <MenuItem value="Nissan">Nissan</MenuItem>
                              <MenuItem value="Norton">Norton</MenuItem>
                              <MenuItem value="Pagani">Pagani</MenuItem>
                              <MenuItem value="Peugeot">Peugeot</MenuItem>
                              <MenuItem value="Porsche">Porsche</MenuItem>
                              <MenuItem value="Ram">Ram</MenuItem>
                              <MenuItem value="Renault">Renault</MenuItem>
                              <MenuItem value="Rezvani">Rezvani</MenuItem>
                              <MenuItem value="Rolls-Royce">
                                 Rolls-Royce
                              </MenuItem>
                              <MenuItem value="Saab">Saab</MenuItem>
                              <MenuItem value="Scion">Scion</MenuItem>
                              <MenuItem value="Seat">Seat</MenuItem>
                              <MenuItem value="Skoda">Skoda</MenuItem>
                              <MenuItem value="Smart">Smart</MenuItem>
                              <MenuItem value="Subaru">Subaru</MenuItem>
                              <MenuItem value="Suzuki">Suzuki</MenuItem>
                              <MenuItem value="Tata">Tata</MenuItem>
                              <MenuItem value="Toyota">Toyota</MenuItem>
                              <MenuItem value="Tesla">Tesla</MenuItem>
                              <MenuItem value="Triumph">Triumph</MenuItem>
                              <MenuItem value="Vauxhall">Vauxhall</MenuItem>
                              <MenuItem value="Volkswagen">Volkswagen</MenuItem>
                              <MenuItem value="Volvo">Volvo</MenuItem>
                              <MenuItem value="Yamaha">Yamaha</MenuItem>
                           </Select>
                        </FormControl>
                     </Grid>
                     <Grid item xs={12} sm={6} md={6}>
                        Vehicle Series
                        <FormControl fullWidth>
                           <TextField
                              size="small"
                              value={vehicleSeries}
                              onChange={(e) => setVehicleSeries(e.target.value)}
                           />
                        </FormControl>
                     </Grid>
                     <Grid item xs={12} sm={6} md={6}>
                        Build Year
                        <FormControl fullWidth>
                           <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker
                                 views={['year']}
                                 value={buildYear}
                                 onChange={(e) => {
                                    setBuildYear(e)
                                 }}
                                 renderInput={(params) => (
                                    <TextField
                                       size="small"
                                       {...params}
                                       helperText={null}
                                    />
                                 )}
                              />
                           </LocalizationProvider>
                        </FormControl>
                     </Grid>

                     <Grid item xs={12} sm={6} md={6}>
                        HP
                        <FormControl fullWidth>
                           <TextField
                              size="small"
                              value={HP}
                              type="number"
                              onChange={(e) => setHP(Number(e.target.value))}
                           />
                        </FormControl>
                     </Grid>
                     <Grid item xs={12} sm={6} md={6}>
                        KW
                        <FormControl fullWidth>
                           <TextField
                              size="small"
                              type="number"
                              value={KW}
                              readOnly
                           />
                        </FormControl>
                     </Grid>
                     <Grid item xs={12} sm={6} md={6}>
                        Transmission
                        <FormControl fullWidth>
                           <Select
                              size="small"
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={transmission}
                              onChange={(e) => setTransmission(e.target.value)}
                           >
                              <MenuItem value="Manual">Manual</MenuItem>
                              <MenuItem value="Automatic">Automatic</MenuItem>
                           </Select>
                        </FormControl>
                     </Grid>
                     <Grid item xs={12} sm={6} md={6}>
                        VIN number#
                        <FormControl fullWidth>
                           <TextField
                              size="small"
                              value={VINnumber}
                              onChange={(e) => setVINnumber(e.target.value)}
                           />
                        </FormControl>
                     </Grid>

                     <Grid item xs={12} sm={6} md={6}>
                        Tuning Type
                        <FormControl fullWidth>
                           <Select
                              size="small"
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={tuningType}
                              onChange={(e) => setTuningType(e.target.value)}
                           >
                              <MenuItem value="Stage 1">Stage 1</MenuItem>
                              <MenuItem value="Stage 2">Stage 2</MenuItem>
                              <MenuItem value="A-traktor">A-traktor</MenuItem>
                              <MenuItem value="Original">Original</MenuItem>
                           </Select>
                        </FormControl>
                     </Grid>
                     <Grid item xs={12} sm={6} md={6}>
                        Extras
                        <FormControl fullWidth>
                           <Select
                              size="small"
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={extras}
                              onChange={(e) => setExtras(e.target.value)}
                           >
                              <MenuItem value="EGR OFF">EGR OFF</MenuItem>
                              <MenuItem value="DPF OFF">DPF OFF</MenuItem>
                              <MenuItem value="DTC OFF">DTC OFF</MenuItem>
                              <MenuItem value="AdBlue OFF">AdBlue OFF</MenuItem>
                              <MenuItem value="GPF/OPF OFF">
                                 GPF/OPF OFF
                              </MenuItem>
                              <MenuItem value="POP & BANG">POP & BANG</MenuItem>
                              <MenuItem value="DECAT">DECAT</MenuItem>
                              <MenuItem value="VMAX OFF">VMAX OFF</MenuItem>
                              <MenuItem value="POPCORN / HARDCUT">
                                 POPCORN / HARDCUT
                              </MenuItem>
                              <MenuItem value="MULTIPLE OPTIONS">
                                 MULTIPLE OPTIONS
                              </MenuItem>
                           </Select>
                        </FormControl>
                     </Grid>

                     <Grid item xs={12} sm={12} md={12}>
                        Message : "To our Engineers/Special Request"
                        <Textarea
                           minRows={4}
                           size="sm"
                           placeholder="Do you have multiple options? Write them here, or just leave an message"
                           value={message}
                           onChange={(e) => setMessage(e.target.value)}
                        />
                     </Grid>
                     <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        className="term-check-box"
                     >
                        <FormControlJoy>
                           <RadioGroupJoy
                              defaultValue="false"
                              name="controlled-radio-buttons-group"
                              value={term}
                              onChange={(e) => setTerm(e.target.value)}
                              style={{ display: 'flex' }}
                           >
                              <p>
                                 <RadioJoy value="true" />
                                 &nbsp;I accept the{' '}
                                 <span
                                    style={{
                                       color: '#1976d2',
                                       cursor: 'pointer',
                                    }}
                                    onClick={() => setTermViewFlag(true)}
                                 >
                                    terms and condition
                                 </span>
                              </p>
                           </RadioGroupJoy>
                        </FormControlJoy>
                     </Grid>
                     <Grid
                        item
                        xs={12}
                        sm={4}
                        md={4}
                        className="upload-btn-box"
                     >
                        <Button
                           variant="contained"
                           className="btn_blue"
                           style={{ padding: '10px 0' }}
                           fullWidth
                           onClick={upload}
                        >
                           {isLoading ? (
                              <BeatLoader color="#fff" size={10} />
                           ) : (
                              'Upload'
                           )}
                        </Button>
                     </Grid>
                  </Grid>
               </Box>
            </>
         )}
      </Box>
   )
}
