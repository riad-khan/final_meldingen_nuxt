<template>
  <!-- / Footer Section-->
  <section class="footer-sec sec-padding bg-theme">
    <div class="container">
      <div class="row">
        <div class="col-md-5">
          <div class="widget footer-widget-1">
            <div class="logo">
              <h1><a href="index.php"><img alt="" src="@/assets/img/logo.svg"/></a></h1>
            </div>
    
            <div class="social-sec">
              <a class="button whats-app" href="">Whatsapp</a>
              <ul class="social dark-white">
                <li><a href=""><span class="icon-Instagram"></span></a></li>
                <li><a href=""><span class="icon-twitter"><span class="path1"></span><span class="path2"></span></span></a>
                </li>
                <li><a href=""><span class="icon-facebook"><span class="path1"></span><span class="path2"></span></span></a>
                </li>

              </ul>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="widget footer-widget-2">
            <h4>Sitemap</h4>
            <ul class="widget-menu">
                        <li><nuxt-link to="/">Meldingen</nuxt-link></li>
                          <li><nuxt-link to="/nieuws">Nieuws</nuxt-link></li>
                         <li><nuxt-link to="/blogs">Blogs</nuxt-link></li>
                          <li><nuxt-link to="/partnerbijdrage">Partnerbijdragen</nuxt-link></li>
                           <li><nuxt-link to="/map">Kaarten</nuxt-link></li>
                        <li><nuxt-link to="/contact">Contact</nuxt-link></li>
            </ul>
          </div>
        </div>
        
      </div>
    </div>
  </section>
  <section class="footer-bottm theme-light">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="footer-menu">
            <ul>
              <li><a href="">Copyright © 2022</a></li>
              <li><nuxt-link to="/cookiebeleid">Cookiebeleid</nuxt-link></li>
              <li><nuxt-link to="/privacybeleid">Privacybeleid</nuxt-link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- / Footer Section-->
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style scoped>

</style>