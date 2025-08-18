<template>
  <div class="confirmation-container">
    <div class="confirmation-card" :class="{ 'loading-state': loading }">
      <!-- Success State -->
      <div v-if="booking" class="success-animation">
        <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
          <circle class="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
          <path class="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
        </svg>
        
        <h2 class="confirmation-title">Booking Confirmed!</h2>
        <p class="confirmation-subtitle">Thank you for choosing Cape Route Tours</p>
        
        <div class="confetti-container">
          <div class="confetti" v-for="(c, i) in 50" :key="i" :style="confettiStyle(i)"></div>
        </div>

   <div class="booking-details">
    <div class="detail-section">
      <h3 class="section-title">Tour Information</h3>
      <div class="detail-item">
        <span class="detail-label">Tour Package:</span>
        <span class="detail-value">{{ booking.packageName }}</span>
      </div>
      
      <!-- Dynamic display based on package type -->
      <template v-if="isSingleTownship">
        <div class="detail-item">
          <span class="detail-label">Township:</span>
          <span class="detail-value">{{ booking.tours[0].township || booking.tours[0].name }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Tour Date:</span>
          <span class="detail-value">{{ formatDate(booking.tours[0].date) }}</span>
        </div>
      </template>
      
      <template v-else-if="isTownshipDuo">
        <div v-for="(tour, index) in booking.tours" :key="index" class="tour-item">
          <div class="detail-item">
            <span class="detail-label">Township {{ index + 1 }}:</span>
            <span class="detail-value">{{ tour.township || tour.name }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Tour Date {{ index + 1 }}:</span>
            <span class="detail-value">{{ formatDate(tour.date) }}</span>
          </div>
        </div>
      </template>
      
      <template v-else-if="isFullCapeCulture">
        <div v-for="(tour, index) in normalizedTours" :key="index" class="tour-item">
          <div class="detail-item">
            <span class="detail-label">Township {{ index + 1 }}:</span>
            <span class="detail-value">{{ tour.township || tour.name }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Tour Date {{ index + 1 }}:</span>
            <span class="detail-value">{{ formatDate(tour.date) }}</span>
          </div>
        </div>
      </template>
      
      <div class="detail-item">
        <span class="detail-label">Number of People:</span>
        <span class="detail-value">{{ booking.people }}</span>
      </div>
    </div>

    <div class="detail-section">
      <h3 class="section-title">Tour Logistics</h3>
      
      <template v-if="isSingleTownship">
        <div class="detail-item">
          <span class="detail-label">Date & Time:</span>
          <span class="detail-value">{{ formatDateTime(booking.tours[0].date) }}</span>
        </div>
      </template>
      
      <template v-else-if="isTownshipDuo">
        <div v-for="(tour, index) in booking.tours" :key="'log-'+index" class="detail-item">
          <span class="detail-label">Date & Time ({{ index + 1 }}):</span>
          <span class="detail-value">{{ formatDateTime(tour.date) }}</span>
        </div>
      </template>
      
      <template v-else-if="isFullCapeCulture">
        <div v-for="(tour, index) in normalizedTours" :key="'log-'+index" class="detail-item">
          <span class="detail-label">Date & Time ({{ index + 1 }}):</span>
          <span class="detail-value">{{ formatDateTime(tour.date) }}</span>
        </div>
      </template>
      
      <div class="detail-item">
        <span class="detail-label">Meeting Point:</span>
        <span class="detail-value">Cape of Good Hope (Central Pick-Up Point)</span>
      </div>
    </div>

          <div class="detail-section total-section">
            <div class="detail-item">
              <span class="detail-label">Total Amount:</span>
              <span class="detail-value total-amount">R{{ booking.total }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Booking Reference:</span>
              <span class="detail-value ref-number">#{{ booking.bookingRef }}</span>
            </div>
          </div>
        </div>

        <div class="action-buttons">
          <button class="print-btn" @click="printConfirmation">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M5 1a2 2 0 0 0-2 2v1h10V3a2 2 0 0 0-2-2H5zm6 8H5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1z"/>
              <path d="M0 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1v-2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2H2a2 2 0 0 1-2-2V7zm2.5 1a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z"/>
            </svg>
            Print Confirmation
          </button>
          <router-link to="/" class="home-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z"/>
            </svg>
            Back to Home
          </router-link>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="error-animation">
        <div class="error-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
          </svg>
        </div>
        <h2 class="error-title">Booking Error</h2>
        <p class="error-message">{{ error }}</p>
        <router-link to="/" class="home-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z"/>
          </svg>
          Back to Home
        </router-link>
      </div>

      <!-- Loading State -->
      <div v-else class="loading-animation">
        <div class="loader">
          <div class="loader-circle"></div>
          <div class="loader-circle"></div>
          <div class="loader-circle"></div>
        </div>
        <p class="loading-text">Confirming your booking...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const loading = ref(true);
const booking = ref(null);
const error = ref(null);

// Computed properties to determine package type
const normalizedTours = computed(() => {
  if (!booking.value) return [];
  
  // Handle all possible data structures
  if (booking.value.tours) {
    return booking.value.tours;
  }
  if (booking.value.township) {
    return [{ 
      name: booking.value.township,
      date: booking.value.date 
    }];
  }
  return [];
});

const isSingleTownship = computed(() => {
  return booking.value?.packageId === 1 || 
         (booking.value?.tours?.length === 1 && !isTownshipDuo.value && !isFullCapeCulture.value);
});

const isTownshipDuo = computed(() => {
  return booking.value?.packageId === 2 || 
         (booking.value?.tours?.length === 2 && booking.value?.packageName?.includes('Duo'));
});

const isFullCapeCulture = computed(() => {
  return booking.value?.packageId === 3 || 
         (booking.value?.tours?.length > 2 && booking.value?.packageName?.includes('Full'));
});

// Enhanced date formatting with timezone support
const formatDate = (dateString) => {
  if (!dateString) return 'Not specified';
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Not specified';
    
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC' // Important for consistent display
    });
  } catch {
    return 'Not specified';
  }
};

const formatDateTime = (dateString) => {
  const formattedDate = formatDate(dateString);
  return formattedDate === 'Not specified' 
    ? 'Not specified' 
    : `${formattedDate} at 11:00 AM`;
};

const confettiStyle = (i) => {
  const colors = ['#091d35', 'rgb(246, 196, 109)', '#4CAF50', '#2196F3', '#9C27B0'];
  return {
    backgroundColor: colors[i % colors.length],
    left: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 2}s`,
    transform: `rotate(${Math.random() * 360}deg)`,
    width: `${Math.random() * 8 + 6}px`,
    height: `${Math.random() * 8 + 6}px`,
  };
};

onMounted(() => {
  const stored = localStorage.getItem("bookingDetails");
  if (stored) {
    booking.value = JSON.parse(stored);
    
    // If bookingRef doesn't exist, fall back to bookingId or generate a simple one
    if (!booking.value.bookingRef) {
      booking.value.bookingRef = booking.value.bookingId || `temp-${Math.floor(100000 + Math.random() * 900000)}`;
    }
  } else {
    error.value = "No booking details found.";
  }
  loading.value = false;
});


const printConfirmation = () => {
  window.print();
};
</script>

<style scoped>
.booking-details {
  background: #f9f9f9;
  border-radius: 12px;
  padding: 20px;
  margin: 30px 0;
  text-align: left;
  animation: fadeInUp 0.6s ease 0.4s forwards;
  opacity: 0;
}

.detail-section {
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.detail-section:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.section-title {
  color: #091d35;
  font-size: 1.2rem;
  margin-bottom: 15px;
  padding-bottom: 8px;
  border-bottom: 2px solid rgb(246, 196, 109);
  display: inline-block;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.detail-item:last-child {
  margin-bottom: 0;
}

.detail-label {
  color: #666;
  font-weight: 500;
  flex: 1;
}

.detail-value {
  color: #091d35;
  font-weight: 600;
  flex: 1;
  text-align: right;
}

.total-section {
  background: rgba(9, 29, 53, 0.05);
  border-radius: 8px;
  padding: 15px;
  margin-top: 20px;
}

.total-amount {
  color: rgb(246, 196, 109);
  font-size: 1.2rem;
}

.ref-number {
  font-family: monospace;
  color: #091d35;
  font-weight: 700;
}
.confirmation-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ed 100%);
  padding: 20px;
}

.confirmation-card {
  background: white;
  border-radius: 20px;
  box-shadow: 0 15px 30px rgba(9, 29, 53, 0.1);
  padding: 40px;
  max-width: 500px;
  width: 100%;
  position: relative;
  overflow: hidden;
  transition: all 0.5s ease;
}

.loading-state {
  background: linear-gradient(90deg, #f5f5f5 25%, #e0e0e0 50%, #f5f5f5 75%);
  background-size: 200% 100%;
  animation: loadingShimmer 1.5s infinite;
}

@keyframes loadingShimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Success Animation */
.success-animation {
  text-align: center;
  position: relative;
}

.checkmark {
  width: 100px;
  height: 100px;
  margin: 0 auto 20px;
  display: block;
}

.checkmark-circle {
  stroke: rgb(246, 196, 109);
  stroke-width: 2;
  stroke-miterlimit: 10;
  animation: checkmark-circle 0.6s ease-in-out;
}

.checkmark-check {
  stroke: #091d35;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-miterlimit: 10;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: checkmark-check 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.6s forwards;
}

@keyframes checkmark-circle {
  0% { stroke-dasharray: 166; stroke-dashoffset: 166; }
  100% { stroke-dasharray: 166; stroke-dashoffset: 0; }
}

@keyframes checkmark-check {
  0% { stroke-dashoffset: 48; }
  100% { stroke-dashoffset: 0; }
}

.confirmation-title {
  color: #091d35;
  font-size: 2rem;
  margin-bottom: 10px;
  animation: fadeInUp 0.6s ease;
}

.confirmation-subtitle {
  color: rgb(246, 196, 109);
  font-size: 1.2rem;
  margin-bottom: 30px;
  animation: fadeInUp 0.6s ease 0.2s forwards;
  opacity: 0;
}

.action-buttons {
  display: flex;
  gap: 15px;
  margin-top: 30px;
  animation: fadeInUp 0.6s ease 0.6s forwards;
  opacity: 0;
}

.print-btn, .home-btn {
  flex: 1;
  padding: 12px;
  border-radius: 8px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.print-btn {
  background: #091d35;
  color: white;
  border: 2px solid #091d35;
}

.print-btn:hover {
  background: white;
  color: #091d35;
  transform: translateY(-2px);
}

.home-btn {
  background: white;
  color: #091d35;
  border: 2px solid #091d35;
  text-decoration: none;
}

.home-btn:hover {
  background: rgb(246, 196, 109);
  border-color: rgb(246, 196, 109);
  transform: translateY(-2px);
}

/* Confetti Animation */
.confetti-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 1;
}

.confetti {
  position: absolute;
  width: 10px;
  height: 10px;
  opacity: 0;
  animation: confettiFall 5s ease-in-out infinite;
}

@keyframes confettiFall {
  0% {
    opacity: 1;
    transform: translateY(-100px) rotate(0deg);
  }
  100% {
    opacity: 0;
    transform: translateY(500px) rotate(360deg);
  }
}

/* Error Animation */
.error-animation {
  text-align: center;
}

.error-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(239, 83, 80, 0.1);
  border-radius: 50%;
  animation: pulse 1.5s infinite;
}

.error-icon svg {
  color: #ef5350;
  width: 40px;
  height: 40px;
}

.error-title {
  color: #ef5350;
  font-size: 1.8rem;
  margin-bottom: 10px;
}

.error-message {
  color: #666;
  margin-bottom: 30px;
}

/* Loading Animation */
.loading-animation {
  text-align: center;
  padding: 30px 0;
}

.loader {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.loader-circle {
  width: 15px;
  height: 15px;
  background: rgb(246, 196, 109);
  border-radius: 50%;
  animation: bounce 1.4s infinite ease-in-out;
}

.loader-circle:nth-child(1) {
  animation-delay: -0.32s;
}

.loader-circle:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes bounce {
  0%, 80%, 100% { 
    transform: scale(0);
    background: #091d35;
  }
  40% { 
    transform: scale(1);
    background: rgb(246, 196, 109);
  }
}

.loading-text {
  color: #091d35;
  font-size: 1.1rem;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 600px) {
  .confirmation-card {
    padding: 30px 20px;
  }
  
  .action-buttons {
    flex-direction: column;
  }
}

</style>