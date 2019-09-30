<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Warzazat :</span>
        <span class="font-weight-light">Test de Q.I.</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        text
        href="./src/components/Connexion">
        <span >Connexion</span>
      </v-btn>
    </v-app-bar>

    <v-content>
      <Test/>
    </v-content>
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
