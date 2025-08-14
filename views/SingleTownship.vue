<template>
  <div class="booking-form">
    <div class="form-header">
      <h2>🏙️ Single Township Tour</h2>
      <p class="price-tag">R1500 per person • 5 hours</p>
    </div>
    
    <div class="form-body">
      <div class="form-group">
        <label for="people">Number of People:</label>
        <input 
          type="number" 
          id="people" 
          v-model.number="people" 
          min="1" 
          class="form-input"
        />
      </div>

      <div class="form-group">
        <label for="township">Select Township:</label>
        <select 
          id="township" 
          v-model="selectedTownship" 
          class="form-input"
        >
          <option disabled value="">Choose township</option>
          <option v-for="town in townships" :key="town" :value="town">{{ town }}</option>
        </select>
      </div>

      <div class="form-group">
        <label for="date">Select Date:</label>
        <input
          id="date"
          type="date"
          v-model="date"
          :min="minDate"
          class="form-input"
        />
      </div>

      <div class="summary">
        <div class="total-label">Your Total:</div>
        <div class="total-amount">R{{ total }}</div>
      </div>

      <button @click="bookNow" class="book-btn">
        <span>Book Now</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SingleTownship",
   data() {
    return {
      people: 1,
      selectedTownship: this.$route.query.presetTownship || "", // Auto-set from URL
      date: "",
      townships: ["Bo-Kaap", "Khayelitsha", "Mitchells Plain", "Langa"],
      packageId: 1,
      packageName: "Single Township Tour",
      pricePerPerson: 1500,
    };
  },
  computed: {
    minDate() {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      return tomorrow.toISOString().split("T")[0];
    },
    total() {
      return this.people * this.pricePerPerson;
    }
  },
  methods: {
    bookNow() {
      if (!this.selectedTownship || !this.date || this.people < 1) {
        alert("Please fill all fields correctly.");
        return;
      }
      if (this.date < this.minDate) {
        alert("Please select a date from tomorrow onwards.");
        return;
      }

      const bookingDetails = {
        packageId: this.packageId,
        packageName: this.packageName,
        people: this.people,
        township: this.selectedTownship,
        date: this.date,
        total: this.total,
      };

      localStorage.setItem("bookingDetails", JSON.stringify(bookingDetails));
      this.$router.push("/register");
    },
  },
};
</script>

<style scoped>
.booking-form {
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

.price-tag {
  margin: 8px 0 0;
  color: rgb(246, 196, 109);
  font-weight: 500;
  font-size: 1.1rem;
}

.form-body {
  padding: 25px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #091d35;
  font-size: 0.95rem;
}

.form-input {
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background-color: #f8fafc;
}

.form-input:focus {
  outline: none;
  border-color: rgb(246, 196, 109);
  box-shadow: 0 0 0 3px rgba(246, 196, 109, 0.2);
}

select.form-input {
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 1em;
}

.summary {
  background: #f5f8fa;
  border-radius: 8px;
  padding: 15px;
  margin: 25px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.total-label {
  color: #64748b;
  font-size: 0.95rem;
}

.total-amount {
  color: #091d35;
  font-size: 1.5rem;
  font-weight: 700;
}

.book-btn {
  width: 100%;
  padding: 15px;
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
}

.book-btn:hover {
  background: linear-gradient(135deg, #0a2647 0%, #091d35 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(9, 29, 53, 0.15);
}

.book-btn:active {
  transform: translateY(0);
}

@media (max-width: 480px) {
  .booking-form {
    margin: 15px;
    border-radius: 12px;
  }
  
  .form-header, .form-body {
    padding: 20px;
  }
}
</style>