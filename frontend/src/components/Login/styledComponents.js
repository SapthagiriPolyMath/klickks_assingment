import styled from 'styled-components';
import { ReactComponent as Logo } from '../../resources/logo.svg';

export const LoginFormContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #000000;
  width: 100vw;
  min-height: 100vh;
  flex: 1;
  font-family: 'Roboto', sans-serif;
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  background-color: #202020;
  width: 80%;
  padding: 60px 40px;

  @media screen and (min-width: 768px) {
    width: 60%;
  }
`;

export const WebsiteLogo = styled.img`
  width: 30%;
  height: auto;
  margin-bottom: 60px;
`;

export const InputContainer = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
`;

export const InputLabel = styled.label`
  color: #f2f5f9;
  font-size: 16px;
  align-self: flex-start;
  text-align: left;
  margin-bottom: 10px;
`;

export const InputField = styled.input`
  border: solid 1px #b6c5ff;
  border-radius: 4px;
  font-size: 14px;
  color: #f2f5f9;
  background-color: transparent;
  padding: 12px;
  width: 100%;
`;

export const LoginButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 90%;
  cursor: pointer;
  color: #ffffff;
  background-color: #4f46e5;
  border-radius: 10px;
  border-style: none;
  padding: 12px;
  margin-top: 30px;
  font-size: 18px;
  font-weight: bold;
`;


export const ErrorMessage = styled.p`
  color: #ff0b37;
  font-family: 'Roboto';
  align-self: flex-start;
  text-align: left;
  width: 90%;
  padding-left: 5%;
`;

export const PearlLogo = styled(Logo)`
  fill: #f8f8ff;
  width: 30%;
  height: auto;
  margin-bottom: 60px;
`;

export const RegisterButton = styled(LoginButton)`
  margin-top: 10px;
  background-color: #6c63ff; // Slightly different shade
`;
