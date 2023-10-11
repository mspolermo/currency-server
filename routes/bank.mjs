import express from 'express';
import fs from 'fs';

import { dbFilePath } from '../index.mjs';
import { simulateDelay } from '../functions/simulateDelay.mjs';

const router = express.Router();

// Маршрут для получения данных о конкретном банке по ID
router.get('/:id', simulateDelay, (req, res) => {
  const bankId = parseInt(req.params.id);
  if (!isNaN(bankId)) {
    fs.readFile(dbFilePath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      } else {
        const db = JSON.parse(data);
        const bank = db.banks.find((b) => b.id === bankId);
        if (bank) {
          res.json(bank);
        } else {
          res.status(404).send('Bank not found');
        }
      }
    });
  } else {
    res.status(400).send('Invalid bank ID');
  }
});

export default router;