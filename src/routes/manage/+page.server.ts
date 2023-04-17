import {UserRepository} from "../Repositories/userRepository";
const user = new UserRepository()

export const actions = {
    login: async (event: Request) =>{
        console.log(event.body)
       // await user.verifyPassword(event.body.email,event.body.password)

    }

}
