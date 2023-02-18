export interface Pod {
    temperature: {
        value: number,
        warningMin: number,
        warningMax: number,
        alarmMin: number,
        alarmMax: number,
    },
}

export interface PodExtended extends Pod {
    vibration: {
        axis: {
            value: number,
            warningMin: number,
            warningMax: number,
            alarmMin: number,
            alarmMax: number,
        },
        vertical: {
            value: number,
            warningMin: number,
            warningMax: number,
            alarmMin: number,
            alarmMax: number,
        },
        horizontal: {
            value: number,
            warningMin: number,
            warningMax: number,
            alarmMin: number,
            alarmMax: number,
        }
    }
}

export interface EventObject {
    pod1: PodExtended;
    pod2: PodExtended;
    pod7: PodExtended;
    pod8: PodExtended;

    pod3: Pod;
    pod4: Pod;
    pod5: Pod;
    pod6: Pod;
    pod9: Pod;

    gasCollector: {
        temperature: number,
        underpressure: number,
    },

    oilSystem: {
        oilLevel: number,
        oilPressure: number
    },

    mainDrive: {
        rotorCurrent: number,
        rotorVoltage: number,
        statorCurrent: number,
        statorVoltage: number
    },

    cooler: {
        oil: {
            temperatureAfter: number,
            temperatureBefore: number,
        },
        water: {
            temperatureAfter: number,
            temperatureBefore: number,
        }
    },

    valvePosition: {
        isClosed: boolean,
        position: number
    }
}

export enum PodState {
    NORMAL = 'NORMAL',
    WARNING = 'WARNING',
    ALARM = 'ALARM'
}