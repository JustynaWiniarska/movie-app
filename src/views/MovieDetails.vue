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
    <h1>{{ movieId }}</h1>

  </div>
</template>
