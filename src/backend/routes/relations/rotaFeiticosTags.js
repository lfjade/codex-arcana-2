const express = require('express')
const router = express.Router()
const db = require('../../database/database.js')

router.get('/:id/tags', async (req, res) => {
    try {
        const idFeitico = req.params.id

        const tags = await db.all(`
            SELECT t.idtag, t.nome
            FROM tags t
            JOIN feiticos_has_tags fht
            ON t.idtag=fht.idtag
            WHERE fht.idfeitico = ?
            `, [idFeitico])

            res.json(tags)

    } catch (err) {
        console.error("Erro GET /feiticos/:id/tags: ", err)
        res.status(500).json({erro: "Erro ao listar tags do feitiço."})
    }
})

router.post('/:id/tags/:idtag', async (req, res) => {
    try {
        const idFeitico = req.params.id
        const idTag = req.params.idtag

        await db.run(`
            INSERT INTO feiticos_has_tags (idfeitico, idtag)
            VALUES (?, ?)
            `, [idFeitico, idTag])

        res.status(201).json({
            mensagem: "Tag adicionada ao feitiço.",
            feitico: Number(idFeitico),
            tag: Number(idTag)
        })

    } catch (err) {
        console.error("Erro no POST /:id/tags/:idtag: ", err)
        res.status(500).json({ erro: "Erro ao relacionar tag ao feitiço. "})
    }
})

router.delete('/:id/tags/:idtag', async (req, res) => {
    try {
        const idFeitico = req.params.id
        const idTag = req.params.idtag

        const resultado = await db.run(`
            DELETE FROM feiticos_has_tags
            WHERE idfeitico = ?
            AND idtag = ?
            `, [idFeitico, idTag])

        if (resultado.changes===0){
            return res.status(404).json({erro: "Relação não encontrada."})
        }

        res.json({
            mensagem: "Tag removida do Feitiço.",
            feitico: Number(idFeitico),
            tag: Number(idTag)
        })
    } catch (err) {
        console.error("Erro DELETE /:id/tags/:idtag: ", err)
        res.status(500).json({ erro: "Erro ao remover tag do feitiço. "})
    }
})

module.exports = router