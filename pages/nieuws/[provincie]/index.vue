<template>
  <div>
    <Header />
    <main class="main-content bg-lightgrey">


      <Location urlPath="nieuws" />


      <!-- News Section-->
      <section class="news-archive sec-padding pt-0">
        <div class="container">
          <div class="news_lsit mt-20">
            <RegioList path="nieuws" :region="provincie" />
          </div>
          <div class="row">
            <div class="col-md-8 col-xs-12 ">
              <div class="main-content main-height">

                <!--            News card start    -->

                <!--                <div v-if="pending === true" :class="pending ? 'spin' : ''" style="height: 300px;"></div>-->


                <div class="meldingen">
                  <div v-for="(item, i) in allNews" class="card other-news acard box-shadow border-radius-8 d-flex"
                    data-aos="fade-up" data-aos-delay="10" data-aos-once="true">
                    <div class="news-thumb"><img :src="backend+'/' + item.image" alt="" class="img-thumb border-radius">
                    </div>
                    <div class="card-content">
                      <h3 class="card-heading">
                        <nuxt-link
                          :to="'/nieuws/' + item.state.toLowerCase() + '/' + item.city.replace(/\s+/g, '-').toLowerCase() + '/' + item.slug.toLowerCase() + '-' + item.id"
                          class="">
                          {{ item.title }}
                        </nuxt-link>
                      </h3>
                      <div class="meta">
                        <ul class="inline-list">
                          <li><span class="icon-clock"></span> {{ dateTime(item.created_at) }} in &nbsp;</li>
                          <li>
                            <nuxt-link :to="'/nieuws/' + item.state.toLowerCase()">{{ item.state }}</nuxt-link>
                            ,&nbsp;
                          </li>
                          <li>Nederland</li>
                        </ul>
                      </div>
                      <div class="btn-group">
                        <a v-for="(tag, i) in item.tags.split(',')" v-show="tag.length !== 0"
                          :class="'button btn-more bg-blue border-radius-8 ' + tag">{{ tag }}</a>
                      </div>
                    </div>
                  </div>
                </div>

                <!--                News card end-->

                <div class="card card-img" v-if=" media.ad1 && media.ad1.length > 0" v-html="media.ad1[0].content">
                 
                </div>


                <h2 class="sec-heading mt-30 color-black">Ander Nieuws</h2>

                <div class="meldingen">
                  <div v-for="(item, i) in moreNews" class="card other-news acard box-shadow border-radius-8 d-flex"
                    data-aos="fade-up" data-aos-delay="10" data-aos-once="true">
                    <div class="news-thumb"><img :src="backend+'/' + item.image" alt="" class="img-thumb border-radius">
                    </div>
                    <div class="card-content">
                      <h3 class="card-heading">
                        <nuxt-link
                          :to="'/nieuws/' + item.state.toLowerCase() + '/' + item.city.replace(/\s+/g, '-').toLowerCase() + '/' + item.slug.toLowerCase() + '-' + item.id"
                          class="">
                          {{ item.title }}
                        </nuxt-link>
                      </h3>
                      <div class="meta">
                        <ul class="inline-list">
                          <li><span class="icon-clock"></span> {{ dateTime(item.created_at) }} in &nbsp;</li>
                          <li>
                            <nuxt-link :to="'/nieuws/' + item.state.toLowerCase()">{{ item.state }}</nuxt-link>
                            ,&nbsp;
                          </li>
                          <li>Nederland</li>
                        </ul>
                      </div>
                      <div class="btn-group">
                        <a v-for="(tag, i) in item.tags.split(',')" v-show="tag.length !== 0"
                          :class="'button btn-more bg-blue border-radius-8 ' + tag">{{ tag }}</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="loadingMore === true" :class="loadingMore ? 'spin' : ''" style="height: 300px;"></div>


              </div>
            </div>

            <!-- Recent meldingen -->

            <div class="col-md-4 col-xs-12">
              <div class="sidebar">

                <h2 id="widget_title" class="sec-heading weight-500">Eerdere P2000-meldingen</h2>

                <div v-for="(item, i) in recentMeldingen">
                  <div class="card other-news box-shadow border-radius-8">
                    <div class="card-content">
                      <h3 class="d-flex align-items-center">

                        <img v-if="item.dienst == 'ambulance'" src="@/assets/img/ambulance.png" class="news-icon" />
                        <img v-if="item.dienst == 'brandweer'" src="@/assets/img/brandweer.png" class="news-icon" />
                        <img v-if="item.dienst == 'kustwacht'" src="@/assets/img/kustwacht.png" class="news-icon" />
                        <img v-if="item.dienst == 'politie'" src="@/assets/img/politie.png" class="news-icon" />
                        <img v-if="item.dienst == 'traumaheli'" src="@/assets/img/traumaheli.png" class="news-icon" />
                        <router-link
                          :to="'/' + item.provincie.toLowerCase() + '/' + item.stad_url.toLowerCase() + '/' + item.regio_url.toLowerCase() + '/' + item.categorie_url.toLowerCase() + '-' + item.id">
                          {{ item.categorie }}
                        </router-link>
                      </h3>
                      <div class="meta">
                        <ul class="inline-list">
                          <li><span class="icon-clock"></span> {{ dateTimeUnix(item.timestamp) }}</li>

                        </ul>
                      </div>
                      <span class="place-name"> {{ item.straat }}</span> in <span class="place-title"
                        style="color: #669e97 !important;">
                        <nuxt-link :to="'/' + item.stad.toLowerCase()">{{ item.stad }}</nuxt-link>
                      </span>,
                      <span class="place-name">
                        {{ item.provincie }}</span>
                      <div class="btn-group mt-10">
                        <a :class="'button btn-more bg-red border-radius-8 ' + item.dienst">{{ item.dienst }}</a>

                      </div>
                    </div>
                  </div>

                  <div v-if="i % 2 === 1" class="card card-img">
                    <div v-if=" media.ad2 && media.ad2.length > 0" v-html="media.ad2[0].content">

                    </div>
                  </div>


                </div>


                <div class="card card-img square" v-if=" media.ad3 && media.ad3.length > 0" v-html="media.ad3[0].content">
                  
                </div>
              </div>
            </div>

          </div>
        </div>

      </section>
      <!-- / Step Section-->
    </main>
    <Footer />

  </div>
</template>
  
<script setup>

const config = useRuntimeConfig();
const router = useRoute();
apiUrl = config.public.api;
backend = config.public.backend;
const { data } = await useAsyncData('seo', () => $fetch(`${apiUrl}/seo-data/Nieuws`))
const {data : media} = await useAsyncData('media',()=>$fetch(`${apiUrl}/media/news`));
const provincie = router.params.provincie;

useHead({
  title: `${data.value.title} - ${router.params.provincie.replace(/-/g, ' ')}`,
  meta: [
    { name: 'description', content: `${data.value.seo_meta}` },
    { name: 'keywords', content: `${data.value.seo_keywords}` }
  ],

  script: [{ children: `${data.value.structured_data}` }]
})

const {
  data: allNews,
  pending
} = await useAsyncData('filter_news', () => $fetch(`${apiUrl}/news/filter-news/${router.params.provincie}/0`));
const { data: recentMeldingen } = await useAsyncData('recent_meldingen', () => $fetch(`${apiUrl}/news/recent/meldingen`));

onMounted(() => {
  refreshNuxtData('filter_news');
  refreshNuxtData('media');
})
</script>
  
  
<script>
import moment from 'moment';
import addImage from 'assets/img/add-img.jpg';

import axios from "axios";

let apiUrl;
let backend;
export default {
  created() {
    const route = useRoute();
    this.region = route.params.provincie
  },
  data() {
    return {
      region: '',
      image: { backgroundImage: `url(${addImage})` },

      increment: 1,
      nextReq: null,
      moreNews: [],
      img: addImage,
      loadingMore: false,
      loadData: true,
      nextReq: true,
      media:[],
    }
  },
  beforeCreate(){
    axios.get(`${apiUrl}/media/news`)
        .then((response) => {
          this.media = response.data
        })
        .catch((error)=>{
          console.log(error);
        })
  },

  mounted() {
    this.getOtherNews();
    window.addEventListener('scroll', this.handleScroll);

    // this.fetchNews();
  },
  methods: {

    dateTime(value) {
      return moment(value).format('hh:mm');
    },


    dateTimeUnix(value) {

      let date = moment.unix(value).format('DD-MM-YYYY');
      let time = moment.unix(value).format('hh:mm');

      return date + ' om ' + time

    },

    getOtherNews() {
      const route = useRoute();

      axios.get(`${apiUrl}/news/filter-news/${route.params.provincie}/${this.increment}`)
        .then((response) => {
          response.data.map((item, i) => {
            this.increment = 2;
            this.moreNews.push(item)
          })
        })
        .catch(error => {
          console.log(error)
        })
    },
    getMoreOtherNews(page) {
      this.nextReq = false;
      const route = useRoute();


      if (this.loadData === true) {
        this.loadingMore = true;
        axios.get(`${apiUrl}/news/filter-news/${route.params.provincie}/${page}`)
          .then((response) => {
            if (response.data.length !== 0) {

              this.loadData = true;
              this.nextReq = true;
              this.loadingMore = false;
              response.data.map((item, i) => {
                this.moreNews.push(item)
              })
            } else {

              this.loadingMore = false;
              this.nextReq = false;
              this.loadData = false;
            }
          })
          .catch(error => {
            console.log(error)
          })
      }




    },
    handleScroll() {

      const route = useRoute();

      if (route.name == 'nieuws-provincie') {
        if ((Math.round(window.scrollY) + window.innerHeight + 300) >= document.body.scrollHeight) {
          if (this.nextReq === true && this.loadData === true) {
            this.getMoreOtherNews(this.increment++);
          }

        }
      }

    },

  },
}
</script>

<style scoped>
.news_drop div#news-list {
  padding: 10px;
}
.card-content .meta {
  margin-bottom: 5px;
}

.btn-group .button {
  margin-bottom: 0;
}


</style>