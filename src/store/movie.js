import axios from 'axios' //npm i axios 필요
import _uniqBy from 'lodash/uniqBy' // npm i loadsh 필요

const _defaultMessage ='Search for the movie title!'

export default {
    // 모듈!
    namespaced: true,

    // data!
    /*
    state: function(){
        return {
            movies:[]
        }
    } , */
    state: ()=>({
        movies:[],
        message: _defaultMessage,
        loading: false,
        theMovie : {}
    }),

    // computed!
    getters: {
        // movieIds(state) {
        //     return state.movies.map(m => m.imdbID)
        // }
    },

    // methods!
    // state 데이터 변경 함수
    mutations: {
        updateState(state, payload) {
            // state.movies = payload.movie
            // state.message = payload.message
            // state.loading = payload.loading

            // Object.keys(payload) => ['movies','message', 'loading']
            Object.keys(payload).forEach(key => {
                state[key] = payload[key] //state.key = payload.key
            })
        },
        resetMovies(state) {
            state.movies  = []
            state.message = _defaultMessage
            state.loading = false
        }
    },
    // 비동기로 동작함
    actions: {
        // async searchMovies(context, payload) {
        async searchMovies({ state, commit }, payload) {
          if (state.loading) { 
              return // 현재 검색중이면 리턴해줌, 검색중인데 사용자가 리턴을 여러번 누르면 한번만 수행됨
          }

          commit('updateState' , {
              message : '', // 검색이 시작되면 message는 지워줌
              loading : true // 검색이 시작되면 loading 아이콘이 표시되도록 함
          })
          try {
            // const { title, type, number, year } = payload
            // const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=1`)
            const res = await _fetchMovie( {
                ...payload, //위의 payload 그대로 넘김
                page : 1
            })
            //console.log(res)
            const { Search, totalResults } = res.data
            
            // context.commit('updateState', {
            commit('updateState', {
                // movies: Search
                movies: _uniqBy(Search, 'imdbID') //imdbID 기준으로 중복제거
                // message: 'Hello world!',
                // loading: true
            })
            console.log(totalResults) // froze으로 검색시 268
            console.log(typeof totalResults) //string

            const total = parseInt(totalResults, 10)
            const pageLength = Math.ceil(total / 10)

            // 추가 요청!
            if (pageLength > 1) {
                for(let page = 2; page <= pageLength; page += 1) {
                    if (page > payload.number / 10) {
                        break;
                    }
                    // const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`)
                    const res = await _fetchMovie( {
                        ...payload,
                        page //page = page
                    })
                    const { Search } = res.data
                    commit('updateState', {
                        movies: [...state.movies, ..._uniqBy(Search, 'imdbID')] //기존값에 추가
                    })
                }
            }  
          }
          catch (message) {
            commit('updateState', {
                movies : [], //문제 발생시는 초기화
                message : message, // => 2개가 같은시는 message 하나만 적어도 됨
            })
          }
          finally {
              commit('updateState', {
                  loading : false //검색이 끝나면 loading 아이콘 중지되도록 함
              })
          }
        },
        async searchMovieWithId({state, commit}, payload) {
            if (state.loading) return

            commit('updateState', {
                theMovie: {},
                loading : true
            })
            try {
                const res = await _fetchMovie(payload)
                console.log(res.data)
                commit('updateState', {
                    theMovie: res.data
                })
            } catch (error) {
                console.log(error)
                commit('updateState', {
                    theMovie: {}
                })
            } finally {
                commit('updateState', {
                    loading: false
                })
            }
        }

    }
}

function _fetchMovie(payload) {
    //payload에 id가 없으면 => title의 영화 검색
    //               있으면 => id에 해당하는 영화1개의 정보 가져옴
    const { title, type, year, page, id } = payload
    // console.log(title,type,year,page)
    const OMDB_API_KEY = '7035c60c'
    const url = id ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&I=${id}`
                   : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`
    // const url = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}` => error 체크위함

    return new Promise( (resolve, reject) => {
        axios.get(url)
           .then(res => {
            //    console.log(res)
               if (res.data.Error) { //실제로는 data가 오지 않아 Error인데, 서버에서 에러 아닌것으로 보낼때
                   reject(res.data.Error)
               }
               resolve(res)
           })
           .catch(err => {
               reject(err.message)
           })
            
     })
}