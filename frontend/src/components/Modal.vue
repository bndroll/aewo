<template>
    <v-row justify="center">
        <v-btn color="primary" dark @click.stop="dialog = true">
            Open Dialog
        </v-btn>

        <v-dialog v-model="dialog" max-width="580px">
            <v-card>
                <v-card-title class="modal-header pb-4"> Критическая ошибка </v-card-title>

                <v-card-text class="modal-text">
                    Наблюдаются проблемы в 4 подшипнике эксгаустера Х-172
                </v-card-text>
                <v-card-text class="modal-text">
                    Подшипник вентилятора с приводной стороны - локальная проблема подшипника. Проведите ремонтные работы.
                </v-card-text>

                <v-card-actions class="px-6 pb-4 pt-0">
                    <v-btn color="primary" @click="dialog = false"> Сообщить об ошибке </v-btn>
                    <v-btn color="primary" text @click="dialog = false"> Закрыть </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
export default {
    name: "error-modal",
    data() {
        return { dialog: false }
    }
}
</script>

<style>
.modal-header {
    font-weight: 500;
    font-size: 20px;
    line-height: 32px;
    letter-spacing: 0.25px;
    color: rgba(0, 0, 0, 0.87);
}

.modal-text {
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    letter-spacing: 0.1px;
    color: rgba(0, 0, 0, 0.6);
}
</style>