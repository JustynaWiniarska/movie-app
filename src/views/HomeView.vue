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
  <main>
    <!-- Movies list -->
    <div class="grid grid-cols-3">
      <div
        v-for="movie in movies"
        :key="movie.id"
      >
        <h2 class="font-bold">{{ movie.title }}</h2>
        <sub>{{ movie.release_date }}</sub>
        <img :src="`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`" />
        <p>Rating: {{ movie.vote_average }}</p>
      </div>
    </div>
  </main>
</template>
