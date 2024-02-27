const { Pool } = require('pg');
require("dotenv").config();


// PostgreSQL 데이터베이스 연결 정보
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'study_cafe',
  password: process.env.DB_PW,
  port: 5432, // PostgreSQL 기본 포트
});

async function getSeats() {
  const client = await pool.connect();
  const result = await client.query('SELECT * FROM seats ORDER BY seat_number ASC;');
  client.release();
  return result.rows;
}

async function addSeats(seatNumber) {
  const client = await pool.connect();
  const query = `UPDATE seats SET status = 1 WHERE seat_number = $1`;
  const values = [seatNumber];
  await client.query(query, values);
  client.release();
  return true;
}

async function delSeats(seatNumber) {
  const client = await pool.connect();
  const query = `UPDATE seats SET status = 0 WHERE seat_number = $1`;
  const values = [seatNumber];
  await client.query(query, values);
  client.release();
  return true;
}

async function GetUser(name, phone, password) {
  const client = await pool.connect();
  const query = `INSERT INTO users (name, phone, password) VALUES ($1, $2, $3)`;
  const values = [name, phone, password];
  await client.query(query, values);
  client.release();
  return true;
}

module.exports = { getSeats, addSeats, delSeats, GetUser };
