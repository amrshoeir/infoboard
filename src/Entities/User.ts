import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from "typeorm"

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
    @Column('text')
    username: string
    @Column('text')
    password :string
    @Column('text')
    name :string
    @Column('text')
    email :string
    @Column({
        type:"set",
        enum:UserRole,
        default:[UserRole.INACTIVE,UserRole.EDITOR]
    })
    role :UserRole

    @OneToMany(() => Layout,(layout)=>layout.user)
    layouts:Layout[]
    @OneToMany(() => Content,(content)=>content.user)
    contents:Content[]
}
