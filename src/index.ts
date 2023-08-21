import express = require("express");
import routes from "./routes";
import { AppDataSource } from "./data-source"; 
import cors = require("cors");

const app = express()

app.use(cors()); 
app.use(express.json())
app.use(routes)

AppDataSource
  .initialize()
  .then(() => {
    console.log("Conexão com o banco de dados estabelecida");
    
    // Inicie o servidor Express
    app.listen(8888, () => {
      console.log("Servidor Express iniciado");
    });
  })
  .catch(error => {
    console.error("Erro ao conectar ao banco de dados:", error);
    process.exit(1);
  });