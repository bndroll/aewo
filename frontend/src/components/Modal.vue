<template>
	<v-dialog v-model="alarmModal.isOpen" max-width="800px" v-if="alarmModal.data">
		<v-card>
			<v-card-title class="modal-header pb-2">Упрощенная схема эксгаустера</v-card-title>

			<div class="modal-schema px-6 pb-4">
				<v-img class="schema-image" contain src="../assets/Vector.png">
					<div class="error-label" :class="`pod${alarmModal.data.number }`">{{ alarmModal.data.number }}</div>
				</v-img>
			</div>

			<v-card-title class="modal-status pb-2">Критическая ошибка</v-card-title>

			<v-card-text class="modal-text">
					Наблюдаются проблемы в {{ alarmModal.data.number }} подшипнике эксгаустера {{ alarmModal.data.name }}
			</v-card-text>
			<v-card-actions class="px-6 pb-4 pt-0">
					<v-btn color="primary" @click="onClose()"> Отправить заявку </v-btn>
					<v-btn color="primary" text @click="onClose()"> Закрыть </v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
import { mapState } from 'vuex'
export default {
	name: "error-modal",
	computed: {
		...mapState({
				alarmModal: state => state.alarmModal
		})
	},
	methods: {
		onClose() {
      this.$store.commit('setAlarmModal', { isOpen: false, data: undefined });
    }
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

.pod1 {
	left: 693px;
	top: 109px;
}

.pod2 {
	left: 428px;
	top: 150px;
}

.pod3 {
	left: 324px;
	top: 125px;
}

.pod4 {
	left: 268px;
	top: 125px;
}

.pod5 {
	left: 324px;
	top: 179px;
}

.pod6 {
	left: 268px;
	top: 179px;
}

.pod7 {
	left: 106px;
	top: 178px;
}

.pod8 {
	left: 1px;
	top: 184px;
}

.pod9 {
	left: 1px;
	top: 127px;
}

</style>