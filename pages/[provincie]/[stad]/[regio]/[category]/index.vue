<template>
  <div>
    <Header />
    <location urlPath="meldingen" />

    <main class="main-content">
   
      <!-- / Step Section-->
      <section class="page-content details-page sec-padding">
        <div class="container">
          <div class="breadcrumbs mb-30 m-mb-20">
            <ul class="inline-list">
              <li>
                <nuxt-link to="/">Home</nuxt-link><span class="right-angel">></span>
              </li>
              <li>
                <nuxt-link :to="'/' + route.params.provincie.toLowerCase()">{{ meldingenDetails.details.provincie }}
                </nuxt-link><span class="right-angel">></span>
              </li>
              <li>
                <nuxt-link :to="'/' + route.params.provincie.toLowerCase() + '/' + route.params.stad.toLowerCase()">
                  {{ meldingenDetails.details.stad }}</nuxt-link><span class="right-angel">></span>
              </li>
              <li>{{ meldingenDetails.details.categorie }}</li>
            </ul>
          </div>


          <div class="row with-sidebar ">
            <div :class="'col-md-8 col-lg-9 col-xs-12'">
              <div v-if="pending === true" style="height: 300px;" :class="pending ? 'spin' : ''"></div>
              <div v-else class="content box-shadow border-radius-8 bg-white">
                <h2 class="content-heading">
                  {{ meldingenDetails.details.straat }} in {{ meldingenDetails.details.stad }} - <span
                    class="text-trans-cap">{{ meldingenDetails.details.categorie }}</span>

                </h2>
                <div class="meta m-mb-15">
                  <ul class="inline-list">
                    <li><span class="icon-clock"></span> {{ DateTime(meldingenDetails.details.timestamp) }}</li>

                  </ul>
                </div>
                <p class="mb-30 m-mb-15">Regio {{ meldingenDetails.details.regio }} kreeg op dinsdag  {{
                   addLetterOnTime(DateTime(meldingenDetails.details.timestamp))
                }} een melding via het p2000 netwerk. De {{ meldingenDetails.details.dienst }} is met
                  spoed uitgerukt naar de {{ meldingenDetails.details.straat }} in {{ meldingenDetails.details.stad }}
                </p>

                <div class="google_ad_sec mb-5" v-if="ads.ad3 && ads.ad3.length > 0" v-html="ads.ad3[0].content">
                  
                </div>
                <div class="google-map-sec m-mb-15">
                  <iframe
                    :src="'https://maps.google.com/maps?q=' + meldingenDetails.details.straat + ',' + meldingenDetails.details.stad + '&amp;t=k&amp;z=18&amp;ie=UTF8&amp;iwloc=&amp;output=embed'"
                    width="100%" height="350" style="border:0;" allowfullscreen="" loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"></iframe>

                 

                </div>
                <h2 class="content-heading">Originele P2000 melding
                </h2>
                <p>{{ meldingenDetails.details.p2000 }}</p>


                <h2 class="mt-30 m-mt-10 content-heading">Verzonden aan eenheden</h2>
                <div class="list_group">
                  <ul v-for="(item, i) in enheedens" class="inline-list list-gap-10 d-flex align-items-center" :key="i">
                    <li>

                      <img v-if="item.dienst == 'ambulance'" src="@/assets/img/ambulance.png" class="news-icon" />
                      <img v-if="item.dienst == 'brandweer'" src="@/assets/img/brandweer.png" class="news-icon" />
                      <img v-if="item.dienst == 'kustwacht'" src="@/assets/img/kustwacht.png" class="news-icon" />
                      <img v-if="item.dienst == 'politie'" src="@/assets/img/politie.png" class="news-icon" />
                      <img v-if="item.dienst == 'traumaheli'" src="@/assets/img/traumaheli.png" class="news-icon" />

                    </li>
                    <li><a href="#" rel="nofollow">{{ item.capcode }}</a> </li>
                    <li>{{ item.omschrijving }} </li>
                  </ul>
                </div>

                <ul class="social dark-white white-dark desktop-only mt-30">
                  <li class="label">Delen:</li>


                  <li>
                    <ShareNetwork network="facebook"
                      :title="meldingenDetails.details.straat + 'in' + meldingenDetails.details.stad + '-' + meldingenDetails.details.categorie"
                      :url="currentUrl"><span class="icon-facebook"><span class="path1"></span><span
                          class="path2"></span></span></ShareNetwork>
                  </li>
                  <li>
                    <ShareNetwork network="twitter"
                      :title="meldingenDetails.details.straat + 'in' + meldingenDetails.details.stad + '-' + meldingenDetails.details.categorie"
                      :url="currentUrl"><span class="icon-twitter"><span class="path1"></span><span
                          class="path2"></span></span></ShareNetwork>
                  </li>

                </ul>

              </div>

            </div>

            <div class="col-md-4 col-lg-3 col-xs-12">
              <div class="sidebar">

                <h2 id="widget_title" class="sec-heading weight-500">Eerdere P2000-meldingen</h2>

                <div v-for="(item, i) in meldingenDetails.recentMeldingen">
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
                          <li> <span class="icon-clock"></span> {{ dateTime(item.timestamp) }}</li>

                        </ul>
                      </div>
                      <!--                      <span class="place-name"> {{ item.straat }}</span> in <span class="place-title"-->
                      <!--                                                                                  style="color: #669e97 !important;"><nuxt-link :to="'/'+item.stad.toLowerCase()">{{ item.stad }}</nuxt-link> </span>,-->
                      <!--                      <span class="place-name">-->
                      <!--                {{ item.provincie }}</span>-->
                      <div class="btn-group  mt-10">
                        <a :class="'button btn-more bg-red border-radius-8 ' + item.dienst">{{ item.dienst }}</a>

                      </div>
                    </div>
                  </div>

                  <div v-if="i % 2 === 1" class="card card-img">
                    <div v-if="ads.ad1 && ads.ad1.length > 0" v-html="ads.ad1[0].content">

                    </div>


                  </div>


                </div>


                <div class="card card-img square" v-if="ads.ad2 && ads.ad2.length > 0" v-html="ads.ad2[0].content">

                </div>
              </div>
            </div>


          </div>
          <!--          <div class="row pt-20">-->
          <!--            <div class="col-md-12">-->
          <!--              <div class="news-item box-shadow border-radius news-ad-sec" style="background-image:url(https://p2000.net/img/add-img.jpg);">-->
          <!--                <div class="news-content">-->
          <!--                  <h2 class="new-ad-heading">Dit is een placeholder voor reclame</h2>-->
          <!--                </div>-->
          <!--              </div>-->
          <!--            </div>-->
          <!--          </div>-->
        </div>
      </section>
      <!-- / Step Section-->
    </main>

    <Footer />
  </div>
</template>

<script setup>

const config = useRuntimeConfig();
apiUrl = config.public.api;
backend = config.public.backend;
const route = useRoute();

var id = route.params.category.replace(/[^0-9]/g, '');




const { data: meldingenDetails, pending } = await useAsyncData('meldingen_details', () => $fetch(`${apiUrl}/meldingen/${id}`));
const { data: enheedens } = await useLazyAsyncData('enheeden', () => $fetch(`${apiUrl}/meldingen/enheeden/${id}`));
//const {data: recentNews} = await useLazyAsyncData('recent_news', () => $fetch(`${apiUrl}/news/recent/news`))
const { data: ads } = await useAsyncData('ads', () => $fetch(`${apiUrl}/media/meldingenDetails`));
const { data: seo } = await useAsyncData('home_seo', () => $fetch(`${apiUrl}/seo-data/home`));
const titleSlug = (slug) => {
  const text = slug.replace(/-/g, " ");
  var lastIndex = text.lastIndexOf(" ");
  var lastRemoved = text.substring(0, lastIndex);
  let finalText = lastRemoved.charAt(0).toUpperCase() + lastRemoved.slice(1);

  return finalText

}

const title = (stad) => {
  let regio = stad.replace(/-/g, ' ');
  let upperText = regio.replace(/(^\w|\s\w)/g, m => m.toUpperCase());
  let addHyphen = upperText.replace(' ', '-');

  return addHyphen;
}

//route.params.category.replace(/-/g, ' ')
const seoTime = (value) => {
  const date = moment.unix(value).utcOffset("GMT+01:00").format('Do MMMM YYYY');
  const time = moment.unix(value).utcOffset("GMT+01:00").format('hh:mm');
  let newDate = date.split(' ');
  const LastDate = newDate[0].slice(0, -2);

  return LastDate + ' ' + newDate[1].toLowerCase() + ' ' + newDate[2] + ' om ' + time
}

useHead({
  titleTemplate: `${meldingenDetails.value.details.categorie} - ${meldingenDetails.value.details.stad}, ${meldingenDetails.value.details.straat} | 112 Meldingen op Meldingen.nl`,
  meta: [
    {
      name: 'description', content: `Regio ${meldingenDetails.value.details.regio} kreeg op donderdag ${seoTime(meldingenDetails.value.details.timestamp)} een melding via het p2000 netwerk. De ${meldingenDetails.value.details.dienst} is met spoed uitgerukt naar de ${meldingenDetails.value.details.straat} in ${meldingenDetails.value.details.stad} `
    },

    { name: 'keywords', content: `112 meldingen ${meldingenDetails.value.details.stad}, 112 ${meldingenDetails.value.details.stad}, p2000 ${meldingenDetails.value.details.stad}, ${meldingenDetails.value.details.straat}, meldingen, p2000 meldingen, politie meldingen, brandweer meldingen, ambulance meldingen` },

    {
      property: "og:title",
      content: `${meldingenDetails.value.details.categorie} - ${meldingenDetails.value.details.stad}, ${meldingenDetails.value.details.straat} | 112 Meldingen op Meldingen.nl `,
    },
    {
      property: "og:description",
      content: `Regio ${meldingenDetails.value.details.regio} kreeg op donderdag ${seoTime(meldingenDetails.value.details.timestamp)} een melding via het p2000 netwerk. De ${meldingenDetails.value.details.dienst} is met spoed uitgerukt naar de ${meldingenDetails.value.details.straat} in ${meldingenDetails.value.details.stad} `,
    },
    {
      property: "og:image",
      content: `https://maps.googleapis.com/maps/api/streetview?size=400x400&location=${meldingenDetails.value.details.straat_url},${meldingenDetails.value.details.stad_url}&fov=90&heading=235&pitch=10&key=XXXXXXX`,
    },
    {
      property: "og:url",

    },
    {
      property: "twitter:title",
      content: `${meldingenDetails.value.details.categorie} - ${meldingenDetails.value.details.stad}, ${meldingenDetails.value.details.straat} | 112 Meldingen op Meldingen.nl `,
    },
    {
      property: "twitter:description",
      content: `Regio ${meldingenDetails.value.details.regio} kreeg op donderdag ${seoTime(meldingenDetails.value.details.timestamp)} een melding via het p2000 netwerk. De ${meldingenDetails.value.details.dienst} is met spoed uitgerukt naar de ${meldingenDetails.value.details.straat} in ${meldingenDetails.value.details.stad}`,
    },
    {
      property: "twitter:image",
      content: `https://maps.googleapis.com/maps/api/streetview?size=400x400&location=${meldingenDetails.value.details.straat_url},${meldingenDetails.value.details.stad_url}&fov=90&heading=235&pitch=10&key=XXXXXXX`,
    },
    {
      property: "twitter:card",
      content: `summary_large_image`,
    },
    {
      property: "og:site_name",
      content: `Meldingen.nl`,
    },
    {
      property: "twitter:image:alt",
      content: `${meldingenDetails.value.details.categorie} - ${meldingenDetails.value.details.stad}, ${meldingenDetails.value.details.straat} | 112 Meldingen op Meldingen.nl`,
    },


  ],
})

onMounted(() => {
  refreshNuxtData('meldingen_details');
  refreshNuxtData('recent_news');
  refreshNuxtData('enheeden');
  refreshNuxtData('home_seo');
  refreshNuxtData('ads');
})


</script>

<script>
let apiUrl;
let backend;
import moment from "moment";
import addImage from 'assets/img/add-img.jpg'
export default {
  name: "index",
  data() {
    return {
      image: { backgroundImage: `url(${addImage})` },
      currentUrl: "",
    }
  },
  created() {
    if (typeof window !== "undefined") {
      this.currentUrl = window.location.href;
      this.DateTime();
    }
  },
  methods: {
    DateTime(value) {
      // return moment.unix(value).utcOffset("GMT+01:00").format('LL');

      // const date = moment.unix(value).utcOffset("GMT+01:00").format('Do MMMM YYYY');
      // const time = moment.unix(value).utcOffset("GMT+01:00").format('hh:mm');
      // let newDate = date.split(' ');
      // const LastDate = newDate[0].slice(0, -2);

      // return LastDate + ' ' + newDate[1].toLowerCase() + ' ' + newDate[2] + ' - ' + time

      let m = moment();



      console.log(m);

    },
    addLetterOnTime(value){
        let splitDate = value.split('-');
        let removeYear = splitDate[0].split(' ')
        
     return removeYear[0] +' '+ removeYear[1] + ' om ' + splitDate[1];

      
    },
    dateTime(value) {

      let date = moment.unix(value).format('DD-MM-YYYY');
      let time = moment.unix(value).format('hh:mm');

      return date + ' om ' + time

    },
    // RelativeDate(value) {
    //   return moment(value).format('MMMM Do YYYY,');
    // },
  },
}
</script>

<style scoped>
ul.social.white-dark li a span[class*="icon-"],
ul.social.white-dark li a span[class*="icon-"] .path1:before,
ul.social.white-dark li a span[class*="icon-"] .path2:before {
  font-size: 18px;
}

ul.social.white-dark li a {
  padding: 0;
  margin-right: 5px;
}

.breadcrumbs ul.inline-list li {
  color: #A6B9C9;
}

ul.inline-list li span.right-angel {
  color: #A6B9C9;
  font-size: 12px;
}

.breadcrumbs ul.inline-list li a {
  color: #1F4160;
}

.list_group ul.inline-list li a {
  color: #A6B9C9;
  cursor: text;
  pointer-events: none;
}

.list_group ul.inline-list li a:hover {
  color: #A6B9C9;
}

.content {
  margin: 0px;
}

.content h2.content-heading {
  margin-bottom: 10px;
  font-size: 20px;
}

img.news-icon {
  width: 24px;
}

.list_group img.news-icon {
  width: 16px;
}

.content ul.inline-list.list-gap-10 {
  padding: 5px 0px;
  display: block;
  border-bottom: 1px solid rgba(166, 185, 201, 0.25);
}

.google-map-sec {
  margin-bottom: 30px;
}

.card .meta ul.inline-list li {
  font-size: 14px;
}

.content .meta ul.inline-list li {
  color: #A6B9C9;
}

.meta ul.inline-list li {
  font-size: 14px;
}

.list_group ul.inline-list.list-gap-10:last-child {
  border: none;
}

.google-map-sec iframe {
  margin: 0px;
}

.google_ad_sec img {
  max-height: 179px;
  object-fit: cover;
  width: 100%;
}

@media (max-width: 767px) {
  .sidebar h2.sec-heading {
    margin-top: 20px;
  }
  section.page-content.details-page.sec-padding {
    padding-top: 20px;
}
}
</style>