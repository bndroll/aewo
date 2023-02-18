import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { EventObject } from '../types';


@Injectable()
export class SocketService {
	private mainConnection: Socket | null = null;
	private readonly connections: Map<number, Socket> = new Map();

	addConnection(exhNumber: number, connection: Socket) {
		this.connections.set(exhNumber, connection);
	}

	removeConnection(exhNumber: number) {
		this.connections.delete(exhNumber);
	}

	addMainConnection(connection: Socket) {
		this.mainConnection = connection;
	}

	removeMainConnection() {
		this.mainConnection = null;
	}

	emitData(data: Record<number, EventObject>) {
		if (this.mainConnection) {
			this.mainConnection.emit('data', data);
		}

		for (const [key, value] of this.connections) {
			value.emit('data', data[key]);
		}
	}
}
