<template>
  <!--Location call to action section-->
  <div class="header_bellow_bg"></div>
  <section class="call-to-action">
    <div class="container">
      <div class="row d-flex align-items-center call-to-row box-shadow bg-white-gray">
        <div class="col-md-8 col-xs-7">
          <div class="location-search-form">
            <input v-model="search" name="placename" autocomplete="off" placeholder="Zoek op plaatsnaam" type="text"
                   @input="(e)=>searchRegion(e)"/>
          </div>
        </div>
        <div class="col-md-4 col-xs-5">

          <div class="call-to-link textright">
            <button class="button text-locator" @click.prevent="findMyLocation">

              <span :class="isLoading ? 'rolling-spin':'icon-search'"></span>
            </button>
          </div>
        </div>
      </div>


      <div class="row result_row">
        <div class="col-md-12 result_list">
          <div v-for="(item, i) in meldingens" v-show="isOpen" id="search_by_place_result"
               class="searchbar-area box-shadow">
            <router-link :to="urlPath == 'meldingen' ? `/${findProvUrl(item.provincie)}/${item.stad_url}`:`/${urlPath}/${findProvUrl(item.provincie)}`" class="d-block">{{ item.stad }}
              <span>{{ findProvName(item.provincie) }}
              </span></router-link>
          </div>
        </div>
      </div>

    </div>
  </section>
  <!--/ Location call to action section-->
</template>


<script>
import axios from "axios";
import stad from "../stad.json";
import provincies from '../provincie.json'


let apiUrl
export default {
  setup() {

    const config = useRuntimeConfig();
    apiUrl = config.public.api;
  },
  name: "Location",
  props: ['urlPath'],
  data() {
    return {
      isOpen: false,
      locations : stad,
      search: '',
      isLoading: false,
      provincie: provincies,
      meldingens:[],
      count: 0
    }
  },



  methods: {
    findProvName(stad_id){
        const {provincie} = this.provincie.find( ({provincie,id}) => id === stad_id )
      return provincie
    },
    findProvUrl(stad_id){
      const {provincie_url} = this.provincie.find( ({provincie,id}) => id === stad_id )
      return provincie_url
    },
    findMyLocation() {
      const success = (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const geoApi = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;

        axios.get(geoApi)
            .then((response) => {
              if(this.urlPath == 'meldingen'){
                this.$router.push(`/${response.data.city}`)
              }else{
                this.$router.push(`/${this.urlPath}/${response.data.city}`)
              }
            })
            .catch((error) => {
              console.log(error.response.data)
            })
      };
      const error = () => {
        console.log('unable to find')
      };
      navigator.geolocation.getCurrentPosition(success, error)

    },
    searchRegion() {


    let limit = 0;


    this.locations.map((item,i)=>{
      if((item.stad_url.substring(0,this.search.length) === this.search.toLowerCase())){
        if(limit > 5){
          return;
        }
        if(this.meldingens.length === 6){
          this.meldingens.splice(0,6)
        }
        this.meldingens.push(item)
        this.isOpen = true;
        limit ++;
        if(this.search == ''){
          this.isOpen = false
          this.meldingens = [];
        }

      }
    })


    }
  },
  computed: {
    // locations() {
    //   return this.meldinges[0]
    // }
  }
}
</script>

<style scoped>
.result_row {
  position: relative;
}
.result_list{
  position: absolute;
  z-index: 999;
}
</style>