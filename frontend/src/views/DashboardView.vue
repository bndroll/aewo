<template>
  <div class="dashboard-container d-flex flex-column rounded-xl">
    <div class="d-flex my-6 justify-center">
      <ExNavigation />
    </div>

    <div class="dashboard d-flex">
      <Tree  @select="($e) => onSelect($e)" />
      <apexchart type="line" height="600" width="1500" :options="options" :series="series"></apexchart>
    </div>
  </div>
</template>

<script>
import ExNavigation from "../components/ExNavigation.vue";
import Tree from "@/components/Tree.vue";
import { mapState } from 'vuex'

export default {
  name: "DashboardView",
  components: {
    ExNavigation,
    Tree,
  },
    computed: {
    ...mapState({
      selectedExhauster: (state) => state.selectedExhauster,
    }),
  },
  data() {
    return {
      options: {
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: ['25.01.22', '27.01.22', '29.02.22', '1.02.22', '3.02.22', '5.02.22', '7.02.22', '9.02.22', '11.02.22', '13.02.22', '15.02.22', '17.02.22', '19.02.22']
        }
      },
      series: [],
      items: []
    }
  },
  methods: {
    onSelect(data) {
      if (data.length !== this.items.length) {
        console.log(data.indexOf(111) > 0)
        if (data.includes(111) && !this.items.includes(111)) {
          this.series.push({
            name: 'Т на п-к 1',
            data: [33.3, 32.1, 32, 33.5, 34, 34.3, 35, 34.9, 34.5, 34, 34.2, 33.8, 33.5]
          })
        }

        if (!data.includes(111) && this.items.includes(111)) {
          this.series = this.series.filter(({ name }) => name !== 'Т на п-к 1')
        }

        if (data.includes(113) && !this.items.includes(113)) {
          this.series.push({
            name: 'Г на п-к 1',
            data: [1.66, 2, 1.5, 1.4, 2.1, 1.9, 1.4, 1.5, 1.7, 2, 1.4, 2.2, 2.1]
          })
        }

        if (!data.includes(113) && this.items.includes(113)) {
          this.series = this.series.filter(({ name }) => name !== 'Г на п-к 1')
        }

        this.items = data;
      }
    }
  }
};
</script>

<style scoped>
.dashboard-container {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: white;
}

.dashboard {  
  height: 100%;
  border-top: 1px solid #E6E6E6;
}
</style>
