import { Socket } from "socket.io"

export const socketController = (socket = new Socket) => {
  // console.log('cliente conectado', socket.id)


  // socket.emit('last-ticket', ticketControl.last)
  // socket.emit('pending-tickets', ticketControl.tickets.length)
  

  // socket.on('next-ticket', (payload, callback) => {
  //   const next = ticketControl.nextTicket()
  //   callback(next)
  //   socket.broadcast.emit('pending-tickets', ticketControl.tickets.length)

  //   // TODO: Recordar que hay un nuevo ticket
  // })

  // socket.on('attend-ticket', ({cubicle}, callback) => {
  //   if(!cubicle) return callback({
  //     ok: false,
  //     message: 'El cubículo es obligatorio,'
  //   })

  //   const ticket = ticketControl.AttendTicket(cubicle)
  //   socket.broadcast.emit('current-ticket-status', ticketControl.last4)
  //   socket.emit('pending-tickets', ticketControl.tickets.length)
  //   socket.broadcast.emit('pending-tickets', ticketControl.tickets.length)

  //   if(!ticket) return callback({
  //     ok: false,
  //     message: 'No hay tickets pendientes'
  //   })

  //   return callback({
  //     ok: true,
  //     ticket
  //   })
  // })
}