import NavBar from "./components/NavBar"
import { Routes, Route } from 'react-router-dom'
import { Container } from "react-bootstrap"
import { Home } from "./pages/home"
import About from "./pages/about"
import Store from "./pages/store"
import ShoppingCartProvider from "./context/ShoppingCartContext"


function App() {
 

  return (
    <>
    <ShoppingCartProvider>
    <NavBar></NavBar>
    <Container>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/about" element={<About/>}></Route>
        <Route path="/store" element={<Store/>}></Route>
      </Routes>
    </Container>
    </ShoppingCartProvider>
    </>
  )
}

export default App
