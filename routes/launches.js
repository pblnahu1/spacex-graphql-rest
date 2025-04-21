// rutas rest

import express from "express";
const router = express.Router();
import {getLaunches, getLaunchById } from "../services/spacex.js";
import { formatSuccess } from "../utils/formatter.js";

router.get("/", async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    try {
        const launches = await getLaunches(limit);
        
        const formattedLaunches = launches.map(launch => ({
            ...launch,
            success: formatSuccess(launch.success),
        }))

        res.json(formattedLaunches);
    } catch (error) {
        res.status(500).json({
            error: "Error al obtener lanzamientos"
        })
    }
})

router.get("/:id", async (req,res)=>{
    try {
        const launch = await getLaunchById(req.params.id);
        res.json(launch);
    } catch (error) {
        res.status(404).json({
            error: "Lanzamiento no encontrado"
        })
    }
})

export default router;