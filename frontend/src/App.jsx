import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Feed from './pages/Feed'
import Layout from './layout/Layouts'
import Login from './pages/Login'
import Register from './pages/Register'
import ProtectedRoute from './components/ProtectedRoutr'
import CreatePost from './pages/CreatePost'

function App() {
  
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route element={<Layout />}>
      <Route path="/feed" element={<ProtectedRoute><Feed /></ProtectedRoute>}></Route>
      <Route path="/post" element={<ProtectedRoute><CreatePost></CreatePost></ProtectedRoute>}></Route>
      </Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
