import { useState, useEffect } from 'react';

import { useGlobalContext } from '../context/GlobalContext';

import { request } from '../utils/functions';

import Container from '../components/UI/Container';
import Card from '../components/UI/Card';
import GridTable from '../components/UI/GridTable';

function Results() {
  const { setShowLoadingSpinner, setDialog } = useGlobalContext();

  const [results, setResults] = useState([]);

  useEffect(() => {
    request('/results/my_group')
      .then(data => {
        setShowLoadingSpinner(false);

        const newData = data.map((result, index) => {
          return [
            index + 1,
            result.point.name,
            `${result.correct_answers} / ${result.all_answers}`,
          ];
        });

        setResults(newData);
      })
      .catch(err => {
        setShowLoadingSpinner(false);
        setDialog({
          title: 'Napaka pri pridobivanju odgovorov',
          text: 'Prišlo je do napake pri pridobivanju odgovorov. Poskusite znova.',
        });
      });
  }, [setShowLoadingSpinner, setDialog]);

  return (
    <Container mode="page">
      <Card>
        {/* Title */}
        <h1 className="card-primary-title">Moji odgovori</h1>
        {/* Text */}
        <p className="card-primary-text">
          Prikaz odgovorov za posamezne točke.
        </p>
        <hr className="my-5"></hr>
        {/* Table */}
        {results && results.length > 0 && (
          <GridTable
            data={results}
            columns={['#', 'Ime točke', 'Pravilni odgovori / Vprašanja']}
            search={true}
            sort={true}
            resizable={true}
            pagination={{
              enabled: true,
              limit: 10,
            }}
          />
        )}
        {/* No Results */}
        {results && results.length < 1 && (
          <p className="card-primary-text">Ni odgovorov za prikaz!</p>
        )}
      </Card>
    </Container>
  );
}

export default Results;
