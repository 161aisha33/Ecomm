<template>
  <nav class="navbar">
    <div class="logo-container">
      <router-link to="/">
        <img
          src="@/assets/logo.jpg"
          alt="Cape Route Tours Logo"
          class="nav-logo"
        />
      </router-link>
    </div>
    <div class="nav-links">
      <router-link to="/">Home</router-link>
      <router-link to="/blog">Blog</router-link>
      <router-link to="/tour">Tour</router-link>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  background-color: #091d35;
  padding: 15px 30px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.nav-logo {
  height: 80px;
  border-radius: 50%;
}

.nav-links {
  display: flex;
  gap: 30px;
  margin-right: 10vw; 
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.1rem;
}

.nav-links a:hover {
  text-decoration: underline;
  color: rgb(246, 196, 109);
}

/* Optional: Add hover effect for the logo */
.logo-container a:hover {
  opacity: 0.8;
}
</style>