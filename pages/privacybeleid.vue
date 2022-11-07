<template>
  <div>
    <Header />
    <main class="main-content bg-lightgrey">
      <section class="page-content details-page plant-text sec-padding" >
        <div class="container">
          <h1>{{details.details.title}}</h1>

          <div v-html="details.details.content">

          </div>

        </div>
      </section>
    </main>

    <Footer />
  </div>
</template>

<script setup>

const config = useRuntimeConfig();
let apiUrl = config.public.api;

const {data : details,pending,refresh} = await useAsyncData('get_privacy', () => $fetch(`${apiUrl}/common/privacy`));
onMounted(() => {
  refreshNuxtData('get_privacy');
});

useHead({
  titleTemplate: ` ${details.value.seo.title}`,
  script: [{children: `${details.value.seo.structured_data}`}],
  meta: [
    {name: 'description', content: `${details.value.seo.seo_meta}`},
    {name: 'keywords', content: `${details.value.seo.seo_keywords}`},
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  ],
})

</script>

<script>


export default {
  name: "cookiebeleid",

}
</script>

<style scoped>

</style>