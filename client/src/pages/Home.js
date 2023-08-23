import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  text-align: center;
  margin: auto;
  padding: 20px;
`;

const Heading = styled.h1`
  font-size: 28px;
  color: #333;
  margin-bottom: 20px;
`;

const StyledLink = styled(Link)`
  display: inline-block;
  margin: 10px;
  padding: 10px 20px;
  text-decoration: none;
  color: #fff;
  background-color: #007bff;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const LineBreak = styled.br`
  margin-top: 10px;
`;

const Home = () => {
  return (
    <Container>
      <Heading>Welcome to the Blog App</Heading>
      <StyledLink to="/login">Login</StyledLink>
      <LineBreak />
      <StyledLink to="/register">Register</StyledLink>
    </Container>
  );
};

export default Home;
