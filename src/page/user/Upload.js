import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { Button } from '@mui/material'
import Textarea from '@mui/joy/Textarea'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import FormControlJoy from '@mui/joy/FormControl'
import RadioJoy from '@mui/joy/Radio'
import RadioGroupJoy from '@mui/joy/RadioGroup'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useSelector } from 'react-redux'
import io from 'socket.io-client'

export default function Upload() {
   const socket = io(process.env.REACT_APP_BASE_URL)
   const navigate = useNavigate()
   const account = useSelector((state) => state.account)
   const [supportID, setSupportID] = useState('')

   const [userName, setUserName] = useState('')
   const [vehicleType, setVehicleType] = useState('')
   const [vehicleBrand, setVehicleBrand] = useState('')
   const [vehicleSeries, setVehicleSeries] = useState('')
   const [vehicleEngine, setVehicleEngine] = useState('')

   const [HP, setHP] = useState('')
   const [KW, setKW] = useState('')
   const [buildYear, setBuildYear] = useState(new Date())
   const [transmission, setTransmission] = useState('')

   const [chasis, setChasis] = useState('')
   const [tuningType, setTuningType] = useState('')
   const [readMethod, setReadMethod] = useState('')
   const [ECUProducer, setECUProducer] = useState('')

   const [ECUBuild, setECUBuild] = useState('')
   const [usedTool, setUsedTool] = useState('')
   const [message, setMessage] = useState('')
   const [term, setTerm] = useState('')

   const [userId, setUserID] = useState('')
   const [fileData, setFileData] = useState({})
   const inputElement = useRef('fileInput')
   /* file modal */
   const [fileOpen, setFileOpen] = useState(false)

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
      if (!vehicleEngine) {
         toast.error('Field the Vehicle Engine')
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
      if (!buildYear) {
         toast.error('Field the Build Year')
         return
      }
      if (!transmission) {
         toast.error('Field the Transmission')
         return
      }
      if (!chasis) {
         toast.error('Field the Chasis#')
         return
      }
      if (!tuningType) {
         toast.error('Field the Tuning Type')
         return
      }
      if (!readMethod) {
         toast.error('Field the Read Method')
         return
      }
      if (!ECUProducer) {
         toast.error('Field the ECU Producer')
         return
      }
      if (!ECUBuild) {
         toast.error('Field the ECU Build')
         return
      }
      if (!usedTool) {
         toast.error('Field the Used Tool')
         return
      }
      if (!message) {
         toast.error('Field the Message')
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
         client: userName,
         fileName: [fileData.name],
         fileSize: [fileData.size],
         fileType: [fileData.type],
         fileRename: [fileData.lastModified],
         vehicleType,
         vehicleBrand,
         vehicleSeries,
         vehicleEngine,
         HP,
         KW,
         buildYear,
         transmission,
         chasis,
         tuningType,
         readMethod,
         ECUProducer,
         ECUBuild,
         usedTool,
         message,
         note: '',
         status: 'requested',
         createdAt: getCustomDate(),
         readStatus: false,
      }
      params.append('file', fileData)
      params.append('data', JSON.stringify(data))

      try {
         await axios
            .post(`${process.env.REACT_APP_API_URL}uploadFile`, params)
            .then((result) => {
               if (result.data.status) {
                  socket.emit('request', { to: supportID })
                  toast.success(result.data.data)
                  setUserName('')
                  setVehicleType('')
                  setVehicleBrand('')
                  setVehicleSeries('')
                  setVehicleEngine('')
                  setHP('')
                  setKW('')
                  setBuildYear(new Date())
                  setTransmission('')
                  setChasis('')
                  setTuningType('')
                  setReadMethod('')
                  setECUProducer('')
                  setECUBuild('')
                  setUsedTool('')
                  setMessage('')
                  setTerm('')
                  setFileData({})
                  navigate('/dashboard')
               } else {
                  toast.error(result.data.data)
               }
            })
      } catch (error) {
         if (process.env.REACT_APP_MODE) console.log(error)
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
      if (fileData?.name) setFileOpen(true)
      else setFileOpen(false)
   }, [fileData])

   useEffect(() => {
      getSupportID()
      if (account._id) {
         setUserName(account.name)
         setUserID(account._id)
      }
   }, [account])

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
            <h3 style={{ color: 'red', margin: '0px' }}>Upload File</h3>
            <span>Upload here the original file</span>
         </Box>
         <Box
            sx={{
               mt: '10px',
               borderTop: '5px solid red',
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
                           sx={{ color: 'red', fontSize: '70px' }}
                        />
                     </Box>
                     <Box>Drag amd Drop your File here</Box>
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
                              border: '1px solid red',
                              borderRadius: '12px',
                              color: 'red',
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
                                 <Box>{fileData?.name}</Box>
                                 <Box>
                                    {(fileData?.size / 1000000).toFixed(4)} MB
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
                        <MenuItem value="Trucks">Trucks</MenuItem>
                        <MenuItem value="Motorcycles">Motorcycles</MenuItem>
                        <MenuItem value="Boats">Boats</MenuItem>
                        <MenuItem value="Bus">Bus</MenuItem>
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
                        <MenuItem value="BMW">BMW</MenuItem>
                        <MenuItem value="Mercedes">Mercedes</MenuItem>
                     </Select>
                  </FormControl>
               </Grid>
               <Grid item xs={12} sm={6} md={6}>
                  Vehicle Series
                  <FormControl fullWidth>
                     <Select
                        size="small"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={vehicleSeries}
                        onChange={(e) => setVehicleSeries(e.target.value)}
                     >
                        <MenuItem value="Serie 1">Serie 1</MenuItem>
                        <MenuItem value="Serie 2">Serie 2</MenuItem>
                     </Select>
                  </FormControl>
               </Grid>
               <Grid item xs={12} sm={6} md={6}>
                  Vehicle Engine
                  <FormControl fullWidth>
                     <TextField
                        size="small"
                        value={vehicleEngine}
                        onChange={(e) => setVehicleEngine(e.target.value)}
                     />
                  </FormControl>
               </Grid>

               <Grid item xs={12} sm={6} md={6}>
                  HP
                  <FormControl fullWidth>
                     <TextField
                        size="small"
                        value={HP}
                        type="number"
                        onChange={(e) => setHP(e.target.value)}
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
                        onChange={(e) => setKW(e.target.value)}
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
                        <MenuItem value="Actomatic">Actomatic</MenuItem>
                     </Select>
                  </FormControl>
               </Grid>

               <Grid item xs={12} sm={6} md={6}>
                  Chasis#
                  <FormControl fullWidth>
                     <TextField
                        size="small"
                        value={chasis}
                        onChange={(e) => setChasis(e.target.value)}
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
                        <MenuItem value="Stage 3">Stage 3</MenuItem>
                        <MenuItem value="Stage 4">Stage 4</MenuItem>
                        <MenuItem value="Make Original">Make Original</MenuItem>
                        <MenuItem value="Original">Original</MenuItem>
                     </Select>
                  </FormControl>
               </Grid>
               <Grid item xs={12} sm={6} md={6}>
                  Read Method
                  <FormControl fullWidth>
                     <Select
                        size="small"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={readMethod}
                        onChange={(e) => setReadMethod(e.target.value)}
                     >
                        <MenuItem value="OBD">OBD</MenuItem>
                        <MenuItem value="BENCH">BENCH</MenuItem>
                        <MenuItem value={30}>BOOTMODE</MenuItem>
                     </Select>
                  </FormControl>
               </Grid>
               <Grid item xs={12} sm={6} md={6}>
                  ECU Producer
                  <FormControl fullWidth>
                     <Select
                        size="small"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={ECUProducer}
                        onChange={(e) => setECUProducer(e.target.value)}
                     >
                        <MenuItem value="Gems">Gems</MenuItem>
                        <MenuItem value="Hella">Hella</MenuItem>
                        <MenuItem value="Adem">Adem</MenuItem>
                     </Select>
                  </FormControl>
               </Grid>

               <Grid item xs={12} sm={6} md={6}>
                  ECU Build
                  <FormControl fullWidth>
                     <Select
                        size="small"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={ECUBuild}
                        onChange={(e) => setECUBuild(e.target.value)}
                     >
                        <MenuItem value="Gems">BOSCH</MenuItem>
                        <MenuItem value="Hella">MSB100960</MenuItem>
                     </Select>
                  </FormControl>
               </Grid>
               <Grid item xs={12} sm={6} md={6}>
                  Used Tool
                  <FormControl fullWidth>
                     <Select
                        size="small"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={usedTool}
                        onChange={(e) => setUsedTool(e.target.value)}
                     >
                        <MenuItem value="Autotuner">Autotuner</MenuItem>
                        <MenuItem value="Bitbox">Bitbox</MenuItem>
                        <MenuItem value="Galetto">Galetto</MenuItem>
                     </Select>
                  </FormControl>
               </Grid>

               <Grid item xs={12} sm={12} md={12}>
                  Message : "To our Engineers/Special Request"
                  <Textarea
                     minRows={4}
                     size="sm"
                     placeholder="Type Message..."
                     value={message}
                     onChange={(e) => setMessage(e.target.value)}
                  />
               </Grid>
               <Grid item xs={12} sm={12} md={12} className="term-check-box">
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
                              style={{ color: 'red', cursor: 'pointer' }}
                              onClick={() => {
                                 navigate('/policy')
                              }}
                           >
                              terms and condition
                           </span>
                        </p>
                     </RadioGroupJoy>
                  </FormControlJoy>
               </Grid>
               <Grid item xs={12} sm={4} md={4} className="upload-btn-box">
                  <Button
                     variant="contained"
                     className="btn_red"
                     fullWidth
                     onClick={upload}
                  >
                     Upload
                  </Button>
               </Grid>
            </Grid>
         </Box>
      </Box>
   )
}
