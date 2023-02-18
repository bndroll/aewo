import { Injectable } from '@nestjs/common';
import { CreateSocketDto } from './dto/create-socket.dto';
import { UpdateSocketDto } from './dto/update-socket.dto';
import {Socket} from "socket.io";
import {EventObject} from "../types";


@Injectable()
export class SocketService {
	private mainConnection: Socket | null = null;
	private readonly connections: Map<number, Socket> = new Map()

	constructor() {
	}
	create(createSocketDto: CreateSocketDto) {
		return 'This action adds a new socket';
	}

	findAll() {
		return `This action returns all socket`;
	}

	findOne(id: number) {
		return `This action returns a #${id} socket`;
	}

	update(id: number, updateSocketDto: UpdateSocketDto) {
		return `This action updates a #${id} socket`;
	}

	remove(id: number) {
		return `This action removes a #${id} socket`;
	}

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

	emitData(data: Record<number,EventObject>) {
		if (this.mainConnection) {
			this.mainConnection.emit('data', data);
		}

		for (const [key, value] of this.connections) {
			value.emit('data', data[key]);
		}
	}
}
