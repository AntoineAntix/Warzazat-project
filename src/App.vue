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
        href="./Connexion">
        <span >Connexion</span>
      </v-btn>
    </v-app-bar>

    <v-content>
      <Connexion/>
    </v-content>
  </v-app>
</template>

<script>
import Connexion from './components/Connexion'

export default {
  name: 'App',
  components: {
    Connexion
  },
  data: () => ({
    //
  })
}
</script>
