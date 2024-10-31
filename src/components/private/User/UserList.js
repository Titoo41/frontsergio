// src/components/private/User/UserList.js
import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, notification, Form, Input, Spin } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [form] = Form.useForm();
  const [currentPage, setCurrentPage] = useState(0); // Página actual
  const [perPage] = useState(20); // Usuarios por página
  const [totalUsers, setTotalUsers] = useState(0); // Total de usuarios
  const apiUrl = process.env.REACT_APP_ENDPOINT; // Usa la variable de entorno

  // Función para obtener la lista de usuarios
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/api/user`, {
        params: { page: currentPage, perPage }, // Agregando paginación
      });
      console.log('Datos obtenidos:', response.data);
      setUsers(response.data.data || []);
      setTotalUsers(response.data.total || 0);
    } catch (error) {
      console.error('Error fetching users:', error);
      notification.error({
        message: 'Error',
        description: 'Ocurrió un error al obtener los usuarios.',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const handleCreateGamer = (user) => {
    setSelectedUser(user);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const gamerData = {
        ...values,
        user: selectedUser._id,
      };

      // Crear gamer
      await axios.post(`${apiUrl}/api/gamer`, gamerData);
      notification.success({
        message: 'Gamer Creado',
        description: `Gamer creado exitosamente para ${selectedUser.firstname} ${selectedUser.lastname}.`,
      });
      setIsModalVisible(false);
      fetchUsers(); // Refresca la lista de usuarios
    } catch (error) {
      console.error('Error creando gamer:', error);
      notification.error({
        message: 'Error',
        description: 'Ocurrió un error al crear el gamer.',
      });
    }
  };

  // Función para eliminar un usuario
  const handleDelete = async (userId) => {
    Modal.confirm({
      title: '¿Estás seguro de que deseas eliminar este usuario?',
      onOk: async () => {
        try {
          await axios.delete(`${apiUrl}/api/user/${userId}`);
          setUsers(users.filter(user => user._id !== userId));
          notification.success({
            message: 'Usuario eliminado',
            description: 'El usuario ha sido eliminado correctamente.',
          });
          fetchUsers(); // Refresca la lista de usuarios
        } catch (error) {
          console.error('Error deleting user:', error);
          notification.error({
            message: 'Error',
            description: 'Ocurrió un error al eliminar el usuario.',
          });
        }
      },
    });
  };

  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'firstname',
      key: 'firstname',
      render: (text) => text || 'Sin nombre',
    },
    {
      title: 'Apellido',
      dataIndex: 'lastname',
      key: 'lastname',
      render: (text) => text || 'Sin apellido',
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (text, record) => (
        <span>
          <Link to={`/user/${record._id}/edit`}>
            <Button type="link">Editar</Button>
          </Link>
          <Button 
            type="link" 
            danger 
            onClick={() => handleDelete(record._id)}>
            Eliminar
          </Button>
          <Button type="link" onClick={() => handleCreateGamer(record)}>
            Crear Gamer
          </Button>
        </span>
      ),
    },
  ];

  return (
    <div>
      <h1>Lista de Usuarios</h1>
      {loading ? (
        <Spin tip="Cargando usuarios..." />
      ) : users.length > 0 ? (
        <Table
          columns={columns}
          dataSource={users}
          rowKey="_id"
          pagination={{
            current: currentPage + 1,
            pageSize: perPage,
            total: totalUsers,
            onChange: (page) => setCurrentPage(page - 1),
          }}
        />
      ) : (
        <p>No hay usuarios disponibles</p>
      )}

      <Modal
        title={`Crear Gamer para ${selectedUser?.firstname} ${selectedUser?.lastname}`}
        open={isModalVisible} // Cambia 'visible' por 'open'
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
        okText="Crear"
        cancelText="Cancelar"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Nombre"
            name="name"
            rules={[{ required: true, message: 'Por favor, ingresa el nombre!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Edad"
            name="age"
            rules={[{ required: true, message: 'Por favor, ingresa la edad!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Juego"
            name="game"
            rules={[{ required: true, message: 'Por favor, ingresa el juego!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserList;
