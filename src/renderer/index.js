// bootstrap - inicia todos os módulos ao inicializar o programa
import initLogin from "./pages/login/loginController.js";

console.log('[LOGIN] index.js carregado');

document.addEventListener('DOMContentLoaded', () =>{
    initLogin()
})