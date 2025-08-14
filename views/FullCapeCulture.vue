<template>
  <div class="booking-form">
    <div class="form-header">
      <h2>🌍 Full Cape Culture Tour</h2>
      <p class="price-tag">R6000 per person • 4 Days (5 hrs/day)</p>
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

      <div 
        v-for="(town, index) in selectedTownships" 
        :key="index" 
        class="township-group"
      >
        <div class="form-group">
          <label :for="'township-'+index">Township {{ index + 1 }}:</label>
          <select 
            :id="'township-'+index"
            v-model="town.name" 
            class="form-input"
          >
            <option disabled value="">Choose township</option>
            <option 
              v-for="option in availableTownships(index)" 
              :key="option" 
              :value="option"
              :disabled="isTownshipSelected(option, index)"
            >
              {{ option }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label :for="'date-'+index">Tour Date:</label>
          <input
            :id="'date-'+index"
            type="date"
            v-model="town.date"
            :min="minDate"
            :class="['form-input', { 'input-error': hasDateConflict(index) }]"
          />
          <div v-if="hasDateConflict(index)" class="error-message">
            ⚠️ This date conflicts with another township
          </div>
        </div>
      </div>

      <button 
        v-if="selectedTownships.length < 4" 
        @click="addTownship" 
        class="add-township-btn"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
        </svg>
        Add Another Township
      </button>

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
  name: "FullCapeCulture",
  data() {
    return {
      people: 1,
      selectedTownships: [
        { name: "", date: "" },
        { name: "", date: "" }
      ],
      townships: ["Bo-Kaap", "Khayelitsha", "Mitchells Plain", "Langa"],
      packageId: 3,
      packageName: "Full Cape Culture Tour",
      pricePerPerson: 6000,
    };
  },
  computed: {
    total() {
      return this.people * this.pricePerPerson;
    },
    minDate() {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      return tomorrow.toISOString().split("T")[0];
    }
  },
  methods: {
    availableTownships(index) {
      // Return all townships except those selected in other fields
      return this.townships.filter(town => 
        !this.selectedTownships.some((t, i) => i !== index && t.name === town)
      );
    },
    isTownshipSelected(town, currentIndex) {
      // Check if township is selected in any other field
      return this.selectedTownships.some((t, i) => 
        i !== currentIndex && t.name === town
      );
    },
    hasDateConflict(index) {
      if (!this.selectedTownships[index].date) return false;
      
      return this.selectedTownships.some((t, i) => 
        i !== index && 
        t.date && 
        t.date === this.selectedTownships[index].date
      );
    },
    hasAnyDateConflict() {
      return this.selectedTownships.some((t, i) => this.hasDateConflict(i));
    },
    addTownship() {
      if (this.selectedTownships.length < 4) {
        this.selectedTownships.push({ name: "", date: "" });
      }
    },
    bookNow() {
      // Validate all townships are selected
      if (this.selectedTownships.some(t => !t.name)) {
        alert("Please select a township for each entry.");
        return;
      }
      
      // Validate all dates are selected
      if (this.selectedTownships.some(t => !t.date)) {
        alert("Please select a date for each township.");
        return;
      }
      
      // Validate no duplicate townships
      const townshipNames = this.selectedTownships.map(t => t.name);
      if (new Set(townshipNames).size !== townshipNames.length) {
        alert("Please select different townships for each entry.");
        return;
      }
      
      // Validate no duplicate dates
      if (this.hasAnyDateConflict()) {
        alert("Please select different dates for each township.");
        return;
      }
      
      // Validate dates are in the future
      const today = new Date().toISOString().split('T')[0];
      if (this.selectedTownships.some(t => t.date < today)) {
        alert("Please select future dates for all townships.");
        return;
      }
      
      // Validate people count
      if (this.people < 1) {
        alert("Please enter a valid number of people.");
        return;
      }

      const bookingDetails = {
        packageId: this.packageId,
        packageName: this.packageName,
        people: this.people,
        townships: this.selectedTownships.map(t => ({
          name: t.name,
          date: t.date
        })),
        total: this.total
      };

      localStorage.setItem("bookingDetails", JSON.stringify(bookingDetails));
      this.$router.push("/register");
    }
  }
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

.township-group {
  background: #f8fafc;
  border-radius: 8px;
  padding: 15px;
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
  background-color: #ffffff;
}

.form-input:focus {
  outline: none;
  border-color: rgb(246, 196, 109);
  box-shadow: 0 0 0 3px rgba(246, 196, 109, 0.2);
}

.input-error {
  border-color: #ef4444;
}

.input-error:focus {
  border-color: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2);
}

select.form-input {
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 1em;
}

.error-message {
  color: #ef4444;
  font-size: 0.8rem;
  margin-top: 5px;
}

.add-township-btn {
  width: 100%;
  padding: 12px;
  background: #f0fdf4;
  color: #166534;
  border: 2px dashed #bbf7d0;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 20px;
  transition: all 0.3s ease;
}

.add-township-btn:hover {
  background: #dcfce7;
  border-color: #86efac;
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

