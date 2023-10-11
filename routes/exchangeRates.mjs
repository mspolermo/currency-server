import express from 'express';
import fs from 'fs';

import { dbFilePath } from '../index.mjs';
import { simulateDelay } from '../functions/simulateDelay.mjs';

const router = express.Router();

// Маршрут для получения данных о курсах валют
router.get('/', simulateDelay, (req, res) => {
  fs.readFile(dbFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      const db = JSON.parse(data);
      res.json(db.exchangeRates);
    }
  });
});

export default router;