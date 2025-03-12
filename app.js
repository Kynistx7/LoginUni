// Importa as funções necessárias do Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAjvf_F-Fm95JCVYaHeh0Pwh5Ti5o7jsdM",
    authDomain: "projetodelogin-22eca.firebaseapp.com",
    projectId: "projetodelogin-22eca",
    storageBucket: "projetodelogin-22eca.appspot.com",
    messagingSenderId: "867232437473",
    appId: "1:867232437473:web:d9a334e645667cdb9093a0",
    measurementId: "G-8D7EGJPKPW"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Função de login
window.login = function() {
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value.trim();

    if (!email || !senha) {
        alert("Preencha todos os campos!");
        return;
    }

    signInWithEmailAndPassword(auth, email, senha)
        .then((userCredential) => {
            const user = userCredential.user;

            // Salva o usuário no LocalStorage
            localStorage.setItem('user', JSON.stringify({ email: user.email }));

            console.log("Login bem-sucedido! Redirecionando...");

            // Redireciona para a página correta
            window.location.href = "https://kynistx7.github.io/MapUnianchietas/";  
        })
        .catch((error) => {
            console.error("Erro no login:", error);
            alert("Erro: " + traduzirErro(error.code));
        });
};

// Função de Cadastro
window.cadastrar = function() {
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value.trim();

    if (!email || !senha) {
        alert("Preencha todos os campos!");
        return;
    }

    createUserWithEmailAndPassword(auth, email, senha)
        .then(() => {
            alert("Cadastro realizado com sucesso!");
            window.location.href = 'index.html';
        })
        .catch((error) => {
            let errorMessage = traduzirErro(error.code);
            alert(errorMessage);
        });
};

// Função de Logout
window.logout = function() {
    signOut(auth)
        .then(() => {
            localStorage.removeItem('user');
            window.location.href = 'index.html';
        })
        .catch((error) => {
            alert("Erro ao sair: " + error.message);
        });
};

// Função para traduzir mensagens de erro do Firebase
function traduzirErro(codigo) {
    const erros = {
        "auth/wrong-password": "Senha incorreta!",
        "auth/user-not-found": "Usuário não encontrado!",
        "auth/email-already-in-use": "Este e-mail já está cadastrado!",
        "auth/weak-password": "A senha deve ter pelo menos 6 caracteres!",
        "auth/invalid-email": "Formato de e-mail inválido!",
        "auth/network-request-failed": "Erro de rede. Verifique sua conexão!",
        "auth/too-many-requests": "Muitas tentativas de login. Tente novamente mais tarde."
    };
    return erros[codigo] || "Ocorreu um erro, tente novamente.";
}

// Verificar se o usuário já está logado ao acessar o painel
if (window.location.pathname === "/MapUnianchietas/") {
    if (!localStorage.getItem('user')) {
        window.location.href = 'index.html';
    }
}
