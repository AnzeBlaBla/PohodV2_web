import React from 'react';
import { NavLink } from 'react-router-dom';

import { dashboard } from '../../utils/consts';

import Container from '../../components/UI/Container';
import Card from '../../components/UI/Card';

function Dashboard() {
  return (
    <Container mode="page">
      <Card>
        <div className="flex justify-center items-center flex-wrap">
          {dashboard.tables.map(table => (
            <NavLink
              to={table.to}
              key={table.to}
              className="p-4 m-2 border-2 border-gray-300 uppercase"
            >
              {table.name}
            </NavLink>
          ))}
        </div>
      </Card>
    </Container>
  );
}

export default Dashboard;
