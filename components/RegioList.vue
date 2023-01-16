<template>
  <section class="news_drop">

    <button id="news-btn" class="news-list-btn" @click="toggleRegio">Meldingen in <span
        class="primary-color">{{ titleCase(region) }}</span> <img alt=""
                                                       src="@/assets/img/icon-angle-down.svg"/></button>

    <div id="news-list" class="row bg-white border-radius">
      <div class="col-md-12">
        <h2 class="sec-heading">Kies je regio</h2>


      </div>


      <div  class="col-md-3" >
        <div class="news-list">
          <ul >
            <li>
              <nuxt-link :to="path == 'meldingen' ? `/brabant-noord`:`/${path}/noord-brabant`">Brabant-Noord</nuxt-link>
            </li>
            <li>
              <nuxt-link :to="path == 'meldingen' ? `/friesland`:`/${path}/Friesland`">Friesland</nuxt-link>
            </li>
            <li>
              <nuxt-link :to="path == 'meldingen' ? `/gooi-en-vechtstreek`:`/${path}/noord-holland`">Gooi en Vechtstreek</nuxt-link>
            </li>
            <li>
              <nuxt-link :to="path == 'meldingen' ? `/zuid-holland-zuid`:`/${path}/zuid-holland`">Zuid-Holland Zuid</nuxt-link>
            </li>
            <li>
              <nuxt-link :to="path == 'meldingen' ? `/haaglanden`:`/${path}/zuid-holland`">Haaglanden</nuxt-link>
            </li>
            <li>
              <nuxt-link :to="path == 'meldingen' ? `/zeeland`:`/${path}/zeeland`">Zeeland</nuxt-link>
            </li>
            <li>
              <nuxt-link :to="path == 'meldingen' ? `/noord-en-oost-gelderland`:`/${path}/gelderland`">Noord en Oost-Gelderland</nuxt-link>
            </li>


          </ul>
        </div>
      </div>

      <div class="col-md-3">
        <div class="news-list">
          <ul>
            <li>
              <nuxt-link :to="path == 'meldingen' ? `/utrecht`:`/${path}/utrecht`">Utrecht</nuxt-link>
            </li>
            <li>
              <nuxt-link :to="path == 'meldingen' ? `/drenthe`:`/${path}/drenthe`">Drenthe</nuxt-link>
            </li>
            <li>
              <nuxt-link :to="path == 'meldingen' ? `/groningen`:`/${path}/groningen`">Groningen</nuxt-link>
            </li>
            <li>
              <nuxt-link :to="path == 'meldingen' ? `/noord-holland-noord`:`/${path}/noord-holland`">Noord-Holland Noord</nuxt-link>
            </li>
            <li>
              <nuxt-link :to="path == 'meldingen' ? `/twente`:`/${path}/overijssel`">Twente</nuxt-link>
            </li>
            <li>
              <nuxt-link :to="path == 'meldingen' ? `/amsterdam-amstelland`:`/${path}/noord-holland`">Amsterdam-Amstelland</nuxt-link>
            </li>
            <li>
              <nuxt-link :to="path == 'meldingen' ? `/gelderland-zuid`:`/${path}/gelderland`">Gelderland-Zuid</nuxt-link>
            </li>
          </ul>
        </div>
      </div>

      <div class="col-md-3">
          <div class="news-list">
            <ul>
              <li>
                <nuxt-link :to="path == 'meldingen' ? `/brabant-zuidoost`:`/${path}/noord-brabant`">Brabant-Zuidoost</nuxt-link>
              </li>
              <li>
                <nuxt-link :to="path == 'meldingen' ? `/rotterdam-rijnmond`:`/${path}/zuid-holland`">Rotterdam-Rijnmond</nuxt-link>
              </li>
              <li>
                <nuxt-link :to="path == 'meldingen' ? `/kennemerland`:`/${path}/noord-holland`">Kennemerland</nuxt-link>
              </li>

              <li>
                <nuxt-link :to="path == 'meldingen' ? `/midden-en-west-brabant`:`/${path}/noord-brabant`">Midden- en West-Brabant</nuxt-link>
              </li>

              <li>
                <nuxt-link :to="path == 'meldingen' ? `/gelderland-midden`:`/${path}/gelderland`">Gelderland Midden</nuxt-link>
              </li>
              <li>
                <nuxt-link :to="path == 'meldingen' ? `/flevoland`:`/${path}/flevoland`">Flevoland</nuxt-link>
              </li>
              <li>
                <nuxt-link :to="path == 'meldingen' ? `/hollands-midden`:`/${path}/zuid-holland`">Hollands Midden</nuxt-link>
              </li>
            </ul>
          </div>
      </div>

      <div class="col-md-3">
        <div class="news-list">
          <ul>
            <li>
              <nuxt-link :to="path == 'meldingen' ? `/limburg-noord`:`/${path}/Limburg`">Limburg Noord</nuxt-link>
            </li>
            <li>
              <nuxt-link :to="path == 'meldingen' ? `/limburg-zuid`:`/${path}/noord-brabant`">Limburg Zuid</nuxt-link>
            </li>
            <li>
              <nuxt-link :to="path == 'meldingen' ? `/ijsselland`:`/${path}/overijssel`">IJsselland</nuxt-link>
            </li>
            <li>
              <nuxt-link :to="path == 'meldingen' ? `/zaanstreek-waterland`:`/${path}/noord-holland`">Zaanstreek-Waterland</nuxt-link>
            </li>
            
          </ul>
        </div>

      </div>


    </div>
  </section>


  <!--/ News Overview Section -->
</template>

<script>
import $ from 'jquery';
import {values} from '../Values'

let apiUrl;


export default {
  setup() {
    const config = useRuntimeConfig();
    apiUrl = config.public.api;
  },
  name: "RegioList",
  props: ['region', 'path'],
  data() {
    return {
      regios: [],
      toggler: false,
      values:values,
    }
  },

  methods: {
    toggleRegio() {
      $("#news-list").slideToggle(500);
      $(this).toggleClass("angle-up");
      $("#widget_title").toggleClass("slideOpen", 500);
    },

     titleCase(region) {
       let regio = region.replace(/-/g, ' ');
       let upperText = regio.replace(/(^\w|\s\w)/g, m => m.toUpperCase());
      return upperText
}

  }
}
</script>

<style scoped>
.news_list .news_drop h2.sec-heading {
    font-size: 18px;
}

@media (max-width: 767px) {
  .news-overview-sec .row {
    padding: 10px 5px;
}	
}
</style>