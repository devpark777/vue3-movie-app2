<template>
    <header>
        <Logo />
        <div class="nav nav-pills">
            <div v-for="nav in navigations" :key="nav.name" class="nav-item">
               <RouterLink 
                    :to="nav.href" 
                    active-class="active"
                    :class="{ active: isMatch(nav.path)}" 
                    class="nav-link">
                   {{ nav.name }}
               </RouterLink>
            </div>
        </div>
        <!-- 아래와 같이 2가지 방법 가능 -->
        <!--1.  <RouterLink to="/about" class="user">
            <img :src="image" :alt="name">
        </RouterLink> -->
         <div @click="toAbout" class="user">
            <img :src="image" :alt="name">
        </div>
        
    </header>
</template>

<script>
  import { mapState } from 'vuex'
  import Logo from './Logo'
  export default {
      components : {
          Logo
      },
      data() {
          return {
              navigations : [
                  {
                      name : 'Search',
                      href : '/'
                  },
                   {
                      name : 'Movie',
                    //   href : '/movie'
                      href : '/movie/tt4520988',
                      path : /^\/movie/ // '/movie'로 시작하는지 검사 => header의 MOVIE를 선택된 것으로 표시하기 위함
                  },
                   {
                      name : 'About',
                      href : '/about'
                  },
              ]
          }
      },
      computed: {
          ...mapState('about', [
              'image',
              'name'
          ])
        //   image() { return this.$store.state.about.image },
        //   name() { return this.$store.state.about.name }
      },
      methods: {
          isMatch(path) { // path => '/movie'
              if(!path) return false // path가 없으면 통과
              console.log('this.$route.fullPath =>'+this.$route.fullPath) // /movie/tt4520988
              return path.test(this.$route.fullPath) // path 값(/movie)이 this.$route.fullPath에 들어있나 검사 => 있으면 true
          },
          toAbout() { // 이렇게도 page 이동 가능
              this.$router.push('/about')
          }
      }
  }
</script>

<style scoped>
    header {
        height: 70px;
        padding: 0 40px;
        display: flex;
        align-items: center;
        position: relative;
    }
    header .logo {
        margin-right: 40px;
    }
    header .user {
        width: 40px;
        height: 40px;
        padding: 6px;
        border-radius: 50%;
        box-sizing: border-box;
        background-color: gray;
        cursor: pointer;
        position: absolute;
        top:0; bottom: 0;
        right: 40px;
        margin: auto;
        transition: .4s;
    }
    header .user:hover {
        background-color: orange;
    }
    header .user img {
        width: 100%;
    }
    /* 화면크기가 575px(sm)보다 작아지면*/
     @media (max-width: 575.98px) { 
            .nav {
                display: none;
            }
     }
</style>
