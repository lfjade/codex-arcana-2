export default async function homeController() {
    console.log("Home Controller chamado")
    try {
        const fraseWelcomeData = await carregarWelcome()
        const fraseWelcome = document.getElementById('frase-welcome')

        fraseWelcome.innerText = fraseWelcomeData.frase
        
    } catch (err){
        console.error(err)
    }
    
}

async function carregarWelcome() {
    const res = await fetch ('http://localhost:3000/hecate/frase-welcome')
    if (!res.ok) throw new Error ("Falha no fetch hecate/frase-welcome")
    return await res.json()
}