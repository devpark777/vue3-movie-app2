<template>
    <!-- <div> {{movie.imdbID}}</div> -->
    <!-- <div class="movie">
        <img :src="movie.Poster"
         alt="" 
         width="200" />
    </div> -->
    <RouterLink :to="`/movie/${movie.imdbID}`"
       :style="{ backgroundImage: `url(${movie.Poster})`}"
       class="movie">
       <Loader v-if="imageLoading" :size="1.5" absolute />
       <div class="info">
           <div class="year">
                {{ movie.Year }}
           </div>
           <div class="title">
               {{ movie.Title }}
           </div>
       </div>
    </RouterLink>
</template>

<script>
import Loader from './Loader.vue'

export default {
    components: {
       Loader
    },
    props: {
        movie: {
            type: Object,
            // default : function() {return {}} <= 일반함수
            //  default : () => ({}) <= 화살표함수
            default : () => ({})
        }
    },
    data() {
        return {
            imageLoading: true
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        /*
        init() {
            const img = document.createElement('img')
            img.src = this.movie.Poster
            img.addEventListener('load', () => {  // 이미지 load 끝나면 loading 기호 제거
                this.imageLoading = false
            })
        }*/
        
        async init() { // 비동기로 동작해야 하기때문에 => async, await (?)
            if(!this.movie.Poster || this.movie.Poster === 'N/A') { // 포스트 이미지가 없는 경우
                this.imageLoading = false
            } else {
                await this.$loadImage(this.movie.Poster)
                this.imageLoading = false
            }
        }
    }
}
</script>

<style scoped>
  .movie {
      /* $width : 200px; */
      width: 200px;
      height: 300px;
      /* height: 200px * 3 / 2; */
      margin: 10px;
      border-radius: 4px;
      background-color : gray;
      background-size: cover;
      overflow: hidden;
      position: relative;
  }
  /* .movie:hover::after {
      content: "";
      position: absolute;
      top:0;
      bottom: 0;
      left: 0;
      right: 0;
      border : 6px solid orange;
  } */
  .movie:hover {
      border : 6px solid orange;
  }
  .movie .info {
      /* background-color: rgba(yellow, .3); */
      background-color: gray;
      width: 100%;
      /* width: 200px; */
      /* height: 50px; */
      padding : 14px;
      font-size: 14px;
      text-align: center;
      position : absolute;
      left: 0;
      bottom: 0;
  }
  .movie .info .year {
      color : orange;
  }
  .movie .info .title {
      color : white;
      /* 제목이 긴부분은 ...으로 나타남 */
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
  }
</style>