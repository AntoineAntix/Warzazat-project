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
                <v-col cols="12" md="4">
                  <h1>BIENVENUE {{username}} </h1>
                  <div> Votre score est de {{score}}</div>

                  <v-btn v-on:click="test">Lancer le test</v-btn>
                </v-col>
      </v-container>

      </v-form>
    </v-layout>
    </v-content>
</template>

<script>

export default {
  data: () => ({
    connexion: true,
    connecte: false,
    username: '',
    password: '',
    message: '',
    score: 0
  }),
  methods: {
    login () {
      // connecter l'utilisateur
      this.axios.post('http://localhost:4000/api/login', {
        login: this.username,
        password: this.password
      })
        .then(jsondata => {
          this.message = jsondata.data.message
          if (jsondata.data.message === 'connected') {
            this.connexion = false
            this.connecte = true
          }
        })
    },
    addLog () {
      this.axios.post('http://localhost:4000/api/addLog', {
        login: this.username,
        password: this.password
      })
        .then(jsondata => { this.message = jsondata.data.message })
    },
    logout () {
    }
  }
}
</script>
