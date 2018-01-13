import express from 'express';
import React from 'react';
import App from '../components/App';
import path from 'path';
import fs from 'fs';
import { StaticRouter as Router, matchPath } from 'react-router';

console.log('Starting up');
const routes = ['/', '/faq', '/backupChecker'];

const app = express();
app.use('/static', express.static('./dist'));

app.get(routes, (req, res) => {
  const filePath = path.resolve(__dirname, '../../index.hbs');

  fs.readFile(filePath, 'utf8', (err, htmlData) => {
    if (err) {
      console.error('Read error', err);

      return res.status(404).end();
    }

    const routeMarkup = renderToString(
      <StaticRouter location={req.url} context={context}>
        <Route component={App} />
      </StaticRouter>
    );

    res.send(
      htmlData.replace(
        '<div id="root"></div>',
        `<div id="root">${routeMarkup}</div>`
      )
    );
  });
});

app.listen(3000, () => console.log('Demo app listening on port 3000'));
