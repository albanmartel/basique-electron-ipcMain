// Ceci fonctionnera dans un processus de rendu, mais sera `undefined`
// dans le processus principal :
/*
const test = require('electron').remote.require('./test')

let syncBtn  = document.querySelector('#syncBtn')
let asyncBtn = document.querySelector('#asyncBtn')
let replyDiv = document.querySelector('#reply')

let message = 'A sync message to main'
syncBtn.addEventListener('click', function() {
  alert(message)
  test.messagePrint(message)
  replyDiv.innerHTML = message
})
*/
// Dans le processus de rendu (page web).
/*
const { ipcRenderer } = require('electron')
console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // affiche "pong"

ipcRenderer.on('asynchronous-reply', (event, arg) => {
  console.log(arg) // affiche "pong"
})
ipcRenderer.send('asynchronous-message', 'ping')
*/
// renderer process
//const { ipcRenderer } = require('electron')
//const ipcRenderer = require('electron').ipcRenderer
//let stock = require('./test.js').stock

//const {ipcRenderer} = require('electron')
const ipcRenderer = window.ipcRenderer

function eventActivate(arg1, arg2){
  arg1.innerHTML = arg2
}

let syncBtn  = document.querySelector('#syncBtn')
let asyncBtn = document.querySelector('#asyncBtn')
let replyDiv = document.querySelector('#reply')
let replyRendererDiv = document.querySelector('#renderActivate')
eventActivate(replyRendererDiv, "renderer.js est actif")

let replySync = ""


syncBtn.addEventListener("click", function(){
  eventActivate(replyDiv, 'bouton synchronous activé')
  console.log('bouton synchronous activé')
  console.log(replySync = ipcRenderer.sendSync('synchronous-message', 'ping synchrone'))
  eventActivate(replyDiv, replySync)
})

asyncBtn.addEventListener("click", function(){
  eventActivate(replyDiv, 'bouton asynchronous activé')
  console.log('bouton asynchronous activé')
  console.log(ipcRenderer.send('asynchronous-message', 'ping asynchrone'))
})

// Dans le processus de rendu (page web).
console.log(ipcRenderer.sendSync('synchronous-message', 'message synchrone de la vue')) // affiche "pong"

ipcRenderer.on('asynchronous-reply', (event, arg) => {
  console.log(arg)
  eventActivate(replyDiv, arg) // affiche "pong asynchrone"
})
ipcRenderer.send('asynchronous-message', 'message asynchrone de la vue')
ipcRenderer.on('synchronous-reply', (event, arg) => {
  console.log(arg)
  eventActivate(replyDiv, arg) // affiche "pong synchrone"
})
