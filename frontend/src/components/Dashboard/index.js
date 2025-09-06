import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/dashboard', { withCredentials: true })
      .then(res => setMessage(res.data.message))
      .catch(() => setMessage('Unauthorized'));
  }, []);

  const logout = async () => {
    await axios.get('http://localhost:5000/api/logout', { withCredentials: true });
    window.location.href = '/';
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <p>{message}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
