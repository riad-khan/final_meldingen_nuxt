<template>
  <section>

    <Header />
    <main class="main-content bg-dark-white">
      <div class="header_bellow_bg"></div>

      <section class="page-content news-details-page  sec-padding">
        <div class="container">
          <div class="contact-form box-shadow border-radius-8">
            <div class="breadcrumbs desktop-only">
              <ul class="inline-list">
                <li><a href="/">Home</a><span class="right-angel">&gt;</span></li>



                <li>
                  <nuxt-link to="/nieuws/">Nieuws</nuxt-link>
                  <span class="right-angel">&gt;</span>
                </li>
                <li>
                  <nuxt-link :to="'/nieuws/' + newsDetails.details.state.toLowerCase()">{{
                      newsDetails.details.state
                  }}
                  </nuxt-link>
                  <span class="right-angel">&gt;</span>
                </li>
                <li>
                  {{ newsDetails.details.slug }}
                </li>
              </ul>
            </div>

            <div class="row with-sidebar">


              <div class="col-md-8 col-lg-9 col-xs-12">

                <div class="card card-overlay other-news news-details box-shadow border-radius">
                  <div class="card-thumb">
                    <img :src="backend + newsDetails.details.image" alt="nieuws image" class="blog_thumb">
                  </div>

                  <div class="card-content card-img-overlay">
                    <div class="btn-group">
                      <a :class="'button btn-more bg-blue border-radius-8  ' + tag"
                        v-for="(tag, i) in newsDetails.details.tags.split(',')" v-show="tag.length !== 0">{{ tag }}</a>
                    </div>
                    <h6 class="text-limit-2 mt-10 m-mt-0 t-mt-0">{{ newsDetails.details.title }}</h6>
                  </div>

                </div>
                <p class="source-img">Foto: <a href="https://www.intervisualstudio.nl/" target="_blank"
                    rel="nofollow">intervisualstudio.nl</a></p>


                <div class="content-text">
                  <div class="meta">

                    <div class="row d-flex align-items-center meta-group">
                      <div class="col-md-8 col-lg-6 col-xs-8">

                        <ul class="inline-list">
                          <li><span class="icon-clock"></span> {{ dateTime(newsDetails.details.timestamp) }} in <span
                              style="color:red">
                              <nuxt-link :to="'/nieuws/' + newsDetails.details.city.toLowerCase()">{{
                                  newsDetails.details.city
                              }}</nuxt-link>
                            </span> , {{ newsDetails.details.state }}
                          </li>

                        </ul>
                        <span class="weblink">Bron: <a :href="newsDetails.details.post_url" rel="nofollow"
                            target="_blank">www.politie.nl</a></span>


                      </div>

                      <div class="col-md-4 col-lg-6 col-xs-4">
                        <div class="reacties d-flex align-items-center text-right">
                          <div class="heart-icon-area">


                            <!--                        <div class="heart-icon-area">-->
                            <!--                          <svg id="svg_unfill" data-id="265" onclick="my_fav(this)" class="svg unfill active"-->
                            <!--                               xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">-->
                            <!--                            <path stroke-width="2" fill="#FB4A3F"-->
                            <!--                                  d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 46pokFKiNH52ZK1W64wsWVH1Z2t2gueuTcj2xWWp3QCtAWGhC4m6WsQ7Sou6AtzEzrfTkoPy2ibAyA9vWsdsnRscRcX7bVy64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 46pokFKiNH52ZK1W64wsWVH1Z2t2gueuTcj2xWWp3QCtAWGhC4m6WsQ7Sou6AtzEzrfTkoPy2ibAyA9vWsdsnRscRcX7bVy.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z">-->
                            <!--                            </path>-->
                            <!--                          </svg>-->
                            <!--                          <svg id="svg_fill" data-id="265" onclick="my_dfav(this)" class="svg fill"-->
                            <!--                               xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">-->
                            <!--                            <path fill="#FB4A3F"-->
                            <!--                                  d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 46pokFKiNH52ZK1W64wsWVH1Z2t2gueuTcj2xWWp3QCtAWGhC4m6WsQ7Sou6AtzEzrfTkoPy2ibAyA9vWsdsnRscRcX7bVy.3-58.1 53-154.3-9.8-207.9z">-->
                            <!--                            </path>-->
                            <!--                          </svg>-->

                            <!--                        </div>-->

                            <div v-if="auth === false || status == 0" @click="likeNews" v-html="loveEmpty"></div>
                            <div v-if="auth === true && status == 1" @click="unlikeNews" v-html="LoveFill"></div>



                          </div>





                        </div>
                      </div>

                    </div>

                  </div>

                  <p><strong>{{ newsDetails.details.description }}</strong></p>
                  <div v-html="newsDetails.details.content"></div>

                  <div class="btn-group mt-20">
                    <a id="tag" :class="'button btn-more bg-tag border-radius-8  ' + tag"
                      v-for="(tag, i) in newsDetails.details.tags.split(',')" v-show="tag.length !== 0">{{ tag }}</a>

                  </div>

                </div>


                <!--   comment Section-->

                <div v-if="!auth" class="comment-sec mb-16 top-m">
                  <h2 class="comment-head">Reageer op dit artikel</h2>
                  <nuxt-link id="comment-btn" class="button btn-tranparent" to="/login">Aanmelden om te reageren
                  </nuxt-link>
                </div>

                <div v-else class="comment-sec t-mt-20">
                  <h2 class="weight-500">Reageer op dit artikel</h2>
                  <div class="comment-form form-area">
                    <form id="commentForm" @submit.prevent="submitComments">
                      <input name="_token" type="hidden" value="mjWwykik7sWQ0ywZdBX33hbSoWuu6ghPSd4W8vs3">
                      <div class="form-group">
                        <textarea v-model="message" name="message" placeholder="Schrijf hier je bericht *"
                          required=""></textarea>
                      </div>


                      <button type="submit" class="button btn-sumit btn-full mt-10" name="comment_submit"
                        style="background-color: #2B5882 !important;">Plaats mijn reactie
                      </button>
                    </form>
                    <div class="col-md-12">
                      <div class="form-group">
                        <p id="response" style="margin-top: 1rem"></p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 class="reacties">Reacties ({{ totalComments.total }})</h2>

                  <nuxt-link v-if="!auth" to="/login" id="login-btn" class="button btn-tranparent text-dark-white"><span
                      class="icon-user-hear"></span>
                    Bekijk de reacties
                  </nuxt-link>

                </div>
                <div v-if="auth" class="comment-view">
                  <div id="comment-area">
                    <h1>comments</h1>
                    <div v-for="(item, i) in comments" class="single-comment mt-30">
                      <h2 class="weight-500 d-flex align-items-center">
                        <span class="user-name">{{ item.name }}</span>
                        <span class="comment-time alignright">{{ RelativeDate(item.posted_at) }}</span>
                      </h2>
                      <p>{{ item.comments }}</p>
                    </div>

                    <div class="load-more  text-center">

                      <button v-if="totalComments.total !== comments.length" class="button btn-sumit btn-full mt-10"
                        data-v-b4fe5916="" name="comment_submit" style="background-color: rgb(43, 88, 130) !important;"
                        @click="loadMoreComments">Laad meer reacties
                      </button>

                    </div>

                  </div>


                </div>
                <ul class="social dark-white white-dark desktop-only mt-20">
                  <li class="label">Delen:</li>


                  <li>
                    <ShareNetwork :title="newsDetails.details.title" network="facebook" :url="currentUrl"><span
                        class="icon-facebook"><span class="path1"></span><span class="path2"></span></span>
                    </ShareNetwork>
                  </li>
                  <li>
                    <ShareNetwork network="twitter" :title="newsDetails.details.title" :url="currentUrl"><span
                        class="icon-twitter"><span class="path1"></span><span class="path2"></span></span>
                    </ShareNetwork>
                  </li>

                </ul>

              </div>



              <div class="col-md-4 col-lg-3 col-xs-12">
                <div class="sidebar">

                  <h2 id="widget_title" class="sec-heading weight-500">Eerdere P2000-meldingen</h2>

                  <div v-for="(item, i) in newsDetails.recentMeldingen">
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
                      <div v-if="media.ad1.length > 0" v-html="media.ad1[0].content"></div>
                    </div>


                  </div>


                  <div class="card card-img square" v-if="media.ad2.length > 0" v-html="media.ad2[0].content">

                  </div>
                </div>
              </div>

            </div>

            <div class="row pt-20">
              <div class="col-md-12" v-if="media.ad3.length > 0" v-html="media.ad3[0].content">

              </div>
            </div>
          </div>
        </div>

      </section>

    </main>


    <Footer />
  </section>
</template>

<script setup>


const config = useRuntimeConfig();
apiUrl = config.public.api;
backend = config.public.backend;
const route = useRoute();
var id = route.params.slug.replace(/[^0-9]/g, '');
const {
  data: newsDetails,
  pending, refresh,
} = await useAsyncData('news_details', () => $fetch(`${apiUrl}/news/${id}`))
const { data: seo } = await useAsyncData('news_seo', () => $fetch(`${apiUrl}/seo-data/Nieuws`));
const { data: totalComments } = await useAsyncData('comments_count', () => $fetch(`${apiUrl}/comments/total-comments/${id}`))
const { data: media } = await useAsyncData('media', () => $fetch(`${apiUrl}/media/newsDetails`));

onMounted(() => {
  refreshNuxtData('news_details');
  refreshNuxtData('news_seo');
  refreshNuxtData('comments_count');
  refreshNuxtData('media');

})
const title = route.params.slug.replaceAll("-", " ");
const state = route.params.state.replaceAll("-", " ");

const Seo_keywords = (stad) => {
  let regio = stad.replace(/-/g, ' ');
  let upperText = regio.replace(/(^\w|\s\w)/g, m => m.toUpperCase());
  let addHyphen = upperText.replace('-', ' ');

  return addHyphen;
}
useHead({
  titleTemplate: `Meldingen News Details - ${state} - ${title}`,
  // script: [{ children: `${seo.value.structured_data}` }],
  meta: [
    { name: 'description', content: `${newsDetails.value.details.description.slice(0, 200)}` },
    {
      name: 'keywords', content: `${Seo_keywords(newsDetails.value.details.state)} - ${newsDetails.value.details.title}, ${Seo_keywords(newsDetails.value.details.state)} - ${newsDetails.value.details.title} in ${newsDetails.value.details.city}` }
  ],
})
</script>

<script>
import loveEmpty from '~/assets/img/heart-empty.svg?raw';
import LoveFill from '~/assets/img/heart-fill.svg?raw';
import { isAuth, userInfo } from "../../../../../middlewares/auth";
import axios from "axios";



let apiUrl;
let backend;
let token;
import addImage from 'assets/img/add-img.jpg';
import moment from 'moment';

export default {
  name: "index",

  data() {
    return {
      image: { backgroundImage: `url(${addImage})` },
      auth: null,
      comments: [],
      page: 0,
      loveEmpty,
      LoveFill,
      status: 0,
      currentUrl: "",
      siteKey: '6LcTSysjAAAAAKDJTI3UfeTC9ecZ12WyF3diWNLl',


    }
  },
  created() {
    if (typeof window !== 'undefined') {
      const route = useRoute();
      this.auth = isAuth();
      token = localStorage.getItem('token');
      let new_id = route.params.slug.replace(/[^0-9]/g, '');
      this.getComments(new_id, this.page);

      this.currentUrl = window.location.href;


    }


  },
  mounted() {
    if (isAuth()) {
      const route = useRoute();
      let news_id = route.params.slug.replace(/[^0-9]/g, '');
      let user_id = localStorage.getItem('id')
      axios.get(`${apiUrl}/fav/checkStatus/${news_id}/${user_id}`)
        .then(response => {
          this.status = response.data.status
        })
        .catch(error=>{
          console.log(error);
        })
    };
    // let recaptchaScript = document.createElement('script')
    // recaptchaScript.setAttribute(
    //   'src',
    //   'https://www.google.com/recaptcha/api.js?render=' +
    //   this.siteKey
    // )
    // document.head.appendChild(recaptchaScript)
  },


  methods: {

    dateTimeUnix(value) {

      let date = moment.unix(value).format('DD-MM-YYYY');
      let time = moment.unix(value).format('hh:mm');

      return date + ' om ' + time

    },
    unlikeNews() {
      const route = useRoute();
      let news_id = route.params.slug.replace(/[^0-9]/g, '');
      const data = {
        newsId: news_id,

      }
      axios.post(`${apiUrl}/fav/unLike/`, data, {
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(response => {
          this.status = response.data.status
        })
        .catch(error => {
          console.log(error)
        })
    },


    likeNews() {
      if (this.auth) {
        const route = useRoute();
        let news_id = route.params.slug.replace(/[^0-9]/g, '');
        const data = {
          newsId: news_id
        }
        axios.post(`${apiUrl}/fav/like/`, data, {
          headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        })
          .then(response => {
            this.status = response.data.status
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        alert('please login to make Favourite')
      }
    },

    dateTime(value) {
      return moment(value).format('hh:mm');
    },
    DateTimeUnix(value) {
      return moment.unix(value, "MM-DD-YYYY").locale('nl').fromNow()
    },
    RelativeDate(value) {
      return moment(value).format('MMMM Do YYYY, h:mm:ss a');
    },
    getComments(id, page) {
      const route = useRoute();
      let new_id = route.params.slug.replace(/[^0-9]/g, '');
      axios.get(`${apiUrl}/comments/get-comments/${new_id}/${page}`, {
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then((response) => {
          this.comments = response.data;
          this.page = 1
        })
        .catch((error) => {
          console.log(error.response)
        })
    },

    getMoreComments(id, page) {

      axios.get(`${apiUrl}/comments/get-comments/${id}/${page}`, {
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then((response) => {

          response.data.map((item) => {
            this.comments.push(item)
          })

        })
        .catch((error) => {
          console.log(error.response)
        })
    },
    async submitComments() {
      // const token = await window.grecaptcha.execute(
      //   this.siteKey,
      //   { action: 'submit' }
      // );
      const route = useRoute();
      let new_id = route.params.slug.replace(/[^0-9]/g, '');
      const data = {
        news_id: new_id,
        comments: this.message,
       // recaptcha_token: token
      }
      axios.post(`${apiUrl}/comments/insert-comments`, data, {
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then((response) => {
          const { $swal } = useNuxtApp()
          $swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            icon: 'success',
            text: 'Comments created.Waiting for Approval',
          })

          this.message = '';
        })
        .catch(error => {
          console.log(error.response)
        })
    },
    loadMoreComments() {
      const route = useRoute();
      let new_id = route.params.slug.replace(/[^0-9]/g, '');
      this.getMoreComments(new_id, this.page++);
    }

  }
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

#comment-btn {
  background-color: white !important;
  color: #404040 !important;
  font-family: 'Roboto Condensed';
}

#login-btn {
  background-color: white !important;
  color: #404040 !important;
  font-family: 'Roboto Condensed';
}

.reacties {
  color: #404040 !important;
  padding-top: 20px;
  font-family: 'Roboto Condensed';
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 40px;

}

.comment-head {
  width: 222px;
  height: 40px;
  left: 202px;
  top: 1351px;

  font-family: 'Roboto Condensed';
  font-style: normal;
  font-weight: 500;
  font-size: 26px;
  line-height: 40px;
  color: #404040 !important;
}

#tag {
  background: rgba(31, 65, 96, 0.25) !important;
  color: #1F4160;
}

.breadcrumbs ul.inline-list li {
  color: #669E97;
}

.breadcrumbs ul.inline-list li a {
  color: #1F405E;
}

.right-angel {
  color: #669E97 !important;
}

.news-details.card {
  margin-bottom: 10px;
  position: relative;
  padding: 0;
  background: transparent;
  border-radius: 0px;
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

.news-details .card-content {
  padding: 15px;
}

.news-details.card .card-content.card-img-overlay h6 {
  color: var(--white-color);
  margin-bottom: 0px;
  font-size: 24px;
}

.sidebar h2#widget_title {
  font-size: 22px;
  margin-top: 0;
}

.news-details-page .breadcrumbs {
  margin-bottom: 20px;
}

.sidebar .card-content h3 {
  font-size: 16px;
  line-height: 1.3;
}

.contact-form {
  padding: 20px;
  text-align: inherit;
  background-image: none;
  margin-top: -30px;
}

.news-details-page {
  padding-top: 0;
}

.card .btn-group .button {
  margin-right: 5px;
  padding: 5px 10px;
  font-weight: 500;
  font-size: 12px;
}

.meta {
  margin-bottom: 15px;
}

.news-item.news-ad-sec {
  margin-bottom: 0;
}

.btn-group .button {
  margin-bottom: 0;
}

.reacties {
  justify-content: end;
  padding-top: 0;
}

h2.comment-head {
  margin-bottom: 0;
}

h2.reacties {
  margin-bottom: 0px;
}

p.source-img {
  margin-bottom: 10px;
}

@media (max-width: 767px) {
  .sidebar {
    margin-top: 30px;
  }

  .card-thumb img {
    height: 200px;
  }
}
</style>