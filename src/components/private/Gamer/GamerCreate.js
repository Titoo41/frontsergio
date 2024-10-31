// src/components/private/Gamer/GamerCreate.js
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, notification } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GamerCreate = () => {
  const [form] = Form.useForm();
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_ENDPOINT}/api/user`);
        setUsers(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching users:', error);
        notification.error({
          message: 'Error',
          description: 'Ocurrió un error al obtener los usuarios.',
        });
      }
    };

    fetchUsers();
  }, []);

  const onFinish = async (values) => {
    try {
      await axios.post(`${process.env.REACT_APP_ENDPOINT}/api/gamer`, values);
      notification.success({
        message: 'Gamer creado',
        description: 'El gamer ha sido creado correctamente.',
      });
      form.resetFields();
      navigate('/list-gamers');
    } catch (error) {
      console.error('Error creating gamer:', error);
      notification.error({
        message: 'Error',
        description: 'Ocurrió un error al crear el gamer.',
      });
    }
  };

  return (
    <div>
      <h1>Crear Gamer</h1>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="name" label="Nombre" rules={[{ required: true, message: 'Por favor ingresa el nombre' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="age" label="Edad" rules={[{ required: true, message: 'Por favor ingresa la edad' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="game" label="Juego" rules={[{ required: true, message: 'Por favor ingresa el juego' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="user" label="Usuario" rules={[{ required: true, message: 'Por favor selecciona un usuario' }]}>
          <Select placeholder="Selecciona un usuario">
            {users.map(user => (
              <Select.Option key={user._id} value={user._id}>
                {user.firstname} {user.lastname}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Crear Gamer
        </Button>
      </Form>
    </div>
  );
};

export default GamerCreate;
