import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import {
  LoginFormContainer,
  FormContainer,
  InputContainer,
  InputLabel,
  InputField,
  LoginButton,
  ErrorMessage,
  PearlLogo,
  RegisterButton,
} from './styledComponents';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const nav = useNavigate();

  // 🔒 Redirect to dashboard if session already exists
  useEffect(() => {
    axios.get('https://klickks-assingment.onrender.com/api/session', { withCredentials: true })
      .then(() => {
        nav('/dashboard');
      })
      .catch(() => {
        // stay on login page
      });
  }, [nav]);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await axios.post(
        'https://klickks-assingment.onrender.com/api/login',
        { email, password },
        { withCredentials: true }
      );
      nav('/dashboard');
    } catch (err) {
      setErrorMsg(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };
  

  const handleRedirectToRegister = () => {
    nav('/register');
  };

  return (
    <LoginFormContainer>
      <FormContainer onSubmit={e => e.preventDefault()}>
        <PearlLogo />
        <InputContainer>
          <InputLabel htmlFor="email">EMAIL</InputLabel>
          <InputField
            type="text"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            autocomplete="email"
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
            autocomplete="current-password"
          />
        </InputContainer>
        <LoginButton onClick={handleLogin} disabled={loading}>
          {loading ? <ClipLoader size={20} color="#ffffff" /> : 'Login'}
        </LoginButton>
        <RegisterButton onClick={handleRedirectToRegister}>Register</RegisterButton>
        {errorMsg && <ErrorMessage>*{errorMsg}</ErrorMessage>}
      </FormContainer>
    </LoginFormContainer>
  );
}
