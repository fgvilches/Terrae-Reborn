import React from 'react'
import { IconButton, ButtonGroup, Container, ChakraProvider, Stack, Input, Grid, Flex, Text, Badge, Box, Select, Button, List, Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, } from '@chakra-ui/react'
import { EmailIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'

import axios from 'axios';
import { useState,useEffect } from 'react'
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
var namesearch_display = 'none'
const baseURL = "https://fgvilches.ninja/api/";
function Buscador(){
  var today = new Date(),
  date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  const [NuevaCarreraNombre, setNuevaCarreraNombre] = useState('ACT');
  const [NombreRamo, setNombreRamo] = useState('');
  const [Nombres, setNombres] = useState([]);
  const [datosHorario, setdatosHorario] = useState('');
  const [NombreProfesor, setNombreProfesor] = useState('');
  const [NRC, setNRC] = useState('');
  const [Ramos, setRamos] = useState([]);
  function filter() {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
  
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }
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
  function handleChangedatosHorario(ramo){
    var string ='';
    for(var i = 0, keys = Object.keys(ramo.meetingsFaculty), ii = keys.length; i < ii; i++){
      //console.log(i)
      try{var viernes = ramo.meetingsFaculty[keys[i]]['meetingTime'].friday}catch{var viernes = ''}
      try{var lunes = ramo.meetingsFaculty[keys[i]]['meetingTime'].monday}catch{var lunes = ''}
      try{var sabado = ramo.meetingsFaculty[keys[i]]['meetingTime'].saturday}catch{var sabado = ''}
      try{var domingo = ramo.meetingsFaculty[keys[i]]['meetingTime'].sunday}catch{var domingo = ''}
      try{var jueves = ramo.meetingsFaculty[keys[i]]['meetingTime'].thursday}catch{var jueves = ''}
      try{var martes = ramo.meetingsFaculty[keys[i]]['meetingTime'].tuesday}catch{var martes = ''}
      if(viernes === true){
        string += "Viernes "
      }else if(lunes === true){
        string += "Lunes "
      }else if(sabado === true){
        string += "Sabado "
      }else if(domingo === true){
        string += "Domingo "
      }else if(jueves === true){
        string += "Jueves "
      }else if(martes === true){
        string += "Martes "
      }else{
        string += "Miercoles "
      }
      string += " " + ramo.meetingsFaculty[i]['meetingTime'].beginTime + "-" + ramo.meetingsFaculty[i]['meetingTime'].endTime
      if(ramo.meetingsFaculty.length > 1){
        string += ", "
      }
    }
    return string
    //setdatosHorario();
  }
  function handleChangeNombreProfesor(ramo){
    var string = '';
    for(var i = 0, keys = Object.keys(ramo.faculty), ii = keys.length; i < ii; i++){
      string += ramo.faculty[keys[i]].displayName
      if(ramo.faculty.length > 1){
        string += ", "
      }
    }
    return string
    //setNombreProfesor();
  }
  async function  handleSearch(){
    if(NRC !== "" && NombreRamo !== ""){
      console.log("NRC Y Nombre, se usa solo NRC")
    }else if(NombreRamo !=="" && NRC === ""){
      console.log("Solo nombre, se compara nombre")
    }else if(NRC !== "" && NombreRamo === "" ){
      console.log("Solo nrc se busca por nrc")
      try {
        const response = await axios.get(baseURL+'buscarRamos?semestre=202325&codigo=' + NuevaCarreraNombre);
        for(var i = 0, keys = Object.keys(response.data), ii = keys.length; i < ii; i++){
          //console.log(response.data[i].courseReferenceNumber);
          if(response.data[keys[i]].courseReferenceNumber === NRC){
            //console.log(response.data[i])
            setRamos(response.data[keys[i]]);
            namesearch_display='';
          }
        }
      } catch (error) {
        console.error(error);
      }
    }else{
      console.log("todos los ramos de carrera")
      //console.log(baseURL+'buscarRamos?semestre=202325&codigo=' + NuevaCarreraNombre)
      try {
        const response = await axios.get(baseURL+'buscarRamos?semestre=202325&codigo=' + NuevaCarreraNombre);
        setRamos(response.data);
        namesearch_display='';
        //for(var i = 0, keys = Object.keys(response.data), ii = keys.length; i < ii; i++){
          //setNombres([response.data[keys[i]]])
        //}
        //console.log(Ramos);
      } catch (error) {
        console.error(error);
      }
    }
    
  }
  return (
  <ChakraProvider resetCSS>
    <Flex
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      mt={4}
    >
      <Flex
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="flex-start"
      >
        <Text fontSize="3xl" fontWeight="bold" color="purple.500">
          TerraeReborn
        </Text>
        <Badge variant="subtle" colorScheme="pink" ml={1}>
          ALPHA
        </Badge>
      </Flex>
      <Text align='center' color="purple.500">Busca tus ramos facil y rápido!</Text>
    </Flex>
    <Grid p={10} gap={6} templateColumns="repeat(auto-fit, minmax(350px, 1fr))">
      <Stack>
        <Box
          backgroundColor="white"
          boxShadow="sm"
          borderRadius="lg"
          pl={3}
          pr={3}
          pt={5}
          pb={5}
        >
          <Stack ml={4} spacing={2} mt={4} mr={4}>
            <Text fontWeight="bold">NRC (Opcional)</Text>
            <Input placeholder='NRC' onChange={handleChangeNRC}/>
          </Stack>
          
          <Stack spacing={2} ml={4} mr={4} mb={4} mt={4}>
            <Text fontWeight="bold">Carrera</Text>
            <Select icon={<ChevronDownIcon />} onChange={handleChange} variant="outline" size="md">
              {carreras.map((carrera) => (
                <option maxWidth={'1250px'}>{carrera.description}</option>
              ))}

            </Select>
          </Stack>
          <Stack spacing={2} m={4}>
            
          </Stack>
          <Stack spacing={2} m={4}>
            <Button
              variant="solid"
              size="md"
              colorScheme="linkedin"
              fontWeight="bold"
              onClick = {handleSearch}
            >
              Buscar
            </Button>
          </Stack>
        </Box>
      </Stack>
      <Box>
        <Box
          backgroundColor="white"
          pl={3}
          pr={3}
          pt={5}
          pb={5}
          borderRadius="lg"
        >
          <Stack spacing={2} m={4}>
            <Text fontWeight="bold" fontSize="lg">
              Resultado de la busqueda:
            </Text>
          </Stack>
          
          <Input display ={namesearch_display} type="text" id="myInput" onKeyUp={filter} placeholder="Buscar por nombre.."></Input>
          <TableContainer>
            <Table id='myTable' variant='simple' maxWidth='100%'>
              <TableCaption>Ramos actualizados a las {time} del {date}</TableCaption>
              <Thead>
                <Tr>
                  <Th align='left'>Nombre</Th>
                  <Th align='left'>NRC</Th>
                  <Th align='left'>Horario</Th>
                  <Th align='left'>Profesor</Th>
                </Tr>
              </Thead>
              <Tbody>
                {Ramos.map((ramo) => (
                  <Tr>
                    <Td >{ramo.courseTitle}</Td>
                    <Td >{ramo.courseReferenceNumber}</Td>
                    <Td>{handleChangedatosHorario(ramo)}</Td>
                    <Td>{handleChangeNombreProfesor(ramo)}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Grid>
    <Container
    as="footer"
    role="contentinfo"
    py={{
      base: '12',
      md: '16',
    }}
  >
    <Stack
      spacing={{
        base: '4',
        md: '5',
      }}
    >
      <Stack justify="space-between" direction="row" align="center" >

        <ButtonGroup variant="ghost">
          <IconButton
            as="a"
            href="https://www.linkedin.com/in/fgvilches/"
            aria-label="LinkedIn"
            icon={<FaLinkedin fontSize="1.25rem" />}
          />
          <IconButton as="a" href="https://github.com/fgvilches" aria-label="GitHub" icon={<FaGithub fontSize="1.25rem" />} />
          <IconButton
            as="a"
            href="https://instagram.com/youknowshift/"
            aria-label="Instagram"
            icon={<FaInstagram fontSize="1.25rem" />}
          />
        </ButtonGroup>
      </Stack>
      <Text fontSize="sm" color="subtle">
        &copy; {new Date().getFullYear()} Hecho con 🖤 por @fgvilches.
      </Text>
    </Stack>
  </Container>
  </ChakraProvider>);
}

export default Buscador
