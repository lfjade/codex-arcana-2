const { contextBridge, ipcRenderer } = require("electron");
const servidor = "http://localhost:3000"

async function apiRequest (method, url, data) {
    try {
        const opcoes = {
            method,
            headers: { "Content-Type": "application/json"}
        }

        if (data) {
            opcoes.body=JSON.stringify(data)
        }

        const res = await fetch (url, opcoes)
        return res.json()

    } catch (err) {
        console.error(`Erro no ${method} ${url}: `, err)
        throw err
    }
}

const apiGet = (url) => apiRequest("GET", url)
const apiPost = (url, data) => apiRequest("POST", url, data)
const apiPut = (url, data) => apiRequest("PUT", url, data)
const apiDelete = (url) => apiRequest("DELETE", url)

function criarCRUD(endpoint) {
    return {
        listar: () => apiGet(`${servidor}/${endpoint}`),
        obter: (id) => apiGet(`${servidor}/${endpoint}/${id}`),
        criar: (data) => apiPost(`${servidor}/${endpoint}`, data),
        editar: (id, data) => apiPut(`${servidor}/${endpoint}/${id}`, data),
        deletar: (id) => apiDelete(`${servidor}/${endpoint}/${id}`)
    }
}

function criarRelacionamento(principal, secundario) {
    return {
        listar: (id) => apiGet(`${servidor}/${principal}/${id}/${secundario}`),
        adicionar: (id, idSec) => apiPost(`${servidor}/${principal}/${id}/${secundario}/${idSec}`),
        remover: (id, idSec) => apiDelete(`${servidor}/${principal}/${id}/${secundario}/${idSec}`)
    }
}

const diarios = criarCRUD("diarios")
const feiticos = criarCRUD("feiticos")
const tags = criarCRUD("tags")
const componentes = criarCRUD("componentes")

const diariosTags = criarRelacionamento("diarios", "tags")
const feiticosTags = criarRelacionamento("feiticos", "tags")
const feiticosComponentes = criarRelacionamento("feiticos", "componentes")

contextBridge.exposeInMainWorld('api', {
    diarios,
    feiticos,
    tags,
    componentes,
    diariosTags,
    feiticosTags,
    feiticosComponentes,
    fecharApp: () => ipcRenderer.send('fechar'),
    irParaPagina: (pagina) => ipcRenderer.send('ir-para-pagina', pagina)
})

contextBridge.exposeInMainWorld('secure', {
    getPw: async () => await ipcRenderer.invoke('get-pw'),
    navigate: (page) => {ipcRenderer.send('navigate', page)}
})

