import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cadastrar from './pages/Cadastrar.jsx';
import './index.css'
import App from './App.jsx'
import SelecionarPokemon from './pages/Home.jsx'
import Login from './pages/Login.jsx';
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<SelecionarPokemon/>}></Route>
    <Route path='/cadastrar' element={<Cadastrar />}></Route>
    <Route path='/login' element={<Login/>} ></Route>
  </Routes>
  </BrowserRouter>
)
