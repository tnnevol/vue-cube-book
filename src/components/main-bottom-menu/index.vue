<template>
    <div class="nav-bar">
      <ul class="menus">
        <li class="menu" :class="{selected: selected === index}" v-for="(menu, index) in menus" :key="menu.name" @click="changeMenu(index)">
          <i class="iconfont" :class="menu.icon"></i>
          <span class="menu-name">{{menu.name}}</span>
        </li>
      </ul>
    </div>
</template>

<script>
export default {
  name: 'main-bottom-nav',
  props: {
    selected: {
      type: Number,
      default: 0
    },
    menus: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
    }
  },
  created () {},
  mounted () {},
  methods: {
    changeMenu (index) {
      this.$emit('update:selected', index)
      this.$emit('change', this.menus[index])
    }
  }
}
</script>

<style lang="less" scoped>
  .nav-bar{
    width: 100%;
    height: 100%;
    background-color: @egg_yellow;
    > .menus{
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 80px;
      .menu{
        display: flex;
        flex-direction: column;
        align-items: center;
        color: @pure_white;
        font-size: 30px;
        cursor: pointer;
        user-select: none;
        .iconfont{
          font-size: 48px;
        }
        .menu-name{
          display: inline-block;
          line-height: 40px;
        }
        &.selected{
          color: @selected_yellow;
        }
      }
    }
  }
</style>
