import React from 'react'
//import { ChakraProvider, Space, Input, Grid, Flex, Text, Badge, Box, Select, Button, List } from '@chakra-ui/react'
import { EmailIcon, ChevronDownIcon } from '@chakra-ui/icons'
import axios from 'axios';
import { useState,useEffect } from 'react'
import { Layout, Badge, Typography, Grid } from 'antd'

const carreras = [{
  code: "ACT",
  description: "Actuacion"
},
{
  code: "ARQ",
  description: "Arquitectura"
},
{
  code: "DGA",
  description: "Artes Culinarias"
},
{
  code: "AUD",
  description: "Auditora (Diurno)"
},
{
  code: "ACG",
  description: "Auditoria-C.Gestion Plan Com"
},
{
  code: "CFM",
  description: "Ciencias de la Familia"
},
{
  code: "CYH",
  description: "Comunicacion y Humanidades"
},
{
  code: "CCL",
  description: "Curriculum Complentario"
},
{
  code: "DER",
  description: "Derecho"
},
{
  code: "DIS",
  description: "Diseno"
},
{
  code: "BAS",
  description: "Educacion Basica"
},
{
  code: "EMD",
  description: "Educacion Media"
},
{
  code: "PAR",
  description: "Educacion Parvularia"
},
{
  code: "ENF",
  description: "Enfermeria"
},
{
  code: "HIS",
  description: "Historia"
},
{
  code: "CIN",
  description: "Ingenieria Civil Industrial"
},
{
  code: "CIT",
  description: "Ingenieri;a Civil Informatica"
},
{
  code: "CPC",
  description: "Ingenieria Civil Plan Comun"
},
{
  code: "INC",
  description: "Ingenieria Comercial"
},
{
  code: "ICG",
  description: "Ingenieria Control Gestion"
},
{
  code: "KIN",
  description: "Kinesiologia"
},
{
  code: "LIT",
  description: "Literatura"
},
{
  code: "MED",
  description: "Medicina"
},
{
  code: "NUT",
  description: "Nutricion"
},
{
  code: "PER",
  description: "Periodismo"
},
{
  code: "PSI",
  description: "Psicologia"
},
{
  code: "PUB",
  description: "Publicidad"
}
];
const baseURL = "http://159.65.218.96/api/";
function Buscador (){
  const [NuevaCarreraNombre, setNuevaCarreraNombre] = useState('ACT');
  const [NombreRamo, setNombreRamo] = useState('');
  const [datosHorario, setdatosHorario] = useState('');
  const [NombreProfesor, setNombreProfesor] = useState('');
  const [NRC, setNRC] = useState('');
  const [Ramos, setRamos] = useState([]);
  const handleChange = (event) => {
    for(var i=0; i<=carreras.length; i++){
      if(carreras[i].description === event.target.value){
        setNuevaCarreraNombre(carreras[i].code);
      }
    }
    
  }
  const handleChangeRamo = (event) => {
    setNombreRamo(event.target.value);
  }
  const handleChangeNRC = (event) => {
    setNRC(event.target.value);
  }
  const handleChangedatosHorario = (event) => {
    //code
    setdatosHorario();
  }
  const handleChangeNombreProfesor = (event) => {
    //code
    setNombreProfesor();
  }
  async function  handleSearch(){
    if(NRC !== "" && NombreRamo !== ""){
      console.log("NRC Y Nombre, se usa solo NRC")
    }else if(NRC !== "" && NombreRamo ==="" ){
      console.log("Solo nombre, se compara nombre")
    }else if(NombreRamo !=="" && NRC === ""){
      console.log("Solo nrc se busca por nrc")
    }else{
      console.log("todos los ramos de carrera")
      console.log(baseURL+'buscarRamos?semestre=202325&codigo=' + NuevaCarreraNombre)
      //axios.get(baseURL+ 'buscarRamos?semestre=202325&codigo=' + NuevaCarreraNombre)
      //.then(res => {
      //  const ramos = res.data;
      //  setRamos(ramos);
      //  console.log(ramos)
      //})
      try {
        const response = await axios.get(baseURL+'buscarRamos?semestre=202325&codigo=' + NuevaCarreraNombre);
        setRamos(response.data);
        //console.log(Ramos);
      } catch (error) {
        console.error(error);
      }
      //try{
      //  const response = await fetch(baseURL + '/api/users');
      //  setRamos(response.json());
      //}catch(error) {
      //  setRamos([]);
    }
    
  }
  //const [carreras,setCarreras]=useState([]);
  
  //useEffect(()=>{
    //getData()
  //},[])
  return (
  <>
    <Layout.Header>
        <Typography.Text fontSize="3xl" fontWeight="bold" color="purple.500">
          TerraeReborn
        </Typography.Text>
        <Badge variant="subtle" colorScheme="pink" ml={1}>
          ALPHA
        </Badge>
        <Text color="purple.500">Busca tus ramos y más!</Text>
    </Layout.Header>

    <Grid p={10} gap={6} templateColumns="repeat(auto-fit, minmax(350px, 1fr))">
      <Space>
        <Box
          backgroundColor="white"
          boxShadow="sm"
          borderRadius="lg"
          pl={3}
          pr={3}
          pt={5}
          pb={5}
        >
          <Space ml={4} spacing={2} mt={4} mr={4}>
            <Typography.Text fontWeight="bold">NRC (Opcional)</Typography.Text>
            <Input placeholder='NRC' onChange={handleChangeNRC}/>
          </Space>
          <Space spacing={2} m={4}>
            <Typography.Text fontWeight="bold">Nombre (Opcional)</Typography.Text>
            <Input placeholder='Nombre' onChange={handleChangeRamo}/>
          </Space>
          <Space spacing={2} ml={4} mr={4} mb={4} mt={4}>
            <Typography.Text fontWeight="bold">Carrera</Typography.Text>
            <Select icon={<ChevronDownIcon />} onChange={handleChange} variant="outline" size="md">
              {carreras.map((carrera) => (
                <option maxWidth={'1250px'}>{carrera.description}</option>
              ))}

            </Select>
          </Space>
          <Space spacing={2} m={4}>
            <Button
              variant="solid"
              size="md"
              colorScheme="linkedin"
              fontWeight="bold"
              onClick = {handleSearch}
            >
              Buscar
            </Button>
          </Space>
        </Box>
      </Space>
      <Box>
        <Box
          backgroundColor="white"
          pl={3}
          pr={3}
          pt={5}
          pb={5}
          borderRadius="lg"
        >
          <Space spacing={2} m={4}>
            <Typography.Text fontWeight="bold" fontSize="lg">
              Resultado de la busqueda:
            </Typography.Text>
          </Space>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell align="right">NRC</TableCell>
                <TableCell align="right">Horario</TableCell>
                <TableCell align="right">Profesor</TableCell>
              </TableRow>
              </TableHead>
              <TableBody>
              {Ramos.map((ramo) => (
                <TableRow
                  key={ramo.courseTitle}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="right">{ramo.courseTitle}</TableCell>
                  <TableCell align="right">{ramo.courseReferenceNumber}</TableCell>
                  <TableCell align="right">{handleChangedatosHorario(ramo.courseReferenceNumber)}</TableCell>
                  <TableCell align="right">{handleChangeNombreProfesor(ramo.courseReferenceNumber)}</TableCell>
                  
                </TableRow>
              ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Grid>
  </>);
}

export default Buscador
