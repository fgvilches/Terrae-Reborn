import * as React from 'react'
import Buscador from './components/buscador';
// 1. import `ChakraProvider` component
//import { ChakraProvider } from '@chakra-ui/react'

function App() {
  // 2. Wrap ChakraProvider at the root of your app
  return (
    <>
      <Buscador />
    </>
  )
}
export default App