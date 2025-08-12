<template>
  <div class="tour-page">
    <h1 class="page-title">Explore Our Tours</h1>

    <div class="tour-list">
      <div 
        v-for="tour in tours" 
        :key="tour.id" 
        class="tour-item"
        @mouseenter="hoverTour = tour.id" 
        @mouseleave="hoverTour = null"
        :class="{'active-tour': hoverTour === tour.id}"
      >
        <div class="image-container">
          <img :src="tour.image" :alt="tour.name" class="tour-image" />
          <h2 class="tour-title">{{ tour.name }}</h2>
        </div>
        <div class="tour-text">
          <p class="tour-description">{{ tour.description }}</p>
          <div class="links">
            <router-link :to="tour.link" class="button more-info-btn">More Info</router-link>
            <button @click="showPackages(tour)" class="book-now-btn">Book Now</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Packages Modal -->
    <div v-if="showPackagesModal" class="modal-overlay" @click.self="closePackagesModal">
      <div class="modal-content">
        <TourPackages 
          :selectedTour="selectedTour"
          @package-selected="showPackageDetails"
          @close="closePackagesModal"
        />
      </div>
    </div>

    <!-- Package Details Modal -->
    <div v-if="showPackageDetailsModal" class="modal-overlay" @click.self="closePackageDetailsModal">
      <div class="modal-content">
        <component 
          :is="selectedPackage.component" 
          :tour="selectedTour"
        />
        <button @click="closePackageDetailsModal" class="close-btn">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import TourPackages from '@/components/TourPackages.vue'
import SingleTownship from './SingleTownship.vue';
import TownshipDuo from './TownshipDuo.vue';
import FullCapeCulture from './FullCapeCulture.vue';

export default {
  name: "TourView",
  components: { 
    TourPackages,
    SingleTownship,
    TownshipDuo,
    FullCapeCulture
  },
  data() {
    return {
      hoverTour: null,
      showPackagesModal: false,
      showPackageDetailsModal: false,
      selectedTour: null,
      selectedPackage: null,
      tours: [
        {
          id: 1,
          name: "Bo-Kaap Cultural Walk",
          image: require("../assets/Gemini_Generated_Image_ubnle2ubnle2ubnl.png"),
          description: "Wander the cobbled streets of Bo-Kaap, where every corner tells a story. From pastel-painted homes and the melodic call to prayer, to the aroma of slow-cooked curries—this experience is a feast for the senses. Join us for a journey that blends history, heritage, and hospitality in Cape Town's most",
          link: "/tours/bokaap"
        },
        {
          id: 2,
          name: "Khayelitsha Township Experience",
          image: require("../assets/Gemini_Generated_Image_by3o39by3o39by3o.png"),
          description: "Experience the rhythm and resilience of one of South Africa’s fastest-growing townships. Khayelitsha—meaning “new home” in isiXhosa—is a vibrant urban hub where baristas, barbers, and beatmakers are redefining African city life from the ground up. This is a walking story through hope, hustle, and homegrown culture.",
          link: "/tours/khayelitsha"
        },
        {
          id: 3,
          name: "Langa Street Tour",
          image: require("../assets/Gemini_Generated_Image_nlxsjqnlxsjqnlxs.png"),
          description: "Step into Cape Town’s oldest township—where jazz, resistance, and resilience flow through the streets. Langa, meaning “sun”, carries a legacy that shines through every mural, melody, and memory. This is a soulful journey through history, art, and culture—told by those who live it every day.",
          link: "/tours/langa"
        },
        {
          id: 4,
          name: "Mitchells Plain Local Ride",
          image: require("../assets/Gemini_Generated_Image_yjao3jyjao3jyjao.png"),
          description: "Step into the heart of the Cape Flats, where creativity meets community. Mitchells Plain is alive with rhythm, colour, and flavour—from the sound of local beats to the sizzle of street food stalls. This immersive tour shines a light on a vibrant, often misunderstood community—where adversity has inspired innovation, and every corner has a story to tell.",
          link: "/tours/mitchellsplain"
        }
      ]
    }
  },
  methods: {
    showPackages(tour) {
      this.selectedTour = tour;
      this.showPackagesModal = true;
    },
    closePackagesModal() {
      this.showPackagesModal = false;
    },
    showPackageDetails(pkg) {
      this.selectedPackage = pkg;
      this.showPackagesModal = false;
      this.showPackageDetailsModal = true;
    },
    closePackageDetailsModal() {
      this.showPackageDetailsModal = false;
    }
  }
}
</script>

<style scoped>
.tour-page {
  padding: 2rem;
  margin-left: 2rem; 
}

.page-title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
}

.tour-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

.tour-item {
  display: flex;
  flex-direction: column; /* stack content vertically */
  gap: 1rem; /* space inside card */
  background-color: #fff;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  width: 100%;
  height: 100%;
}

.tour-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(245, 243, 243);
  background-size: cover;
  background-position: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 0;
}

.tour-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.2) !important;
}

.tour-item:hover::before {
  opacity: 0.3; /* Adjust this value for desired transparency */
}

/* Ensure content stays above background */
.image-container,
.tour-text {
  position: relative;
  z-index: 1;
}

.image-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.tour-image {
  width: 100%;
  height: auto;
  border-radius: 10px;
  object-fit: cover;
  margin-bottom: 0.5rem;
}

.tour-text {
  flex: 1 1 auto;
  min-width: 250px;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.tour-title {
  font-size: 1.5rem;
  margin-top: 0.5rem;
  text-align: center;
}

.tour-description {
  font-size: 1rem;
  margin-bottom: 1rem;
}
.links {
  display: flex;
  gap: 1rem;
  margin-top: auto;  /* Push links to bottom of .tour-text */
  justify-content: center; /* Center horizontally, adjust as needed */
  flex-wrap: wrap; /* In case of very narrow widths */
}


.button {
  background-color: white;
  border: 2px solid #f6c46d;
  border-radius: 5px;
  color: #091d35;
  font-weight: bold;
  padding: 0.5rem 1rem;
  cursor: pointer;
  text-align: center;
  display: inline-block;
  transition: background-color 0.3s ease, color 0.3s ease;
  text-decoration: none; /* remove underline */
}

.button:hover {
  background-color: #f6c46d;
  color: #091d35;
  border-color: #d4a44a;
}


.book-now-btn {
  background-color: white;
  border: 2px solid #f6c46d;
  border-radius: 5px;
  color: #091d35;
  font-weight: bold;
  padding: 0.6rem 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.book-now-btn:hover {
  background-color: #f6c46d;
  color: #091d35;
  border-color: #d4a44a;
}
.button,
.book-now-btn {
  /* flex: 1 1 auto;  */
  min-width: 100px; /* Optional: prevent too narrow buttons */
  text-align: center;
}

@media (max-width: 768px) {
  .tour-item {
    flex-direction: column;
  }
  
  .image-container {
    width: 100%;
  }
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal-content {
  background: white;
  border-radius: 10px;
  padding: 2rem;
  max-width: 800px;
  width: 90%;
  box-shadow: 0 8px 20px rgba(0,0,0,0.3);
  text-align: center;
  overflow-y: auto;
  max-height: 80vh;
}

.close-btn {
  margin-top: 2rem;
  background-color: #d9534f;
  color: white;
  border: none;
  padding: 0.5rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}

.close-btn:hover {
  background-color: #c9302c;
}
</style>
