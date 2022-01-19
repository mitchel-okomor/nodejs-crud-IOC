
import {Request, Response} from "express";
import {controller, httpGet, httpPost, requestBody } from "inversify-express-utils";
import {inject} from 'inversify'
import {Logger} from "../services/logger.service";
import {TYPES} from "../core/types.core";



@controller("/")
export class HomeController{
	public constructor(@inject(TYPES.Logger) private readonly logger: Logger) {}


	@httpGet("")
	public index(req: Request, res: Response){
		return res.send("Hello world");
	}
}