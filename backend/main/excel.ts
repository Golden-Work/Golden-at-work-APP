import express from 'express';
import { Pool } from 'pg';
import ExcelJS from 'exceljs';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());

const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: parseInt(process.env.DATABASE_PORT || '3306'),
});

app.get('/download', async (req, res) => {
  // Validamos que el nombre de la tabla sea seguro
  const allowedTables = ['main_implement']; // Lista de tablas permitidas
  const tableName = req.query.table;
  if (!allowedTables.includes(tableName)) {
    return res.status(400).send('Invalid table name');
  }

  try {
    const results = await pool.query(`SELECT * FROM "${tableName}"`); 

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Datos');

    
    sheet.columns = Object.keys(results.rows[0]).map(key => ({ header: key, key: key }));

    
    results.rows.forEach(row => {
      sheet.addRow(row);
    });

    
    const buffer = await workbook.xlsx.writeBuffer();

  
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=${tableName}.xlsx`);

    
    res.send(buffer);

  } catch (error) {
    console.error(error);
    res.status(500).send('Error al generar el archivo de Excel');
  }
});

const port = process.env.PORT || 5174;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});