const express = require('express')
const cors = require('cors')

const rotaDiarios = require('./routes/rotaDiarios.js')
const rotaFeiticos = require('./routes/rotaFeiticos.js')
const rotaComponentes = require('./routes/rotaComponentes.js')
const rotaTags = require('./routes/rotaTags.js')
const rotaDiariosTags = require('./routes/relations/rotaDiariosTags.js')
const rotaFeiticosTags = require('./routes/relations/rotaFeiticosTags.js')
const rotaFeiticosComponentes = require('./routes/relations/rotaFeiticosComponentes.js')
const rotaHecate = require('./routes/rotaHecate.js')

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())
app.use('/diarios', rotaDiarios)
app.use('/feiticos', rotaFeiticos)
app.use('/componentes', rotaComponentes)
app.use('/tags', rotaTags)
app.use('/diarios', rotaDiariosTags)
app.use('/feiticos', rotaFeiticosTags)
app.use('/feiticos', rotaFeiticosComponentes)
app.use('/hecate', rotaHecate)

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})
