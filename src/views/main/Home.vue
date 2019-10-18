<template>
  <div class="home">
    <header class="main-head">
      <header-bar :prefix="headBar.prefix" :title="getHeadTitle" />
    </header>

    <main class="main-body">
      <router-view/>
    </main>
    <footer class="main-footer">
      <bottom-menu :menus="btmMenu.menus" :selected.sync="btmMenu.selected" @change="pageChange" />
    </footer>
  </div>
</template>

<script>
import bottomMenu from '@/components/main-bottom-menu'
import headerBar from '@/components/main-header-bar'

export default {
  name: 'home',
  data () {
    return {
      headBar: {
        prefix: false
      },
      btmMenu: {
        selected: 1,
        menus: [
          {
            id: 0,
            icon: 'icon-book',
            name: '书架',
            routerName: 'bookshelf'
          },
          {
            id: 1,
            icon: 'icon-book1',
            name: '书城',
            routerName: 'bookCity'
          },
          {
            id: 2,
            icon: 'icon-wode',
            name: '我的',
            routerName: 'my'
          }
        ]
      }
    }
  },
  methods: {
    pageChange ({ id, name }) {

    }
  },
  computed: {
    getHeadTitle () {
      const selectedItem = this.btmMenu.menus[this.btmMenu.selected]
      const goName = selectedItem.routerName
      if (this.$route.name !== goName) {
        this.routerPush({
          name: goName
        })
      }
      return selectedItem.name
    }
  },
  components: {
    bottomMenu,
    headerBar
  }
}
</script>

<style lang="less" scoped>
  .home{
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    .main-head{
      height: 88px;
      overflow: hidden;
      background-color: @egg_yellow;
      flex-shrink: 0;
    }
    .main-body{
      flex: 1;
      height: calc(100% - 186px);
      overflow: hidden;
      background-color: @egg_yellow;
    }
    .main-footer{
      flex-shrink: 0;
      height: 98px;
      overflow: hidden;
      background-color: @egg_yellow;
    }
  }
</style>
