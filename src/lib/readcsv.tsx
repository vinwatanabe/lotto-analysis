'use server';
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { LottoMaxType } from '@/types/lottoType';

export async function readLottoCsv() {
  const filePath = path.join(
    process.cwd(),
    'public',
    'uploads',
    'LOTTOMAX.csv'
  );

  type LottoCsvRow = {
    PRODUCT: string;
    'DRAW NUMBER': string;
    'SEQUENCE NUMBER': string;
    'DRAW DATE': string;
    'NUMBER DRAWN 1': string;
    'NUMBER DRAWN 2': string;
    'NUMBER DRAWN 3': string;
    'NUMBER DRAWN 4': string;
    'NUMBER DRAWN 5': string;
    'NUMBER DRAWN 6': string;
    'NUMBER DRAWN 7': string;
    'BONUS NUMBER': string;
  };

  const lottoMaxFileData = new Promise<LottoCsvRow[]>((resolve, reject) => {
    const results: LottoCsvRow[] = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (err) => reject(err));
  });

  const lottoMaxData: LottoMaxType[] = [];

  (await lottoMaxFileData).forEach((row: LottoCsvRow) => {
    const parsedRow: LottoMaxType = {
      product: row['PRODUCT'],
      drawNumber: parseInt(row['DRAW NUMBER'], 10),
      sequenceNumber: parseInt(row['SEQUENCE NUMBER'], 10),
      drawDate: row['DRAW DATE'],
      numbers: [
        parseInt(row['NUMBER DRAWN 1'], 10),
        parseInt(row['NUMBER DRAWN 2'], 10),
        parseInt(row['NUMBER DRAWN 3'], 10),
        parseInt(row['NUMBER DRAWN 4'], 10),
        parseInt(row['NUMBER DRAWN 5'], 10),
        parseInt(row['NUMBER DRAWN 6'], 10),
        parseInt(row['NUMBER DRAWN 7'], 10),
      ],
      bonusNumber: parseInt(row['BONUS NUMBER'], 10),
    };

    lottoMaxData.push(parsedRow);
  });

  return lottoMaxData;
}
