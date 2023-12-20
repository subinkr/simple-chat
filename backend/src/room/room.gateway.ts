import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  namespace: /room\/*/,
  cors: {
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:3001'],
  },
})
export class RoomGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('send-message')
  findAll(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {
    socket.broadcast.emit(socket.nsp.name.split('/').slice(-1)[0], data);
    console.log(socket.nsp.name.split('/').slice(-1)[0], data);
  }
}
