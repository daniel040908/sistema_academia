import dotenv from "dotenv";
import app from "./src/app.js";
import "./src/config/db.js";

import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./src/swagger.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

// 🔥 ROTA DO SWAGGER
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`Swagger disponível em http://localhost:${PORT}/docs`);
});
    

