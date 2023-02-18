// @ts-nocheck
import {Injectable} from "@nestjs/common";
import {EventObject} from "./types";
import {InjectRepository} from "@nestjs/typeorm";
import {ExcelMappingEntity} from "./entity/ExcelMappingEntity";
import {Repository} from "typeorm";

@Injectable()
export default class DataMapper {
    private values: Record<string, number>;

    private mappingEntities: ExcelMappingEntity[];
    private workingEntities: ExcelMappingEntity[];

    private currentExhNumber = 1;

    constructor(
        @InjectRepository(ExcelMappingEntity) private readonly repositoryExcel: Repository<ExcelMappingEntity>
    ) {}

    async map(data: Record<string, number>): Promise<Record<number,EventObject>> {
        this.values = data;

        this.mappingEntities = await this.repositoryExcel.find({});
        // console.log(`------------------${this.mappingEntities.length}`)

        const result = {};

        for (let i = 1; i < 7; i++) {
            this.currentExhNumber = i;
            this.workingEntities = this.mappingEntities.filter((e) => e.exhauster_number === this.currentExhNumber);

            let exh = {}

            exh = this.fillPods(exh);
            exh = this.fillExtendedPods(exh);
            exh = this.fillGasCollector(exh);
            exh = this.fillOilSystem(exh);
            exh = this.fillMainDrive(exh);
            exh = this.fillCooler(exh);
            exh = this.fillValvePosition(exh);

            result[this.currentExhNumber] = exh;
        }

        return result;
    }

    fillValvePosition(o: object) {
        o.valvePosition = {
            isClosed: Number(this.values[this.workingEntities.find((e) => e.mapping_key === 'gas_valve_closed').place]) === 1,
            position: this.values[this.workingEntities.find((e) => e.mapping_key === 'gas_valve_position').place],
        };

        return o;
    }

    fillCooler(o: object) {
        o.cooler = {
            oil: {
                temperatureAfter: this.values[this.workingEntities.find((e) => e.mapping_key === 'temperature_after' && e.is_oil).place],
                temperatureBefore: this.values[this.workingEntities.find((e) => e.mapping_key === 'temperature_before' && e.is_oil).place],
            },
            water: {
                temperatureAfter: this.values[this.workingEntities.find((e) => e.mapping_key === 'temperature_after' && e.is_water).place],
                temperatureBefore: this.values[this.workingEntities.find((e) => e.mapping_key === 'temperature_before' && e.is_water).place]
            }
        };

        return o;
    }

    fillMainDrive(o: object) {
        o.mainDrive = {
            rotorCurrent: this.values[this.workingEntities.find((e) => e.mapping_key === 'rotor_current').place],
            rotorVoltage: this.values[this.workingEntities.find((e) => e.mapping_key === 'rotor_voltage').place],
            statorCurrent: this.values[this.workingEntities.find((e) => e.mapping_key === 'stator_current').place],
            statorVoltage: this.values[this.workingEntities.find((e) => e.mapping_key === 'stator_voltage').place]
        };

        return o;
    }

    fillOilSystem(o: object) {
        o.oilSystem = {
            oilLevel: this.values[this.workingEntities.find((e) => e.mapping_key === 'oil_level').place],
            oilPressure: this.values[this.workingEntities.find((e) => e.mapping_key === 'oil_pressure').place]
        };

        return o;
    }

    fillGasCollector(o: object) {
        o.gasCollector = {
            temperature: this.values[this.workingEntities.find((e) => e.mapping_key === 'temperature_before' && e.is_gas).place],
            underpressure: this.values[this.workingEntities.find((e) => e.mapping_key === 'underpressure_before').place],
        };

        return o;
    }

    fillPods(o: object) {
        const entities = this.workingEntities.filter((e) => [3,4,5,6,9].includes(e.pod_number));
        o.pod3 = this.getInfoForUsualPod(entities, 3);
        o.pod4 = this.getInfoForUsualPod(entities, 4);
        o.pod5 = this.getInfoForUsualPod(entities, 5);
        o.pod6 = this.getInfoForUsualPod(entities, 6);
        o.pod9 = this.getInfoForUsualPod(entities, 9);

        return o;
    }

    getInfoForUsualPod(entities: ExcelMappingEntity[], podNumber: number) {
        entities = entities.filter((e) => e.pod_number === podNumber);
        const res = {
            value: this.values[entities.find((e) => e.mapping_key === 'temperature' && e.is_temperature).place],
            warningMin: this.values[entities.find((e) => e.mapping_key === 'warning_min' && e.is_temperature).place],
            warningMax: this.values[entities.find((e) => e.mapping_key === 'warning_max' && e.is_temperature).place],
            alarmMin: this.values[entities.find((e) => e.mapping_key === 'alarm_min' && e.is_temperature).place],
            alarmMax: this.values[entities.find((e) => e.mapping_key === 'alarm_max' && e.is_temperature).place],
        }

        return {
            temperature: {...res}
        };
    }

    fillExtendedPods(o: object) {
        const entities = this.workingEntities.filter((e) => [1,2,7,8].includes(e.pod_number));
        o.pod1 = this.getInfoForExtendedPod(entities, 1);
        o.pod2 = this.getInfoForExtendedPod(entities, 1);
        o.pod7 = this.getInfoForExtendedPod(entities, 7);
        o.pod8 = this.getInfoForExtendedPod(entities, 8);

        return o;
    }

    getInfoForExtendedPod(entities: ExcelMappingEntity[], podNumber: number) {
        entities = entities.filter((e) => e.pod_number === podNumber);

        const usualInfo = this.getInfoForUsualPod(entities, podNumber);

        return {
            ...usualInfo,
            vibration: {
                axis: this.getInfoForAxialVibration(entities, podNumber),
                vertical: this.getInfoForVerticalVibration(entities, podNumber),
                horizontal: this.getInfoForHorizontalVibration(entities, podNumber)
            }
        }
    }

    getInfoForAxialVibration(entities: ExcelMappingEntity[], podNumber: number) {
        entities = entities.filter((e) => e.pod_number === podNumber);
        return {
            value: this.values[entities.find((e) => e.mapping_key === 'vibration_axial' && e.is_vibration_axial).place],
            warningMin: this.values[entities.find((e) => e.mapping_key === 'warning_min' && e.is_vibration_axial).place],
            warningMax: this.values[entities.find((e) => e.mapping_key === 'warning_max' && e.is_vibration_axial).place],
            alarmMin: this.values[entities.find((e) => e.mapping_key === 'alarm_min' && e.is_vibration_axial).place],
            alarmMax: this.values[entities.find((e) => e.mapping_key === 'alarm_max' && e.is_vibration_axial).place],
        };
    }

    getInfoForVerticalVibration(entities: ExcelMappingEntity[], podNumber: number) {
        entities = entities.filter((e) => e.pod_number === podNumber);
        return {
            value: this.values[entities.find((e) => e.mapping_key === 'vibration_vertical' && e.is_vibration_vertical).place],
            warningMin: this.values[entities.find((e) => e.mapping_key === 'warning_min' && e.is_vibration_vertical).place],
            warningMax: this.values[entities.find((e) => e.mapping_key === 'warning_max' && e.is_vibration_vertical).place],
            alarmMin: this.values[entities.find((e) => e.mapping_key === 'alarm_min' && e.is_vibration_vertical).place],
            alarmMax: this.values[entities.find((e) => e.mapping_key === 'alarm_max' && e.is_vibration_vertical).place],
        };
    }

    getInfoForHorizontalVibration(entities: ExcelMappingEntity[], podNumber: number) {
        entities = entities.filter((e) => e.pod_number === podNumber);
        return {
            value: this.values[entities.find((e) => e.mapping_key === 'vibration_horizontal' && e.is_vibration_horizontal).place],
            warningMin: this.values[entities.find((e) => e.mapping_key === 'warning_min' && e.is_vibration_horizontal).place],
            warningMax: this.values[entities.find((e) => e.mapping_key === 'warning_max' && e.is_vibration_horizontal).place],
            alarmMin: this.values[entities.find((e) => e.mapping_key === 'alarm_min' && e.is_vibration_horizontal).place],
            alarmMax: this.values[entities.find((e) => e.mapping_key === 'alarm_max' && e.is_vibration_horizontal).place],
        };
    }
}