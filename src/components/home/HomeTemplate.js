import React from 'react';

import Card from '../UI/Card';
import Container from '../UI/Container';

import Logo from '../../logo.jpg';

function HomeTemplate({ title, text }) {
  return (
    <Container mode="page">
      <Card>
        <h1 className="card-primary-title">{title}</h1>
        <p className="card-primary-text">{text}</p>
        <img src={Logo} alt="ERŠ Velenje" className="card-primary-image"></img>
      </Card>
    </Container>
  );
}

export default HomeTemplate;
