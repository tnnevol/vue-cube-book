<template>
  <ul class="books clearfix">
    <li class="book" v-for="(book, index) in books" :key="`${book.name}${index}`" @click="seeDetail(index)">
      <div class="book-main">
        <div class="book-pic">
          <img :src="book.pic" :alt="`${book.name}图书封面`" class="pic" />
        </div>
        <div class="book-details">
          <h3 class="book-name">{{book.name}}</h3>
          <p class="book-detail">
            <span v-if="book.author">
              作者：<i class="special">{{book.author}}</i>
            </span>
            <span v-if="false">
              类别：<i class="special">{{book.type}}</i>
            </span>
            <span v-if="false">
              状态：<i class="special">{{book.status}}</i>
            </span>
          </p>
          <p class="book-content">
            {{book.content}}
          </p>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'index',
  props: {
    books: {
      type: Array,
      default: null
    }
  },
  created () {},
  methods: {
    seeDetail (index) {
      this.$emit('seeDetail', this.books[index])
    }
  }
}
</script>

<style scoped lang="less">
  .clearfix:before,
  .clearfix:after{
    content: '';
    display: table;
  }
  .clearfix:after{
    clear: both;
  }
  .books{
    width: 100%;
    padding-bottom: 15px;
    background-color: @egg_yellow;
    .book{
      width: 100%;
      background-color: @yellow_2;
      margin-top: 15px;
      padding: 24px 38px;
      overflow: hidden;
      box-sizing: border-box;
      .book-main{
        display: flex;
        .book-pic{
          width: 156px;
          height: 210px;
          margin-right: 24px;
          flex-shrink: 0;
          > .pic{
            display: block;
            width: 100%;
            height: 100%;
          }
        }
        .book-details{
          flex: 1;
          display: flex;
          flex-direction: column;
          .book-name{
            font-size: 30px;
            color: @pure_black;
            line-height: 40px;
            font-weight: bold;
            margin-bottom: 15px;
          }
          .book-detail{
            font-size: 22px;
            color: @dark_light;
            line-height: 32px;
            white-space: normal;
            .special{
              font-style: normal;
              margin-right: 15px;
              color: @selected_yellow;
            }
          }
          .book-content{
            padding-top: 15px;
            font-size: 22px;
            line-height: 32px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            color: @pure_black;
          }
        }
      }
    }
  }
</style>
