export default function nav(){
    console.log("nav chamado")
    const btnFechar = document.getElementById('fechar')
    if (btnFechar) btnFechar.addEventListener('click', () => window.api.fecharApp())

    // const fraseWelcome = document.getElementById('frase-welcome')
    // aqui vai entrar a ia
    const linkFeiticos = document.getElementById('link-feiticos')
    if (linkFeiticos) linkFeiticos.addEventListener('click', () => window.api.irParaPagina('feiticos'))

    const linkDiarios = document.getElementById('link-diarios')
    if (linkDiarios) linkDiarios.addEventListener('click', () => window.api.irParaPagina('diarios'))

    const linkClame = document.getElementById('link-clame')
    if (linkClame) linkClame.addEventListener('click', () => window.api.irParaPagina('clame'))
}