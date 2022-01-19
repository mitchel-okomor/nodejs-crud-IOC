import {Connection, createConnection, ObjectType} from "typeorm";
import {inject} from 'inversify'
import {TYPES} from '../core/types.core'
import {Logger} from '../services/logger.service'

export class DatabaseService{
private static connection: Connection;

public constructor(@inject(TYPES.Logger) private readonly logger: Logger) {}

public async getConnection(): Promise<Connection> {
	if(DatabaseService.connection instanceof Connection){
		return DatabaseService.connection;
	}

	try{
		DatabaseService.connection = await createConnection();
		this.logger.log("INFO", `Connection established`);
		return DatabaseService.connection;
	}catch(e){
		this.logger.log("ERROR", "Cannot establish database connection");
		process.exit(1);
	}
}

public async getRepository<T>(repository: ObjectType<T>):Promise<T>{
const connection = await this.getConnection();
return await connection.getCustomRepository<T>(repository)
}



}