<template>
  <Headline />
  <Search />
  <MovieList />
</template>

<script scope>
import Headline from '../components/Headline.vue'
import Search   from '../components/Search.vue'
import MovieList   from '../components/MovieList'

export default {
 components: {
    Headline,
    Search,
    MovieList
  },
  created() {
    // Home 올때 마다 reset 되는데... 나는 별로라서 막자
    // this.$store.commit('movie/resetMovies')
  }
}
</script>


