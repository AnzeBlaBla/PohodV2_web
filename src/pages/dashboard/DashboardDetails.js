import { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import { useGlobalContext } from '../../context/GlobalContext';

import { request } from '../../utils/functions';
import { dashboard } from '../../utils/consts';

import Container from '../../components/UI/Container';
import Card from '../../components/UI/Card';
import GridTable from '../../components/UI/GridTable';

function Dashboard() {
  const { id } = useParams();

  const { setShowLoadingSpinner, setDialog } = useGlobalContext();

  const [title, setTitle] = useState('');

  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    setTitle(dashboard.tables.find(item => item.to.includes(id))?.name);

    setShowLoadingSpinner(true);
    request(`/${id}`)
      .then(res => {
        setShowLoadingSpinner(false);

        let keys;

        if (res && res.length > 0) {
          keys = Object.keys(res[0]);

          setColumns(keys);

          setData(
            res.map(item => {
              return keys.map(key => {
                return typeof item[key] === 'object' ? 'object' : item[key];
              });
            })
          );
        }
      })
      .catch(err => {
        setShowLoadingSpinner(false);
        setDialog({
          title: 'Napaka pri pridobivanju podatkov',
          text: 'Prišlo je do napake pri pridobivanju podatkov. Poskusite znova.',
        });
      });
  }, [id, setShowLoadingSpinner, setDialog]);

  useEffect(() => {
    console.log(data);
    console.log(columns);
  }, [data, columns]);

  return (
    <Container mode="page">
      <Card>
        <NavLink
          to="/dashboard"
          className="rounded-full inline-block py-2 px-3 bg-blue-700 text-white prevent-invert mb-5"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </NavLink>
        <h2 className="mb-5 text-2xl text-center">{title}</h2>
        {data && columns && data.length > 0 && columns.length > 0 && (
          <GridTable
            data={data}
            columns={columns}
            search={true}
            sort={true}
            resizable={true}
            pagination={{
              enabled: true,
              limit: 20,
            }}
          />
        )}
        {/* No Results */}
        {(!data || data.length < 1) && (
          <p className="card-primary-text">Ni podatkov za prikaz!</p>
        )}
      </Card>
    </Container>
  );
}

export default Dashboard;
