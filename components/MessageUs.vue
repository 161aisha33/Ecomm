<template>
    <div class ="card">
    <div class = "contact-form">
        <div v-if = "successMessage" class="success-message">
            Your Message has been sent successfully
        </div>
        <div v-if="errorMessage" class ="error-message">
            There was an error sending your message, please try again.
        </div>
        
        <form @submit.prevent="submitForm">
            <h2>Talk To Us</h2>
            <div class = "form-group">
                <label for="name">Full Name:</label>
                <input type="text" id="name" v-model="messages.name" required placeholder="John Doe"/>
            </div>
            <div class = "form-group">
                <label for ="email">Email:</label>
                <input type="email" id="email" v-model="messages.email" required placeholder="johndoe@gmail.com"/>
            </div>
            <div class = "form-group">
                <label for="phone">Phone Number:</label>
                <input type="tel" id="phone" v-model="messages.phone" required placeholder="012 345 6789"/> 
            </div>
            <div class =form-group>
                <label for="subject">Subject:</label>
                <select id="subject" v-model="messages.subject" required>
                    <option value="" disabled selected>Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="sales">Sales Question</option>
                    <option value="feedback">Feedback</option>
                </select>
            </div>
            <div class = "form-group">
                <label for="message">Message:</label>
                <textarea id="message" v-model="messages.message" required rows="5" placeholder="Tell us something"></textarea>
            </div>
            <button type="submit" class="submit-btn" :disabled="isLoading">
                <span v-if="isLoading">Sending...</span>
                <span v-else>Send</span>
            </button>
            <div v-if="submitSuccess" class="success-message">
                Your message has been sent successfully!
            </div>
            <div v-if ="submitError" class="error-message">
                There was an error sending your message. Please try again later.
            </div>
        </form>
    </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      messages: {
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      },
      isLoading: false,
      submitSuccess: false,
      submitError: false,
      errorMessage: ''
    }
  },
  methods: {
    async submitForm() {
      // Validate form
      if (!this.validateForm()) {
        return;
      }

      this.isLoading = true;
      this.submitSuccess = false;
      this.submitError = false;
      this.errorMessage = '';

      try {
        const response = await axios.post('http://localhost:5000/api/messages', {
          name: this.messages.name,
          email: this.messages.email,
          phone: this.messages.phone,
          subject: this.messages.subject,
          message: this.messages.message
        });

        if (response.data.success) {
          this.submitSuccess = true;
          this.resetForm();
          setTimeout(() => this.submitSuccess = false, 5000);
        } else {
          throw new Error(response.data.message || 'Submission failed');
        }
      } catch (error) {
        console.error('Submission error:', error);
        this.submitError = true;
        this.errorMessage = error.response?.data?.message || error.message || 'Failed to submit message';
      } finally {
        this.isLoading = false;
      }
    },
    validateForm() {
      if (!this.messages.name.trim()) {
        this.errorMessage = 'Name is required';
        return false;
      }
      if (!this.messages.email.trim()) {
        this.errorMessage = 'Email is required';
        return false;
      }
      if (!this.validateEmail(this.messages.email)) {
        this.errorMessage = 'Please enter a valid email';
        return false;
      }
      if (!this.messages.message.trim()) {
        this.errorMessage = 'Message is required';
        return false;
      }
      return true;
    },
    validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    },
    resetForm() {
      this.messages = {
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      };
    }
  }
}
</script> 

<style>

input {
        height: 40px;
        border-radius: 5px;
        border-style: solid;
        margin-bottom: 10px;
        }

textarea {
        min-height: 100px;
        border-width: 1.6px;
        border-radius: 5px;
        border-style: solid;
        }

input:focus, textarea:focus {
        outline: none;
        border-color: rgb(246, 196, 109);
        box-shadow: 0 0 0 3px rgba(246, 196, 109, 0.2);
        }

/* 
body{
    font-family: Arial, Helvetica, sans-serif;
    color: #091D35;
}
h1{
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
.submit-btn{
    background-color: #091D35;
    color: white;
    border-color: #1b385b;
    padding: 5px 22px;
    cursor: pointer;
}
.submit-btn:hover{
    transition: background-color 0.3s, color 0.3s;
    background-color: navy;
}
.success-message{
    color:red;
    background-color:lightpink;
    margin-bottom:15px;
    padding: 10px;
    border-radius: 4px
}
.error-message{
    color:white 

}
.form-group textarea{
    min-height: 100%;
}
.form-group,
.form-group select,
.form-group textarea{
    width: 100%;
    padding: 10px;
   
}

.card{
    background: rgb(246, 196, 109);
    border-radius: 10px;
    padding: 32px 50px;
    max-width: 500px;
    margin: 40px auto;
} */
</style>