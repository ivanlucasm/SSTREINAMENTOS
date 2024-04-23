document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const username = loginForm.uname.value;
        const password = loginForm.psw.value;

        await checkUser(username, password);
    });

    async function checkUser(username, password) {

       let api = "https://script.google.com/macros/s/AKfycbz1S9yAuyQnxVj6Pg2VRDSxVw4Hv7QFyQsbpXB5xm2fRfaVxU2QUsdXPd1sU6qstxlWGQ/exec";
    
        fetch(api)
        try {
            const res = await fetch(api);
            const data = await res.json();
    
            let users = data.dados;
    
            const authenticatedUser = users.find(user => user[1] === username && user[2] === password);
    
            if (authenticatedUser) {
                console.log("Usuário autenticado ", authenticatedUser);
                window.location.href = "./MenuAdministrador.html";
                
                errorContainer.style.display = "none";
    
            } else {
                console.log("Usuário não autenticado. Verifique o login e senha");
    
                const errorContainer = document.createElement("div");
                errorContainer.className = "error";
                errorContainer.textContent = "Credenciais inválidas. Verifique o login e senha";
                loginForm.appendChild(errorContainer);
            }
        } catch (error) {
            console.error("Erro ao buscar dados: ", error);
        }
    }

});

