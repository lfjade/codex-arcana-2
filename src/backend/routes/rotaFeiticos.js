const express = require('express')
const router = express.Router()
const db = require('../database/database.js')

router.get('/', async (req, res) => {
    try {
        const feiticos = await db.all(`
            SELECT 
                idfeitico,
                titulo,
                ritualistica
            FROM feiticos
            `)

        res.json(feiticos)
    } catch (err) {
        console.error("Erro no GET / Feiticos:", err)
        res.status(500).json({erro: "Erro interno no servidor."})
    }
})

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id

        const feitico = await db.get(`
            SELECT 
                idfeitico,
                titulo,
                ritualistica
            FROM feiticos
            WHERE idfeitico = ?
            `, [id])

        if (!feitico) {
            return res.status(404).json({ erro: "Feitiço não encontrado."})
        }

        res.json(feitico)
        
    } catch (err) {
        console.error("Erro no GET /feitiços/:id", err)
        res.status(500).json({erro: "Erro interno no servidor."})
    }
})

router.post('/', async (req, res) => {
    try {
        const {titulo, ritualistica} = req.body

        if (!titulo || !ritualistica) {
            return res.status(400).json({erro: "Não é possível registrar um feitiço sem título ou texto."})
        }

        const resultado = await db.run (`
            INSERT INTO feiticos (titulo, ritualistica)
            VALUES (?, ?)
            `, [titulo, ritualistica])

        res.status(201).json({
            mensagem: "Feitiço criado com sucesso!",
            id: resultado.lastInsertRowid
        })

    } catch (err) {
        console.error("Erro no POST /feiticos", err)
        res.status(500).json({erro: "Erro interno no servidor."})
    }
})

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const {titulo, ritualistica} = req.body

        const resultado = await db.run(`
            UPDATE feiticos
            SET titulo = ?, ritualistica = ?
            WHERE idfeitico = ?
            `, [titulo, ritualistica, id])

        if (resultado.changes===0){
            return res.status(404).json({erro: "Feitiço não encontrado."})
        }

        res.json({
            mensagem: "Feitiço atualizado com sucesso!",
            id: Number(id)
        })

    } catch (err) {
        console.error("Erro no PUT /feiticos/:id:", err)
        res.status(500).json({erro: "Erro interno no servidor."})
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const resultado = await db.run(`
            DELETE FROM feiticos
            WHERE idfeitico=?
            `, [id])

        if (resultado.changes===0){
            return res.status(404).json({erro: "Feitiço não encontrado."})
        }

        res.json({mensagem: "Feitiço deletado com sucesso."})
        
    } catch (err) {
        console.error("Erro no DELETE /feiticos/:id:", err)
        res.status(500).json({erro: "Erro interno no servidor."})
    }
})

module.exports = router