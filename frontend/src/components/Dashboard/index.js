import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { confirm } from '../../utils/confirm';
import {
  DashboardContainer,
  Header,
  Logo,
  LogoutButton,
  Content,
  Message,
} from './styledComponents';
import logo from '../../resources/logo.svg';

export default function Dashboard() {
  const [message, setMessage] = useState('');
  const nav = useNavigate();

  const handleLogoutClick = async () => {
    console.log('Logout button clicked'); // ✅ Confirm click
    const result = await confirm({ message: 'Are you sure you want to logout?' });
    console.log('Confirmation result:', result); // ✅ Confirm dialog
    if (result) {
      try {
        await axios.get('https://klickks-assingment.onrender.com/api/logout', { withCredentials: true });
        nav('/login');
      } catch (err) {
        console.error('Logout failed:', err);
      }
    }
  };

  useEffect(() => {
    axios.get('https://klickks-assingment.onrender.com/api/dashboard', { withCredentials: true })
      .then(res => setMessage(res.data.message))
      .catch(() => setMessage('Unauthorized'));
  }, []);

  return (
    <DashboardContainer>
      <Header>
        <Logo src={logo} alt="Klickks Logo" />
        <LogoutButton type="button" onClick={handleLogoutClick}>
          Logout
        </LogoutButton>
      </Header>
      <Content>
        <h2>Welcome to Klickks Dashboard</h2>
        <Message>{message}</Message>
        <p>Explore photographers, manage bookings, and capture your moments — all just Klickks away.</p>
      </Content>
    </DashboardContainer>
  );
}
