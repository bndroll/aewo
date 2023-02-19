<template>
    <div class="tree-container d-flex justify-start align-stretch">
        <v-treeview selected-color="primary" selectable :items="items" v-model="selection"></v-treeview>
    </div>
</template>

<script>
export default {
    name: "tree", //eslint-disable-line
    data: () => ({
        selection: [],
        items: [
            {
                id: 1,
                name: "Подшипники",
                children: [
                    {
                        id: 11,
                        name: '1 ПС',
                        children: [
                            { id: 111, name: 'T, °С', value: "0000" },
                            { id: 112, name: 'Верт, мм/с', value: "0000" },
                            { id: 113, name: 'Гор, мм/с', value: "0000" },
                            { id: 114, name: 'Ось, мм/с', value: "0000" },
                        ],
                    },
                    {
                        id: 12,
                        name: '2 ПС',
                        children: [
                            { id: 121, name: 'T, °С', value: "0000" },
                            { id: 122, name: 'Верт, мм/с', value: "0000" },
                            { id: 123, name: 'Гор, мм/с', value: "0000" },
                            { id: 124, name: 'Ось, мм/с', value: "0000" },
                        ],
                    },
                    {
                        id: 13,
                        name: '7 ПС',
                        children: [
                            { id: 131, name: 'T, °С', value: "0000" },
                            { id: 132, name: 'Верт, мм/с', value: "0000" },
                            { id: 133, name: 'Гор, мм/с', value: "0000" },
                            { id: 134, name: 'Ось, мм/с', value: "0000" },
                        ],
                    },
                    {
                        id: 14,
                        name: '8 ПС',
                        children: [
                            { id: 141, name: 'T, °С', value: "0000" },
                            { id: 142, name: 'Верт, мм/с', value: "0000" },
                            { id: 143, name: 'Гор, мм/с', value: "0000" },
                            { id: 144, name: 'Ось, мм/с', value: "0000" },
                        ],
                    },
                    {
                        id: 15,
                        name: '9 ПС',
                        children: [
                            { id: 151, name: 'T, °С', value: "0000" },
                        ],
                    },
                ]
            },
            {
                id: 2,
                name: "Редуктор",
                children: [
                    { id: 21, name: 'T на 3 ПС, °С', value: "0000" },
                    { id: 22, name: 'T на 4 ПС, °С', value: "0000" },
                    { id: 23, name: 'T на 5 ПС, °С', value: "0000" },
                    { id: 24, name: 'T на 6 ПС, °С', value: "0000" },
                ],
            },
            {
                id: 3,
                name: "Маслобак",
                children: [
                    { id: 31, name: 'Уровень масла, %', value: "0000" },
                    { id: 32, name: 'Давление масла, кг/см2', value: "0000" },
                ],
            },
            {
                id: 4,
                name: "Газовый коллектор",
                children: [
                    { id: 41, name: 'T газа, °С', value: "0000" },
                    { id: 42, name: 'Разряжение, мм.в.ст', value: "0000" },
                    { id: 43, name: 'Уровень пыли, мг/м3', value: "0000" },
                ],
            },
            {
                id: 5,
                name: "Главный привод",
                children: [
                    { id: 51, name: 'Ток, А', value: "0000" },
                    { id: 52, name: 'Ток двигателя, А', value: "0000" },
                    { id: 53, name: 'Напряжение ротора, кВт', value: "0000" },
                    { id: 54, name: 'Напряжение статера, кВт', value: "0000" },
                ],
            },
            {
                id: 6,
                name: "Охладитель",
                children: [
                    { id: 61, name: 'T воды до, °С', value: "0000" },
                    { id: 62, name: 'T воды после, °С', value: "0000" },
                    { id: 63, name: 'T масла до, °С', value: "0000" },
                    { id: 64, name: 'T масла после, °С', value: "0000" },
                ],
            },
        ],
    }),
    watch: {
        selection(v) {
            this.$emit('select', v)
        }
    }
}
</script>

<style>
.tree-container {
    width: 300px;
    height: 831px;
    border-right: 1px solid #E6E6E6;
    font-weight: 400;
    font-size: 15px;
    line-height: 28px;
    letter-spacing: 0.15px;
    color: rgba(0, 0, 0, 0.87);
    overflow-y: scroll;
}
</style>