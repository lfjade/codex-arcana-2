const express = require('express')
const router = express.Router()
const db = require('../../database/database.js')

router.get('/:id/componentes', async (req, res) => {
    try {
        const idFeitico = req.params.id

        const componentes = await db.all(`
            SELECT c.idcomponente, c.nome
            FROM componentes c
            JOIN feiticos_has_componentes fhc
            ON c.idcomponente=fhc.idcomponente
            WHERE fhc.idfeitico = ?
            `, [idFeitico])

            res.json(componentes)

    } catch (err) {
        console.error("Erro GET /feiticos/:id/componentes: ", err)
        res.status(500).json({ erro: "Erro ao listar componentes do feitiço."})
    }
})

router.post('/:id/componentes/:idcomponente', async (req, res) => {
    try {
        const idFeitico = req.params.id
        const idComponente = req.params.idcomponente

        await db.run(`
            INSERT INTO feiticos_has_componentes (idfeitico, idcomponente)
            VALUES (?, ?)
            `, [idFeitico, idComponente])

        res.status(201).json({
            mensagem: "Componente adicionado ao feitiço.",
            feitico: Number(idFeitico),
            componente: Number(idComponente)
        })

    } catch (err) {
        console.error("Erro POST feiticos/:id/componentes/:idcomponente: ", err)
        res.status(500).json({ erro: "Erro ao relacionar componente ao feitiço."})
    }
})

router.delete('/:id/componentes/:idcomponente', async (req, res) => {
    try {
        const idFeitico = req.params.id
        const idComponente = req.params.idcomponente

        const resultado = await db.run(`
            DELETE FROM feiticos_has_componentes
            WHERE idfeitico = ?
            AND idcomponente = ?
            `, [idFeitico, idComponente])

        if (resultado.changes===0) {
            return res.status(404).json({erro: "Relação não encontrada."})
        }

        res.json({
            mensagem: "Componente removido do feitiço.",
            feitico: Number(idFeitico),
            componente: Number(idComponente)
        })

    } catch (err) {
        console.error("Erro DELETE /feiticos/:id/componentes/:idcomponente: ", err)
        res.status(500).json({erro: "Erro ao remover componente do feitiço."})
    }
})

module.exports = router