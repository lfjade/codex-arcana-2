const express = require('express')
const router = express.Router()
const db = require('../database/database.js')

router.get('/', async (req, res) => {
    try {
        const componentes = await db.all(`
            SELECT idcomponente, nome
            FROM componentes
            `)

        res.json(componentes)
    } catch (err) {
        console.error("Erro no get rotaComponentes: /")
        res.status(500).json({erro: "Erro interno no servidor."})
    }
})

router.get('/:id', async (req, res) => {
    try {
        const id=req.params.id

        const componente = await db.get(`
                SELECT
                    idcomponente,
                    nome
                FROM componentes
                WHERE idcomponente = ?
            `, [id])

        if (!componente) {
            return res.status(404).json({erro: "Componente não encontrado."})
        }
        
        res.json(componente)

    } catch (err) {
        console.error("Erro no get de rotaComponentes /id.", err)
        res.status(500).json({erro: "Erro interno no servidor."})
    }
})

router.post('/', async (req, res) => {
    try {
        const {nome} = req.body

        if (!nome){
            return res.status(400).json({erro: "Não é possível registrar um componente sem nome."})
        }

        const resultado = await db.run(`
            INSERT INTO componentes (nome)
            VALUES (?)
            `, [nome])

        res.status(201).json({
            mensagem: "Componente criado com sucesso!",
            id: resultado.lastInsertRowid
        })

    } catch (err) {
        console.error("Erro no post de componentes: ", err)
        res.status(500).json({erro: "Erro interno no servidor."})
    }
})

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const {nome} = req.body
        const resultado = await db.run(`
            UPDATE componentes
            SET nome = ?
            WHERE idcomponente = ?
            `, [nome, id])

        if (resultado.changes===0){
            return res.status(404).json({erro: "Componente não encontrado."})
        }

        res.json({
            mensagem: "Componente atualizado com sucesso!",
            id: Number(id)
        })

    } catch (err) {
        console.error("Erro no put de componentes: ", err)
        res.status(500).json({erro: "Erro interno no servidor."})
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const resultado = await db.run(`
            DELETE FROM componentes
            WHERE idcomponente=?
            `, [id])

        if (resultado.changes===0){
            return res.status(404).json({erro: "Componente não encontrado."})
        }

        res.json({mensagem: "Componente excluído com sucesso!"})
    } catch (err) {
        console.error("Erro no delete de componentes: ", err)
        res.status(500).json({erro: "Erro interno no servidor."})
    }
})

module.exports = router