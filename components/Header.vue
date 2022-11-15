<template>
  <div>
    <!--Header-->
    <div id="mobileSidenav" class="sidenav" style="display: none;">
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
          <div class="col-md-8 col-xs-4">
            <div class="menu">
              <!--
              <button class="openNav box-shadow" id="toggle" @click="openNav"><img
                  src="@/assets/img/icon-hamburger.svg"></button>
              -->
              <div class="menu-btn" @click="openNav">
                <div class="menu-btn__burger"></div>
              </div>
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
    /*
      openNav() {
        document.getElementById("mobileSidenav").style.display = "block";
        var element = document.getElementById("body-class");
        element.classList.add("sidenav-open");
      },
      closeNav() {
        document.getElementById("mobileSidenav").style.display = "none";
        var element = document.getElementById("body-class");
        setTimeout(function () {
          element.classList.remove("sidenav-open");
        }, 500);
      }
      */
    openNav() {
      var x = document.getElementById("mobileSidenav");
      if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }

    console.log(x.style.display);

      /*burger icon */
      // const menuBtn = document.querySelector('.menu-btn');
      // menuBtn.addEventListener('click', () => {
      //   let menuOpen = false;
      //   if (!menuOpen) {
      //     menuBtn.classList.add('open');
      //     menuOpen = true;
      //   }
      //   else {
      //     menuBtn.classList.remove('open');
      //     menuOpen = false;
      //   }
      // });
      
    }
  }

}
</script>
<style scoped>
.menu-btn {
  width: 40px;
  height: 35px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all .2s ease-in-out;
  border: 1px solid #fff;
  float: right;
}

.menu-btn__burger {
  width: 20px;
  height: 2px;
  background: #fff;
  border-radius: 1px;
  transition: all .2s ease-in-out;
}

.menu-btn__burger::before,
.menu-btn__burger::after {
  content: '';
  position: absolute;
  width: 20px;
  height: 2px;
  background: #fff;
  border-radius: 5px;
  transition: all .2s ease-in-out;
}

.menu-btn__burger::before {
  transform: translateY(-6px);
}

.menu-btn__burger::after {
  transform: translateY(6px);
}


.menu-btn.open .menu-btn__burger {
  transform: translateX(-50px);
  background: transparent;
}

.menu-btn.open .menu-btn__burger::before {
  transform: rotate(45deg) translate(35px, -35px);
  background: #fff;
}

.menu-btn.open .menu-btn__burger::after {
  transform: rotate(-45deg) translate(35px, 35px);
  background: #fff;
}

.menu-btn.open {
  border: 1px solid #fff;
}
</style>
