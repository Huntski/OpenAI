const state = {
    messages: [],

    user: {
        name: 'User',
    },

    bot: {

    },
};

const chatContainer = document.getElementById('chat');
const inputField = document.getElementById('input-field');
const sendButton = document.getElementById('send-button');

let activeAIMessage = undefined;
let isWriting = false;

function showAIWriting() {
    isWriting = true;

    activeAIMessage = document.createElement('div');
    activeAIMessage.className = 'message transition-all w-18 text-sm font-bold py-1 px-2 text-white border bg-blue-500 rounded-md message-left mr-auto'

    activeAIMessage.innerHTML = writingAnimationElement();

    chatContainer.append(activeAIMessage);
}

function addAIMessage(message) {
    state.messages.push(message);

    setTimeout(() => {
        activeAIMessage.innerHTML = `<span>${message}</span>`
        // element.classList.remove('w-18')
        activeAIMessage.classList.add('w-1/2')
    }, 300);
}

function addUserMessage(message) {
    state.messages.push(message);

    const element = document.createElement('div');
    element.innerHTML = `
        <div class="message w-1/2 text-sm p-1 text-white border bg-green-600 rounded-md message-left ml-auto">
            <span class="px-1 font-bold">${message}</span>
        </div>
    `;

    chatContainer.append(element);
}

async function sendRequest(message) {
    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", `http://localhost:3000/question?q=${message}`, true);

    xhttp.onreadystatechange = function() {
        if(xhttp.readyState == 4 && xhttp.status == 200) {
            const response = JSON.parse(xhttp.responseText);
            if (response === undefined || isWriting === false) return;
            console.log('response data', response.data)
            addAIMessage(response.data)
        }
    }

    xhttp.send();
}

inputField.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        sendUserRequest();
    }
})

sendButton.addEventListener('click', () => {
    sendUserRequest();
})

function writingAnimationElement() {
	return `
	<div class="typing-animation">
		<div></div>
		<div></div>
		<div></div>
	</div>`
}


function sendUserRequest() {

    const value = inputField.value;

    addUserMessage(value);

    inputField.blur();
    inputField.value = '';

    setTimeout(() => {
        showAIWriting();
        sendRequest(value);
    }, 500);
}
