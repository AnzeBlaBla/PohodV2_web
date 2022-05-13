import React from 'react';

import ResultsItem from './ResultsItem';

function ResultsList({ results }) {
  return (
    <>
      {results.map((result, index) => (
        <ResultsItem result={result} index={index} key={result.point.name} />
      ))}
    </>
  );
}

export default ResultsList;
