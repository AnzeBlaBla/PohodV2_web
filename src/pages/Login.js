import React from 'react';

import useProtectedRoute from '../hooks/useProtectedRoute';

import Container from '../components/UI/Container';
import LoginForm from '../components/users/LoginForm';

function Login() {
  useProtectedRoute('notRequired');

  return (
    <Container mode="page">
      <LoginForm />
    </Container>
  );
}

export default Login;
