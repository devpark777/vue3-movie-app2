<template>
  <div class="about">
    <div class="photo">
      <Loader v-if="imageLoading" absolute />
      <img :src="image" :alt="name">
    </div>
    <div class="name">
      {{  name }}
    </div>
    <div>{{ email }}</div>
    <div>{{ blog }}</div>
    <div>{{ phone }}</div>
  </div>
</template>

<script>
import Loader from '../components/Loader.vue'
import { mapState } from 'vuex'

export default {
  components: {
    Loader
  },
  data() {
    return {
      imageLoading : true
    }
  },
  /*
  이 방법은 다른 것들과 함께 사용할 수 없음 
  computed: mapState('about', [
      'image',
      'name',
      'email',
      'blog',
      'phone'
  ]),
  */
  
  computed: {
      ...mapState('about', [ //아래와 같이 동일하게 반복되는 내용이 많을 경우 사용하면 깔끔해줌
        'image',
        'name',
        'email',
        'blog',
        'phone'
    ])
    // 여기에 다른 것들 사용 가능
    // image() {
    //   return this.$store.state.about.image
    // },
    // name() {
    //   return this.$store.state.about.name
    // },
    // email() {
    //   return this.$store.state.about.email
    // },
    // blog() {
    //   return this.$store.state.about.blog
    // },
    // phone() {
    //   return this.$store.state.about.phone
    // },
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      await this.$loadImage(this.image)
      this.imageLoading = false
    }
  }
}
</script>

<style scoped>
.about {
  text-align: center;
}
.about .photo {
  width: 250px;
  height: 250px;
  margin: 40px auto 20px;
  padding: 30px;
  border: 10px solid gray;
  border-radius: 50%;
  box-sizing: border-box;
  background-color: gray;
  position: relative; /* Loader를 부모기준으로 가운데 배치위해  */
}
.about .photo img {
  width: 100%;
}
.about .name {
  font-style: 40px;
  font-family: "Oswald", sans-serif;
  margin-bottom: 20px;
}
</style>
