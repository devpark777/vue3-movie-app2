<template>
    <div class="container">
        <input 
             v-model="title" 
             class="form-control"
             type="text"
             placeholder="Search for Movies, Series & more" 
             @keyup.enter="apply" />

        <div class="selects">
            <select
                v-for="filter in filters"
                v-model="$data[filter.name]"
                :key="filter.name"
                class="form-select" >
                <option v-if="filter.name === 'year'" value="">
                    All Years
                </option>
                <option
                    v-for="item in filter.items"
                    :key="item">
                    {{ item }}
                </option>
            </select>
        </div>
        <button class="btn btn-primary" @click="apply">
            Apply
        </button>
    </div>
</template>

<script>
// import axios from 'axios'
export default {
    data() {
        return {
            title : '',
            type : 'movie',
            number : 10,
            year : '',
            filters : [
                {
                    name : 'type',
                    items : ['movie','series','episode']
                },
                 {
                    name : 'number',
                    items : [10,20,30]
                },
                 {
                    name : 'year',
                    items : (() => {
                        const years = []
                        const thisYear = new Date().getFullYear()
                        for(let i=thisYear ; i>=1985;i -= 1) {
                            years.push(i)
                        }
                        return years
                    })()
                }
            ]
        }
    },
    methods: {
        async apply() {
            // const OMDB_API_KEY = '7035c60c'
            // const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${this.title}&type=${this.type}&y=${this.year}&page=1`)
            // console.log(res)
            this.$store.dispatch('movie/searchMovies', { //movie모듈(movie.js)의 ....
                title: this.title,
                type: this.type,
                number: this.number,
                year: this.year
            })
        }
    }
}
</script>

<style scoped>
   .container {
       display: flex;
   }
   .container .selects {
       display: flex;
   }
    .container .selects select {
        width: 120px;
        margin-right: 10px;
     }
    .container > * {
        margin-right: 10px;
        font-size: 15px;
    }
    .container > *:last-child {
        margin-right: 0;
    }
    .container .btn {
        width: 120px;
        height: 50px;
        font-weight: 700;
        flex-shrink: 0;
    }
    /* 화면크기가 lg보다 작으면 => 반응형 구현 */
    @media (max-width: 991.98px) { 
        .container { 
            display: block;
        }
        .container input {
            margin-right: 0;
            margin-bottom: 10px;
        }
        .container .selects {
            margin-right: 0;
            margin-bottom: 10px;
        }
        .container .selects select {
                width: 100%;
        }
        .container .btn {
            width: 100%;
        } 
    }
</style>