import {Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("excel_mapping_entity")
export class ExcelMappingEntity {

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
        default: '',
    })
    key: string;
}