<template>
  <div class="tours-container">
    <button class="close-button" @click="$emit('close')">×</button>
    <h1>Our Packages</h1>

    <div class="package-cards">
      <div class="package-card" v-for="pkg in packages" :key="pkg.id">
        <h2>{{ pkg.title }}</h2>
        <button @click="selectPackage(pkg)">
          Select Package
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TourPackages",
  props: {
    selectedTour: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      packages: [
        { id: 'single', title: 'Single Township Tour', component: 'SingleTownship' },
        { id: 'duo', title: 'Township Duo Tour', component: 'TownshipDuo' },
        { id: 'full', title: 'Full Cape Culture Tour', component: 'FullCapeCulture' }
      ]
    }
  },
  methods: {
    selectPackage(pkg) {
      this.$emit('package-selected', pkg);
    }
  }
}
</script>

<style scoped>
.tours-container {
  position: relative;
  padding: 2rem;
  background: #f9f9f9;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #333;
}

h1 {
  text-align: center;
  margin-bottom: 3rem;
  font-size: 2rem;
  color: #091d35;
}

.package-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
}

.package-card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 6px 15px rgba(0,0,0,0.12);
  padding: 2rem;
  width: 250px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.package-card h2 {
  font-family: 'Georgia', serif;
  color: #091d35;
  margin-bottom: 1rem;
}

.package-card button {
  background-color: #091d35;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}

.package-card button:hover {
  background-color: rgb(246, 196, 109);
}
</style>