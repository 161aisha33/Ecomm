<template>
  <form @submit.prevent="submitForm" class="register-form">
    <div class="form-header">
      <h2>Enter Your Details</h2>
      <p class="form-subtitle">Complete your booking information</p>
    </div>

    <div class="form-body">
      <div class="form-group">
        <input 
          v-model="form.firstName" 
          placeholder="First Name" 
          required 
          class="form-input"
        />
      </div>

      <div class="form-group">
        <input 
          v-model="form.lastName" 
          placeholder="Last Name" 
          required 
          class="form-input"
        />
      </div>

      <div class="form-group">
        <input 
          v-model="form.email" 
          type="email" 
          placeholder="Email" 
          required 
          class="form-input"
        />
      </div>

      <div class="form-group">
        <input 
          v-model="form.phone" 
          type="tel" 
          placeholder="Phone Number" 
          required 
          class="form-input"
        />
      </div>

      <button :disabled="loading" class="submit-btn">
        <span v-if="!loading">Proceed to Payment</span>
        <span v-else>Processing...</span>
        <svg v-if="!loading" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1H2zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7z"/>
          <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1z"/>
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" class="spinner">
          <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zm0 2a6 6 0 1 0 0 12A6 6 0 0 0 8 2z"/>
          <path d="M8 0a8 8 0 0 1 8 8h-2a6 6 0 0 0-6-6V0z"/>
        </svg>
      </button>
    </div>
  </form>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const loading = ref(false)

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
})

const submitForm = async () => {
  loading.value = true

  try {
    const bookingDetails = JSON.parse(localStorage.getItem('bookingDetails'))
    if (!bookingDetails) {
      alert('No booking found. Please book a tour first.')
      loading.value = false
      router.push('/')
      return
    }

    // Prepare payload to backend
    const payload = {
      full_name: `${form.firstName} ${form.lastName}`,
      email: form.email,
      phone: form.phone,
      packageId: bookingDetails.packageId,
      number_of_people: bookingDetails.people,
      townships: bookingDetails.townships || [bookingDetails.township || bookingDetails.firstTownship || bookingDetails.firstTownship], 
      dates: bookingDetails.dates || [bookingDetails.date || bookingDetails.firstDate || bookingDetails.date],
    }

    const res = await fetch('http://localhost:5000/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    const data = await res.json()

    if (!res.ok) throw new Error(data.error || 'Booking failed')

    localStorage.setItem('checkoutUrl', data.checkoutUrl)
    window.location.href = data.checkoutUrl
  } catch (err) {
    alert(err.message)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.register-form {
  max-width: 450px;
  margin: 30px auto;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(9, 29, 53, 0.15);
  overflow: hidden;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.form-header {
  background: #091d35;
  color: white;
  padding: 25px;
  text-align: center;
}

.form-header h2 {
  margin: 0;
  font-size: 1.8rem;
  font-weight: 600;
}

.form-subtitle {
  margin: 8px 0 0;
  color: rgb(246, 196, 109);
  font-size: 1rem;
}

.form-body {
  padding: 25px;
}

.form-group {
  margin-bottom: 20px;
  position: relative;
}

.form-input {
  width: 100%;
  padding: 14px 16px;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background-color: #f8fafc;
  color: #091d35;
}

.form-input::placeholder {
  color: #94a3b8;
}

.form-input:focus {
  outline: none;
  border-color: rgb(246, 196, 109);
  box-shadow: 0 0 0 3px rgba(246, 196, 109, 0.2);
}

.submit-btn {
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #091d35 0%, #0a2647 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(9, 29, 53, 0.1);
  margin-top: 10px;
}

.submit-btn:hover:not(:disabled) {
  background: rgb(246, 196, 109);
  color: #091d35;
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(246, 196, 109, 0.3);
}

.submit-btn:active:not(:disabled) {
  transform: translateY(0);
  background: rgb(240, 186, 90);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@media (max-width: 480px) {
  .register-form {
    margin: 15px;
    border-radius: 12px;
  }
  
  .form-header, .form-body {
    padding: 20px;
  }
}
</style>