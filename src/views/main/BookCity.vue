<template>
  <div class="book-city-wrapper">
    <div class="nav-bar">
      <cube-scroll-nav-bar
        :current="navBar.current"
        :labels="navBar.labels"
        ref="navBar"
        @change="changeNavBarHandler"></cube-scroll-nav-bar>
    </div>
    <div class="book-table">
      <cube-scroll
        ref="bookTableScroll"
        :options="bookTable.bScrollOpts"
        :data="store"
        @pulling-down="refreshStore"
        @pulling-up="loadingStore"
      >
        <book-list :books="store" @seeDetail="seeDetail"></book-list>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
import bookList from '@/components/books'
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  name: 'BookCity',
  data () {
    return {
      navBar: {
        current: '玄幻小说',
        labels: [
          '精选',
          '玄幻小说',
          '修真小说',
          '都市小说',
          '穿越小说',
          '网游小说',
          '科幻小说',
          '排行榜单',
          '全部小说'
        ]
      },
      bookTable: {
        bScrollOpts: {
          pullDownRefresh: {
            threshold: 100,
            stopTime: '500',
            txt: ' '
          },
          pullUpLoad: {
            threshold: 100,
            txt: {
              more: ''
            }
          }
        },
        page: 0,
        count: 15
      }
    }
  },
  mounted () {
    this.refreshStore()
  },
  methods: {
    changeNavBarHandler (cur) {
      this.navBar.current = cur
      this.refreshStore()
    },
    async getStore (doing) {
      await this['book/getBooks']({
        type: this.navBar.labels.indexOf(this.navBar.current),
        page: this.bookTable.page,
        count: this.bookTable.count,
        doing
      })
      this.$refs.bookTableScroll.refresh()
    },
    loadingStore () {
      this.bookTable.page++
      this.getStore('load')
    },
    async refreshStore () {
      this.bookTable.page = 0
      await this.getStore('refresh')
      this.$refs.bookTableScroll.scrollTo(0, 0, 200)
    },
    seeDetail ({ id }) {
      // 进入存储 Book_id
      this['book/SET_READING_BOOK_ID'](id)
      this.routerPush({
        name: 'readView'
      })
    },
    scrollTo () {

    },
    ...mapActions([
      'book/getBooks'
    ]),
    ...mapMutations([
      'book/SET_READING_BOOK_ID'
    ])
  },
  computed: {
    ...mapGetters([
      'store'
    ]),

    navBarTpl () {
      return this.$refs.navBar
    }
  },
  components: {
    bookList
  }
}
</script>

<style scoped lang="less">
  .book-city-wrapper {
    height: 100%;
    overflow: hidden;

    .book-table {
      height: calc(100% - 80px);
      background-color: @egg_light;
    }
  }

  /deep/ .cube-scroll-nav-bar {
    background-color: @yellow_2;
  }

  /deep/ .cube-scroll-nav-bar-items {
    font-size: 30px;
    color: @dark_default;
  }

  /deep/ .cube-scroll-nav-bar-item {
    padding: 25px;
  }
</style>
