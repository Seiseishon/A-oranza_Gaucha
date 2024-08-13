import './App.css';
import {Users,Dashboard, Inicio} from './pages/inde'

import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'


function App() {
  return (
 <BrowserRouter>
    <Routes>
      <Route path='/' element={<Inicio/>}></Route>
      <Route path='/users' element={<Users/>}></Route>
      <Route path='/dashboard' element={<Dashboard/>}></Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
