import express from 'express';
import fs from 'fs';

import { dbFilePath } from '../index.mjs';
import { simulateDelay } from '../functions/simulateDelay.mjs';

const router = express.Router();

// Маршрут для получения данных о банках
router.get('/', simulateDelay, (req, res) => {
  fs.readFile(dbFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      const db = JSON.parse(data);
      let sortedBanks = [...db.banks];

      const sortBy = req.query.sort || 'id'; // По умолчанию сортируем по id
      const sortDirection = req.query.direction || 'asc'; // По умолчанию прямой порядок

      // Сортировка данных
      if (sortBy === 'id') {
        sortedBanks.sort((a, b) => (sortDirection === 'asc' ? a.id - b.id : b.id - a.id));
      } else if (sortBy === 'name') {
        sortedBanks.sort((a, b) => (sortDirection === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)));
      } else if (sortBy === 'address') {
        sortedBanks.sort((a, b) => (sortDirection === 'asc' ? a.address.localeCompare(b.address) : b.address.localeCompare(a.address)));
      } else if (sortBy === 'distanceFromUser') {
        sortedBanks.sort((a, b) => (sortDirection === 'asc' ? a.distanceFromUser - b.distanceFromUser : b.distanceFromUser - a.distanceFromUser));
      }

      res.json(sortedBanks);
    }
  });
});

export default router;