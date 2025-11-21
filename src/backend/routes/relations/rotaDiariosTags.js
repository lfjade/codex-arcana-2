// melhor estrutura REST para nxn: get /diarios/:id/tags, post /diarios/:id/tags/:idTag, delete /diarios/:id/tags/:idTag

const express = require('express')
const router= express.Router()
const db = require('../../database/database.js')

router.get('/:id/tags', async (req, res) => {
    try {
        const idDiario = req.params.id

        const tags = await db.all(`
                SELECT t.idtag, t.nome
                FROM tags t
                JOIN diarios_has_tags dht ON t.idtag=dht.idtag
                WHERE dht.iddiario = ?
            `, [idDiario])

        res.json(tags)

    } catch (err) {
        console.error("Erro GET /diarios/:id/tags:", err)
        res.status(500).json({erro: "Erro ao listar tags do diário."})
    }
})

router.post('/:id/tags/:idtag', async (req, res) => {
    try {
        const idDiario = req.params.id
        const idTag = req.params.idtag

       await db.run(`
            INSERT INTO diarios_has_tags (iddiario, idtag)
            VALUES (?, ?)
        `, [idDiario, idTag])


        res.status(201).json({
            mensagem: "Tag adicionada ao diário.",
            diario: Number(idDiario),
            tag: Number(idTag)
        })

    } catch (err) {
        console.error("Erro POST /diarios/:id/tags/:idTag: ", err)
        res.status(500).json({ erro: "Erro ao relacionar tag ao diário." });
    }
})

router.delete('/:id/tags/:idtag', async (req, res) => {
    try {
        const idDiario = req.params.id
        const idTag = req.params.idtag

        const resultado = await db.run(`
            DELETE FROM diarios_has_tags
            WHERE iddiario = ?
            AND idtag = ?
            `, [idDiario, idTag])
        
        if (resultado.changes===0) {
            return res.status(404).json({erro: "Relação não encontrada."})
        }
        
        res.json({
            mensagem: "Tag removida do diário.",
            diario: Number(idDiario),
            tag: Number(idTag)
        })
    } catch (err) {
        console.error("Erro DELETE /diarios/:id/tags/:idTag:", err)
        res.status(500).json({ erro: "Erro ao remover tag do diário." })
    }
})

module.exports = router