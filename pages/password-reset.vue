<template>
    <section>
        <Header />
        <main class="main-content bg-lightgrey">



            <div class="page-content my-account login sec-padding">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="my-acc-sec text-center">
                                <h2>Wachtwoord vergeten
                                </h2>
                                <div
                                    class="my-acc-form form-area contact-box box-shadow border-radius bg-white-gray text-left">
                                    <p>Wachtwoord vergeten? Vervelend, maar geen probleem! Vul hier het e-mailadres in
                                        wat je gebruikt
                                        voor je account en we sturen daar een herstelwachtwoord heen!
                                    </p>
                                    <form @submit.prevent="reset">
                                        <div class="form-group">
                                            <input v-model="form.email" class="form-control" name="email"
                                                placeholder="E-mail adres" required type="email" autocomplete="off">
                                        </div>


                                        <div class="btn-group">
                                            <button class="button btn-submit btn-full mt-10" type="submit"><span :class="isLoading ? 'rolling-spin':' '"></span> Wachtwoord
                                                  herstellen</button>



                                        </div>
                                    </form>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <Footer />
    </section>
</template>
<script setup>
const config = useRuntimeConfig();
apiUrl = config.public.api;

let siteData = reactive({
    title: 'Password Reset',
    description: 'Password Reset Form',
    keywords: ''
});

useHead({
    link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
    ],
    title: () => siteData.title,
    meta: [
        { name: 'description', content: () => siteData.description },
        { name: 'keywords', content: () => siteData.keywords },
        {
            property: "og:title",
            content: () => siteData.title,
        },
        {
            property: "og:description",
            content: () => siteData.description,
        },
        {
            property: "twitter:title",
            content: () => siteData.title,
        },
        {
            property: "twitter:description",
            content: () => siteData.description,
        },

    ]
})
</script>
  
<script>
let apiUrl;
import axios from 'axios';

export default {
    data() {
        return {
            form: {
                email: ''
            },
            isLoading : false,
        }
    },
    methods: {
        reset() {
           this.isLoading = true;
            axios.post(`${apiUrl}/user/forgotPassword`, this.form)
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
                    })
                })
                .catch((error) => {
                    this.isLoading = false;
                    const { $swal } = useNuxtApp()
                    $swal.fire({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        icon: 'error',
                        text: error.response.data,
                    })
                })
        }
    }

}


</script>
  
<style scoped>

</style>