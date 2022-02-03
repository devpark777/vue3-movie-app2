<template>
   <div class="container">
       <!-- loading 중일때는 스켈레톤을 보여주고 로딩끝나면 아래의 자세한 내용을 보여줌 -->
       <template v-if="loading">  
           <div class="skeletons">
           <div class="skeleton poster"></div>
           <div class="specs">
               <div class="skeleton title"></div>
               <div class="skeleton spec"></div>
               <div class="skeleton plot"></div>
               <div class="skeleton etc"></div>
               <div class="skeleton etc"></div>
               <div class="skeleton etc"></div>
           </div>
           </div>
           <Loader :size="3" :z-index="9" fixed />
       </template>
       <div v-else class="movie-details">
           <!-- <div :style="{ backgroundImage: `url(${theMovie.Poster}`}" class="poster"></div> : 300 크기이미지--> 
           <div :style="{ backgroundImage: `url(${requestDiffSizeImage(theMovie.Poster)}`}" class="poster">
                <Loader v-if="imageLoading" absolute />
           </div>
           <div class="specs">
               <div class="title">
                   {{ theMovie.Title}}
               </div>
               <div class="labels">
                   <span>{{ theMovie.Released }}</span>
                   <span>{{ theMovie.Runtime }}</span>
                   <span>{{ theMovie.Country }}</span>
               </div>
               <div class="plot">
                   {{ theMovie.Plot }}
               </div>
               <div class="ratings">
                   <h3>Ratings</h3>
                   <div class="rating-wrap">
                       <!-- <div v-for="{ Source: name, Value: score } in theMovie.Ratings" :key=name :title="name"
                            class="rating">
                           <img :src="`https://raw.githubusercontent.com/ParkYoungWoong/vue3-movie-app/master/src/assets/${name}.png`" :alt="name">
                           <span>{{ score }}</span>
                       </div> -->
                       <div v-for="{ Source, Value } in theMovie.Ratings" :key=Source :title="Source"
                           class="rating">
                           <img :src="`https://raw.githubusercontent.com/ParkYoungWoong/vue3-movie-app/master/src/assets/${Source}.png`" :alt="name">
                           <span>{{ Value }}</span>
                       </div>
                   </div>
               </div>
               <div>
                   <h3>Actors</h3>
                   {{ theMovie.Actors }}
               </div>
               <div>
                   <h3>Director</h3>
                   {{ theMovie.Director }}
               </div>
                <div>
                   <h3>Production</h3>
                   {{ theMovie.Production }}
               </div>
                <div>
                   <h3>Genre</h3>
                   {{ theMovie.Genre }}
               </div>
           </div>
       </div>
   </div>
</template>

<script>
import Loader from '../components/Loader.vue'

export default {
    components: {
        Loader
    },
    data() {
        return {
            imageLoading : true
        }
    },
    computed: {
        theMovie() {
            return this.$store.state.movie.theMovie
        },
        loading() {
            return this.$store.state.movie.loading
        }
    },
    created() {
        console.log(this.$route)
        this.$store.dispatch('movie/searchMovieWithId', {
            id: this.$route.params.id
        })
    },
    methods: {
        requestDiffSizeImage(url, size=700) { // 원래영화 포스트이미지는 300인데 700으로 요청
            if(!url || url === 'N/A') { // 포스트없는 경우
                this.imageLoading = false
                return '' //빈 이미지 출력하도록함
            }
            // return url.replace('SX300', `SX${size}`)
            const src = url.replace('SX300', `SX${size}`)

            // 아래와 같이 작성하면 비동기끝나기를 기다리지 않고 다음문장(return) 바로수행
            // 1) 
            //await this.$loadImage(src)
            // 2)
            this.$loadImage(src)
               .then(() => {
                   this.imageLoading = false
               })

            return src // 위의 2)번 방법 => 비동기 함수가 끝나기를 기다리지 않고 바로 리턴가능
                       //      1)번 방법 => async await 사용하면 기다린후 리턴하게 됨
        }
    }
}
</script>

<style scoped>
.container {
    padding-top: 40px;
}
.skeletons {
    display: flex;
}
.skeletons .poster {
    flex-shrink: 0;
    width: 500px;
    height: 500px * 3 / 2;
    margin-right: 70px;
}
.skeletons .specs {
    flex-grow: 1;
}
.skeletons .skeleton {
    border-radius: 10px;
    background-color: gray;
}
.skeletons .skeleton.title {
    width: 80%;
    height: 70px;
}
.skeletons .skeleton.spec {
    width: 60%;
    height: 30px;
    margin-top: 20px;
}
.skeletons .skeleton.plot {
    width: 100%;
    height: 250px;
     margin-top: 20px;
}
.skeletons .skeleton.etc {
    width: 50%;
    height: 50px;
     margin-top: 20px;
}
.movie-details { 
    display: flex;
    color: gray;
}
.movie-details .poster { 
    flex-shrink: 0;
    width: 500px;
    height: 500px * 3 / 2;
    margin-right: 70px;
    border-radius: 10px;
    background-color: blue;
    background-size: cover;
    background-position: center;
    position: relative; /*  Loader absolute 부모기준   */
}
.movie-details .specs {
    flex-grow: 1;
 }
.movie-details .specs .title { 
    color: black;
    font-family: 'Oswald', sans-serif;
    font-size: 70px;
    line-height: 1;
    margin-bottom: 30px;
}
.movie-details .specs .labels {
    color : orange;
 }
 .movie-details .specs .labels .span::after {
     content: "\00b7";
     margin: 0 6px;
 }
 .movie-details .specs .labels .span:last-child::after {
    display: none;
 }
.movie-details .specs .plot {
    margin-top: 20px;
 }
.movie-details .specs .ratings { }
.movie-details .specs .ratings .rating-wrap {
    display: flex;
 }
.movie-details .specs .ratings .rating-wrap .rating  { 
    display: flex;
    align-items: center;
    margin-right: 32px;
}
.movie-details .specs .ratings .rating-wrap .rating img {
    height: 30px;
    flex-shrink: 0;
    margin-right: 6px;
 }
.movie-details .specs h3 {
    margin: 24px 0 6px;
    color : black;
    font-family: "Oswald", sans-serif;
    font-size: 20px;
 }
 /* 화면크기가 xl보다 작으면 => 반응형 구현 */
@media (max-width:  1200px) { 
 .movie-details .poster { 
    width: 300px;
    /* height: 300px * 3 / 2; 동작안함 */
    height: 400px;
    margin-right: 40px; 
 }       
}
/* 화면크기가 lg보다 작으면 => 반응형 구현 */
@media (max-width:  992px) { 
  .movie-details {
     display: block;
  }
  .movie-details .poster { 
    display: block;
    margin-bottom: 40px;
  }       
}
/* 화면크기가 md보다 작으면 => 반응형 구현 */
@media (max-width:  768px) { 
  .movie-details .specs .title {
      font-size: 50px;
  }
  .movie-details .specs .ratings .rating-wrap {
      display: block;
  }    
  .movie-details .specs .ratings .rating-wrap .rating {
      margin-top: 10px;
  }    
}

</style>