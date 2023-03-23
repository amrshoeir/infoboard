import {Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn} from "typeorm"
import {Layout} from "./Layout";
import {Content} from "./Content";


export enum UserRole{
    ADMIN="admin",
    EDITOR="editor",
    INACTIVE="inactive"
}
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id :number
    @Column()
    username: string
    @Column()
    password :string
    @Column()
    name :string
    @Column()
    email :string
    @Column({
        type:"set",
        enum:UserRole,
        default:[UserRole.INACTIVE,UserRole.EDITOR]
    })
    role :UserRole[]

    @OneToMany(() => Layout,(layout)=>layout.user)
    layouts:Layout[]
    @OneToMany(() => Content,(content)=>content.user)
    contents:Content[]
}