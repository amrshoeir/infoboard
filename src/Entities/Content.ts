import {Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne} from "typeorm"
import {User} from "./User";

@Entity()
export class Content{
    @PrimaryGeneratedColumn()
    id:string
    @Column()
    name:string
    @Column()
    duration:number
    @Column('datetime')
    start_time:Date
    @Column('datetime')
    end_time:Date
    @Column("simple-json")
    content_data:{/* TODO : filename(s),path(s), metadata */}

    @ManyToOne(()=>User,(user)=> user.contents)
    user:User



}