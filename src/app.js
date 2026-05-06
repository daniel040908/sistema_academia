import express from "express";
import cors from "cors";
import dotenv from "dotenv";
 
import authRoutes from "./routes/authRoutes.js";
import usuarioRoutes  from "./routes/usuarioRoutes.js";
import alunoRoutes from "./routes/alunoRoutes.js";
import instrutorRoutes from "./routes/instrutorRoutes.js";
import planoRoutes from "./routes/planoRoutes.js";
import treinoRoutes from "./routes/treinoRoutes.js";
import frequenciaRoutes from "./routes/frequenciaRoutes.js";
 
dotenv.config();
 
const app = express();
 
app.use(express.json());
 
app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://sistema-de-academia.vercel.app",
        ],
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: [
            "Content-Type",
            "Authorization",
            "ngrok-skip-browser-warning",
        ],
    })
);
 
app.get("/teste", (req, res) => {
    res.status(200).json({ msg: "Teste realizado com sucesso" });
}); 

app.get("/", (req, res) => {
    res.status(200).json({ msg: "Api funcionando" });
});

app.use("/auth", authRoutes);
app.use("/usuarios", usuarioRoutes);
app.use("/alunos", alunoRoutes);
app.use("/instrutores", instrutorRoutes);
app.use("/planos", planoRoutes);
app.use("/treinos", treinoRoutes);
app.use("/frequencias", frequenciaRoutes);
 
export default app;