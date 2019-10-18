<template>
  <div class="view-wrapper">
    <cube-loading :size="40" v-if="loading"></cube-loading>
    <div class="view-top-bar">
      <p class="chapter-name">{{title}}</p>
    </div>
    <div class="view-main" ref="viewMain">
      <div class="view-main-container clearfix">
        <div class="content-btns">
          <cube-button inline primary :disabled="chapterNumber === 0" @click="prevChapter">上一章</cube-button>
          <cube-button inline primary :disabled="chapterNumber === countChapter" @click="nextChapter">下一章</cube-button>
        </div>
        <h1 class="content-title">{{title}}</h1>
        <div class="view-content" v-html="content"></div>
        <div class="content-btns">
          <cube-button inline primary :disabled="chapterNumber === 0" @click="prevChapter">上一章</cube-button>
          <cube-button inline primary :disabled="chapterNumber === countChapter" @click="nextChapter">下一章</cube-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { initBScroll } from '@/utils/fn'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ReadView',
  data () {
    return {
      title: '',
      content: '',
      countChapter: 0,
      loading: true,
      chapterNumber: 0,
      bscroll: null
    }
  },
  created () {

  },
  mounted () {
    this.loadBookDetail()
    this.$nextTick(() => {
      this.bscroll = this._initBScroll()
    })
  },
  methods: {
    _initBScroll () {
      return initBScroll(this.$refs.viewMain, {
        scrollX: false,
        freeScroll: false,
        scrollbar: false
      })
    },
    async loadBookDetail () {
      const bookDetail = await this['book/getChapter']({
        bookId: this.readingBookId,
        chapterNumber: this.chapterNumber
      })
      this.title = bookDetail.title
      this.content = bookDetail.content
      this.countChapter = bookDetail.count
      this.loading = false
      this.$nextTick(() => {
        this.bscroll.refresh()
        this.bscroll.scrollTo(0, 0, 10)
      })
    },
    nextChapter () {
      this.chapterNumber++
      this.loading = true
      this.loadBookDetail()
    },
    prevChapter () {
      this.chapterNumber--
      this.loading = true
      this.loadBookDetail()
    },
    ...mapActions([
      'book/getChapter'
    ])
  },
  computed: {
    ...mapGetters([
      'readingBookId'
    ])
  }
}
</script>

<style scoped lang="less">
  .view-wrapper{
    height: 100vh;
    overflow: hidden;
    background: url("~@/assets/imgs/read-view-bg.jpg")no-repeat center center #cebf9e;
    background-size: 120% 120%;
    position: relative;
    .view-top-bar{
      position: fixed;
      top: 0;
      right: 0;
      left: 0;
      background-color: #cebf9e;
      z-index: 999;
      .chapter-name{
        height: 60px;
        line-height: 60px;
        box-sizing: border-box;
        padding-left: 40px;
        font-size: 18px;
        color: @dark_light;
      }
    }
    .view-main{
      margin-top: 60px;
      height: calc(100% - 60px);
      font-size: 50px;
      .view-main-container{
        .content-title{
          text-align: center;
          font-size: 1em;
          margin: 2em 0;
          color: @dark_default;
          font-weight: bold;
        }
        .view-content{
          font-size: 0.6em;
          color: @dark_default;
          line-height: 1.6em;
          padding: 0 0.6em;
        }
        .content-btns{
          display: flex;
          justify-content: space-around;
          height: 80px;
          padding: 20px;
          /deep/ .cube-btn{
            box-sizing: border-box;
            padding: 20px 15px;
            height: 60px;
            width: 120px;
            font-size: 24px;
          }
        }
      }
    }
    /deep/ .cube-loading{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
</style>
