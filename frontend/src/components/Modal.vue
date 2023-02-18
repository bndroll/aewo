<template>
    <v-row justify="center">
        <v-btn color="primary" dark @click.stop="dialog = true">
            Open Dialog
        </v-btn>

        <v-dialog v-model="dialog" max-width="580px">
            <v-card>
                <v-card-title class="modal-header pb-2">Упрощенная схема эксгаустера</v-card-title>

                <div class="modal-schema px-6 pb-4">
                    <v-img class="schema-image" contain src="../assets/Vector.png">
                        <div class="error-label first">1</div>
                        <div class="error-label second">2</div>
                        <div class="error-label third">3</div>
                        <div class="error-label fourth">4</div>
                        <div class="error-label fifth">5</div>
                        <div class="error-label sixth">6</div>
                        <div class="error-label seventh">7</div>
                        <div class="error-label eighth">8</div>
                        <div class="error-label nineth">9</div>
                    </v-img>
                </div>

                <v-card-title class="modal-status pb-2"> Критическая ошибка </v-card-title>

                <v-card-text class="modal-text">
                    Наблюдаются проблемы в 4 подшипнике эксгаустера Х-172
                </v-card-text>
                <v-card-text class="modal-text">
                    Подшипник вентилятора с приводной стороны - локальная проблема подшипника. Проведите ремонтные работы.
                </v-card-text>

                <v-card-actions class="px-6 pb-4 pt-0">
                    <v-btn color="primary" @click="dialog = false"> Отправить заявку </v-btn>
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
    font-size: 16px;
    line-height: 32px;
    letter-spacing: 0.25px;
    color: #272727;
}

.modal-status {
    font-weight: 500;
    font-size: 20px;
    line-height: 32px;
    letter-spacing: 0.25px;
    color: #CD2B37;
}

.modal-text {
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    letter-spacing: 0.1px;
    color: rgba(0, 0, 0, 0.6);
}

.modal-schema {
    border-bottom: 1px solid #E6E6E6;
}

.schema-image {
    position: relative;
}

.error-label {
    position: absolute;
    width: 28px;
    height: 28px;
    background: #CD2B37;
    border: 1px solid #272727;
    border-radius: 10px;
    font-weight: 500;
    font-size: 14px;
    line-height: 28px;
    text-align: center;
}

.first {
    left: 487px;
    top: 70px;
}

.second {
    left: 299px;
    top: 70px;
}

.third {
    left: 225px;
    top: 85px;
}

.fourth {
    left: 185px;
    top: 85px;
}

.fifth {
    left: 225px;
    top: 125px;
}

.sixth {
    left: 185px;
    top: 125px;
}

.seventh {
    left: 70px;
    top: 125px;
}

.eighth {
    left: -4px;
    top: 125px;
}

.nineth {
    left: -4px;
    top: 85px;
}

.oil {}
</style>