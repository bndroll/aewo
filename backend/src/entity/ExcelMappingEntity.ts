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
        default: 1
    })
    exhauster_number: number;

    // НОМЕР ПОДШИПНИКА
    @Column({
        nullable: true
    })
    pod_number: number;

    @Column({
        nullable: false,
        default: false
    })
    is_temperature: boolean;

    @Column({
        nullable: false,
        default: false
    })
    is_vibration_axial: boolean;

    @Column({
        nullable: false,
        default: false
    })
    is_vibration_horizontal: boolean;

    @Column({
        nullable: false,
        default: false
    })
    is_vibration_vertical: boolean;

    @Column({
        nullable: false,
        default: '',
    })
    mapping_key: string;
}