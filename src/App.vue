<template>
  <div id="app" ref="appFrame">
    <keep-alive :exclude="/ReadView/">
      <router-view/>
    </keep-alive>
    <div class="loading-wrapper" v-if="loading">
      <cube-loading :size="40"></cube-loading>
    </div>
  </div>
</template>

<script>
import fastClick from 'fastclick'

export default {
  name: 'App',
  data () {
    return {
      loading: true
    }
  },
  created () {

  },
  mounted () {
    this.$nextTick(() => {
      fastClick.attach(this.$refs.appFrame)
    })
    setTimeout(() => {
      this.loading = false
    }, 2000)
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
  #app {
    width: 100vw;
    height: 100vh;
    background-color: @egg_yellow;
  }
  .loading-wrapper{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: @yellow_2;
    z-index: 9999;
    /deep/ .cube-loading{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
</style>
