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
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
        <span class="mr-2">Connexion</span>
      </v-btn>
    </v-app-bar>

    <v-content>
      <HelloWorld/>
    </v-content>
  </v-app>
</template>

<script>
import Warzazat from './components/Warzazat'

export default {
  name: 'App',
  components: {
    Warzazat
  },
  data: () => ({
    //
  })
}
</script>
