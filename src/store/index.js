import { createStore } from 'vuex'
import movie from './movie.js'
import about from './about.js'

export default createStore({
    modules: { // 공동 데이터(state)의 모듈정의
        movie,
        about
    }
})