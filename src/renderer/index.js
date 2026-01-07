// bootstrap - inicia todos os módulos ao inicializar o programa
import initLogin from "./pages/login/loginController.js";
import nav from "../main/nav.js";
import homeController from "./pages/home/homeController.js";

const modulos = [
    initLogin,
    nav,
    homeController
]

document.addEventListener('DOMContentLoaded', async () =>{
    for (const modulo of modulos) {
        await modulo()
    }
})