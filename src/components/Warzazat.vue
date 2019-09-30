<template>
    <v-content>
      <v-layout text-center wrap>
      <v-form v-model="valid">

        <v-container v-if="connexion">
          <v-text-field v-model="username" label="Username" required></v-text-field>
          <v-text-field v-model="password" label="Password" type="password" required></v-text-field>

          <v-btn v-on:click="login">Connexion</v-btn>
          <v-btn v-on:click="addLog">Inscription</v-btn>
          <p>{{message}}</p>
        </v-container>

      <v-container v-if="connecte">
                  <h1>BIENVENUE {{username}} </h1>
                  <div> Votre score est de {{score}}</div>

                  <v-btn v-on:click="lancementTest">Lancer le test</v-btn>
      </v-container>

      <v-container v-if="test">
                  <div v-if="index === 1">
                    <span style="bold"> Question 1:</span>
                    <br>
                    <span> Combien font 2 + 2 ?</span>
                    <br>
                    <input type="radio">2 au carre <br>
                    <input type="radio">2 <br>
                    <input type="radio">ta mère <br>
                    <v-btn v-on:click="nextQ">Question suivante</v-btn>
                  </div>
                  <div v-if="index === 2">
                    <span style="bold"> Question 2:</span>
                    <br>
                    <span> Comment je vais ?</span>
                    <br>
                    <input type="radio"> Bien <br>
                    <input type="radio">Pas bien <br>
                    <v-btn v-on:click="nextQ">Question suivante</v-btn>
                  </div>
      </v-container>

      </v-form>
    </v-layout>
    </v-content>
</template>

<script>

export default {
  data: () => ({
    url: 'http://localhost:4000',
    connexion: true,
    connecte: false,
    test: false,
    username: '',
    password: '',
    message: '',
    index: 1,
    score: 0
  }),
  methods: {
    async login () {
      // connecter l'utilisateur
      const response = await this.axios.post(this.url + '/api/login', {
        login: this.username,
        password: this.password
      })
      this.message = response.data.message
      if (this.message === 'connected') {
        this.connexion = false
        this.connecte = true
      }
    },
    async addLog () {
      const response = await this.axios.post(this.url + '/api/addLog', {
        login: this.username,
        password: this.password
      })
      this.message = response.data.message
    },
    logout () {
    },
    lancementTest () {
      this.connecte = false
      this.test = true
    },
    nextQ () {
      this.index = this.index + 1
    }
  }
}
</script>
