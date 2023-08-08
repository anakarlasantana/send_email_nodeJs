import bodyParser = require("body-parser");
import express = require("express");
import routes from "./routes";
import { createConnection } from "typeorm";

const app = express()

app.use(bodyParser.json())
app.use(routes)
createConnection();


app.listen(8888);