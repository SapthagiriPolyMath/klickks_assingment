import styled from 'styled-components';
import bgImage from '../../resources/bg.jpg';

export const DashboardContainer = styled.div`
  position: relative;
  min-height: 100vh;
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #121212;
  color: #f8f8ff;
  font-family: 'Roboto', sans-serif;
  overflow: hidden;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(31, 31, 31, 0.9);
  padding: 20px 40px;
`;

export const Logo = styled.img`
  height: 40px;
`;

export const LogoutButton = styled.button`
  background-color: #4f46e5;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  z-index: 10;
  &:hover {
    background-color: #6c63ff;
  }
`;

export const Content = styled.div`
  padding: 60px 40px;
  position: relative;
  text-align: center;
`;

export const Message = styled.p`
  font-size: 18px;
  margin: 20px 0;
`;
