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
          <router-link :to="tour.link" class="more-info-link">More Info</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TourView",
  data() {
    return {
      hoverTour: null,
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
        description: "Experience the rhythm and resilience of one of South Africa’s fastest-growing townships. Khayelitsha—meaning “new home” in isiXhosa—is a vibrant urban hub where baristas, barbers, and beatmakers are redefining African city life from the ground up. This is a walking story through hope, hustle, and homegrown culture. ",
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
          description: "Step into the heart of the Cape Flats, where creativity meets community. Mitchells Plain is alive with rhythm, colour, and flavour—from the sound of local beats to the sizzle of street food stalls. This immersive tour shines a light on a vibrant, often misunderstood community—where adversity has inspired innovation, and every corner has a story to tell. ",
          link: "/tours/mitchellsplain"
        }
      ]
    };{
       hoverTour: null
    }
  }
};
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
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.tour-item {
  display: flex;
  align-items: flex-start;
  gap: 2rem;
  background-color: #fff;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  flex-wrap: wrap;
  position: relative; /* Added for background positioning */
  overflow: hidden; /* Added to contain the background */
  transition: all 0.3s ease;
}

.tour-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("https://i.pinimg.com/1200x/da/0d/06/da0d060d7d971da15b42b31453c44e0c.jpg");
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
  /* background-color: rgba(255,255,255,0.8); */
   /* Slightly transparent white */
}

.image-container {
  display: flex;
  flex-direction: column;
  width: 300px;
}

.tour-image {
  width: 100%;
  height: auto;
  border-radius: 10px;
  object-fit: cover;
  margin-bottom: 0.5rem;
}

.tour-text {
  flex: 1;
  min-width: 250px;
  margin-top: 9rem;
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

.more-info-link {
  color: #091d35;
  text-decoration: underline;
  font-weight: bold;
  margin-top: 6rem;
}

.more-info-link:hover {
  color: rgb(246, 196, 109);
  transition: color 0.3s ease;
  cursor: pointer;
}

@media (max-width: 768px) {
  .tour-item {
    flex-direction: column;
  }
  
  .image-container {
    width: 100%;
  }
}
</style>