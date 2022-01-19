import {controller, httpGet } from "inversify-express-utils";
import {inject} from 'inversify'
import {Logger} from "../services/logger.service";
import {TYPES} from "../core/types.core";


@controller("/")
export class HomeController{
	public constructor(@inject(TYPES.Logger) private readonly logger: Logger) {}


	@httpGet("")
	public index(req: any, res: any){
		return res.send("Hello world");
	}
}