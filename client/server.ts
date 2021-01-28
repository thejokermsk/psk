import 'zone.js/dist/zone-node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';


import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';

import {json, urlencoded} from 'body-parser'
import {createPool} from 'mysql'

let proxy = require('express-http-proxy');

const connection = createPool({
  connectionLimit : 10,
  host: '92.53.96.120',
  user: 'cd96578_psk',
  password: 'pn2Md3Zj',
  database: 'cd96578_psk',
  multipleStatements: true
});




// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/psk-client/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  server.use(json())
  server.use(urlencoded({extended: true}))


  connection.getConnection(err => {
    if (err) throw err;
    console.log("Success connection database");
  });
  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  server.get('/media/**', proxy('https://psk-development.ru/'))

  server.get('/api/build', (req, res) => {
    connection.query('SELECT description FROM `categories_build` ORDER BY id DESC LIMIT 1', function(err, rows, fields) {
      if (rows.length === 0) {
        res.json({})
        return
      }
      res.json(rows[0]);
    })
  });

  server.get('/api/contact', (req, res) => {
    connection.query('SELECT * FROM `categories_contact` ORDER BY id DESC LIMIT 1', function(err, rows, fields) {
      if (rows.length === 0) {
        res.json({})
        return
      }
      res.json(rows[0]);
    })
  });

  server.get('/api/verify', (req, res) => {
    connection.query('SELECT img_path FROM `categories_verify`', function(err, rows, fields) {
      if (rows.length === 0) {
        res.json([])
        return
      }
      res.json(rows);
    })
  });

  server.get('/api/slider', (req, res) => {
    connection.query('SELECT img_path FROM `categories_headerslider`', function(err, rows, fields) {
      if (rows.length === 0) {
        res.json([])
        return
      }
      res.json(rows);
    })
  });

  server.get('/api/categories', (req, res) => {
    connection.query(`
      SELECT * FROM categories_categories;
      SELECT * FROM categories_products;
    `, function(err, rows, fields) {
      if (rows.length === 0) {
        res.json([])
        return
      }

      const result = rows[0].map(item => {
        item.callback = rows[1].filter(el => el.category_id === item.id ).length !== 0
        return item
      })
      res.json(result);
    })
  });

  server.get('/api/products/:category_id', (req, res) => {
    connection.query('SELECT * FROM `categories_products` WHERE `category_id`=' + req.params.category_id, function(err, rows, fields) {
      if (rows.length === 0) {
        res.json([])
        return
      }
      res.json(rows);
    })
  });

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
  });


  return server;
}

function run(): void {
  const port = process.env.PORT || 3020;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
