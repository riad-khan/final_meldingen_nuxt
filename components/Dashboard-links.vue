<template>
  <div class="col-lg-4 col-md-4 col-sm-4">
    <div class="my-account">
      <div class="user-avatar bg-lightgrey-black">
        <div class="profile-pic-text-area">
          <img style="border-radius: 50%;" v-if="userinfo.profile_pic" :src="userinfo.profile_pic">
          <div class="_text-area" v-else >{{nameWord}}</div>
        </div>                        <p>{{userinfo.name}}</p>
      </div>
      <div class="dashboard-menu">
        <ul>
          <li class=""><nuxt-link to="/dashboard/edit-profile">Edit profile</nuxt-link></li>
          <li class=""><nuxt-link to="/dashboard/my-nieuws" >My favorite nieuws</nuxt-link></li>
          <li class=""><nuxt-link to="/dashboard/reacties">My reacties</nuxt-link></li>
          <li><a @click.prevent="logout" href="/user/logout">Logout</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup>
const config = useRuntimeConfig();
apiUrl = config.public.api;
backend = config.public.backend;
</script>

<script>
let apiUrl;
let backend;
import axios from "axios";
import {isAuth} from '../middlewares/auth'

export default {
  name: "Dashboard-links",
  data(){
    return{
      userinfo:{},
      nameWord:'',
    }
  },

  created() {
   if(typeof window !== "undefined"){
     const id = localStorage.getItem('id')
     axios.get(`${apiUrl}/user/user-info/${id}`,{
       headers: {
         "Content-type": "application/json",
         "Authorization": `Bearer ${localStorage.getItem('token')}`
       }
     })
         .then((response)=>{
           this.userinfo = response.data[0];
           this.nameWord  = this.userinfo.name.split(' ').map(name => name[0]).join('').toUpperCase()
         })
         .catch((error)=>{
           console.log(error)
         })
   }

  },
  methods:{
    logout(){
      localStorage.removeItem('token');
      localStorage.removeItem('id');
      localStorage.removeItem('email');
      localStorage.removeItem('name');
      this.$router.push('/')
    },
    NameWord(name){
      return name.split(' ').map(name => name[0]).join('').toUpperCase()
    }
  },

}
</script>

<style scoped>

</style>