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
              <p> {{ score }} </p>
                  <div v-if="index >= 0">
                    <span style="bold"> Question {{ index + 1 }}:</span>
                    <br>
                    <span> {{ questions[index].title }}</span>
                    <br>
                    <v-radio-group v-model="radioGroup">
                      <v-radio v-for="(item, i) in questions[index].prop" :key="i" :label="item">  </v-radio><br>
                    </v-radio-group>

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
    radioGroup: null,
    connexion: true,
    connecte: false,
    test: false,
    username: '',
    password: '',
    message: '',
    hscore: 0,
    index: 0,
    questions: [
      { title: 'Combien font 2 + 2 ?', prop: ['2 au carré', '2', 'ta mère'], answer: 0 },
      { title: 'Comment je vais ?', prop: ['Bien', 'Pas bien'], answer: 0 },
      { title: 'Combien de vêtments portez-vous ?', prop: ['10', '5', '0'], answer: 2 },
      { title: 'Alexandre Biau est-il homosexuel ?', prop: ['Oui', 'Non'], answer: 0 },
      { title: 'Comment me trouvez vous ?', prop: ['Moche', 'Le plus beau', 'Etes-vous réel ?'], answer: 2 },
      { title: 'Paris ou Marseille ?', prop: ['Paris', 'Marseille'], answer: 1 },
      { title: 'Quelle est la taille du nez de Messet ?', prop: ['5 cm', 'La meme taille que son sexe', '1 mètre'], answer: 1 }
    ],
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
      this.score = 0
    },
    nextQ () {
      if (this.questions[this.index].answer === this.radioGroup) {
        this.score++
      }
      this.index++
      this.radioGroup = null
      if (this.index >= Object.keys(this.questions).length) {
        this.index = 0
        this.test = false
        this.connecte = true
      }
    }
  }
}
</script>
