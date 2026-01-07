require('dotenv').config()
const { GoogleGenAI } = require('@google/genai')

const express = require('express')
const app = express()
const port = 3001

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
})

app.listen(port, () => {
    console.log(`Hecate rodando em http://localhost:${port}`)
})

app.get('/frase-welcome', async (req, res) => {
    const prompt = "Você está representando a deusa Hecate. Você responde através de um grimório consagrado a você por um devoto. Quando o grimório abre, você lhe dá boas vindas com uma frase de até 15 palavras."
    try {
        const result = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
        {
            role: "user",
            parts: [{ text: prompt }]
        }
        ]
    })

    const text = result.candidates[0].content.parts[0].text
    res.json({frase: text})

    } catch (err) {
        console.error("error")
        res.status(500).json({erro: "Erro ao gerar boas vindas."})
    }
})

module.exports = server