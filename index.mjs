import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import banksRoutes from './routes/banks.mjs';
import bankRoutes from './routes/bank.mjs';
import exchangeRatesRoutes from './routes/exchangeRates.mjs';

const app = express();
const PORT = 4000;

app.use(cors()); 
app.use(bodyParser.json());

export const dbFilePath = 'db.json';

app.use('/banks', banksRoutes);
app.use('/banks', bankRoutes);
app.use('/exchange-rates', exchangeRatesRoutes);

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});