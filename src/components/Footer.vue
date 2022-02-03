<template>
    <footer>
        <Logo />
        <a href="https://github.com/ParkYoungWoong" target="_blank">
          (c){{ new Date().getFullYear() }} YuPark
        </a>
    </footer>
</template>

<script>
  import Logo from './Logo'

export default {
    components : {
        Logo
    }
}
</script>

<style scoped>
  footer {
      padding : 70px 0;
      text-align: center;
      opacity: .3;
  }
  footer .logo {
      display: block;
      /* border : 1px solid red; */
      margin-bottom: 4px;
  }
</style>