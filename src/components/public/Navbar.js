// src/components/Navbar.js
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './Navbar.css'; // Archivo de estilos CSS para el navbar

const Navbar = () => {
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();

  return (
    <nav className="navbar">
      
    </nav>
  );
};

export default Navbar;
