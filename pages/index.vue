<template>
  <section>
    <Header />
    <location urlPath="meldingen" />

    <section class="news-overview-sec">
      <div class="container">
        <div class="row">
          <div class="col-md-2 desktop-only">
            <div class="a_banner" v-if="media.ad1.length > 0" v-html="media.ad1[0].content">

            </div>
          </div>
          <div class="col-md-8">
            <div class="news_list">
              <RegioList region="Nederland" path="meldingen" />

              <div class="meldingen" v-for="(item, i) in meldingens" :key="i">
                <div :class="'news-item box-shadow border-radius acard ' + item.dienst">
                  <img v-if="item.dienst == 'ambulance'" src="@/assets/img/ambulance.png" class="news-icon" />
                  <img v-if="item.dienst == 'brandweer'" src="@/assets/img/brandweer.png" class="news-icon" />
                  <img v-if="item.dienst == 'kustwacht'" src="@/assets/img/kustwacht.png" class="news-icon" />
                  <img v-if="item.dienst == 'politie'" src="@/assets/img/politie.png" class="news-icon" />
                  <img v-if="item.dienst == 'traumaheli'" src="@/assets/img/traumaheli.png" class="news-icon" />
                  <div class="news-content d-flex aling-items-center">
                    <div class="content_left">
                      <h4>
                        <router-link
                          :to="'/' + item.provincie.toLowerCase() + '/' + item.stad_url.toLowerCase() + '/' + item.regio_url.toLowerCase() + '/' + item.categorie_url.toLowerCase() + '-' + item.id"
                          class="meldingen_text">
                          {{ item.categorie }}
                        </router-link>
                      </h4>
                      <p class="place_name">
                        <span class="place-name"> {{ item.straat }}</span> in <span class="place-title"
                          style="color: #669e97 !important;">
                          <nuxt-link style="color:#669E97"
                            :to="item.provincie_url.toLowerCase() + '/' + item.stad_url.toLowerCase()">{{ item.stad }}
                          </nuxt-link>
                        </span>
                        <span class="place-name">
                          ,{{ item.provincie }}</span>
                      </p>
                    </div>
                    <div class="content_right">
                      <p class="mb-5"><span class="place-name">{{ DateTime(item.timestamp) }} <span
                            id="time_text">geleden</span></span></p>
                      <p class="place_right">
                        <span v-if="item.prio === 1" class="place-name prio spoed" style="">{{ prio["1"] }}
                        </span>
                        <span v-if="item.prio === 2" class="place-name prio Gepaste">{{ prio["2"] }}
                        </span>
                        <span v-if="item.prio === 3" class="place-name prio geen
">{{ prio["3"] }}
                        </span>
                        <span v-if="item.prio === 4" class="place-name prop grote">{{ prio["4"] }}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>



                <div v-if="i % 7 === 5" class="card card-img">


                  <div v-if="media.ad3.length > 0" v-html="media.ad3[0].content">

                  </div>
                </div>
              </div>
              <div v-if="loading" class="spin" style="height: 300px;"></div>



            </div>
          </div>
          <div class="col-md-2 desktop-only">

            <div class="a_banner" v-if="media.ad2.length > 0" v-html="media.ad2[0].content">

            </div>
          </div>

        </div>


      </div>
    </section>
    <Footer />
  </section>
</template>

<script setup>
const config = useRuntimeConfig();
apiUrl = config.public.api;
backend = config.public.backend;

//const {data: melding, pending} = await useAsyncData('get_meldingen', () => $fetch(`${apiUrl}/meldingen/scroll-more/0`));

const { data: melding, pending } = await useFetch(`${apiUrl}/meldingen/scroll-more/0`)

const { data: seo } = await useAsyncData('home_seo', () => $fetch(`${apiUrl}/seo-data/home`));

const { data: media } = await useAsyncData('media', () => $fetch(`${apiUrl}/media/home`));

nextReq = melding.value.nextReq;


useHead({
  titleTemplate: ` ${seo.value.title}`,
  script: [{ children: `${seo.value.structured_data}` }],
  meta: [
    { name: 'description', content: `${seo.value.seo_meta}` },
    { name: 'keywords', content: `${seo.value.seo_keywords}` }
  ],
})
meldingenArray = melding.value.data;

isLoading = pending;
onMounted(() => {
  refreshNuxtData('get_meldingen');
  refreshNuxtData('media');
  refreshNuxtData('home_seo');
})

</script>

<script>
import moment from "moment/moment";
import 'moment/locale/nl'
import axios from "axios";
import addImage from 'assets/img/add-img.jpg'

let nextReq;

let apiUrl;
let backend;
let meldingenArray;
let isLoading;
export default {
  name: "index.vue",
  data() {
    return {
      image: { backgroundImage: `url(https://final-meldingen-nuxt.vercel.app/_nuxt/add-img.fe8f1d5b.jpg)` },
      prio: {
        1: 'Spoed',
        2: 'Gepaste spoed',
        3: 'Geen spoed',
        4: 'Grote ingreep'
      },

      nexReq: null,
      meldingens: [],
      loading: false,
      ads: {},

      increment: 1,
    }
  },
  created() {
    this.meldingens = meldingenArray;
    this.nexReq = nextReq

  },
  mounted() {



    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    DateTime(value) {
      let date = moment.unix(value).locale('nl').fromNow();
      let words = date.split(" ");

      let finalTime = words[0] + " " + words[1];
      return finalTime;

    },
    getMoreMeldingen(page) {
      this.loading = true;
      this.nexReq = false;

      axios.get(`${apiUrl}/meldingen/scroll-more/` + page)
        .then((response) => {
          response.data.data.map((item, i) => {
            this.meldingens.push(item)


          })
          this.nexReq = response.data.nextReq;
          this.loading = false

        })
        .catch(error => {
          console.log(error)
        })


    },
    handleScroll() {
      const route = useRoute();
      if (route.name == 'index') {
        if ((Math.round(window.scrollY) + window.innerHeight + 300) >= document.body.scrollHeight) {
          if (this.nexReq === true) {

            this.getMoreMeldingen(this.increment++);
          }


        }
      } else return

    }
  }
}
</script>

<style scoped>
.prio {
  color: white;
  bottom: 14px;
  font-size: 14px;
  padding: 3px 6px;
  border-radius: 4px;
  text-align: center;
  float: right;
  line-height: 1.1;
}

.spoed {
  background-color: #e05b59 !important;
}

.Gepaste {
  background-color: #deae00 !important;
}

.geen {
  background-color: #669e97 !important;
}

.grote {
  background-color: #deae00 !important;
}

.a_banner img {
  width: 100%;
}

.news-item .news-content.d-flex {
  justify-content: space-between;
}

.content_left h4 {
  margin-bottom: 0;
}

.news-content p {
  margin-bottom: 0px;
}

.news-content .content_right {
  text-align: right;
}

.ambulance {
  border-left: 1.5px solid #d8af3b;
}

.politie {
  border-left: 1.5px solid #0095FF;
}

.brandweer {
  border-left: 1.5px solid #e05b59;
}

.traumaheli {
  border-left: 1.5px solid #669e97
}

@media (min-width: 768px) and (max-width: 1024px) {
  .prio {
    display: inline-block;
  }
}

@media (max-width: 767px) {
  .news-content .content_right {
    /* text-align: left; */
  }

  .news-item img.news-icon {
    right: auto;
    opacity: 1;
    left: 15px;
    width: 20px;
    object-fit: cover;
    margin-top: 1px;
    top: 15px;
  }

  .news-content h4 {
    padding-left: 25px;
    font-size: 16px;
    margin-bottom: 5px;
  }

  .content_right p.mb-5 span.place-name {
    font-size: 12px;
  }

  .prio {
    font-size: 12px;
    padding: 3px 5px;
  }

  .content_right p.mb-5 {
    margin-bottom: 5px;
  }

  .news_list .acard {
    border-left: 0px solid #D8AF3B;
  }

  section.news-overview-sec {
    padding-top: 15px;
  }
}

@media (max-width: 480px) {
  #time_text {
    display: none;
  }

  .news-item .news-content.d-flex {
    display: block !important;
  }
  .news-content .content_right {
    position: absolute;
    right: 0;
    top: 0;
}
.news-content .content_left {
    max-width: 80%;
}

}
@media (max-width: 320px) {
  .news-item {
    padding: 10px;
}
.news-item img.news-icon {
    left: 10px;
    top: 10px;
}
.news-content h4 {
    font-size: 14px;
    margin-bottom: 0;
}
.news-content .content_left{
    max-width: 75%;
}
.prio {
    font-size: 12px;
    padding: 2px 3px;
}
.news-content p{
    font-size: 12px;
}
}
</style>