<template>
  <div>
    <Header />

    <main class="main-content bg-dark-white">
      <!-- / page content-->
      <div class="header_bellow_bg"></div>
      <section class="page-content contact-page sec-padding">

        <div class="container">
          <div class="contact-form box-shadow border-radius-8">
            <div class="row">

              <div class="col-md-6 ">
                <div class="text-left">
                  <h2>Contactformulier</h2>
                  <p>Meldingen.nl helpt u graag. Via onderstaand formulier kunt u contact met ons opnemen. Indien nodig
                    zullen wij uw mail zo snel mogelijk beantwoorden.</p>

                  <h4>Of bereik ons via:</h4>
                  <ul class="social dark-white white-dark d-block">
                    <li><a href=""><span class="icon-Instagram"></span> <span class="text">Instagram
                          (@meldingen.nl)</span></a></li>
                    <li><a href=""><span class="icon-twitter"><span class="path1"></span><span
                            class="path2"></span></span> <span class="text">Twitter (@meldingen.nl)</span></a></li>
                    <li><a href=""><span class="icon-facebook"><span class="path1"></span><span
                            class="path2"></span></span><span class="text"> Facebook (meldingen.nl)</span></a></li>

                  </ul>

                </div>
              </div>
              <div class="col-md-6 box-shadow border-radius-8">
                <form @submit.prevent="sendMessage" style="padding-top: 20px;">

                  <div class="form-group">
                    <input type="text" placeholder="Naam" name="name" v-model="formData.name" class="form-control"
                      required>
                  </div>



                  <div class="form-group">
                    <input type="email" name="email" placeholder="E-mail" v-model="formData.email" class="form-control"
                      required>
                  </div>

                  <div class="form-group">
                    <textarea v-model="formData.message" placeholder="Bericht"></textarea>

                  </div>
                  <button type="submit" class="button " style="margin-top: 5px;width:100%;margin-bottom: 8px;"> <span
                      :class="isLoading ? 'rolling-spin' : ' '"></span> Verzend mijn bericht</button>
                </form>
              </div>

            </div>

          </div>
        </div>
      </section>
      <!-- / page content-->
    </main>
    <Footer />
  </div>

</template>

<script setup>
const config = useRuntimeConfig();

apiUrl = config.public.api;
backend = config.public.backend;
useHead({
  titleTemplate: ` 112 Meldingen.nl - Contact`,

})



</script>


<script>
let apiUrl;
let backend;
import axios from "axios";

export default {
  name: "Contact",
  data() {
    return {
      formData: {
        name: '',
        email: '',
        message: ''
      },
      isLoading: false,
    }
  },

  methods: {
    sendMessage() {
      this.isLoading = true;
      axios.post(`${apiUrl}/contact`, this.formData)
        .then((response) => {
          this.isLoading = false;
          const { $swal } = useNuxtApp()
          $swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            icon: 'success',
            text: response.data,
          });
          this.formData = {
            name: '',
            email: '',
            message: ''
          }
        })
        .catch((error) => {
          const { $swal } = useNuxtApp()
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>

</style>