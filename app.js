// Importa as funções necessárias do Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    GoogleAuthProvider, // Importe o GoogleAuthProvider
    signInWithPopup // Importe signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
// Importe o Firestore
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

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
// Inicializa o Firestore
const db = getFirestore(app);

const loadingIndicator = document.createElement('div');
loadingIndicator.textContent = 'Carregando...';
loadingIndicator.style.display = 'none';
document.body.appendChild(loadingIndicator);

// Função de login com Google
window.loginComGoogle = function() {
    loadingIndicator.style.display = 'block';
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            localStorage.setItem('user', JSON.stringify({ email: user.email }));
            console.log("Login com Google bem-sucedido! Redirecionando...");
            window.location.href = "https://kynistx7.github.io/MapUniachietas/#";
            loadingIndicator.style.display = 'none';
        })
        .catch((error) => {
            console.error("Erro no login com Google:", error);
            alert("Erro ao fazer login com Google: " + traduzirErro(error.code));
            loadingIndicator.style.display = 'none';
        });
};

// Função de login com email e senha
window.login = function() {
    loadingIndicator.style.display = 'block';
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value.trim();

    if (!email || !senha) {
        alert("Preencha todos os campos!");
        loadingIndicator.style.display = 'none';
        return;
    }

    signInWithEmailAndPassword(auth, email, senha)
        .then((userCredential) => {
            const user = userCredential.user;
            localStorage.setItem('user', JSON.stringify({ email: user.email }));
            console.log("Login bem-sucedido! Redirecionando...");
            window.location.href = "https://kynistx7.github.io/MapUniAnchieta/";
            loadingIndicator.style.display = 'none';
        })
        .catch((error) => {
            console.error("Erro no login:", error);
            alert("Erro: " + traduzirErro(error.code));
            loadingIndicator.style.display = 'none';
        });
};

window.cadastrar = function() {
    loadingIndicator.style.display = 'block';
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value.trim();

    if (!email || !senha) {
        alert("Preencha todos os campos!");
        loadingIndicator.style.display = 'none';
        return;
    }

    createUserWithEmailAndPassword(auth, email, senha)
        .then(() => {
            alert("Cadastro realizado com sucesso!");
            window.location.href = 'https://kynistx7.github.io/LoginUni/';
            loadingIndicator.style.display = 'none';
        })
        .catch((error) => {
            let errorMessage = traduzirErro(error.code);
            alert(errorMessage);
            loadingIndicator.style.display = 'none';
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
    return erros[codigo] || "Senha incorret.";
}

// Verificar se o usuário já está logado ao acessar o painel
if (window.location.href.includes("MapUnianchietas")) {
    console.log(window.location.href);
    if (!localStorage.getItem('user')) {
        window.location.href = 'https://kynistx7.github.io/MapUniachietas/';
    }
}