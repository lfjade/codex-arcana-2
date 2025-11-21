const express = require('express')
const router = express.Router()
const db = require('../database/database.js')

router.get('/', async (req, res) => {
    try {
        const tags = await db.all(`
            SELECT
                idtag,
                nome
            FROM tags
            `)
        
        res.json(tags)
    } catch (err) {
        console.error("Erro no get rotaTags /")
        res.status(500).json({erro: "Erro interno no servidor."})
    }
})

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id

        const tag = await db.get(`
            SELECT
                idtag,
                nome
            FROM tags
            WHERE idtag = ?
            `, [id])

        if (!tag) {
            return res.status(404).json({erro: "Tag não encontrada."})
        }

        res.json(tag)
        
    } catch (err) {
        console.error("Erro no GET /tags/:id:", err)
        res.status(500).json({erro: "Erro interno no servidor."})
    }
})

router.post('/', async (req, res) => {
    try {
        const { nome } = req.body

        if (!nome) {
            return res.status(400).json({erro: "Não é possível registrar uma tag sem nome."})
        }

        const resultado = await db.run(`
            INSERT INTO tags (nome)
            VALUES (?)
            `, [nome])

        res.status(201).json({
            mensagem: "Tag criada com sucesso.",
            id: resultado.lastInsertRowid
        })
    } catch (err) {
        console.error("Erro no POST da /tags: ", err)
        res.status(500).json({erro: "Erro interno no servidor."})
    }
})

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const { nome } = req.body

        const resultado = await db.run(`
            UPDATE tags
            SET nome = ?
            WHERE idtag = ?
            `, [nome, id])

        if (resultado.changes === 0) {
            return res.status(404).json({erro: "Tag não encontrada."})
        }

        res.json({
            mensagem: "Tag atualizada com sucesso!",
            id: Number(id)
        })

    } catch (err) {
        console.error("Erro no PUT de /tags/:id:", err)
        res.status(500).json({erro: "Erro interno no servidor."})
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const resultado = await db.run(`
            DELETE from tags
            WHERE idtag=?
            `, [id])

        if (resultado.changes===0){
            return res.status(404).json({ erro: "Tag não encontrada."})
        }

        res.json({mensagem: "Tag deletada com sucesso."})
        
    } catch (err) {
        console.error("Erro no DELETE /tags/:id:", err)
        res.status(500).json({erro: "Erro interno no servidor."})
    }
})

module.exports = router