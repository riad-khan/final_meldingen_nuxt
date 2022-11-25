<template>
  <div>
    <Header/>

    <main class="main-content bg-dark-white">
      <!-- / Step Section-->
      <section class="page-content details-page sec-padding">
        <div class="container">
          <div class="breadcrumbs desktop-only mb-20">
            <ul class="inline-list">
              <li><nuxt-link to="/">Home</nuxt-link><span class="right-angel">></span></li>
              <li><nuxt-link :to="'/'+route.params.provincie.toLowerCase() ">{{meldingenDetails.details.provincie}}</nuxt-link><span class="right-angel">></span></li>
              <li><nuxt-link :to="'/'+route.params.provincie.toLowerCase()+'/'+route.params.stad.toLowerCase()">{{meldingenDetails.details.stad}}</nuxt-link><span class="right-angel">></span></li>
              <li >{{meldingenDetails.details.categorie}}</li>
            </ul>
          </div>


          <div class="row with-sidebar ">
            <div  :class="'col-md-8 col-lg-9 col-xs-12'">
              <div v-if="isLoading === true" style="height: 300px;" :class="isLoading ? 'spin':''"></div>
              <div v-else class="content box-shadow border-radius-8">
                <h2 class="content-heading">
                  {{meldingenDetails.details.straat}} in {{meldingenDetails.details.stad}} - <span class="text-trans-cap">{{meldingenDetails.details.categorie}}</span>

                </h2>
                <div class="meta">
                  <ul class="inline-list">
                    <li><span class="icon-clock"></span> {{ DateTime(meldingenDetails.details.timestamp) }}</li>

                  </ul>
                </div>
                <p>Regio {{meldingenDetails.details.regio}} kreeg op  {{DateTime(meldingenDetails.details.timestamp, 'dddd DD MMMM')}} een melding via het p2000 netwerk. De {{meldingenDetails.details.dienst}} is met spoed uitgerukt naar de {{meldingenDetails.details.straat}} in {{meldingenDetails.details.stad}}</p>


                <div class="google-map-sec">
                  <iframe :src="'https://maps.google.com/maps?q='+meldingenDetails.details.straat+','+meldingenDetails.details.stad+'&t=&z=15&ie=UTF8&iwloc=&output=embed'" width="100%" height="350" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
                <h2 class="content-heading" style="font-weight:700;font-size:22px;">Originele P2000 melding
                </h2>
                <p style="font-size:18px">{{meldingenDetails.details.p2000}}</p>

                
                <h3 class="weight-500 mt-30">Verzonden aan eenheden</h3>

                <ul v-for="(item,i) in enheedens" class="inline-list list-gap-10 d-flex align-items-center" :key="i">
                  <li>

                    <img v-if="item.dienst == 'ambulance'" src="@/assets/img/ambulance.png" class="news-icon"/>
                    <img v-if="item.dienst == 'brandweer'" src="@/assets/img/brandweer.png" class="news-icon"/>
                    <img v-if="item.dienst == 'kustwacht'" src="@/assets/img/kustwacht.png" class="news-icon"/>
                    <img v-if="item.dienst == 'politie'" src="@/assets/img/politie.png" class="news-icon"/>
                    <img v-if="item.dienst == 'traumaheli'" src="@/assets/img/traumaheli.png" class="news-icon"/>

                  </li>
                  <li><a href="#" rel="nofollow">{{item.capcode}}</a>, </li>
                  <li>{{item.omschrijving}} </li>
                </ul>
               

                <ul class="social dark-white white-dark desktop-only mt-30">
                  <li class="label">Delen:</li>


                  <li><ShareNetwork network="facebook" :title="meldingenDetails.details.straat + 'in' + meldingenDetails.details.stad + '-' + meldingenDetails.details.categorie " :url="currentUrl" ><span class="icon-facebook"><span class="path1"></span><span class="path2"></span></span></ShareNetwork></li>
                  <li><ShareNetwork network="twitter" :title="meldingenDetails.details.straat + 'in' + meldingenDetails.details.stad + '-' + meldingenDetails.details.categorie "  :url="currentUrl" ><span class="icon-twitter"><span class="path1"></span><span class="path2"></span></span></ShareNetwork></li>
                  
                </ul>

              </div>

            </div>

            <div class="col-md-4 col-lg-3 col-xs-12">
              <div class="sidebar">

                <h2 id="widget_title" class="sec-heading weight-500">Eerdere P2000-meldingen</h2>

                <div v-for="(item,i) in meldingenDetails.recentMeldingen">
                  <div class="card other-news box-shadow border-radius-8">
                    <div class="card-content">
                      <h3 class="d-flex align-items-center">

                        <img v-if="item.dienst == 'ambulance'" src="@/assets/img/ambulance.png" class="news-icon"/>
                        <img v-if="item.dienst == 'brandweer'" src="@/assets/img/brandweer.png" class="news-icon"/>
                        <img v-if="item.dienst == 'kustwacht'" src="@/assets/img/kustwacht.png" class="news-icon"/>
                        <img v-if="item.dienst == 'politie'" src="@/assets/img/politie.png" class="news-icon"/>
                        <img v-if="item.dienst == 'traumaheli'" src="@/assets/img/traumaheli.png" class="news-icon"/>

                        <router-link
                            :to="'/'+item.provincie.toLowerCase()+'/'+item.stad_url.toLowerCase()+'/'+item.regio_url.toLowerCase()+'/'+item.categorie_url.toLowerCase()+'-'+item.id">
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
                        <a :class="'button btn-more bg-red border-radius-8 '+item.dienst">{{ item.dienst }}</a>

                      </div>
                    </div>
                  </div>

                  <div v-if="i % 2 === 1"  class="card card-img">
                      <div v-if="ads.ad1.length > 0" v-html="ads.ad1[0].content">
                        
                      </div>
                  
                   
                  </div>


                </div>


                <div class="card card-img square" v-if="ads.ad2.length > 0" v-html="ads.ad2[0].content">
                
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
        </div>    </section>
      <!-- / Step Section-->
    </main>

    <Footer/>
  </div>
</template>

<script setup>

const config = useRuntimeConfig();
apiUrl = config.public.api;
backend = config.public.backend;
const route = useRoute();

var id = route.params.category.replace(/[^0-9]/g,'');




const {data: meldingenDetails, pending} = await useAsyncData('meldingen_details', () => $fetch(`${apiUrl}/meldingen/${id}`));
const {data: enheedens} = await useLazyAsyncData('enheeden', () => $fetch(`${apiUrl}/meldingen/enheeden/${id}`));
//const {data: recentNews} = await useLazyAsyncData('recent_news', () => $fetch(`${apiUrl}/news/recent/news`))
const {data : ads} = await useAsyncData('ads',()=>$fetch(`${apiUrl}/media/meldingenDetails`));
const { data: seo } = await useAsyncData('home_seo', () => $fetch(`${apiUrl}/seo-data/home`));
const titleSlug =(slug)=>{
  const text = slug.replace(/-/g," ");
  var lastIndex = text.lastIndexOf(" ");
  var lastRemoved =  text.substring(0, lastIndex);
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

useHead({
  titleTemplate: `${titleSlug(route.params.category)} - ${title(route.params.stad)}, ${title(route.params.regio)} | 112 Meldingen op Meldingen.nl`,
  meta: [
    {
      name: 'description', content: `${seo.value.seo_meta}`
    },

    { name: 'keywords', content: `${seo.value.seo_keywords}` },

    {
      property: "og:title",
      content: `${seo.value.title}`,
    },
    {
      property: "og:description",
      content: `${seo.value.seo_meta}`,
    },
    {
      property: "og:image",
      content: `https://i.imgur.com/P0xgWRX.jpg`,
    },
    {
      property: "og:url",
     
    },
    {
      property: "twitter:title",
      content: `${seo.value.title}`,
    },
    {
      property: "twitter:description",
      content: `${seo.value.seo_meta}`,
    },
    {
      property: "twitter:image",
      content: `https://i.imgur.com/P0xgWRX.jpg`,
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
      content: `${seo.value.title}`,
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
  data(){
    return{
      image: {backgroundImage: `url(${addImage})`},
      currentUrl: "",
    }
  },
  created() {
    if(typeof window !== "undefined"){
      this.currentUrl = window.location.href;
    }
  },
  methods:{
    DateTime(value){
      return moment.unix(value).format('MMMM Do YYYY, hh:mm');
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
ul.social.white-dark li a span[class*="icon-"], ul.social.white-dark li a span[class*="icon-"] .path1:before, ul.social.white-dark li a span[class*="icon-"] .path2:before {
    font-size: 18px;
}
ul.social.white-dark li a {
    padding: 0;
    margin-right: 5px;
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
.content {
    padding: 20px;
    margin: 0px;
}
.content h2.content-heading {
    margin-bottom: 10px;
}
img.news-icon {
    width: 24px;
}
.content ul.inline-list.list-gap-10 {
    padding: 5px 0px;
    display: block;
    border-bottom: 1px solid #dfe2e6;
}
.google-map-sec {
    margin-bottom: 20px;
}

@media (max-width: 767px) {
.sidebar h2.sec-heading{
    margin-top: 20px;
}

}
</style>