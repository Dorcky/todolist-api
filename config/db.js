import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Vérifiez la connexion à la base de données
(async () => {
  try {
    const connection = await db.getConnection();
    console.log('Connected to the database');
    connection.release();
  } catch (error) {
    console.error('Database connection failed:', error);
  }
})();

export default db;
