import express from 'express';
import cors from 'cors';
import { router } from './routes';

//cria servidor express
const server = express();
// configura o servidor para aceitar requisições de outros dominios
server.use(cors());
// configura o servidor para aceitar requisições no formato JSON
server.use(express.json());

//configurando rotas no servidor
server.use(router);

//exportar o servidor
export { server };