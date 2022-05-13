import { useState, useEffect } from 'react';

import { useGlobalContext } from '../context/GlobalContext';

import useProtectedRoute from '../hooks/useProtectedRoute';

import { request } from '../utils/functions';

import Container from '../components/UI/Container';
import Card from '../components/UI/Card';
import Table from '../components/UI/Table';

import ResultsList from '../components/results/ResultsList';

function Results() {
  useProtectedRoute('required');

  const { setShowLoadingSpinner, setDialog } = useGlobalContext();

  const [results, setResults] = useState([]);

  useEffect(() => {
    request('/results/my_group')
      .then(data => {
        setShowLoadingSpinner(false);
        setResults(data);
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
          <Table fields={['#', 'Ime točke', 'Pravilni odgovori / Vprašanja']}>
            <ResultsList results={results} />
          </Table>
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
