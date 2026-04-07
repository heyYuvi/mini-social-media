import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Feed from './pages/Feed'
import Layout from './layout/Layouts'
import Login from './pages/Login'

function App() {
  
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />}></Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
