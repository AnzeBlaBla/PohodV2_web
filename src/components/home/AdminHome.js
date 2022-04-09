import React from 'react';

import Card from '../UI/Card';
import Container from '../UI/Container';

import Logo from '../../logo.jpg';

function AdminHome() {
  return (
    <Container mode="page">
      <Card>
        <h1 className="card-primary-title">Pohod V2 - Admin</h1>
        <p className="card-primary-text">
          Aplikacija za organizacijo in izvedbo orientacijskega pohoda.
        </p>
        <img src={Logo} alt="ERŠ Velenje" className="card-primary-image"></img>
      </Card>
    </Container>
  );
}

export default AdminHome;
