import {Column, Entity, EntityRepository, PrimaryGeneratedColumn, Repository} from "typeorm";

@Entity()
export class User{
@PrimaryGeneratedColumn()
id: number;

@Column({unique: true})
email: string;

@Column()
password: string;

}

@EntityRepository(User)
export class UserRepository extends Repository<User> {}