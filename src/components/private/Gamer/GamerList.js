// src/components/private/Gamer/GamerList.js
import React, { useEffect, useState } from 'react';
import { Table, Button, notification, Modal, Form, Input } from 'antd';
import axios from 'axios';

const GamerList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [form] = Form.useForm();
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const perPage = 20;

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_ENDPOINT}/api/user?page=${currentPage}&perPage=${perPage}`);
      setUsers(Array.isArray(response.data.data) ? response.data.data : []);
      setTotalPages(response.data.totalPages);
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

  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'firstname',
      key: 'firstname',
      render: (text, record) => `${text} ${record.lastname}`,
    },
    {
      title: 'Gamer',
      key: 'gamer',
      render: (text, record) => {
        if (record.gamer) {
          return (
            <div>
              <strong>Nombre del Gamer:</strong> {record.gamer.name || 'Sin nombre'} <br />
              <strong>Edad:</strong> {record.gamer.age || 'Sin edad'} <br />
              <strong>Juego:</strong> {record.gamer.game || 'Sin juego'}
            </div>
          );
        }
        return <span>Sin Gamer</span>;
      },
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (text, record) => (
        !record.gamer && (
          <Button type="link" onClick={() => handleCreateGamer(record)}>
            Crear Gamer
          </Button>
        )
      ),
    },
  ];

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

      await axios.post(`${process.env.REACT_APP_ENDPOINT}/api/gamer`, gamerData);
      notification.success({
        message: 'Gamer Creado',
        description: `Gamer creado exitosamente para ${selectedUser.firstname} ${selectedUser.lastname}.`,
      });
      setIsModalVisible(false);
      fetchUsers();
    } catch (error) {
      console.error('Error creando gamer:', error);
      notification.error({
        message: 'Error',
        description: 'Ocurrió un error al crear el gamer.',
      });
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <h1>Lista de Gamers</h1>
      <Table
        columns={columns}
        dataSource={users}
        loading={loading}
        pagination={{
          current: currentPage + 1,
          pageSize: perPage,
          total: totalPages * perPage,
          onChange: (page) => setCurrentPage(page - 1),
        }}
        rowKey="_id"
      />
      <Modal title="Crear Gamer" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Nombre" rules={[{ required: true, message: 'Por favor ingresa el nombre' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="age" label="Edad" rules={[{ required: true, message: 'Por favor ingresa la edad' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="game" label="Juego" rules={[{ required: true, message: 'Por favor ingresa el juego' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default GamerList;
