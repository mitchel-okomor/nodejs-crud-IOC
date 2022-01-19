import {Container} from "inversify";
import {Logger} from "../services/logger.service";
import {TYPES} from "./types.core";
import {DatabaseService} from "../services/database.service";
import '../controllers/home.controller'
import '../controllers/users.controller'

export const container = new Container();
container.bind(TYPES.Logger).to(Logger);
container.bind(TYPES.DatabaseService).to(DatabaseService)



