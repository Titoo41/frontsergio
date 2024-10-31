import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import { Button, Layout, Typography, Card } from 'antd';
import { LogoutOutlined, UserOutlined, FileAddOutlined, UnorderedListOutlined, CheckOutlined, HomeOutlined } from '@ant-design/icons'; // Nuevos íconos para la navbar
import './Dashboard.css';

const { Content } = Layout;
const { Title } = Typography;

const Dashboard = () => {
  const { user, logout } = useAuth0();

  return (
    <div className="dashboard-container">
      {/* Sección del Navbar */}
        {/* <div className="navbar-links">
          <Link to="/" className="navbar-link">
            <HomeOutlined /> Home
          </Link>
          <Link to="/create-user" className="navbar-link">
            <UserOutlined /> Create User
          </Link>
          <Link to="/list-users" className="navbar-link">
            <UnorderedListOutlined /> List Users
          </Link>
          <Link to="/create-task" className="navbar-link">
            <UserOutlined /> Create User
          </Link>
          <Link to="/list-task" className="navbar-link">
            <UnorderedListOutlined /> List Users
          </Link>
        </div> */}
      

      {/* Contenido principal */}
      <Content className="tasks-section">
      <div className="user-info">
          <span className="user-name">Welcome, {user.name}!</span>
          <Button
            className="logout-btn"
            onClick={() => logout({ returnTo: window.location.origin })}
          >
            <LogoutOutlined /> Logout
          </Button>
      </div>
        {/* <Title level={3} className="tasks-title">Manage Your Users & Tasks</Title> */}
        
        <div className="cards-container">

        <Link to="/list-users">
            <Card className="fixed-card" hoverable>
              <UnorderedListOutlined className="card-icon" />
              <Title level={4} className="card-title">List Users</Title>
              <p className="card-description">View and manage all users in the system.</p>
            </Card>
          </Link>

          <Link to="/list-gamers">
            <Card className="fixed-card" hoverable>
              <CheckOutlined className="card-icon" />
              <Title level={4} className="card-title">List Tasks</Title>
              <p className="card-description">View and manage all tasks in the system.</p>
            </Card>
          </Link>
          <Link to="/create-user">
            <Card className="fixed-card" hoverable>
              <UserOutlined className="card-icon" />
              <Title level={4} className="card-title">Create User</Title>
              <p className="card-description">Add new users to your system effortlessly.</p>
            </Card>
          </Link>

          <Link to="/create-gamer">
            <Card className="fixed-card" hoverable>
              <FileAddOutlined className="card-icon" />
              <Title level={4} className="card-title">Create Task</Title>
              <p className="card-description">Assign and manage tasks for users.</p>
            </Card>
          </Link>

      
        </div>
      </Content>
    </div>
  );
};

export default Dashboard;
