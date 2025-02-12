<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

const apiKey = import.meta.env.VITE_API_KEY
let movies = ref([])
let inputValue = ref('')
let showResultsDisclaimer = ref(false)

const getMovies = async () => {
  const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&include_video=false&language=en-US&page=1&sort_by=popularity.desc`)
  const data = await response.json()
  movies.value = data.results
  console.log(movies.value)
}

onMounted(() => {
  getMovies()
})

const searchMovies = async () => {
  const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${inputValue.value}`)
  const data = await response.json()

  if (data.results.length === 0) {
    showResultsDisclaimer.value = true
  } else {
    movies.value = data.results
  }
}
</script>

<template>
  <div class="container">
    <h1 class="text-center text-2xl page-title">Popular Movies</h1>
    <form
			class="pb-6 w-full flex justify-between"
			@submit.prevent="searchMovies"
			@keydown.stop.enter.prevent="searchMovies"
		>
      <input
        type="text"
        class="border rounded w-full px-2 py-1"
        placeholder="Search movies ..."
        v-model="inputValue"
      />
      <button
        class="p-2 border rounded"
        type="submit"
      >Search</button>
		</form>
    <div
      v-if="showResultsDisclaimer"
      class="disclaimer"
    >
      <p>No movies for this search term were found.</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:w-full">
      <div
        v-for="movie in movies"
        :key="movie.id"
      >
        <RouterLink :to="'/movies/' + movie.id">
          <div
            class="border rounded p-4 flex hover:bg-gray-100"
          >
            <div class="w-1/2">
              <img v-if="movie.backdrop_path"
                :src="`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`"
                alt="Movie thumbnail"
              />
              <img v-else src="/src/assets/thumbnail.png" alt="Placeholder image" class="placeholder-img" />
            </div>
            <div class="pl-6 w-1/2">
              <div >
                <h2 class="title">{{ movie.title }}</h2>
                <sub class="text-md">{{ movie.release_date }}</sub>
              </div>
              <p v-if="movie.vote_average">Rating: {{ movie.vote_average }}</p>
            </div>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>

</template>

<style scoped>
.page-title {
  margin-bottom: 18px;
  font-weight: bold
}
input {
  margin-right: 8px;
}
button {
  background-color: teal;
  color: #fff;
  font-weight: bold;
}
.disclaimer {
  color: red;
  font-weight: bold;
  letter-spacing: .1rem;
  text-align: center;
  margin-bottom: 16px;
}
.title {
  font-size: 20px;
  line-height: 1;
  font-weight: bold;
}
.placeholder-img {
  width: 100%;
  height: auto;
  object-fit: cover
}
</style>
