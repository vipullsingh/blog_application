// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { registerUser } from '../../services/api';

// const Register = () => {
//   const navigate = useNavigate();
//   const [userData, setUserData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     isAdmin: false,
//   });

//   const handleInputChange = (event) => {
//     const { name, value, type, checked } = event.target;
//     setUserData({
//       ...userData,
//       [name]: type === 'checkbox' ? checked : value,
//     });
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       await registerUser(userData);
//       alert('Registration successful!');
//       navigate('/login');
//     } catch (error) {
//       console.error('Error during registration:', error);
//       alert('Registration failed. Please try again.');
//     }
//   };

//   return (
//     <div>
//       <h1>Register</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Username</label>
//           <input type="text" name="username" value={userData.username} onChange={handleInputChange} required />
//         </div>
//         <div>
//           <label>Email</label>
//           <input type="email" name="email" value={userData.email} onChange={handleInputChange} required />
//         </div>
//         <div>
//           <label>Password</label>
//           <input type="password" name="password" value={userData.password} onChange={handleInputChange} required />
//         </div>
//         <div>
//           <label>Is Admin</label>
//           <input type="checkbox" name="isAdmin" checked={userData.isAdmin} onChange={handleInputChange} />
//         </div>
//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// };

// export default Register;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/api';
import styled from 'styled-components';

const RegisterContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const RegisterTitle = styled.h1`
  font-size: 28px;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const FormLabel = styled.label`
  font-size: 16px;
  margin-bottom: 5px;
`;

const FormInput = styled.input`
  font-size: 16px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

const FormCheckbox = styled.input`
  margin-right: 5px;
`;

const SubmitButton = styled.button`
  font-size: 18px;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const Register = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    isAdmin: false,
  });

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setUserData({
      ...userData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await registerUser(userData);
      alert('Registration successful!');
      navigate('/login');
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <RegisterContainer>
      <RegisterTitle>Register</RegisterTitle>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <FormLabel>Username</FormLabel>
          <FormInput type="text" name="username" value={userData.username} onChange={handleInputChange} required />
        </FormGroup>
        <FormGroup>
          <FormLabel>Email</FormLabel>
          <FormInput type="email" name="email" value={userData.email} onChange={handleInputChange} required />
        </FormGroup>
        <FormGroup>
          <FormLabel>Password</FormLabel>
          <FormInput type="password" name="password" value={userData.password} onChange={handleInputChange} required />
        </FormGroup>
        <FormGroup>
          <FormLabel>
            Is Admin
            <FormCheckbox type="checkbox" name="isAdmin" checked={userData.isAdmin} onChange={handleInputChange} />
          </FormLabel>
        </FormGroup>
        <SubmitButton type="submit">Register</SubmitButton>
      </Form>
    </RegisterContainer>
  );
};

export default Register;
