import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from "@nestjs/websockets";
import { SocketService } from "./socket.service";
import { from, map } from "rxjs";
import {Socket} from "socket.io";

@WebSocketGateway(9000, {
  cors: {
    origin: "*",
  },
})
export class SocketGateway {
  constructor(private readonly socketService: SocketService) {}

  @SubscribeMessage("get_metrics")
  findAll() {
    return from([1, 2, 3]).pipe(
      map((item) => ({ event: "get_metrics", data: item }))
    );
  }

	@SubscribeMessage('exhauster')
	getDataByExhauster(@MessageBody() data: number,
					   @ConnectedSocket() client: Socket) {
		this.socketService.addConnection(data, client);
	}

	@SubscribeMessage('exhausterAll')
	getAllData(@ConnectedSocket() client: Socket) {
		this.socketService.addMainConnection(client);
	}

	@SubscribeMessage('findOneSocket')
	findOne(@MessageBody() id: number) {
		return this.socketService.findOne(id);
	}
}
