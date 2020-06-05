const form = document.querySelector("form");
const input = document.querySelector(".input");
const messages = document.querySelector(".messages");
const username = prompt("Svp entrez un nom d'utilisateur", "");
const socket = io(); // call function
console.log("username");



form.addEventListener("submit", function(event){ // when submitted, add to form this function - take the username in the input

    event.preventDefault();

    addMessage(username + ": " + input.value);

    socket.emit("chat_message",{
        message: input.value // add for telling to server when i send a message
    });

    input.value = "";
    return false;

}, false);

// add listeners from client side for event that comes on the server / chat + join + left
socket.on("chat_message", function(data){
    addMessage(data.username + ": " + data.message);
});

socket.on("user_join", function(data){
    addMessage(data+ " viens de rejoindre le chat!");
});

socket.on("user_leave", function(data){
    addMessage(data + " a quitté le chat.");
});

addMessage("Vous avez rejoint le chat en tant que '" + username + "'.");
socket.emit("user_join", username);  // tell to servers and other that we joined

function addMessage(message){  // put this in li with username
    console.log(input.value);
    const li = document.createElement("li");
    li.innerHTML = message; 
    messages.appendChild(li);
    window.scrollTo(0, document.body.scrollHeight);
}