<template>
    <section>
        <Header />
        <main class="main-content bg-lightgrey">



            <div class="page-content my-account login sec-padding">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="my-acc-sec text-center">
                                <h2>Verander wachtwoord
                                </h2>
                                <div
                                    class="my-acc-form form-area contact-box box-shadow border-radius bg-white-gray text-left">

                                    <form @submit.prevent="reset">
                                        <div class="form-group">
                                            <input v-model="form.password" class="form-control" name="email"
                                                placeholder="wachtwoord" required type="password" autocomplete="off">
                                        </div>
                                        <div class="form-group">
                                            <input v-model="form.confirmPassword" class="form-control" name="email"
                                                placeholder="bevestig wachtwoord" required type="password"
                                                autocomplete="off">
                                        </div>


                                        <div class="btn-group">
                                            <button class="button btn-submit btn-full mt-10" type="submit"><span
                                                    :class="isLoading ? 'rolling-spin' : ' '"></span> Verander
                                                wachtwoord</button>



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
    title: '112 Meldingen.nl - Password Reset',
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
import { checkTTL } from '../middlewares/tokenCheck'

export default {
    data() {
        return {
            form: {
                password: '',
                confirmPassword: '',
            },
            isLoading: false,
            token: null,
        }
    },
    created() {
        if (typeof window !== 'undefined') {
            const route = useRoute();

            this.token = route.query.token;

            if (!checkTTL(this.token)) {
                const { $swal } = useNuxtApp()
                $swal.fire({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    icon: 'error',
                    text: 'Token Expired !! Request a new one',
                })
                setTimeout(() => {
                    this.$router.push('/login')
                }, 1000);

            }


        }

    },

    methods: {
        reset() {
            if (this.form.password !== this.form.confirmPassword) {
                const { $swal } = useNuxtApp()
                $swal.fire({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    icon: 'error',
                    text: 'Confirm password doesnot matched',
                })
            } else {
                const route = useRoute();
                const formData = {
                    email: route.query.email,
                    token: route.query.token,
                    password: this.form.password
                }

                this.isLoading = true;
                axios.post(`${apiUrl}/user/resetPassword`, formData)
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
                        this.$router.push('/login')


                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
        }

    }

}


</script>
  
<style scoped>

</style>