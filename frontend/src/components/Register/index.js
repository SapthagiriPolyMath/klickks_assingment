import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import {
  LoginFormContainer,
  FormContainer,
  WebsiteLogo,
  InputContainer,
  InputLabel,
  InputField,
  LoginButton,
  ErrorMessage,
} from '../Login/styledComponents';
import logo from '../../resources/logo.svg';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);


  
const nav = useNavigate();

useEffect(() => {
  if (successMsg) {
    const timer = setTimeout(() => nav('/login'), 3000); // 3 seconds
    return () => clearTimeout(timer);
  }
}, [successMsg,nav]);


const handleRegister = async () => {
  if (!/\S+@\S+\.\S+/.test(email)) {
    setErrorMsg('Please enter a valid email address');
    return;
  }

  if (username.length < 3) {
    setErrorMsg('Username must be at least 3 characters');
    return;
  }

  if (password.length < 6) {
    setErrorMsg('Password must be at least 6 characters');
    return;
  }

  setLoading(true);
  try {
    await axios.post('http://localhost:5000/api/register', {
      email,
      password,
      username,
    }, { withCredentials: true });    
    setSuccessMsg('Registered successfully!');
    setErrorMsg('');
  } catch (err) {
    setErrorMsg(err.response?.data?.error || 'Registration failed');
    setSuccessMsg('');
  } finally {
    setLoading(false);
  }
};


  return (
    <LoginFormContainer>
      <FormContainer onSubmit={e => e.preventDefault()}>
        <WebsiteLogo src={logo} alt="website logo" />
        <InputContainer>
        <InputLabel htmlFor="username">USERNAME</InputLabel>
            <InputField
              type="text"
              id="username"
              value={username}
              onChange={e => setUsername(e.target.value.trim())}
              placeholder="Username"
            />
        </InputContainer>
        <InputContainer>
          <InputLabel htmlFor="email">EMAIL</InputLabel>
          <InputField
            type="text"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
          />
        </InputContainer>
        <InputContainer>
          <InputLabel htmlFor="password">PASSWORD</InputLabel>
          <InputField
            type="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
          />
        </InputContainer>
        <LoginButton onClick={handleRegister} disabled={loading}>
          {loading ? <ClipLoader size={20} color="#ffffff" /> : 'Sign Up'}
        </LoginButton>
        {errorMsg && <ErrorMessage>*{errorMsg}</ErrorMessage>}
        {successMsg && <ErrorMessage style={{ color: '#00ff99' }}>{successMsg} <br/> Redirecting to login page...</ErrorMessage>}
      </FormContainer>
    </LoginFormContainer>
  );
}
