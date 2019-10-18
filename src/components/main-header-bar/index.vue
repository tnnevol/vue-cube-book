<template>
  <div class="header-bar">
    <div class="prefix-icon">
      <i class="iconfont" :class="[prefixIcon]" v-if="prefix" @click="handlePrefixIcon"></i>
    </div>
    <h1 class="head-title">
      {{title}}
    </h1>
    <div class="suffix-icon">
      <i class="iconfont" :class="[suffixIcon]" v-if="suffix" @click="handleSuffixIcon"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'main-header-bar',
  props: {
    prefix: {
      default: true,
      type: Boolean
    },
    suffix: {
      default: true,
      type: Boolean
    },
    prefixIcon: {
      default: 'icon-previewleft',
      type: String
    },
    suffixIcon: {
      default: 'icon-search',
      type: String
    },
    title: {
      default: 'book',
      type: String
    }
  },
  data () {
    return {

    }
  },
  created () {
  },
  methods: {
    handlePrefixIcon () {
      this.$emit('handlePrefixIcon')
    },
    handleSuffixIcon () {
      this.$emit('handleSuffixIcon')
    }
  }
}
</script>

<style scoped lang="less">
  .header-bar{
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 35px;
    justify-content: space-between;
    box-sizing: border-box;
    background-color: @egg_yellow;
    color: @pure_white;
    .prefix-icon,
    .suffix-icon{
      min-width: 54px;
    }
    .prefix-icon{
      text-align: left;
    }
    .suffix-icon{
      text-align: right;
    }
    .iconfont{
      font-size: 48px;
      &.icon-search{
        display: inline-block;
        transform: rotateY(-180deg);
      }
    }
    .head-title{
      font-size: 46px;
      line-height: 50px;
      font-weight: 400;
    }
  }
</style>
