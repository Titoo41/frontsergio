// src/components/private/Gamer/GamerEdit.js
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, notification, Select } from 'antd';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const GamerEdit = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_ENDPOINT}/api/user`);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        notification.error({
          message: 'Error',
          description: 'Ocurrió un error al obtener los usuarios.',
        });
      }
    };

    const fetchGamer = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_ENDPOINT}/api/gamer/${id}`);
        form.setFieldsValue(response.data);
      } catch (error) {
        console.error('Error fetching gamer:', error);
        notification.error({
          message: 'Error',
          description: 'Ocurrió un error al obtener el gamer.',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
    fetchGamer();
  }, [id, form]);

  const onFinish = async (values) => {
    try {
      await axios.put(`${process.env.REACT_APP_ENDPOINT}/api/gamer/${id}`, values);
      notification.success({
        message: 'Gamer actualizado',
        description: 'El gamer ha sido actualizado correctamente.',
      });
      navigate('/list-gamers');
    } catch (error) {
      console.error('Error updating gamer:', error);
      notification.error({
        message: 'Error',
        description: 'Ocurrió un error al actualizar el gamer.',
      });
    }
  };

  return (
    <div>
      <h1>Editar Gamer</h1>
      {loading ? (
        <p>Cargando información del gamer...</p>
      ) : (
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item name="name" label="Nombre" rules={[{ required: true, message: 'Por favor ingresa el nombre' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Descripción">
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="resume" label="Resumen">
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="user" label="Usuario Asignado" required>
            <Select disabled>
              {users.map(user => (
                <Select.Option key={user._id} value={user._id}>
                  {user.firstname} {user.lastname}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Actualizar Gamer
          </Button>
        </Form>
      )}
    </div>
  );
};

export default GamerEdit;
