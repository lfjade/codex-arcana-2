const express = require('express')
const router = express.Router()
const db=require('../database/database.js')

router.get('/', async (req, res) =>{
    try{
        const diarios = await db.all(`
            SELECT
                iddiario,
                titulo,
                texto,
                criado_em
            FROM diarios
            ORDER BY criado_em DESC
            `)

        res.json(diarios)
    } catch (err) {
        console.error("Erro no get rotaDiarios: /")
        res.status(500).json({erro: "Erro interno no servidor."})
    }
})

router.get('/:id', async (req, res) =>{
    try {
        const id = req.params.id

        const diario = await db.get(`
            SELECT
                iddiario,
                titulo,
                texto,
                criado_em
            FROM diarios
            WHERE iddiario = ?
            `, [id])

        if (!diario){
            return res.status(404).json({erro: "Diário não encontrado."})
        }

        res.json(diario)
    } catch (err) {
        console.error("Erro no get rotaDiarios: /:id ")
        res.status(500).json({erro: "Erro interno no servidor."})
    }
})

router.post('/', async (req, res) =>{
    try {
        const {titulo, texto} = req.body

        if (!titulo || !texto){
            return res.status(400).json({erro: "Não é possível registrar um diário sem título ou texto."})
        }

        const resultado = await db.run(`
            INSERT INTO diarios (titulo, texto)
            VALUES (?, ?)
            `, [titulo, texto])

        res.status(201).json({
            mensagem: "Diário criado com sucesso",
            id: resultado.lastInsertRowid
        })
    } catch (err){
        console.error("Erro no post rotaDiarios/", err)
        res.status(500).json({erro: "Erro interno no servidor."})
    }
})

router.put('/:id', async (req, res)=>{
    try {
        const id = req.params.id
        const {titulo, texto} = req.body

        const resultado = await db.run(`
            UPDATE diarios
            SET titulo = ?, texto = ?
            WHERE iddiario = ?
            `, [titulo, texto, id])

        if (resultado.changes===0){
            return res.status(404).json({erro: "Diário não encontrado."})
        }

        res.json({
            mensagem: "Diário atualizado com sucesso!",
            id: Number(id)
        })
    } catch (err) {
        console.error("Erro no put rotaDiarios")
        res.status(500).json({erro: "Erro interno no servidor."})
    }
})

router.delete('/:id', async (req, res) =>{
    try {
        const id = req.params.id
        const resultado = await db.run(`
            DELETE FROM diarios
            WHERE iddiario=?
            `, [id])

        if (resultado.changes===0){
            return res.status(404).json({ erro: "Diário não encontrado."})
        }

        res.json({mensagem: "Diário deletado com sucesso."})
    } catch (err) {
        console.error("Erro no delete rotaDiarios")
        res.status(500).json({erro: "Erro interno no servidor."})
    }
})

module.exports = router