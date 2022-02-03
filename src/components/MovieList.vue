<template>
    <div class="container">
        <div :class="{'no-result': !movies.length}" class="inner">
            <!-- <div v-if="loading" class="spinner-border text-primary"></div> -->
            <Loader v-if="loading" />
            <div v-if="message" class="message">
                {{ message }}
            </div>
            <div v-else class="movies">
               <MovieItem 
                    v-for="movie in movies" 
                    :key="movie.imdbID"
                    :movie="movie" />
            </div>
        </div>
    </div>
</template>
<script>
import MovieItem from './MovieItem.vue'
import Loader from './Loader.vue'
import { mapState } from 'vuex'

export default {
    components : {
        MovieItem,
        Loader
    },
    // data() {
    //     return {
    //         movies : []
    //     }
    // }
    computed: {
        ...mapState('movie', [
            'movies',
            'message',
            'loading'
        ])
        // movies() {
        //     return this.$store.state.movie.movies
        // },
        // message() {
        //     return this.$store.state.movie.message
        // },
        // loading() {
        //     return this.$store.state.movie.loading
        // }
    }
}
</script>

<style scoped>
  .container {
      margin-top: 30px;
  }
  .container .inner {
      background-color: darkcyan;
      padding: 10px 0;
      border-radius: 4px;
  }
  .container .no-result {
      padding : 70px 0
  }
  .container .message {
      color : orange;
      font-size: 20px;
  }
  .container .movies {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
  }

</style>