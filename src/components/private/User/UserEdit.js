// src/components/private/User/UserEdit.js
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, notification, Select, Spin } from 'antd';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UserEdit = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_ENDPOINT}/api/user`); // Cambiado a Vercel
        setUsers(response.data.data || []); // Asegúrate de que el formato de respuesta sea correcto
      } catch (error) {
        console.error('Error fetching users:', error);
        notification.error({
          message: 'Error',
          description: 'Ocurrió un error al obtener los usuarios.',
        });
      }
    };

    const fetchUser = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_ENDPOINT}/api/user/${id}`); // Cambiado a Vercel
        form.setFieldsValue(response.data); // Asegúrate de que los datos sean los correctos
      } catch (error) {
        console.error('Error fetching user:', error);
        notification.error({
          message: 'Error',
          description: 'Ocurrió un error al obtener el usuario.',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
    fetchUser();
  }, [id, form]);

  const onFinish = async (values) => {
    try {
      await axios.put(`${process.env.REACT_APP_ENDPOINT}/api/user/${id}`, values); // Cambiado a Vercel
      notification.success({
        message: 'Usuario actualizado',
        description: 'El usuario ha sido actualizado correctamente.',
      });
      navigate('/list-users');
    } catch (error) {
      console.error('Error updating user:', error);
      notification.error({
        message: 'Error',
        description: 'Ocurrió un error al actualizar el usuario.',
      });
    }
  };

  return (
    <div>
      <h1>Editar Usuario</h1>
      {loading ? (
        <Spin tip="Cargando información del usuario..." />
      ) : (
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item 
            name="firstname" 
            label="Nombre" 
            rules={[{ required: true, message: 'Por favor ingresa el nombre' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item 
            name="lastname" 
            label="Apellido" 
            rules={[{ required: true, message: 'Por favor ingresa el apellido' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item 
            name="email" 
            label="Correo Electrónico" 
            rules={[{ required: true, message: 'Por favor ingresa el correo electrónico' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item 
            name="assignedGamer" 
            label="Gamer Asignado" 
            required
          >
            <Select disabled>
              {users.map(user => (
                <Select.Option key={user._id} value={user._id}>
                  {user.firstname} {user.lastname} {/* Muestra el nombre del usuario */}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Actualizar Usuario
          </Button>
        </Form>
      )}
    </div>
  );
};

export default UserEdit;
