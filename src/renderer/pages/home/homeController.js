export default async function homeController() {
    console.log("Home Controller chamado")
    const fraseWelcome = document.getElementById('frase-welcome')
    if (fraseWelcome){
        fetch('http://localhost:3001/frase-welcome')
        .then(res => res.json())
        .then (data=>{
            fraseWelcome.textContent=data.frase
        })
        .cacth (err => {
            console.error(err)
            fraseWelcome.textContent="Canalização falhou."
        })
    }
}