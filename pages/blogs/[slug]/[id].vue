<template>
  <section>
    <Header />
    <main class="main-content bg-dark-white">
      <div class="header_bellow_bg"></div>

      <!-- / Step Section-->
      <section class="page-content news-details-page  sec-padding">
        <div class="container">
          <div class="contact-form box-shadow border-radius-8">
            <div class="breadcrumbs desktop-only">
              <ul class="inline-list">
                <li>
                  <nuxt-link to="/">Home</nuxt-link><span class="right-angel">></span>
                </li>
                <li>
                  <nuxt-link to="/blogs">Blogs</nuxt-link><span class="right-angel">></span>
                </li>

                <li class="text-trans-cap">{{ blogDetails.slug }}</li>
              </ul>
            </div>
            <div class="row with-sidebar">
            
              <div class="col-md-8 col-lg-9 col-xs-12">
                <div class="card card-overlay other-news news-details box-shadow border-radius">
                  <div class="card-thumb">
                    <img class="blog_thumb" :src="backend + '/' + blogDetails.images" alt="nieuws image">


                  </div>
                  <div class="card-content card-img-overlay">
                    <div class="btn-group">
                    </div>
                    <h6 class="text-limit-2 mt-10 m-mt-0 t-mt-0">{{ blogDetails.blog_title }}</h6>
                  </div>
                </div>
                <div class="content-text">
                  <div class="meta">
                    <div class="row d-flex align-items-center meta-group">
                      <div class="col-md-8 col-lg-6 col-xs-6">
                        <ul class="inline-list">
                          <li><span class="icon-clock"></span> Posted at {{ DateTime(blogDetails.created_at) }} </li>


                        </ul>

                      </div>

                    </div>
                  </div>
                  <p><strong>{{ blogDetails.description }}</strong></p>
                  <div v-html="blogDetails.content"></div>

                </div>
              </div>

              <div class="col-md-4 col-lg-3 col-xs-12">
                <div class="sidebar">
                  <h3 class="weight-500"> Andere berichten</h3>
                  <div id="news_list">

                    <div class="card mobile-col-2 other-news box-shadow border-radius-8" v-for="(item, i) in recents"
                      :key="i">
                      <div class="card-thumb">
                        <img class="blog_thumb" :src="backend + '/' + item.images" alt="blog image">
                      </div>
                      <div class="card-content">

                        <h2>
                          <router-link :to="'/blogs/' + item.slug + '/' + item.id">{{ item.blog_title.length > 25 ?
                              item.blog_title.substr(0, 25) + '...' : item.blog_title
                          }}</router-link>
                        </h2>
                        <div class="meta">

                          <p>{{ item.description.substr(0, 100) + '...' }}</p>


                        </div>
                        <div class="btn-group">
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
          <div class="row pt-20">
            <div class="col-md-12" v-if="media.ad1.length > 0" v-html="media.ad1[0].content">
              
            </div>
          </div>
        </div>
      </section>
      <!-- / Step Section-->
    </main>
    <Footer />
  </section>
</template>

<script setup>
const config = useRuntimeConfig();
const route = useRoute();
apiUrl = config.public.api;
backend = config.public.backend;
const { data: blogDetails, pending } = await useAsyncData('get_blog_details', () => $fetch(`${apiUrl}/blogs/${route.params.id}`));
const { data: recents } = await useAsyncData('get_recent_blogs', () => $fetch(`${apiUrl}/blogs/recent-blogs/${route.params.id}`));
const { data: seo } = await useAsyncData('blogs_seo', () => $fetch(`${apiUrl}/seo-data/Blog`));
const { data: media } = await useAsyncData('media', () => $fetch(`${apiUrl}/media/partnerBlogs`));
useHead({
  titleTemplate: `Blog - Meldingen.nl - ${blogDetails.value.blog_title}`,
  script: [{ children: `${seo.value.structured_data}` }],
  meta: [
    { name: 'description', content: `${seo.value.seo_meta}` },
    { name: 'keywords', content: `${seo.value.seo_keywords}` }
  ],
})

onMounted(() => {
  refreshNuxtData('get_blog_details');
  refreshNuxtData('get_recent_blogs');
  refreshNuxtData('blog_details_seo');
  refreshNuxtData('media');

})
</script>

<script>
let apiUrl;
let backend;
import addImage from 'assets/img/add-img.jpg';
import moment from 'moment';
export default {
  data() {
    return {
      image: { backgroundImage: `url(${addImage})` },
    }
  },
  methods: {
    DateTime(value) {
      return moment(value).format('hh:mm')
    }
  }
}

</script>

<style scoped>
.text-limit-2 {
  color: white
}

.breadcrumbs ul.inline-list li {
  color: #669E97;
}

.right-angel {
  color: #669E97 !important;
}

.breadcrumbs ul.inline-list li a {
  color: #1F405E;
}
.news-details.card {
    margin-bottom: 20px;
    position: relative;
    padding: 0;
    background: transparent;
    border-radius: 0px;
}
.contact-form{
    padding: 20px;
    text-align: inherit;
    background-image: none;
    margin-top: -30px;
}
.news-details-page{
    padding-top: 0;
}
.news-details-page .breadcrumbs{
    margin-bottom: 20px;
}

.sidebar .card-thumb img {
    border-radius: 8px 8px 0px 0px;
    display: block;
    width: 100%;
    height: 150px;
    object-fit: cover;
    margin-bottom: 10px;
}
.sidebar h2 {
    font-size: 16px;
    margin-bottom: 5px;
}
.sidebar .card {
    margin-bottom: 15px;
    padding: 15px;
}
.news-details .card-content {
    padding: 15px;
}
.news-details.card .card-content.card-img-overlay h6{
    font-size: 24px;
}
.card.card-overlay:after {
    background: #000000;
    height: 100%;
    width: 100%;
    content: "";
    position: absolute;
    top: 0;
    opacity: .3;
    border-radius: 4px;
}

@media (max-width: 767px){
.sidebar {
    margin-top: 30px;
}
.card-thumb img {
    height: 200px;
}
.sidebar h3 {
    font-size: 22px;
}
.mobile-col-2 .card-thumb {
    width: 110px;
    background: transparent;
}
.sidebar .card-thumb img {
    height: 146px;
}
.contact-form{
    padding: 15px;
}
}




</style>