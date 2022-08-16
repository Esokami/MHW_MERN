import React, {useState, useEffect} from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import MonsterList from './components/MonsterList';
import ViewMonster from './components/ViewMonster';
import Main from './views/Main';
import Dashboard from './components/Dashboard';
import ItemNew from './components/ItemNew';
import ItemView from './components/ItemView';
import ItemUpdate from './components/ItemUpdate';
import WeaponNew from './components/weapons/WeaponNew';
import  './css/Style.css';


function App() {
  return (
    <div className='mainBackground'>
      <BrowserRouter>
      <Routes> 
        <Route path="/" element={<Main/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>

        <Route path="/items/new/armor" element={<ItemNew/>}/>
        <Route path="/items/view/:id" element={<ItemView/>}/>
        <Route path="/items/update/:id" element={<ItemUpdate/>}/>

        <Route path="/items/new/weapon" element={<WeaponNew/>}/>

        <Route path="/monsters" element={<MonsterList/>}/>
        <Route path="/monsters/:id" element={<ViewMonster/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
