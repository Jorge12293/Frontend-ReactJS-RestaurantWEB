
import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Pos from './pages/pos/Pos';
import Inicio from './pages/inicio/Inicio';
import Areas from './pages/configuraciones/areas/Areas';
import Mesas from './pages/configuraciones/mesas/Mesas';
import Factura from './pages/factura/Factura';
import Categorias from './pages/configuraciones/categorias/Categorias';
import Productos from './pages/configuraciones/productos/Productos';
import Ordenes from './pages/configuraciones/ordenes/Ordenes';
import Personas from './pages/configuraciones/personas/Personas';

import Navbar from './components/Navbar';

import './App.css';
import Login from './pages/login/login';

function App() {
  return (

    <BrowserRouter>
      <div className="App">
        <Navbar />
        <ToastContainer position='top-center' />
        <Routes>
          <Route exact path='/' element={<Inicio/>} />

          <Route exact path='/pos' element={<Pos/>} />

          <Route exact path='/factura/:id' element={<Factura/>} />
          
          {/*Configuraciones */}
          <Route exact path='/orden' element={<Ordenes/>} />
          
          <Route exact path='/area' element={<Areas/>} />
          <Route exact path='/area/:id' element={<Areas/>} />

          <Route exact path='/mesa' element={<Mesas/>} />
          
          <Route exact path='/categoria' element={<Categorias/>} />
          <Route exact path='/categoria/:id' element={<Categorias/>} />

          <Route exact path='/producto' element={<Productos/>} />

          <Route exact path='/persona' element={<Personas/>} />

        </Routes>
      </div>
    </BrowserRouter>

  );
}

export default App;
