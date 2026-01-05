export default async function initLogin(){
    console.log('[LOGIN] initLogin chamado');
    const pwInput = document.getElementById('pw')
    if (!pwInput) return

    const expectedPw = await window.secure.getPw()

    let timeout

    pwInput.addEventListener('input', () =>{
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            if (pwInput.value === expectedPw) {
                window.secure.navigate('home')
            }
        }, 500)
    })
}