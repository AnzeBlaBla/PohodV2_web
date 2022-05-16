import React from 'react';

import { Grid } from 'gridjs-react';
import 'gridjs/dist/theme/mermaid.css';

export default function GridTable(props) {
  return (
    <Grid
      language={{
        search: {
          placeholder: 'Iskanje...',
        },
        pagination: {
          previous: 'Nazaj',
          next: 'Naprej',
          showing: 'Prikazujem',
          results: 'zapisov',
          to: 'do',
          of: 'od',
        },
      }}
      {...props}
    />
  );
}
