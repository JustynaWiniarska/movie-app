<script setup>
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
const apiKey = import.meta.env.VITE_API_KEY

const route = useRoute()
const movieId = route.params.id

const movieDetails = ref({})

const getMovieDetails = async () => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`)
    const data = await response.json()
    console.log(data)
    movieDetails.value = data
  }
  catch (e) {
    console.log('Error fetching movie details: ', e)
  }
}

onMounted(() => {
  getMovieDetails()
})
</script>

<template>
  <div>
    <h1 class="movie-title">{{ movieDetails.title }}</h1>
    <p class="text-center pb-4">Released: {{ movieDetails.release_date }}</p>
    <div class="md:flex md:justify-around">

      <img
        :src="`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`"
        alt="Movie poster"
        class="md:w-1/2"
      >
      <div class="md:w-1/2 md:px-6 pt-4 text-lg">
        <p class="label">Plot overview:</p>
        <p class="pb-4">{{ movieDetails.overview }}</p>
        <!-- Genres (Displayed under or beside the poster) -->
        <p><span class="label">Rating:</span> {{ movieDetails.vote_average }}</p>
        <!-- Runtime (Displayed in hours and minutes) -->
        <p><span class="label">Language:</span> {{ movieDetails?.spoken_languages?.[0]?.english_name }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.movie-title {
  text-align: center;
  font-size: 26px;
  font-weight: bold;
}
img {
  margin: auto;
  max-height: 700px;
  width: auto;
}
.label {
  font-weight: bold;
}
</style>
