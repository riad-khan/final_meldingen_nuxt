<template>
  <div>
    <!--Header-->
    <div id="mobileSidenav" class="sidenav">
      <div class="sidenav-header">
        <div class="logo">
          <h1>
            <router-link to="/"><img alt="" src="@/assets/img/logo.svg" /></router-link>
          </h1>
        </div>
        <div class="close-sec">
          <a class="closebtn" href="javascript:void(0)" @click="closeNav"><img src="@/assets/img/icon-close.svg"></a>
        </div>
      </div>
      <div class="menu-mobile">
        <ul>
          <li :class="currentRouteName === '/' ? 'active' : ''">
            <nuxt-link to="/">Meldingen</nuxt-link>
          </li>
          <li :class="currentRouteName === '/nieuws' ? 'active' : ''">
            <nuxt-link to="/nieuws">Nieuws</nuxt-link>
          </li>
          <li :class="currentRouteName === '/contact' ? 'active' : ''">
            <router-link to="/contact">Contact</router-link>
          </li>
          <li v-if="isAuth" :class="currentRouteName === '/dashboard' ? 'active' : ''">
            <router-link to="/dashboard"><span>Profile</span></router-link>
          </li>
          <li v-else :class="currentRouteName === '/login' ? 'active' : ''">
            <nuxt-link to="/login"><span>Account</span></nuxt-link>
          </li>
          <!--
          <li><a href="#">
            <span class="icon-user">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 0C10.21 0 12 1.79 12 4C12 6.21 10.21 8 8 8C5.79 8 4 6.21 4 4C4 1.79 5.79 0 8 0ZM8 10C12.42 10 16 11.79 16 14V16H0V14C0 11.79 3.58 10 8 10Z"/></svg>
            </span> Account</a>
          </li>
          <li class="list-switcher">
            <div class="theme-swapper">
              <label class="switch">
                <input type="checkbox" class="switcher">
                <span class="slider round"></span>
              </label>
            </div>
          </li>
-->
        </ul>
      </div>
    </div>
    <header class="header-area sec-padding bg-theme">
      <div class="container">
        <div class="row d-flex align-items-center">
          <div class="col-md-4 col-xs-8">
            <div class="logo">
              <h1>
                <router-link to="/"><img alt="" src="@/assets/img/logo.svg" /></router-link>
              </h1>
            </div>
          </div>
          <div class="col-md-8 col-xs-4 textright">

            <a href="#menu" @click.prevent="openNav" id="toggle"><span></span></a>
            <div class="menu">



              <!-- <a  @click="openNav" id="toggle"><span></span></a> -->
              <!-- <button class="openNav box-shadow" id="toggle" @click="openNav"><img src="@/assets/img/icon-hamburger.svg"></button>  -->
              <ul>
                <li :class="currentRouteName === '/' ? 'active' : ''">
                  <nuxt-link to="/">Meldingen</nuxt-link>
                </li>
                <li :class="currentRouteName === '/nieuws' ? 'active' : ''">
                  <nuxt-link to="/nieuws">Nieuws</nuxt-link>
                </li>
                <li :class="currentRouteName === '/contact' ? 'active' : ''">
                  <router-link to="/contact">Contact</router-link>
                </li>
                <li v-if="isAuth" :class="currentRouteName === '/dashboard' ? 'active' : ''">
                  <router-link to="/dashboard"><span>Profile</span></router-link>
                </li>
                <li v-else :class="currentRouteName === '/login' ? 'active' : ''">
                  <nuxt-link to="/login"><span>Account</span></nuxt-link>
                </li>
                <!--
                <li><a href="#">
                  <span class="icon-user">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 0C10.21 0 12 1.79 12 4C12 6.21 10.21 8 8 8C5.79 8 4 6.21 4 4C4 1.79 5.79 0 8 0ZM8 10C12.42 10 16 11.79 16 14V16H0V14C0 11.79 3.58 10 8 10Z"/></svg>
                  </span> Account</a>
                </li>
                <li class="list-switcher">
                  <div class="theme-swapper">
                    <label class="switch">
                      <input type="checkbox" class="switcher">
                      <span class="slider round"></span>
                    </label>
                  </div>
                </li>
  -->
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
    <span class="icon-facebook"></span>
  </div>
</template>

<script>
import { isAuth } from "../middlewares/auth";


export default {
  name: "Header",
  data() {
    return {
      isAuth: null,
    }
  },

  created() {
    if (typeof window !== "undefined") {
      this.isAuth = isAuth();
    }
  },

  computed: {
    currentRouteName() {
      return this.$route.path;
    }
  },
  methods: {
    openNav() {
      let btn = document.getElementById('toggle');
      this.toggleClass(btn, 'on');
      return false;
    },

    hasClass(elem, className) {
      return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
    },
    addClass(elem, className) {
      if (!this.hasClass(elem, className)) {
        elem.className += ' ' + className;
      }
    },
    removeClass(elem, className) {
      var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, ' ') + ' ';
      if (this.hasClass(elem, className)) {
        while (newClass.indexOf(' ' + className + ' ') >= 0) {
          newClass = newClass.replace(' ' + className + ' ', ' ');
        }
        elem.className = newClass.replace(/^\s+|\s+$/g, '');
      }
    },

    toggleClass(elem, className) {
      var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, " ") + ' ';
      if (this.hasClass(elem, className)) {
        while (newClass.indexOf(" " + className + " ") >= 0) {
          newClass = newClass.replace(" " + className + " ", " ");
        }
        elem.className = newClass.replace(/^\s+|\s+$/g, '');
      } else {
        elem.className += ' ' + className;
      }
    }


    // openNav() {
    //   document.getElementById("mobileSidenav").style.right = "0";
    //   var element = document.getElementById("body-class");
    //   element.classList.add("sidenav-open");
    // },
    // closeNav() {
    //   document.getElementById("mobileSidenav").style.right = "-88%";
    //   var element = document.getElementById("body-class");
    //   setTimeout(function () {
    //     element.classList.remove("sidenav-open");
    //   }, 500);
    // }
  }

}
</script>
<style scoped>
/* Important styles */
#toggle {
  display: block;
  width: 28px;
  height: 30px;
  margin: 30px auto 10px;
}

#toggle span:after,
#toggle span:before {
  content: "";
  position: absolute;
  left: 0;
  top: -9px;
}
#toggle span:after{
  top: 9px;
}
#toggle span {
  position: relative;
  display: block;
}

#toggle span,
#toggle span:after,
#toggle span:before {
  width: 100%;
  height: 5px;
  background-color: #888;
  transition: all 0.3s;
  backface-visibility: hidden;
  border-radius: 2px;
}

/* on activation */
#toggle.on span {
  background-color: transparent;
}
#toggle.on span:before {
  transform: rotate(45deg) translate(5px, 5px);
}
#toggle.on span:after {
  transform: rotate(-45deg) translate(7px, -8px);
}
#toggle.on + #menu {
  opacity: 1;
  visibility: visible;
}


</style>
