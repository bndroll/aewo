import {Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("mapping_entity")
export class MappingEntity {

    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'id',
    })
    id: number;

    @Column({
        nullable: false,
        default: '',
    })
    place: string;

    @Column({
        nullable: false,
        default: 'analog',
    })
    type: string;

    @Column({
        nullable: false,
        default: '',
    })
    comment: string;

    @Column({
        nullable: false,
        default: 1,
    })
    exhauster: number;

    @Column({
        nullable: false,
        default: 1,
    })
    active: number;
}