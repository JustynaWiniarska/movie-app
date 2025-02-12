<script setup>
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
const apiKey = import.meta.env.VITE_API_KEY

const route = useRoute()
const movieId = route.params.id

const movieDetails = ref({})
const calculatedRuntime = ref('')
const genresList = ref('')

const getMovieDetails = async () => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`)
    const data = await response.json()
    movieDetails.value = data

    if (data.genres) {
      defineGenres(data.genres)
    }
    if (data.runtime) {
      calculateRuntime(data.runtime)
    }
  }
  catch (e) {
    console.log('Error fetching movie details: ', e)
  }
}

const calculateRuntime = (num) => {
  if (!num || isNaN(num)) return
  const hours = Math.floor(num / 60)
  const minutes = num % 60
  calculatedRuntime.value = `${hours}h ${minutes}m`
}

const defineGenres = (genresArray) => {
  const cleanString = genresArray.map(genre => genre.name).join(", ")
  genresList.value = cleanString
}

onMounted(() => {
  getMovieDetails()
})
</script>

<template>
  <div>
    <h1 class="movie-title">{{ movieDetails.title }}</h1>
    <p class="text-center pb-6">Released: {{ movieDetails.release_date }}</p>
    <div class="md:flex md:justify-between">

      <img
        :src="`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`"
        alt="Movie poster"
        class="md:w-1/2"
      >
      <div class="md:w-1/2 md:px-6 pt-4 text-lg">
        <div v-if="movieDetails.overview">
          <p class="label">Plot overview:</p>
          <p class="pb-4">{{ movieDetails.overview }}</p>
        </div>
        <p v-if="movieDetails.genres?.length"><span class="label">Genres:</span> {{ genresList }}</p>
        <p v-if="movieDetails.vote_average"><span class="label">Rating:</span> {{ movieDetails.vote_average }}</p>
        <p v-if="movieDetails.runtime"><span class="label">Runtime: </span>{{ calculatedRuntime }}</p>
        <p v-if="movieDetails.spoken_languages?.length"><span class="label">Language:</span> {{ movieDetails?.spoken_languages?.[0]?.english_name }}</p>
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
