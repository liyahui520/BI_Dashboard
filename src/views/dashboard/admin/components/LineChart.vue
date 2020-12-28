<template>
  <div id="echartNewOld" style="height:500px;width:100%;margin:auto;padding:200px auto;" />
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    chartData:{
      type:Object,
      require:true,
      default:{
        oldData:[],
        newData:[]
      }
    },
    headData:{
      type:Array,
      require:true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        console.log("此时的值为",val)
        this.setOptions();
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.setOptions();
    },
    setOptions() {
      var _this=this;
      _this.chart = echarts.init(document.getElementById("echartNewOld"))
      _this.chart.setOption({
        xAxis: {
          data: _this.headData,
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        title: {
          text: "近七日病例数据趋势",
          left: "left"
        },
        grid: {
          left: 50,
          right: 50,
          bottom: 20,
          top: 50,
          
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          data: ['新病例', '老病例'],
          left: "right",
        },
        series: [{
          name: '新病例', itemStyle: {
            normal: {
              color: '#FF005A',
              lineStyle: {
                color: '#FF005A',
                width: 2
              }
            }
          },
          smooth: true,
          type: 'line',
          data: _this.chartData.newData,
          animationDuration: 7800,
          animationEasing: 'cubicInOut'
        },
        {
          name: '老病例',
          smooth: true,
          type: 'line',
          itemStyle: {
            normal: {
              color: '#3888fa',
              lineStyle: {
                color: '#3888fa',
                width: 2
              },
              areaStyle: {
                color: '#f3f8ff'
              }
            }
          },
          data: _this.chartData.oldData,
          animationDuration: 5800,
          animationEasing: 'quadraticOut'
        }]
      })
    }
  }
}
</script>
