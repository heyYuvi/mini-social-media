import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Feed from './pages/Feed'
import Layout from './layout/Layouts'

function App() {
  
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
      <Route path='/feed' element={<Feed />}></Route>
      </Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
