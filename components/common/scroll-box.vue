
<script>
export default {
  // props: ['dataList'],
  data() {
    return {
      dataList:[{
        thumb:'https://img.yzcdn.cn/vant/apple-1.jpg',
        title:'Apple iPhone 12 (A2228) 64GB 黑色 移动联通电信4G手机',
        subtitle:'Apple iPhone 12 (A2228) 64GB 黑色 移动联通电信4G手机',
        marketprice:5999,
        id:1
      },{
        thumb:'https://img.yzcdn.cn/vant/apple-2.jpg',
        title:'Apple iPhone 12 (A2228) 64GB 黑色 移动联通电信4G手机',
        subtitle:'Apple iPhone 12 (A2228) 64GB 黑色 移动联通电信4G手机',
        marketprice:5999,
        id:2
      },{
        thumb:'https://img.yzcdn.cn/vant/apple-3.jpg',
        title:'Apple iPhone 12 (A2228) 64GB 黑色 移动联通电信4G手机',
        subtitle:'Apple iPhone 12 (A2228) 64GB 黑色 移动联通电信4G手机',
        marketprice:5999,
        id:3
      },{
        thumb:'https://img.yzcdn.cn/vant/apple-4.jpg',
        title:'Apple iPhone 12 (A2228) 64GB 黑色 移动联通电信4G手机',
        subtitle:'Apple iPhone 12 (A2228) 64GB 黑色 移动联通电信4G手机',
        marketprice:5999,
        id:4
      }],
      calleft: 0,
      speed:1
    }
  },
  computed: {
    widthData(){
      return 240 * Number(this.dataList.length*2)
    }
  },

  created() {
    this.move()
  },
  mounted() {
    const imgBox = document.getElementsByClassName('imgBoxoul')[0]
      imgBox.innerHTML += imgBox.innerHTML
  },
  methods: {
    //移动
    move() {
      this.timer = setInterval(this.starmove, 20)
    },
    //开始移动
    starmove() {
      this.calleft -= 1.2//*this.speed
      if (this.calleft <= -1150) {
        this.calleft = 0
      }
    },
    //鼠标悬停时停止移动
    stopmove() {
      clearInterval(this.timer)
    },

  }
}
</script>


<template>
  <div class="threeImg">
    <div class="Containt">
      <ul :style="{'left':calleft + 'px', width: widthData + 'px'} " class="imgBoxoul" @mouseover="stopmove()" @mouseout="move()">
        <li v-for="(item,index) in dataList" :key="index" @click="gotodetails(item.id)">
          <img :src="item.thumb">
          <div class="item-content">
            <p class="item-title">
              {{ item.title }}
            </p>
            <div class="item-detail line-2">
              {{ item.subtitle }}
            </div>
            <p class="item-price">
              ￥{{ item.marketprice }}
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>



<style>

.threeImg {
  position: relative;
}

.threeImg .Containt ul {
  margin: 0 auto;
  width: 2400px;
  position: absolute;
  left: 0px;
  cursor: pointer;
  height: 100%;
  z-index: 10;
}

.threeImg .Containt ul li {
  float: left;
  width: 220px;
  height: 350px;
  margin-right: 20px;
  border-radius: 10px;
  overflow: hidden;
  background-color: #ffffff;
}

.threeImg .Containt ul li img {
  width: 100%;
  height: 263px;
}

.Containt {
  position: relative;
  padding: 60px 0;
  overflow-y: auto;
  width: 1200px;
  height: 365px;
  overflow: hidden;
  margin: 0 auto;
}

</style>
