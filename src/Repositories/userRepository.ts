import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {User, UserRole} from '../Entities/User';
//import {user} from '../database/db'



// export class UserRepository{
//   private userRepository = user;
//    async viewUsers(){
//      const user = this.userRepository.findOneBy({
//       id:2
//     });
//    console.log(user);
//   }
//   async createUser(email: string, password: string, role:UserRole): Promise<User> {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = new User();
//     user.email = email;
//     user.password = hashedPassword;
//     user.role = role;
//     return this.userRepository.save(user);
//   }
//
//   async verifyPassword(user: User, password: string): Promise<boolean> {
//     return bcrypt.compare(password, user.password);
//   }
//
//   generateJWT(user: User): string {
//     const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, {
//       expiresIn: '1h',
//     });
//     return token;
//   }
// }
