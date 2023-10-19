const socket = io();

socket.on('connect', () => {
  console.log('conectado')
})

socket.on('disconnect', () => {
  console.log('desconectado')
})