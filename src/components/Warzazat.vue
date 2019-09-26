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
                  <div>
                    <span style="bold"> Question 1:</span>
                    </div>
                  <div> Votre score est de {{score}}</div>
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
    }
  }
}
</script>
