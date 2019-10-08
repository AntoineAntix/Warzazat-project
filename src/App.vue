<template color="black">
  <v-app style="background: url(https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg )">

    <v-content>
      <Test/>
    </v-content>
     <v-layout class="align-end">
            <span :class="`d-flex justify-start`"> Made by LUCAS Antoine & MESSET Mathieu</span>
            <v-spacer></v-spacer>
            <span :class="`d-flex justify-end`"><v-img src="./components/Img/logo-ESIEA.jpg" max-width="172" max-height="90"> </v-img></span>
        </v-layout>
  </v-app>
</template>

<script>
import Test from './components/Test'

export default {
  name: 'App',
  components: {
    Test
  },
  data: () => ({
    //
  })
}
</script>
