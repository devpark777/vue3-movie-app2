<template>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
   <div class="btn btn-primary">버튼</div>
  <router-view/> -->
  
  <!-- 모든 페이지는 아래의 3개로 출력되는데
       <Header /> <Footer />는 항상 출력되고,
       <RouterView />만 교체되어 출력됨 -->
  <Header />
  <RouterView />
  <Footer />
  <!-- <div class="btn btn-primary">버튼</div> -->
</template>

<script>
  // import Header from '~components/Header'
  import Header from './components/Header'
  import Footer from './components/Footer'

  export default {
    components : {
      Header,
      Footer
    }
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
