import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const conexao = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    timezone: 'Z'
});

(async () => {

    try {
        const connection = await conexao.getConnection();

        

        const [rows] = await connection.query('SELECT 1 + 1 AS resultado');

        
        connection.release();
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
        console.log(error)
    }

})();  
export default conexao;