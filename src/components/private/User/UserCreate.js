// src/components/private/User/UserCreate.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, notification } from 'antd';

const UserCreate = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [domicilio, setDomicilio] = useState('');
  const [celular, setCelular] = useState('');
  const [documento, setDocumento] = useState('');
  const [rol, setRol] = useState('');
  const [area, setArea] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      firstname,
      lastname,
      domicilio,
      celular,
      documento,
      rol,
      area,
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_ENDPOINT}/api/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error('Error al crear el usuario');
      }

      notification.success({
        message: 'Usuario creado',
        description: 'El usuario ha sido creado correctamente.',
      });

      // Redirigir a la lista de usuarios después de crear
      navigate('/list-users');
    } catch (err) {
      notification.error({
        message: 'Error',
        description: err.message,
      });
    }
  };

  return (
    <div>
      <h2>Crear Usuario</h2>
      <Form onSubmitCapture={handleSubmit} layout="vertical">
        <Form.Item label="Nombre" required>
          <Input 
            value={firstname} 
            onChange={(e) => setFirstname(e.target.value)} 
            required 
          />
        </Form.Item>
        <Form.Item label="Apellido" required>
          <Input 
            value={lastname} 
            onChange={(e) => setLastname(e.target.value)} 
            required 
          />
        </Form.Item>
        <Form.Item label="Domicilio">
          <Input 
            value={domicilio} 
            onChange={(e) => setDomicilio(e.target.value)} 
          />
        </Form.Item>
        <Form.Item label="Celular">
          <Input 
            value={celular} 
            onChange={(e) => setCelular(e.target.value)} 
          />
        </Form.Item>
        <Form.Item label="Documento">
          <Input 
            value={documento} 
            onChange={(e) => setDocumento(e.target.value)} 
          />
        </Form.Item>
        <Form.Item label="Rol">
          <Input 
            value={rol} 
            onChange={(e) => setRol(e.target.value)} 
          />
        </Form.Item>
        <Form.Item label="Área">
          <Input 
            value={area} 
            onChange={(e) => setArea(e.target.value)} 
          />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Crear Usuario
        </Button>
      </Form>
    </div>
  );
};

export default UserCreate;
