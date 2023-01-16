<template>
  <section>
    <Header />
    <section id="stats" class="page-content details-page chat_page sec-padding">
      <div class="container">
        <div class="row">
          <div class="col-md-12">

            <div class="chart_page_dropdown d-flex align-items-center">
              <h1>Statistieken in </h1>
              <div class="form-group input-select map">

                <div class="custom-select-wrapper">
                  <input type="hidden" v-model="selectedRegio" name="provincie" id="regio">

                  <div @click="(e) => openRegion(e)" id="open_regio" class="custom-select sources">
                    <span id="regio_name" class="custom-select-trigger"> Nederland </span>
                    <div class="custom-options" @click="(e) => RegioChange(e)">
                      <span class="custom-option undefined" data-value=""></span>
                      <span class="custom-option undefined" :data-value="item.regio" v-for="(item, i) in regios">{{
                          item.regio
                      }}</span>

                    </div>
                  </div>
                </div>
                <span class="arrow-down"><img src="@/assets/img/icon-angle-down.svg"
                    alt="" /></span>
              </div>
            </div>

            <!--         <h1>Statistieken-->
            <!--           <select @change="(e)=>RegioChange(e)" name="datatablesSimple_length" placeholder="Nederland" id="regio"-->
            <!--                   class="sources">-->
            <!--             <option value="all" selected>Nederland</option>-->
            <!--             <option v-for="(item, i) in regios" v-bind:value="item.regio">{{item.regio}}</option>-->

            <!--           </select>-->
            <!--         </h1>-->
            <!-- Chart 1 -->
            <div class="row">
              <div class="col-lg-4 col-md-4">
                <div class="card other-news box-shadow border-radius-8">
                  <div class="card-content">
                    <strong>
                      <h4>Meldingen</h4>
                    </strong>
                    <p>Total of meldingen
                      <select name="datatablesSimple_length" ref="meldingen" @change="(e) => changeMeldingenTime(e)">
                        <option v-for="i in 24" selected :key="i" v-bind:value="i">{{ i }} uur</option>
                      </select>
                    </p>
                    <div class="mel-row d-flex align-items-center">
                      <span id="mel_count" class="mel_count">0</span>
                      <span id="meldingen_parcentage" class="mel_parc">0%</span>
                    </div>
                    <div ref="all_meldingen" class="">
                      <canvas id="myChart1" width="400" height="400"></canvas>
                    </div>

                  </div>

                </div>
              </div>
              <!--  Chart 2-->
              <div class="col-lg-4 col-md-4">
                <div class="card other-news box-shadow border-radius-8">
                  <div class="card-content">
                    <strong>
                      <h4>Ambulance Meldingen</h4>
                    </strong>
                    <p>Total of meldingen
                      <select name="datatablesSimple_length" ref="select_ambulance" @change="(e) => selectTime(e)">
                        <option v-for="i in 24" selected :key="i" v-bind:value="i">{{ i }} uur</option>
                      </select>
                    </p>
                    <div class="mel-row d-flex align-items-center">
                      <span id="ambulance_count" class="mel_count">2689</span> <span id="ambulance_parcentage"
                        class="mel_parc">-2%</span>
                    </div>
                    <div ref="ambulance_meldingen" class="">
                      <canvas id="myChart2" width="400" height="400"></canvas>
                    </div>

                  </div>

                </div>
              </div>

              <!--  Chart 3-->
              <div class="col-lg-4 col-md-4">
                <div class="card other-news box-shadow border-radius-8">
                  <div class="card-content">
                    <strong>
                      <h4>Brandweer Meldingen</h4>
                    </strong>
                    <p>Total of meldingen
                      <select name="datatablesSimple_length" ref="select_brandweer"
                        @change="(e) => selectBrandweerTime(e)">
                        <option v-for="i in 24" selected :key="i" v-bind:value="i">{{ i }} uur</option>
                      </select>
                    </p>
                    <div class="mel-row d-flex align-items-center">
                      <span id="brandweer_count" class="mel_count">2689</span> <span id="brandweer_parcentage"
                        class="mel_parc">-2%</span>
                    </div>
                    <div ref="brandweer_meldingen" class="">
                      <canvas id="myChart3" width="400" height="400"></canvas>
                    </div>

                  </div>

                </div>
              </div>
            </div>

            <!--  Chart 4-->
            <div class="row">
              <div class="col-md-4 col-md-4">
                <div class="card other-news box-shadow border-radius-8">
                  <div class="card-content">
                    <strong>
                      <h4>Politie Meldingen</h4>
                    </strong>
                    <p>Total of meldingen
                      <select name="datatablesSimple_length" ref="select_politie" @change="(e) => selectPolitieTime(e)">
                        <option v-for="i in 24" selected :key="i" v-bind:value="i">{{ i }} uur</option>
                      </select>
                    </p>
                    <div class="mel-row d-flex align-items-center">
                      <span id="politie_count" class="mel_count">2689</span> <span id="politie_parcentage"
                        class="mel_parc">-2%</span>
                    </div>
                    <div ref="politie_meldingen" class="">
                      <canvas id="myChart4" width="400" height="400"></canvas>
                    </div>

                  </div>

                </div>
              </div>

              <div class="col-lg-8 col-md-8">
                <div class="card other-news box-shadow border-radius-8">
                  <div class="card-content">
                    <strong>
                      <h4>
                        <span style="vertical-align: inherit;">
                          <span style="vertical-align: inherit;">Totaal aantal meldingen per provincie</span>
                        </span>
                      </h4>
                    </strong>
                    <p>
                      <span style="vertical-align: inherit;">
                        <span style="vertical-align: inherit;">Total of the message
                        </span>
                      </span>

                      <select name="datatablesSimple_length" ref="select_provincie"
                        @change="(e) => selectProvincieTime(e)">
                        <option v-for="i in 24" selected :key="i" v-bind:value="i">{{ i }} uur</option>
                      </select>
                    </p>

                    <div style=" margin-bottom: 2px;" ref="slider" id="slider" class="loaded">
                      <div class="wrapper">


                        <div ref="provincie_buttons" id="provincie_buttons_area" class="slides chart-btn">



                          <button v-for="(item, i) in provincieBtn" :key="i" :id="item.provincie"
                            @click="provincieSelect(item.provincie, i)"
                            :class="index === i ? 'provienci button active' : 'provienci button'"
                            :value="item.provincie" style="margin-left: 2px;margin-top: 3px;">

                            <span style="vertical-align: inherit;" class="provincie_name">{{ item.provincie }}
                              <span style="margin-left: 2px;display:block;span-size: 18px;" :id="'provincie' + i">{{
                                  item.total
                              }}</span>
                            </span>



                          </button>


                        </div>
                      </div>
                      <a id="prev" ref="prevs" class="control prev" :style="image"></a>
                      <a id="next" ref="nexts" class="control next" :style="image"></a>
                      <div ref="slide_dot" class="dots"></div>
                    </div><br>

                    <div style="height: 300px" ref="provincie_canvas" id="provincie_canvas" class="">
                      <canvas id="myChart5" style="display: block; box-sizing: border-box; height: 300px; width: 683px;"
                        width="683" height="300"></canvas>
                    </div>
                  </div>

                </div>
              </div>

            </div>

            <!--         chart 6-->
            <div class="row">
              <div class="col-lg-12">
                <div class="card other-news box-shadow border-radius-8">
                  <div class="card-content">
                    <strong>
                      <h4>
                        <span style="vertical-align: inherit;">
                          <span style="vertical-align: inherit;">Emergency meldingen</span>
                        </span>
                      </h4>
                    </strong>
                    <p>
                      <span style="vertical-align: inherit;">
                        <span style="vertical-align: inherit;">Total of the meldingen
                        </span>
                      </span>

                      <select name="datatablesSimple_length" ref="select_emergency"
                        @change="(e) => selectEmergencyTime(e)">
                        <option v-for="i in 24" selected :key="i" v-bind:value="i">{{ i }} uur</option>
                      </select>
                    </p>



                    <div style=" margin-bottom: 2px;" ref="emergency_slider" id="slider" class="loaded">

                      <div class="wrapper">

                        <div ref="emergency_buttons" id="emergency_options_button" class="slides chart-btn">


                          <button v-for="(item, i) in dienstBtn" :key="i" :id="item.dienst"
                            @click="emergencySelect(item.dienst, i)"
                            :class="index === i ? 'emergency button active' : 'emergency button'" :value="item.dienst"
                            style="margin-left: 2px;margin-top: 3px;">

                            <span style="vertical-align: inherit;" class="provincie_name">{{ titleCase(item.dienst) }}
                              <span style="margin-left: 2px;display:block;span-size: 18px;" :id="'emergency' + i">{{
                                  item.total
                              }}</span>
                            </span>



                          </button>


                        </div>

                      </div>

                      <a id="prev" ref="emergency_prevs" class="control prev emergency_next" :style="image"></a>
                      <a id="next" ref="emergency_nexts" class="control next emergency_next" :style="image"></a>
                      <div ref="emergency_slide_dot" class="emergency_dots"></div>
                    </div><br>

                    <div style="height: 300px" ref="emergency_canvas" class="">
                      <canvas id="myChart6" style="display: block; box-sizing: border-box; height: 300px; width: 683px;"
                        width="500" height="150"></canvas>
                    </div>
                  </div>

                </div>
              </div>
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
const { data: regios } = await useAsyncData('fetch_Regios', () => $fetch(`${apiUrl}/news/fetch/regios`));
onMounted(() => {
  refreshNuxtData('fetch_Regios');
})

useHead({
  titleTemplate: `Meldingen.nl - Statistiken`,

})

</script>

<script>
import { provincieValue } from "../../provincieChart";
import { dienstValue } from '../../dienst';


let apiUrl;
let backend;
import Chart from 'chart.js/auto/auto.mjs';
import axios from 'axios';
import addImage from "../../assets/img/add-img.jpg";
import rightIcon from 'assets/img/angel-icon-right.png'



export default {
  name: "Statistics.vue",
  components: {},
  data() {
    return {
      checkLoading: false,
      image: { backgroundImage: `url(${rightIcon})` },
      provincieBtn: provincieValue,
      dienstBtn: dienstValue,
      slide: null,
      myChart1: null,
      myChart2: null,
      myChart3: null,
      myChart4: null,
      myChart5: null,
      provincie: [],
      provincieCount: [],
      emergencyBtn: [],
      selectedRegio: '',
      isLoading: false,
      defaultProvincie: 'Noord-Brabant',
      defaultEmergency: 'ambulance',
      index: 0,
      toggle: false,
      config1: {
        type: 'line',
        data: {
          labels: [],
          datasets: [{
            label: 'Totaal Meldingen',
            data: [],
            backgroundColor: [
              'rgba(43,88,130,0.4)',
            ],

            pointRadius: 1,
            pointHoverRadius: 1,
            fill: true,
            redraw: true,
            borderColor: [
              'rgba(31,65,96)',

            ],
            borderWidth: 3
          }]
        },
        options: {
          scales: {
            y: {
              display: false
            },
            ticks: {
              display: false
            }
          },

          elements: {
            point: {
              radius: 0
            }
          },
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              position: 'nearest',
              padding: 10,
              cornerRadius: 10,
              backgroundColor: 'rgba(43,88,133)',
              callbacks: {
                label: function (context) {
                  return context.parsed.y;
                },
                title: () => null
              },

              yAlign: 'bottom',
              displayColors: false,

            }
          }
        }
      },
      config2: {
        type: 'line',
        data: {
          labels: [],
          datasets: [{
            label: 'Totaal Meldingen',
            data: [],
            backgroundColor: [
              'rgba(43,88,130,0.4)',
            ],

            pointRadius: 1,
            pointHoverRadius: 1,
            fill: true,
            redraw: true,
            borderColor: [
              'rgba(31,65,96)',

            ],
            borderWidth: 3
          }]
        },
        options: {
          scales: {
            y: {
              display: false
            },
            ticks: {
              display: false
            }
          },

          elements: {
            point: {
              radius: 0
            }
          },
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              position: 'nearest',
              padding: 10,
              cornerRadius: 10,
              backgroundColor: 'rgba(43,88,133)',
              callbacks: {
                label: function (context) {
                  return context.parsed.y;
                },
                title: () => null
              },

              yAlign: 'bottom',
              displayColors: false,

            }
          }
        }
      },
      config3: {
        type: 'line',
        data: {
          labels: [],
          datasets: [{
            label: 'Totaal Meldingen',
            data: [],
            backgroundColor: [
              'rgba(43,88,130,0.4)',
            ],

            pointRadius: 1,
            pointHoverRadius: 1,
            fill: true,
            redraw: true,
            borderColor: [
              'rgba(31,65,96)',

            ],
            borderWidth: 3
          }]
        },
        options: {
          scales: {
            y: {
              display: false
            },
            ticks: {
              display: false
            }
          },

          elements: {
            point: {
              radius: 0
            }
          },
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              position: 'nearest',
              padding: 10,
              cornerRadius: 10,
              backgroundColor: 'rgba(43,88,133)',
              callbacks: {
                label: function (context) {
                  return context.parsed.y;
                },
                title: () => null
              },

              yAlign: 'bottom',
              displayColors: false,

            }
          }
        }
      },
      config4: {
        type: 'line',
        data: {
          labels: [],
          datasets: [{
            label: 'Totaal Meldingen',
            data: [],
            backgroundColor: [
              'rgba(43,88,130,0.4)',
            ],

            pointRadius: 1,
            pointHoverRadius: 1,
            fill: true,
            redraw: true,
            borderColor: [
              'rgba(31,65,96)',

            ],
            borderWidth: 3
          }]
        },
        options: {
          scales: {
            y: {
              display: false
            },
            ticks: {
              display: false
            }
          },

          elements: {
            point: {
              radius: 0
            }
          },
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              position: 'nearest',
              padding: 10,
              cornerRadius: 10,
              backgroundColor: 'rgba(43,88,133)',
              callbacks: {
                label: function (context) {
                  return context.parsed.y;
                },
                title: () => null
              },

              yAlign: 'bottom',
              displayColors: false,

            }
          }
        }
      },
      config5: {
        type: 'line',
        data: {
          labels: [],
          datasets: [{
            label: 'Totaal Meldingen',
            data: [],
            backgroundColor: [
              'rgba(43,88,130,0.4)',
            ],

            pointRadius: 1,
            pointHoverRadius: 1,
            fill: true,
            redraw: true,
            borderColor: [
              'rgba(31,65,96)',

            ],
            borderWidth: 3
          }]
        },
        options: {
          animation: {
            duration: 1,

          },
          scales: {
            y: {
              display: false
            },
            ticks: {
              display: false
            }
          },

          elements: {
            point: {
              radius: 0
            }
          },
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              position: 'nearest',
              padding: 10,
              cornerRadius: 10,
              backgroundColor: 'rgba(43,88,133)',
              callbacks: {
                label: function (context) {
                  return context.parsed.y;
                },
                title: () => null
              },

              yAlign: 'bottom',
              displayColors: false,

            },

          }
        }
      },
      config6: {
        type: 'line',
        data: {
          labels: [],
          datasets: [{
            label: 'Totaal Meldingen',
            data: [],
            backgroundColor: [
              'rgba(43,88,130,0.4)',
            ],

            pointRadius: 1,
            pointHoverRadius: 1,
            fill: true,
            redraw: true,
            borderColor: [
              'rgba(31,65,96)',

            ],
            borderWidth: 3
          }]
        },
        options: {
          animation: {
            duration: 1,

          },
          scales: {
            y: {
              display: false
            },
            ticks: {
              display: false
            }
          },

          elements: {
            point: {
              radius: 0
            }
          },
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              position: 'nearest',
              padding: 10,
              cornerRadius: 10,
              backgroundColor: 'rgba(43,88,133)',
              callbacks: {
                label: function (context) {
                  return context.parsed.y;
                },
                title: () => null
              },

              yAlign: 'bottom',
              displayColors: false,

            },

          }
        }
      },

    }
  },




  mounted() {

    this.RegioChange('all');
    

    var slider = this.$refs.slider,
      sliderItems = this.$refs.provincie_buttons,
      prev = this.$refs.prevs,
      next = this.$refs.nexts,
      dot = this.$refs.slide_dot;

    var emergency_slider = this.$refs.emergency_slider,
      emergencySliderItems = this.$refs.emergency_buttons,
      emergencyPrev = this.$refs.emergency_prevs,
      emergencyNext = this.$refs.emergency_nexts,
      emergencyDots = this.$refs.emergency_slide_dot;


    function provienci(wrapper, items, prev, next) {

      var posX1 = 0,
        posX2 = 0,
        posInitial,
        posFinal,
        threshold = 100,
        slides = items.getElementsByClassName('provienci'),
        slidesLength = slides.length,
        slideSize = 132,
        index = 0,
        allowShift = true;





      wrapper.classList.add('loaded');

      for (var j = 0; j < slidesLength; j++) {
        var dotItem = document.createElement('i');
        dotItem.dataset.id = j;


        dot.appendChild(dotItem);


      }

      function appendAfter(n, original, appendTo) {
        for (var i = 0; i < n; i++) {
          var clone = original[i].cloneNode(true);
          appendTo.appendChild(clone);
        }

      }
      appendAfter(5, slides, items);



      // Click events
      prev.addEventListener('click', function () { shiftSlide(-1) });
      next.addEventListener('click', function () { shiftSlide(1) });

      // Transition events
      items.addEventListener('transitionend', checkIndex);

      function dragStart(e) {
        e = e || window.event;
        e.preventDefault();
        posInitial = items.offsetLeft;

        if (e.type == 'touchstart') {
          posX1 = e.touches[0].clientX;
        } else {
          posX1 = e.clientX;
          document.onmouseup = dragEnd;
          document.onmousemove = dragAction;
        }
      }

      function dragAction(e) {
        e = e || window.event;

        console.log('frim dragAction')

        if (e.type == 'touchmove') {
          posX2 = posX1 - e.touches[0].clientX;
          posX1 = e.touches[0].clientX;
        } else {
          posX2 = posX1 - e.clientX;
          posX1 = e.clientX;
        }
        items.style.left = (items.offsetLeft - posX2) + "px";
      }

      function dragEnd(e) {
        posFinal = items.offsetLeft;
        if (posFinal - posInitial < -threshold) {
          shiftSlide(1, 'drag');
        } else if (posFinal - posInitial > threshold) {
          shiftSlide(-1, 'drag');
        } else {
          items.style.left = (posInitial) + "px";
        }

        document.onmouseup = null;
        document.onmousemove = null;
      }

      function shiftSlide(dir, action) {

        items.classList.add('shifting');

        if (allowShift) {
          if (!action) { posInitial = items.offsetLeft; }

          if (dir == 1) {
            items.style.left = (posInitial - slideSize) + "px";
            index++;
          } else if (dir == -1) {
            items.style.left = (posInitial + slideSize) + "px";
            index--;
          }

        };

        allowShift = false;
      }

      function checkIndex() {
        items.classList.remove('shifting');

        if (index == -1) {
          items.style.left = -(slidesLength * slideSize) + "px";
          index = slidesLength - 1;
        }

        if (index == slidesLength) {
          items.style.left = -(1 * slideSize) + "px";
          index = 0;
        }
        deleteDots();
        dot.children[index].classList.add('active');
        allowShift = true;
      }

      dot.addEventListener('click', function (e) {
        if (e.target.tagName.toLowerCase() !== 'i') return;
        checkDots(e);
      });
      function checkDots(e) {
        items.classList.add('shifting');
        deleteDots();
        e.target.classList.add('active');
        items.style.left = -(1 * (slideSize * e.target.dataset.id)) + "px";
        index = e.target.dataset.id;
      }

      function deleteDots(e) {
        var dotElements = document.querySelectorAll('.dots i');
        for (var i = 0; i < dotElements.length; i++) {
          dotElements[i].classList.remove('active');
        }
      }

    };







    function emergencySlider(wrapper, items, prev, next) {

      var posX1 = 0,
        posX2 = 0,
        posInitial,
        posFinal,
        threshold = 100,
        slides = items.getElementsByClassName('emergency'),
        slidesLength = slides.length,
        slideSize = 132,
        index = 0,
        allowShift = true;

      wrapper.classList.add('loaded');

      for (var j = 0; j < slidesLength; j++) {
        var dotItem = document.createElement('i');
        dotItem.dataset.id = j;


        dot.appendChild(dotItem);


      }

      function appendAfter(n, original, appendTo) {
        for (var i = 0; i < n; i++) {
          var clone = original[i].cloneNode(true);
          appendTo.appendChild(clone);
        }

      }
      appendAfter(5, slides, items);



      // Click events
      prev.addEventListener('click', function () { shiftSlide(-1) });
      next.addEventListener('click', function () { shiftSlide(1) });

      // Transition events
      items.addEventListener('transitionend', checkIndex);

      function dragStart(e) {
        e = e || window.event;
        e.preventDefault();
        posInitial = items.offsetLeft;

        if (e.type == 'touchstart') {
          posX1 = e.touches[0].clientX;
        } else {
          posX1 = e.clientX;
          document.onmouseup = dragEnd;
          document.onmousemove = dragAction;
        }
      }

      function dragAction(e) {
        e = e || window.event;

        console.log('frim dragAction')

        if (e.type == 'touchmove') {
          posX2 = posX1 - e.touches[0].clientX;
          posX1 = e.touches[0].clientX;
        } else {
          posX2 = posX1 - e.clientX;
          posX1 = e.clientX;
        }
        items.style.left = (items.offsetLeft - posX2) + "px";
      }

      function dragEnd(e) {
        posFinal = items.offsetLeft;
        if (posFinal - posInitial < -threshold) {
          shiftSlide(1, 'drag');
        } else if (posFinal - posInitial > threshold) {
          shiftSlide(-1, 'drag');
        } else {
          items.style.left = (posInitial) + "px";
        }

        document.onmouseup = null;
        document.onmousemove = null;
      }

      function shiftSlide(dir, action) {

        items.classList.add('shifting');

        if (allowShift) {
          if (!action) { posInitial = items.offsetLeft; }

          if (dir == 1) {
            items.style.left = (posInitial - slideSize) + "px";
            index++;
          } else if (dir == -1) {
            items.style.left = (posInitial + slideSize) + "px";
            index--;
          }

        };

        allowShift = false;
      }

      function checkIndex() {
        items.classList.remove('shifting');

        if (index == -1) {
          items.style.left = -(slidesLength * slideSize) + "px";
          index = slidesLength - 1;
        }

        if (index == slidesLength) {
          items.style.left = -(1 * slideSize) + "px";
          index = 0;
        }
        deleteDots();
        dot.children[index].classList.add('active');
        allowShift = true;
      }

      dot.addEventListener('click', function (e) {
        if (e.target.tagName.toLowerCase() !== 'i') return;
        checkDots(e);
      });
      function checkDots(e) {
        items.classList.add('shifting');
        deleteDots();
        e.target.classList.add('active');
        items.style.left = -(1 * (slideSize * e.target.dataset.id)) + "px";
        index = e.target.dataset.id;
      }

      function deleteDots(e) {
        var dotElements = document.querySelectorAll('.emergency_dots i');
        for (var i = 0; i < dotElements.length; i++) {
          dotElements[i].classList.remove('active');
        }
      }






    };


    provienci(slider, sliderItems, prev, next);

  
    if (window.innerWidth < 550) {
      emergencySlider(emergency_slider, emergencySliderItems, emergencyPrev, emergencyNext);

    }

    document.body.addEventListener('click', (e) => {
      let customSelect = document.getElementsByClassName('custom-select sources')[0];
      if (customSelect.classList.contains('opened')) {
        customSelect.classList.remove('opened');
        e.stopPropagation();
      }
    })

  }


  ,
  methods: {
    titleCase(val) {
      let value = val.replace(/-/g, ' ');
      let upperText = value.replace(/(^\w|\s\w)/g, m => m.toUpperCase());
      return upperText
    },

    RegioChange(e) {
      let regio;
      if (e == 'all') {
        regio = "all"
      } else {
        document.getElementById('regio_name').innerText = e.target.getAttribute('data-value')
        regio = e.target.getAttribute('data-value')
        this.selectedRegio = e.target.getAttribute('data-value')

      }

      const defaultMeldingenTime = this.$refs.meldingen.value;
      const defaultAmbulanceTime = this.$refs.select_ambulance.value;
      const defaultBrandweer = this.$refs.select_brandweer.value;
      const defaultPolitie = this.$refs.select_politie.value;
      const provincieValue = this.$refs.select_provincie.value;
      const emergencyValue = this.$refs.select_emergency.value;

      const btn = document.getElementsByClassName('provienci button active');

      this.fetchMeldingenChartData(defaultMeldingenTime, regio);
      this.fetchAmbulanceMeldingen(defaultAmbulanceTime, regio);
      this.fetchBrandweerMeldingen(defaultBrandweer, regio);
      this.fetchPolitieMeldingen(defaultPolitie, regio);

      this.fetchProvincieMeldingen(provincieValue, this.defaultProvincie);
      this.fetchEmergencyMeldingen(emergencyValue, this.defaultEmergency)



    },

    openRegion(e) {
      let customSelect = document.getElementsByClassName('custom-select sources')[0];
      this.toggle = !this.toggle;
      if (this.toggle === true) {
        customSelect.classList.add('opened');
      } else {
        customSelect.classList.remove('opened')
      }
      e.stopPropagation();

    },


    //meldingen Chart

    meldingenChartRender() {
      if (this.myChart1 != null) {
        this.myChart1.destroy();
      }
      this.myChart1 = new Chart(
        document.getElementById('myChart1'),
        this.config1
      );

    },
    changeMeldingenTime(e) {

      let regio;

      if (!document.getElementById('regio').value) {
        regio = "all"
      } else {
        regio = document.getElementById('regio').value
      }

      console.log(regio)
      const hour = e.target.value;
      this.fetchMeldingenChartData(hour, regio);
    },
    fetchMeldingenChartData(hour, regio) {
      this.$refs.all_meldingen.classList.value = "spin";
      axios.get(`${apiUrl}/charts/meldingen/${hour}/${regio}`)
        .then((response) => {
          this.config1.data.labels = [];
          this.config1.data.datasets[0].data = [];
          for (let i = 0; i < response.data.charts.length; i++) {
            this.config1.data.labels.push((response.data.charts[i].time.length == 1 ? '0' : '') + response.data.charts[i].time);
            this.config1.data.datasets[0].data.push(response.data.charts[i].calculated);
          }

          this.meldingenChartRender();

          this.$refs.all_meldingen.classList.value = "";;
          document.getElementById('mel_count').innerText = response.data.count;
          document.getElementById('meldingen_parcentage').innerHTML = response.data.parcent + '%';
        })
        .catch(error => {
          console.log(error.response);
        })
    },

    //Ambulance Charts

    AmbulanceChartRender() {
      if (this.myChart2 != null) {
        this.myChart2.destroy();
      }
      this.myChart2 = new Chart(
        document.getElementById('myChart2'),
        this.config2
      );

    },

    selectTime(e) {

      let regio;

      if (!document.getElementById('regio').value) {
        regio = "all"
      } else {
        regio = document.getElementById('regio').value
      }

      const hour = e.target.value;
      this.fetchAmbulanceMeldingen(hour, regio);
    },
    fetchAmbulanceMeldingen(hour, regio) {


      this.$refs.ambulance_meldingen.classList.value = "spin";
      axios.get(`${apiUrl}/charts/ambulance/${hour}/${regio}`)
        .then((response) => {
          this.config2.data.labels = [];
          this.config2.data.datasets[0].data = [];
          for (let i = 0; i < response.data.charts.length; i++) {
            this.config2.data.labels.push((response.data.charts[i].time.length == 1 ? '0' : '') + response.data.charts[i].time);
            this.config2.data.datasets[0].data.push(response.data.charts[i].calculated);
          }
          this.AmbulanceChartRender();
          this.$refs.ambulance_meldingen.classList.value = "";
          document.getElementById('ambulance_count').innerText = response.data.count;
          document.getElementById('ambulance_parcentage').innerHTML = response.data.parcent + '%';
        })
    },

    //Brandweer Charts

    BrandweerChartRender() {
      if (this.myChart3 != null) {
        this.myChart3.destroy();
      }
      this.myChart3 = new Chart(
        document.getElementById('myChart3'),
        this.config3
      );
    },

    selectBrandweerTime(e) {
      let regio;

      if (!document.getElementById('regio').value) {
        regio = "all"
      } else {
        regio = document.getElementById('regio').value
      }
      const hour = e.target.value;
      this.fetchBrandweerMeldingen(hour, regio);
    },
    fetchBrandweerMeldingen(hour, regio) {
      this.$refs.brandweer_meldingen.classList.value = "spin"
      axios.get(`${apiUrl}/charts/brandweer/${hour}/${regio}`)
        .then((response) => {
          this.config3.data.labels = [];
          this.config3.data.datasets[0].data = [];
          for (let i = 0; i < response.data.charts.length; i++) {
            this.config3.data.labels.push((response.data.charts[i].time.length == 1 ? '0' : '') + response.data.charts[i].time);
            this.config3.data.datasets[0].data.push(response.data.charts[i].calculated);
          }
          this.BrandweerChartRender();
          this.$refs.brandweer_meldingen.classList.value = ""
          document.getElementById('brandweer_count').innerText = response.data.count;
          document.getElementById('brandweer_parcentage').innerHTML = response.data.parcent + '%';
        })
    },

    //politie charts

    PolitieChartRender() {
      if (this.myChart4 != null) {
        this.myChart4.destroy();
      }
      this.myChart4 = new Chart(
        document.getElementById('myChart4'),
        this.config4
      );
    },

    selectPolitieTime(e) {
      let regio;

      if (!document.getElementById('regio').value) {
        regio = "all"
      } else {
        regio = document.getElementById('regio').value
      }
      const hour = e.target.value;
      this.fetchPolitieMeldingen(hour, regio);
    },
    fetchPolitieMeldingen(hour, regio) {
      this.$refs.politie_meldingen.classList.value = "spin";
      axios.get(`${apiUrl}/charts/politie/${hour}/${regio}`)
        .then((response) => {
          this.config4.data.labels = [];
          this.config4.data.datasets[0].data = [];
          for (let i = 0; i < response.data.charts.length; i++) {
            this.config4.data.labels.push((response.data.charts[i].time.length == 1 ? '0' : '') + response.data.charts[i].time);
            this.config4.data.datasets[0].data.push(response.data.charts[i].calculated);
          }
          this.PolitieChartRender();
          this.$refs.politie_meldingen.classList.value = "";
          document.getElementById('politie_count').innerText = response.data.count;
          document.getElementById('politie_parcentage').innerHTML = response.data.parcent + '%';
        })
    },
    //provincie charts

    provincieSelect(provincie, i) {
      this.index = i;
      const selectedValue = this.$refs.select_provincie.value;


      this.fetchProvincieMeldingen(selectedValue, provincie);


    },

    selectProvincieTime(e) {
      const hour = e.target.value;
      const btn = document.getElementsByClassName('provienci button active');
      this.fetchProvincieMeldingen(hour, btn[0].value)


    },
    provincieChartRender() {
      if (this.myChart5 != null) {
        this.myChart5.destroy();
      }
      this.myChart5 = new Chart(
        document.getElementById('myChart5'),
        this.config5
      );
    },
    fetchProvincieMeldingen(hour, provincie) {

      this.$refs.provincie_canvas.classList.value = "spin";
      axios.get(`${apiUrl}/charts/prov/${hour}/${provincie}`)
        .then((response) => {
          this.slide = true;
          this.config5.data.labels = [];
          this.config5.data.datasets[0].data = [];
          for (let i = 0; i < response.data.chart.length; i++) {
            this.config5.data.labels.push((response.data.chart[i].time.length == 1 ? '0' : '') + response.data.chart[i].time);
            this.config5.data.datasets[0].data.push(response.data.chart[i].calculated);
          }

          response.data.hoursData.map((item, i) => {
            const data = this.provincieBtn.filter(el => el.provincie === item.provincie);

            for (let i = 0; i < data.length; i++) {
              if (data[i].provincie === item.provincie) {
                data[i].total = item.total;
                this.provincieBtn.push(data);
                this.provincieBtn.pop(data);
              }
            }
          })


          this.provincieChartRender();
          this.$refs.provincie_canvas.classList.value = "";

          this.provincieCount = response.data.hoursData;


        })

    },


    //Emergency charts

    emergencySelect(emergency, i) {
      this.index = i;
      const selectedValue = this.$refs.select_emergency.value;

      this.fetchEmergencyMeldingen(selectedValue, emergency);


    },

    selectEmergencyTime(e) {
      const hour = e.target.value;
      const btn = document.getElementsByClassName('emergency button active');
      this.fetchEmergencyMeldingen(hour, btn[0].value)


    },
    EmergencyChartRender() {
      if (this.myChart6 != null) {
        this.myChart6.destroy();
      }
      this.myChart6 = new Chart(
        document.getElementById('myChart6'),
        this.config6
      );
    },



    fetchEmergencyMeldingen(hour, emergency) {
      this.checkLoading = true;
      this.$refs.emergency_canvas.classList.value = "spin";
      axios.get(`${apiUrl}/charts/emergency/${hour}/${emergency}`)
        .then((response) => {

          this.config6.data.labels = [];
          this.config6.data.datasets[0].data = [];
          for (let i = 0; i < response.data.chart.length; i++) {
            this.config6.data.labels.push((response.data.chart[i].time.length == 1 ? '0' : '') + response.data.chart[i].time);
            this.config6.data.datasets[0].data.push(response.data.chart[i].calculated);
          }


          response.data.buttons.map((item, i) => {
            const data = this.dienstBtn.filter(el => el.dienst === item.dienst);

            for (let i = 0; i < data.length; i++) {
              if (data[i].dienst === item.dienst) {
                data[i].total = item.total;    
                
                
              }
            }
          })

          

          this.emergencyBtn = response.data.buttons

          this.EmergencyChartRender();
          this.$refs.emergency_canvas.classList.value = "";
          this.checkLoading = false;

        })

    }




  }
}
</script>

<style scoped>
div#slider {
  position: relative;
}

.emergency_next{
  display: none;
}
.wrapper {
  overflow: hidden;
  position: relative;
  width: 100%;
  z-index: 1;
}

#stats {
  overflow: hidden;
}

.slides {
  display: flex;
  position: relative;
  top: 0;
  left: 0;
  width: 10000px;
}

.chart-btn button.button {
  background: transparent;
  color: #404040;
  text-align: left;
  border: 2px solid;
  border-color: #CCCCCC;
  margin-right: 5px;
  min-width: 132px;
  font-size: 12px;
  font-weight: 700;

}

.chart-btn button.button span span {
  font-size: 20px;
  color: #000;
}

.chart-btn button.button.active,
.chart-btn button.button:hover {
  background: #E9ECEF;
  color: #1F4160;
  border: 2px solid #1F4160;
}

.chart-btn button.button.active span span,
.chart-btn button.button.hover span span {
  color: #1F4160;
}

select {
  border: none;
  color: #669E97;
  outline: none;
  background: transparent;
}

div#slider {
  position: relative;
}

#slider .slider {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, .2);
}

.wrapper {
  overflow: hidden;
  position: relative;
  width: 100%;
  z-index: 1;
}

.slides {
  display: flex;
  position: relative;
  top: 0;
  left: 0;
  width: 10000px;
}

.chart-btn button.button {
  background: transparent;
  color: var(--text-color);
  text-align: left;
  border: 2px solid;
  border-color: #CCCCCC;
  margin-right: 5px;
  min-width: 132px;
  font-size: 12px;
}

.slides.shifting {
  transition: left .2s ease-out;
}

.control {
  position: absolute;
  top: 50%;
  width: 24px;
  height: 24px;
  margin-top: -10px;
  z-index: 2;
}

.prev,
.next {
  background-size: 12px;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
}

.prev {

  left: -20px;
  transform: rotate(180deg);
}

.next {
  right: -20px;
}

/* dropdown list*/
.chart_page_dropdown .map span.custom-select-trigger {
  padding-left: 10px;
}

.chart_page_dropdown .input-select .input-icon {
  left: auto;
}

.chart_page_dropdown .input-select .arrow-down {
  position: absolute;
  left: auto;
  z-index: 99;
  top: 50%;
  transform: translateY(-50%);
  right: 0px;
  transition: .3s;
}

.chart_page_dropdown .input-select .opened+.arrow-down {
  transform: translateY(-50%) rotate(180deg);
}

.chart_page_dropdown .custom-select-trigger {
  width: 100%;
  font-weight: 700;
  background: transparent;
  border-radius: 0;
  cursor: pointer;
  border-color: transparent !important;
  border: 0px solid;
  height: auto;
  align-items: center;
  padding-left: 10px;
  padding-right: 20px;
  color: #669E97;
  font-size: 28px;
  line-height: 1.2;
}

.chart_page_dropdown h1 {
  font-size: 19px;
  margin-bottom: 10px;
}

.chat_page .card-content h4 {
  margin-bottom: 0px;
  color: #000;
}

.chat_page .card-content span.mel_count {
  font-size: 40px;
  font-weight: 700;
  margin-right: 10px;
  color: #000;
}

.chat_page .card-content span.mel_parc {
  font-size: 14px;
  color: #A90C0C;
  background-color: rgba(209, 24, 24, 0.2);
  padding: 2px 10px;
  border-radius: 50px;
}


@media (max-width: 767px) {
  .chart_page_dropdown h1 {
    font-size: 19px;
    margin-bottom: 18px;
  }

  .chart_page_dropdown .custom-select-trigger {
    font-size: 20px;
  }

  .chat_page .card-content h4 {
    font-size: 20px;
  }
  .col-md-6 .card-content, .col-md-12 .card-content {
    padding: 0px;
}
}
@media(max-width : 550px){
  .emergency_next{
    display:block
  }
}
</style>