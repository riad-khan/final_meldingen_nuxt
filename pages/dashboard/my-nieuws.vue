<template>
  <div>
    <Header />
    <div class="header_bellow_bg"></div>
    <main class="main-content bg-white">
      <section class="page-content contact-page my-account-page sec-padding ">

        <div class="container">
          <div class="content-box contact-form box-shadow border-radius-8">
            <div class="row">

              <DashboardLinks />

              <div class="col-lg-8 col-md-8 col-sm-8 sidebar-border">
                <div class="mac-content">

                  <div class="row">
                    <div class="col-md-12">
                      <h4>Favorite nieuws</h4>
                      <div id="news_list">

                        <div class="card other-news box-shadow border-radius-8" v-for="(item,i) in myNews" :key="i">
                          <div class="card-content">
                            <h6 class="text-limit-2">
                              <nuxt-link
                                  :to="'/nieuws/'+item.state.toLowerCase()+'/'+item.city.replace(/\s+/g, '-').toLowerCase()+'/'+item.slug.toLowerCase() +'-'+item.id"
                                  class="">
                                {{ item.title }}
                              </nuxt-link>
                            </h6>
                            <div class="meta">
                              <ul class="inline-list">
                                <li><span class="icon-clock"></span> 09:19 in</li>
                                <li><a href="/nieuws/noord-brabant">Noord-Brabant</a>, </li>
                                <li>Nederland</li>
                              </ul>
                            </div>
                            <div class="btn-group">
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>                                        </div>
              </div>
            </div>
          </div>
        </div>
      </section>    <!-- / Step Section-->
    </main>

    <Footer />
  </div>
</template>
<script setup>
const config = useRuntimeConfig();
apiUrl = config.public.api;
backend = config.public.backend;
useHead({
  titleTemplate: `Meldingen.nl - My Nieuws`,
  // script: [{children: `${seo.value.structured_data}`}],
  meta:[
    {name:'description',content:'112 meldingen My Nieuws'},
    {
      property: "og:title",
      content: 'Meldingen.nl - My Nieuws'
    },
    {
      property: "twitter:title",
      content: 'Meldingen.nl - My Nieuws'
    },
  ]

})

</script>


<script>
import {isAuth} from "../../middlewares/auth";
import AOS from "aos";
import 'aos/dist/aos.css';
import axios from "axios";
let apiUrl;
let backend;

export default {

  name: "my-nieuws",
  data(){
    return{
      myNews:[],
    }
  },

  created() {
    if(typeof window !== "undefined"){
      if(!isAuth()){
        this.$router.push('/login')
      }

      AOS.init();
    }

  },

  mounted() {
    if(isAuth()){
      const user_id = localStorage.getItem('id');
      axios.get(`${apiUrl}/fav/myNews/${user_id}`,{
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      })
          .then(response =>{
            this.myNews = response.data
          })
          .catch(error =>{
            console.log(error)
          })
    }

  },
}
</script>

<style scoped>
.mac-content .card .card-content h6 {
    text-align: left;
}
#news_list .card:last-child {
    margin-bottom: 0;
}
.col-md-6 .card-content, .col-md-12 .card-content {
    padding: 0;
}
@media (max-width: 767px) {
}
</style>