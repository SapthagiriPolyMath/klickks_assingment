import axios from 'axios';
import { useState } from 'react';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:5000/api/register', { email, password }, { withCredentials: true });
      alert('Registered!');
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Sign Up</button>
    </div>
  );
}
