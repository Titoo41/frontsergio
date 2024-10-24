// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Dashboard from '../src/components/private/Dashboard/Dashboard';
import Login from '../src/components/public/Login';

import UserList from '../src/components/private/User/UserList';
import UserCreate from '../src/components/private/User/UserCreate';
import UserEdit from '../src/components/private/User/UserEdit';

import GamerList from './components/private/Gamer/GamerList';
import GamerCreate from './components/private/Gamer/GamerCreate';
import GamerEdit from '../src/components/private/Gamer/GamerEdit';

import './App.module.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Rutas para usuarios */}
        <Route path="/list-users" element={<UserList />} />
        <Route path="/create-user" element={<UserCreate />} />
        <Route path="/user/:id/edit" element={<UserEdit />} />

        {/* Rutas para gamers */}
        <Route path="/list-gamers" element={<GamerList />} />
        <Route path="/create-gamer" element={<GamerCreate />} />
        <Route path="/gamer/:id/edit" element={<GamerEdit />} />
      </Routes>
    </Router>
  );
}

export default App;
