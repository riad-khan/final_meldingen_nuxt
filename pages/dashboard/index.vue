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
                    <div class="col-md-6">
                      <div class="post-meta news">
                        <h3>
                         {{fav_news}}                                  </h3>
                        <strong>Favorite nieuws</strong>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="post-meta comments">
                        <h3>
                         {{totalComments}}                                    </h3>
                        <strong>Comments</strong>
                      </div>
                    </div>
                  </div>

                </div>
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
  titleTemplate: `Meldingen.nl - Dashboard`,
  // script: [{children: `${seo.value.structured_data}`}],
  meta:[
    {name:'description',content:'112 meldingen dashboard'},
    {
      property: "og:title",
      content: 'Meldingen.nl - Dashboard'
    },
    {
      property: "twitter:title",
      content: 'Meldingen.nl - Dashboard'
    },
  ]

})
</script>

<script>
let apiUrl;
let backend;
import {isAuth} from '../../middlewares/auth'
import axios from "axios";
export default {
  name: "Dashboard.vue",
  data(){
    return{
      totalComments:0,
      fav_news : 0
    }
  },

  created() {
    if(typeof window !== "undefined"){
      if(!isAuth()){
        this.$router.push('/login')
      }
    }
  },
  mounted() {
    const id = localStorage.getItem('id')
    axios.get(`${apiUrl}/user/dashboard/count/`+id)
        .then((response)=>{
          console.log(response.data);
         this.totalComments = response.data.comments.total;
         this.fav_news = response.data.fav_news.total;
        })
  },
}
</script>

<style scoped>

</style>