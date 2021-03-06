import {Request, Response} from "express";
import {inject} from "inversify";
import {controller, httpDelete, httpGet, httpPost, httpPut, requestBody, requestParam} from "inversify-express-utils";
import {TYPES} from "../core/types.core";
import {User, UserRepository} from "../entities/user.entity";
import {DatabaseService} from "../services/database.service";

interface CreateUserBody{
	email: string;
	password: string;
}

interface UpdateUserBody{
	email: string;
	password: string;
}

@controller("/users")
export class UsersController{
	public constructor(
		@inject(TYPES.DatabaseService) private readonly database: DatabaseService
	){}

	@httpGet("/")
	public async index(req: Request, res: Response){
		const userRepository = await this.database.getRepository(UserRepository);

		const users = await userRepository.find();
		return res.json(users);
	}

	@httpGet("/:users")
	public async show(@requestParam("userId") userId: number){
		const repository = await this.database.getRepository(UserRepository);
		return repository.findOneOrFail(userId);
	}

	@httpPost("/")
	public async create(
		@requestBody() body: CreateUserBody, req: Request, res: Response
	){
		const repository = await this.database.getRepository(UserRepository);
		const user = new User();
		user.email = body.email;
		user.password = body.password;
		repository.save(user);
		return res.sendStatus(201);
	}

	@httpPut("/:userId")
	public async update(
		@requestBody() body: UpdateUserBody, @requestParam("userId") userId: number,
		req: Request, res: Response
	){
		const repository = await this.database.getRepository(UserRepository);
		const user = await repository.findOneOrFail(userId);
		user.email = body.email ?? user.email;
		user.password = body.password ?? user.password;
		await repository.save(user);
		return res.sendStatus(204);
	}

	@httpDelete("/:userId")
	public async destroy(
		@requestParam("userId") userId: number,
		req: Request,
		res: Response
	){
		const repository = await this.database.getRepository(UserRepository);
		const user = await repository.findOneOrFail(userId);
		await repository.delete(user);
		return res.sendStatus(204)
	}
}