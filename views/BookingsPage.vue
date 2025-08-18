// BookingManagement.vue - Main booking management component
<template>
  <div class="booking-management">
    <!-- Loading Overlay -->
    <div v-if="loading" class="loading-overlay">
      <div class="spinner"></div>
      <p>{{ loadingMessage }}</p>
    </div>

    <!-- Booking Lookup Form -->
    <div v-if="!currentBooking" class="booking-lookup">
      <div class="lookup-container">
        <h2>Manage Your Bookings</h2>
        <p>Here you can view and manage all your bookings.</p>
        
        <form @submit.prevent="lookupBooking" class="lookup-form">
          <div class="form-group">
            <label for="email">Email:</label>
            <input 
              id="email"
              v-model="lookupForm.email" 
              type="email" 
              required
              :disabled="loading"
              class="form-control"
              placeholder="Enter your email address"
            />
          </div>
          
          <div class="form-group">
            <label for="bookingId">Booking ID:</label>
            <input 
              id="bookingId"
              v-model="lookupForm.bookingId" 
              type="text" 
              required
              :disabled="loading"
              class="form-control"
              placeholder="Enter your booking ID (e.g., CRT-2025-001234)"
            />
          </div>
          
          <button 
            type="submit" 
            :disabled="loading || !lookupForm.email || !lookupForm.bookingId"
            class="btn btn-primary btn-view-booking"
          >
            {{ loading ? 'Searching...' : 'View Booking' }}
          </button>
        </form>
        
        <!-- Error Message -->
        <div v-if="error" class="alert alert-error">
          {{ error }}
        </div>
      </div>
    </div>

    <!-- Booking Details Display -->
    <div v-if="currentBooking && !showModifyForm && !showCancelForm" class="booking-details">
      <div class="booking-header">
        <h2>Booking Details</h2>
        <button @click="goBack" class="btn btn-secondary btn-back">
          ← Look Up Another Booking
        </button>
      </div>
      
      <div class="booking-card">
        <div class="booking-info">
          <h3>{{ currentBooking.packageName }}</h3>
          <div class="info-grid">
            <div class="info-item">
              <strong>Booking ID:</strong>
              <span>{{ currentBooking.bookingId }}</span>
            </div>
            <div class="info-item">
              <strong>Customer:</strong>
              <span>{{ currentBooking.customerName }}</span>
            </div>
            <div class="info-item">
              <strong>Email:</strong>
              <span>{{ currentBooking.email }}</span>
            </div>
            <div class="info-item">
              <strong>Phone:</strong>
              <span>{{ currentBooking.phone }}</span>
            </div>
            <div class="info-item">
              <strong>Tour Date:</strong>
              <span>{{ formatDate(currentBooking.tourDate) }}</span>
            </div>
            <div class="info-item">
              <strong>Number of People:</strong>
              <span>{{ currentBooking.numberOfPeople }}</span>
            </div>
            <div class="info-item">
              <strong>Total Amount:</strong>
              <span>R{{ currentBooking.totalAmount.toLocaleString() }}</span>
            </div>
            <div class="info-item">
              <strong>Status:</strong>
              <span :class="['status', currentBooking.status.toLowerCase()]">
                {{ currentBooking.status.toUpperCase() }}
              </span>
            </div>
            <div v-if="currentBooking.specialRequests" class="info-item full-width">
              <strong>Special Requests:</strong>
              <span>{{ currentBooking.specialRequests }}</span>
            </div>
          </div>
        </div>
        
        <div class="booking-actions">
          <button 
            v-if="currentBooking.canModify && currentBooking.status !== 'cancelled'"
            @click="showModifyForm = true"
            class="btn btn-primary"
          >
            Modify Booking
          </button>
          
          <button 
            v-if="currentBooking.canCancel && currentBooking.status !== 'cancelled'"
            @click="showCancelForm = true"
            class="btn btn-danger"
          >
            Cancel Booking
          </button>
          
          <div v-if="!currentBooking.canModify && !currentBooking.canCancel && currentBooking.status !== 'cancelled'" class="modification-notice">
            <small>Modifications and cancellations are not available within 24-48 hours of your tour date.</small>
          </div>
        </div>
      </div>
    </div>

    <!-- Modify Booking Form -->
    <div v-if="showModifyForm" class="modify-booking">
      <div class="form-header">
        <h3>Modify Booking</h3>
        <button @click="showModifyForm = false" class="btn btn-secondary">
          ← Back to Details
        </button>
      </div>
      
      <form @submit.prevent="modifyBooking" class="modify-form">
        <div class="form-group">
          <label for="tourDate">Tour Date:</label>
          <input 
            id="tourDate"
            v-model="modifyForm.tourDate" 
            type="date" 
            required
            :min="tomorrow"
            class="form-control"
          />
        </div>
        
        <div class="form-group">
          <label for="numberOfPeople">Number of People:</label>
          <input 
            id="numberOfPeople"
            v-model.number="modifyForm.numberOfPeople" 
            type="number" 
            min="1" 
            max="20"
            required
            class="form-control"
          />
          <small>Price will be recalculated based on the number of people.</small>
        </div>
        
        <div class="form-group">
          <label for="specialRequests">Special Requests:</label>
          <textarea 
            id="specialRequests"
            v-model="modifyForm.specialRequests"
            class="form-control"
            rows="3"
            placeholder="Any dietary requirements, accessibility needs, etc."
          ></textarea>
        </div>
        
        <div class="form-actions">
          <button type="submit" :disabled="loading" class="btn btn-primary">
            {{ loading ? 'Updating...' : 'Update Booking' }}
          </button>
          <button type="button" @click="showModifyForm = false" class="btn btn-secondary">
            Cancel
          </button>
        </div>
      </form>
    </div>

    <!-- Cancel Booking Form -->
    <div v-if="showCancelForm" class="cancel-booking">
      <div class="form-header">
        <h3>Cancel Booking</h3>
        <button @click="showCancelForm = false" class="btn btn-secondary">
          ← Back to Details
        </button>
      </div>
      
      <div class="cancellation-warning">
        <p><strong>⚠️ Warning:</strong> This action cannot be undone.</p>
        <p>Are you sure you want to cancel your booking for {{ currentBooking?.packageName }}?</p>
      </div>
      
      <form @submit.prevent="cancelBooking" class="cancel-form">
        <div class="form-group">
          <label for="cancellationReason">Reason for Cancellation (Optional):</label>
          <textarea 
            id="cancellationReason"
            v-model="cancelForm.reason"
            class="form-control"
            rows="3"
            placeholder="Please let us know why you're cancelling. This helps us improve our service."
          ></textarea>
        </div>
        
        <div class="form-actions">
          <button type="submit" :disabled="loading" class="btn btn-danger">
            {{ loading ? 'Cancelling...' : 'Confirm Cancellation' }}
          </button>
          <button type="button" @click="showCancelForm = false" class="btn btn-secondary">
            Keep Booking
          </button>
        </div>
      </form>
    </div>

    <!-- Success Message -->
    <div v-if="successMessage" class="alert alert-success">
      {{ successMessage }}
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'BookingManagement',
  data() {
    return {
      loading: false,
      loadingMessage: 'Processing...',
      error: null,
      successMessage: null,
      currentBooking: null,
      accessToken: null,
      showModifyForm: false,
      showCancelForm: false,
      
      // Form data
      lookupForm: {
        email: '',
        bookingId: ''
      },
      
      modifyForm: {
        tourDate: '',
        numberOfPeople: 1,
        specialRequests: ''
      },
      
      cancelForm: {
        reason: ''
      }
    }
  },
  
  computed: {
    tomorrow() {
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      return tomorrow.toISOString().split('T')[0]
    }
  },
  
  methods: {
    async lookupBooking() {
      this.clearMessages()
      this.loading = true
      this.loadingMessage = 'Searching for your booking...'
      
      try {
        const response = await axios.post('/api/booking-management/lookup', {
          email: this.lookupForm.email,
          bookingId: this.lookupForm.bookingId
        })
        
        if (response.data.success) {
          this.currentBooking = response.data.booking
          this.accessToken = response.data.accessToken
          this.populateModifyForm()
        } else {
          this.error = response.data.message
        }
      } catch (error) {
        console.error('Booking lookup error:', error)
        if (error.response?.data?.message) {
          this.error = error.response.data.message
        } else {
          this.error = 'Something went wrong. Please check your connection and try again.'
        }
      } finally {
        this.loading = false
      }
    },
    
    async modifyBooking() {
      this.clearMessages()
      this.loading = true
      this.loadingMessage = 'Updating your booking...'
      
      try {
        const response = await axios.put(`/api/booking-management/modify/${this.accessToken}`, {
          tourDate: this.modifyForm.tourDate,
          numberOfPeople: this.modifyForm.numberOfPeople,
          specialRequests: this.modifyForm.specialRequests
        })
        
        if (response.data.success) {
          this.currentBooking = response.data.booking
          this.showModifyForm = false
          this.successMessage = 'Booking updated successfully! You will receive a confirmation email shortly.'
          this.scrollToTop()
          
          // Clear success message after 5 seconds
          setTimeout(() => {
            this.successMessage = null
          }, 5000)
        } else {
          this.error = response.data.message
        }
      } catch (error) {
        console.error('Booking modification error:', error)
        if (error.response?.data?.message) {
          this.error = error.response.data.message
        } else {
          this.error = 'Something went wrong. Please try again.'
        }
      } finally {
        this.loading = false
      }
    },
    
    async cancelBooking() {
      // Double confirmation
      if (!confirm('Are you absolutely sure you want to cancel this booking? This action cannot be undone.')) {
        return
      }
      
      this.clearMessages()
      this.loading = true
      this.loadingMessage = 'Cancelling your booking...'
      
      try {
        const response = await axios.delete(`/api/booking-management/cancel/${this.accessToken}`, {
          data: { reason: this.cancelForm.reason }
        })
        
        if (response.data.success) {
          this.successMessage = 'Booking cancelled successfully. You will receive a confirmation email shortly.'
          this.showCancelForm = false
          
          // Update booking status locally
          if (this.currentBooking) {
            this.currentBooking.status = 'cancelled'
          }
          
          // Redirect after 3 seconds
          setTimeout(() => {
            this.goBack()
          }, 3000)
        } else {
          this.error = response.data.message
        }
      } catch (error) {
        console.error('Booking cancellation error:', error)
        if (error.response?.data?.message) {
          this.error = error.response.data.message
        } else {
          this.error = 'Something went wrong. Please try again.'
        }
      } finally {
        this.loading = false
      }
    },
    
    populateModifyForm() {
      if (this.currentBooking) {
        this.modifyForm.tourDate = this.currentBooking.tourDate.split('T')[0]
        this.modifyForm.numberOfPeople = this.currentBooking.numberOfPeople
        this.modifyForm.specialRequests = this.currentBooking.specialRequests || ''
      }
    },
    
    goBack() {
      this.currentBooking = null
      this.accessToken = null
      this.showModifyForm = false
      this.showCancelForm = false
      this.lookupForm.email = ''
      this.lookupForm.bookingId = ''
      this.clearMessages()
    },
    
    clearMessages() {
      this.error = null
      this.successMessage = null
    },
    
    formatDate(dateString) {
      const options = { 
        weekday: 'long',
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }
      return new Date(dateString).toLocaleDateString('en-US', options)
    },
    
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
}
</script>

<style scoped>
.booking-management {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

/* Loading Overlay */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #1e3a8a;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-overlay p {
  color: white;
  font-size: 1.1rem;
}

/* Forms */
.lookup-container {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
}

.lookup-form {
  max-width: 400px;
  margin: 2rem auto 0;
}

.form-group {
  margin-bottom: 1.5rem;
  text-align: left;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #1e3a8a;
}

.form-control {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-control:focus {
  outline: none;
  border-color: #1e3a8a;
}

.form-control:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

/* Buttons */
.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  text-decoration: none;
  display: inline-block;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-primary {
  background: #1e3a8a;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #1e40af;
}

.btn-secondary {
  background: #6b7280;
  color: white;
}

.btn-secondary:hover:not(:disabled) {
  background: #4b5563;
}

.btn-danger {
  background: #dc2626;
  color: white;
}

.btn-danger:hover:not(:disabled) {
  background: #b91c1c;
}

.btn-view-booking {
  width: 100%;
  margin-top: 1rem;
}

/* Booking Details */
.booking-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.booking-card {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 2rem;
}

.booking-card h3 {
  color: #1e3a8a;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 2rem;
}

.info-item {
  display: flex;
  flex-direction: column;
}

.info-item.full-width {
  grid-column: 1 / -1;
}

.info-item strong {
  color: #374151;
  margin-bottom: 0.25rem;
}

.info-item span {
  color: #1f2937;
}

.status {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
  text-align: center;
  max-width: fit-content;
}

.status.confirmed {
  background: #d1fae5;
  color: #065f46;
}

.status.pending {
  background: #fef3c7;
  color: #92400e;
}

.status.cancelled {
  background: #fee2e2;
  color: #991b1b;
}

/* Booking Actions */
.booking-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.modification-notice {
  background: #f3f4f6;
  padding: 1rem;
  border-radius: 4px;
  flex: 1;
}

.modification-notice small {
  color: #6b7280;
}

/* Form Headers */
.form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.form-header h3 {
  color: #1e3a8a;
  margin: 0;
}

/* Modify Form */
.modify-form, .cancel-form {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 8px;
}

.form-group small {
  color: #6b7280;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-start;
  margin-top: 2rem;
}

/* Cancel Form */
.cancellation-warning {
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 4px;
  padding: 1rem;
  margin-bottom: 2rem;
}

.cancellation-warning p {
  margin: 0.5rem 0;
  color: #991b1b;
}

/* Alerts */
.alert {
  padding: 1rem;
  border-radius: 4px;
  margin: 1rem 0;
}

.alert-error {
  background: #fee2e2;
  border: 1px solid #fecaca;
  color: #991b1b;
}

.alert-success {
  background: #d1fae5;
  border: 1px solid #a7f3d0;
  color: #065f46;
}

/* Responsive Design */
@media (max-width: 768px) {
  .booking-management {
    padding: 1rem;
  }
  
  .booking-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .info-grid {
    grid-template-columns: 1fr;
  }
  
  .booking-actions {
    flex-direction: column;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
  }
}
</style>