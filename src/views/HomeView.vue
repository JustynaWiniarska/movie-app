<script setup>
import { onMounted, ref } from 'vue'

let movies = ref([])

const getMovies = async () => {
  const apiKey = import.meta.env.VITE_API_KEY
  const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&include_video=false&language=en-US&page=1&sort_by=popularity.desc`)
  .then(async res => await res.json())
  console.log(response)
  movies.value = response.results
}

onMounted(() => {
  getMovies()
})

</script>

<template>
  <div class="container">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid lg:grid-cols-3 gap-6 md:w-full p-10">
      <div
        v-for="movie in movies"
        :key="movie.id"
        class="border rounded p-4 flex"
      >
        <div class="w-1/2">
          <img :src="`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`" />
        </div>
        <div class="pl-6 w-1/2">
          <div >
            <h2 class="title">{{ movie.title }}</h2>
            <sub class="text-md">{{ movie.release_date }}</sub>
          </div>
          <p>Rating: {{ movie.vote_average }}</p>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
.title {
  font-size: 20px;
  line-height: 1;
  font-weight: bold;
}
</style>
