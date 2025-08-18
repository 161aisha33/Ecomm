<template>
  <NavBar/>
  <router-view/>
  <SiteFooter/>
</template>

<script>
import NavBar from './components/NavBar.vue';
import SiteFooter from './components/SiteFooter.vue';

export default{
  components:{
    NavBar,
    SiteFooter
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
}
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  /* overflow-x: hidden; */
  
}

/* Remove gaps from all elements */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: poppins, arial;
}

nav {
  padding: 30px;
  padding-left: 0%;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
