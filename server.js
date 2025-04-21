// creo el servidor express con graphql

import express from "express";
import morgan from "morgan";
import cors from "cors";

import graphqlConfig from "./graphql/index.js";
import launchesRoutes from "./routes/launches.js";
import { graphqlHTTP } from "express-graphql";

const app = express()

app.use(express.json()) //soporte json
// app.use(express.urlencoded(true));
app.use(cors()) // habilito cors
app.use(morgan("dev")) // logger http

// rest
app.use("/api/launches", launchesRoutes);

// graphql
app.use("/graphql", graphqlHTTP(graphqlConfig));

app.get("/", (req,res)=>{
    res.send("API SpaceX funcionado - /api/launches (REST), /graphql (GraphQL)");
});

const PORT = 4000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log(`GraphQL corriendo en http://localhost:${PORT}/graphql`)
    console.log(`REST corriendo en http://localhost:${PORT}/api/launches`)
})