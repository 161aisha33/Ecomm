<template>
  <footer class="footer">
    <div class="footer-content">
      <h3>Contact Us</h3>
      <p>Email: info@mzansirides.co.za</p>
      <p>Instagram: @mzansirides</p>
      <p>Facebook: Mzansi Rides</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'SiteFooter'
};
</script>

<style scoped>
.footer {
  background-color: #091d35; /* navy */
  color: white;
  text-align: center;
  padding: 2rem 1rem;
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.footer-section {
  margin: 1rem 0;
}

.social a {
  margin: 0 0.5rem;
  font-size: 1.5rem;
  color: white;
  text-decoration: none;
}

.social a:hover {
  color: #f7c800; /* yellow hover color */
}
</style>
