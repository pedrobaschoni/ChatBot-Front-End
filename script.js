// Função que lida com o envio de mensagens
function sendMessage() {
    const input = document.getElementById('messageInput');
    const messageText = input.value.trim();

    if (messageText) {
        const messageElement = document.createElement('p');
        messageElement.textContent = messageText;
        document.getElementById('chatMessages').appendChild(messageElement);
        input.value = '';
        input.focus();
    }
}

// Enviar mensagem ao clicar no botão
document.getElementById('sendButton').addEventListener('click', sendMessage);

// Enviar mensagem ao pressionar a tecla Enter
document.getElementById('messageInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
        event.preventDefault(); // Impede o comportamento padrão de nova linha
    }
});

// Lida com a alternância da barra lateral
document.getElementById('toggleButton').addEventListener('click', function() {
    const sidebar = document.getElementById('sidebar');
    const fixedButtons = document.querySelector('.fixed-buttons'); // Seleciona os ícones

    sidebar.classList.toggle('collapsed');
    fixedButtons.classList.toggle('hidden'); // Alterna a visibilidade dos ícones
});

// Variáveis para o usuário ativo e a lista de chats
let activeUserName = null;  // Nenhum chat ativo inicialmente
const userList = document.getElementById('userList');
const activeUserDisplay = document.getElementById('activeUser');
const chatMessages = document.getElementById('chatMessages');
const messageInput = document.getElementById('messageInput');
const noChatsMessage = document.createElement('div');
noChatsMessage.classList.add('no-chats-message');
noChatsMessage.textContent = "Não há chats disponíveis. Crie um novo chat.";

// Inicializa o estado do chat ao carregar a página
function initializeChat() {
    chatMessages.innerHTML = '';
    chatMessages.appendChild(noChatsMessage);
    messageInput.disabled = true;
    document.getElementById('sendButton').disabled = true;
    document.getElementById('renameUserButton').disabled = true; // Desabilita o botão de renomear
}

// Chama a função de inicialização ao carregar a página
initializeChat();

// Lida com a troca de usuário ao clicar em um nome
userList.addEventListener('click', function(event) {
    if (event.target.tagName === 'LI') {
        activeUserName = event.target.getAttribute('data-username');
        activeUserDisplay.textContent = activeUserName;
        chatMessages.innerHTML = ''; 
        messageInput.disabled = false;
        document.getElementById('sendButton').disabled = false;

        // Destacar usuário ativo
        Array.from(userList.children).forEach(user => user.classList.remove('active-user'));
        event.target.classList.add('active-user');

        // Habilita o botão de renomear se um chat estiver ativo
        document.getElementById('renameUserButton').disabled = false;
    }
});

// Lida com o botão de adicionar usuário
document.getElementById('addUserButton').addEventListener('click', function() {
    // Calcula o limite de caracteres baseado na largura da barra lateral
    const sidebarWidth = document.querySelector('.sidebar').offsetWidth;
    const maxLength = Math.floor(sidebarWidth / 10); // Aproximadamente 10px por caractere

    const newUser = prompt(`Digite o nome do novo chat (máximo de ${maxLength} caracteres):`);
    if (newUser) {
        // Restringir o nome para o comprimento máximo
        const truncatedName = newUser.substring(0, maxLength);
        
        const newUserItem = document.createElement('li');
        newUserItem.textContent = truncatedName;
        newUserItem.setAttribute('data-username', truncatedName);

        newUserItem.addEventListener('click', function() {
            activeUserName = truncatedName;
            activeUserDisplay.textContent = activeUserName;
            chatMessages.innerHTML = ''; 
            messageInput.disabled = false;
            document.getElementById('sendButton').disabled = false;

            Array.from(userList.children).forEach(user => user.classList.remove('active-user'));
            newUserItem.classList.add('active-user');

            // Habilita o botão de renomear se um chat for selecionado
            document.getElementById('renameUserButton').disabled = false;
        });

        userList.appendChild(newUserItem);
        activeUserName = truncatedName;
        activeUserDisplay.textContent = activeUserName;
        chatMessages.innerHTML = ''; 
        messageInput.disabled = false;
        document.getElementById('sendButton').disabled = false;

        Array.from(userList.children).forEach(user => user.classList.remove('active-user'));
        newUserItem.classList.add('active-user');

        // Habilita o botão de renomear se um chat for selecionado
        document.getElementById('renameUserButton').disabled = false;
    }
});

// Lida com o botão de renomear usuário
document.getElementById('renameUserButton').addEventListener('click', function() {
    if (!activeUserName) {
        alert("Selecione um chat para renomear.");
        return; // Não faz nada se não houver chat selecionado
    }

    const newName = prompt("Digite o novo nome:", activeUserName);
    if (newName) {
        const activeUserItem = Array.from(userList.children).find(item => item.getAttribute('data-username') === activeUserName);
        if (activeUserItem) {
            activeUserItem.setAttribute('data-username', newName);
            activeUserItem.firstChild.nodeValue = newName;
            activeUserName = newName;
            activeUserDisplay.textContent = activeUserName;
        }
    }
});

// Lida com o botão de excluir usuário
document.getElementById('deleteUserButton').addEventListener('click', function() {
    if (!activeUserName) {
        alert("Selecione um chat para excluir.");
        return; // Não faz nada se não houver chat selecionado
    }

    const activeUserItem = Array.from(userList.children).find(item => item.getAttribute('data-username') === activeUserName);
    if (activeUserItem) {
        if (confirm("Tem certeza que deseja excluir este chat?")) {
            activeUserItem.remove(); 
            if (userList.children.length === 0) {
                chatMessages.innerHTML = '';
                chatMessages.appendChild(noChatsMessage);
                messageInput.disabled = true;
                document.getElementById('sendButton').disabled = true;
                document.getElementById('renameUserButton').disabled = true; // Desabilita o botão de renomear
            } else {
                activeUserName = userList.children[0].getAttribute('data-username');
                activeUserDisplay.textContent = activeUserName;
                chatMessages.innerHTML = '';
                messageInput.disabled = false;
                document.getElementById('sendButton').disabled = false;
                userList.children[0].classList.add('active-user');

                // Habilita o botão de renomear
                document.getElementById('renameUserButton').disabled = false;
            }
        }
    }
});

// Alternância de modo claro/escuro
document.getElementById('themeToggleButton').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');

    // Alterna os ícones
    const sunIcon = document.querySelector('.icon-sun');
    const moonIcon = document.querySelector('.icon-moon');
    if (document.body.classList.contains('dark-mode')) {
        sunIcon.style.display = 'inline'; // Mostra o ícone do sol
        moonIcon.style.display = 'none'; // Esconde o ícone da lua
    } else {
        sunIcon.style.display = 'none'; // Esconde o ícone do sol
        moonIcon.style.display = 'inline'; // Mostra o ícone da lua
    }
});
