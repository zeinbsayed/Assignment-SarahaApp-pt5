import Users from "../Models/users.model.js";
import BaseRepository from "./base.Repository.js";

export default class UserRepository extends BaseRepository
{
    constructor()
    {
        super(Users);
    }
    findUserByEmail(email)
    {
        return this.findOneDocument({email})
    }
}