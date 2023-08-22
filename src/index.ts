import express = require("express");
import routes from "./routes";
import { AppDataSource } from "./data-source"; 
import cors = require("cors");

const app = express()

app.use(cors()); 
app.use(express.json())
app.use(routes)

const port = process.env.PORT || 8888; // Use a porta atribuída pelo Netlify ou 8888 por padrão

AppDataSource
  .initialize()
  .then(() => {
    console.log("Conexão com o banco de dados estabelecida");
    
    app.listen(port, () => {
      console.log(`Servidor Express iniciado na porta ${port}`);
    });
  })
  .catch(error => {
    console.error("Erro ao conectar ao banco de dados:", error);
    process.exit(1);
  });