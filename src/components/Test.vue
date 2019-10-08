<template>
    <v-container>
      <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Warzazat :</span>
        <span class="font-weight-light">Test de Q.I.</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="connexion === false" v-on:click="logout" color="light-blue" rounded>
        <span >Logout</span>
      </v-btn>
    </v-app-bar>

    <v-content >
      <v-container text-center v-if="connexion" class="align-center">
        <v-card class="mx-auto" width="300" height="300" elevation="20">
        <v-row justify="center">
            <div>
          <v-text-field v-model="username" label="Username" required ></v-text-field>
          <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
            </div>
        </v-row>
          <br><br>
          <v-btn v-on:click="login" color="light-blue" rounded>Connexion</v-btn>
          <v-btn v-on:click="addLog" rounded>Inscription</v-btn>
          <p>{{message}}</p>
        </v-card>
      </v-container>

      <v-container text-center v-if="connecte" >
                  <h1>BIENVENUE {{username}} </h1>
                  <p> Votre score est de {{hscore}}</p>

                  <v-card class="mx-auto" max-width="1000" outlined>
                    <v-layout class="align-center">
                      <v-flex min-width="300">
                  <v-card-text>
                      <li v-for="score in tabHscore" :key="score">
                        {{ tabHscore[score] }}
                      </li>
                  </v-card-text>
                      </v-flex>
                   <v-card-text>
                       <v-sheet color="rgba(0, 0, 0, .12)">
                          <v-sparkline :value="tabHscore"
                          color="rgba(0, 255, 255, .7)"
                          width="500"
                          height="100"
                          padding="24"
                          stroke-linecap="round"
                          smooth>
                          <template v-slot:label="item">
                                   {{ item.value }} points
                           </template></v-sparkline>
                        </v-sheet>
                    </v-card-text>
                    </v-layout>
                  </v-card>

                  <br><br>
                  <v-btn v-on:click="lancementTest" color="orange" rounded>Lancer le test</v-btn>
      </v-container>

      <v-container v-if="test">
              <p>Score actuel : {{ score }} </p>
                  <div v-if="index >= 0">
                    <span style="bold"> Question {{ index + 1 }}:</span>
                    <br>
                    <span> {{ questions[index].title }}</span>
                    <br>
                    <v-row justify="center">
                    <v-radio-group v-model="radioGroup">
                      <v-radio v-for="(item, i) in questions[index].prop" :key="i" :label="item">  </v-radio><br>
                    </v-radio-group>
                    </v-row>

                    <v-btn v-on:click="nextQ" color="light-blue" rounded>Question suivante</v-btn>
                  </div>
      </v-container>
    </v-content>

    </v-container>
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
    tabHscore: [0],
    questions: [
      { title: 'Combien font 2 + 2 ?', prop: ['2 au carré', '2', 'Bonjour'], answer: 0 },
      { title: 'Comment je vais ?', prop: ['Bien', 'Pas bien'], answer: 0 },
      { title: "Combien de jours d'anniversaires a une personne qui a vécu 50 ans ", prop: ['0 anniversaire', '1 anniversaire', '25 anniversaires', '50 anniversaires', '49 anniversaires'], answer: 3 },
      { title: "Certains mois de l'année comptent 31 jours. Combien en ont 28 ?", prop: ['Aucun', '1 mois', '6 mois', '12 mois'], answer: 3 },
      { title: "Monsieur et Madame Doeuf on un fils, comment s'appelle-t-il?", prop: ['John', 'Donald', 'Mathieu'], answer: 0 },
      { title: 'Paris ou Marseille ?', prop: ['Paris', 'Marseille'], answer: 1 },
      { title: 'Je ne vole pas, je me transforme, je vole, qui suis-je ?', prop: ['un lapin', 'une chenille', 'un oeuf'], answer: 1 }
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
        this.hscore = response.data.score
        this.tabHscore = response.data.tabHscore
      }
    },
    async addLog () {
      const response = await this.axios.post(this.url + '/api/addLog', {
        login: this.username,
        password: this.password
      })
      this.message = response.data.message
    },
    async logout () {
      const response = await this.axios.post(this.url + '/api/logout', {
      })
      this.message = response.data.message
      if (this.message === 'disconnected') {
        this.test = false
        this.connecte = false
        this.connexion = true
      }
    },

    async newHScore () {
      await this.axios.post(this.url + '/api/newHscore', {
        login: this.username,
        password: this.password,
        hscore: this.hscore,
        tabHscore: this.tabHscore
      })
    },

    lancementTest () {
      this.connecte = false
      this.test = true
      this.score = 0
      this.index = 0
    },

    nextQ () {
      if (this.questions[this.index].answer === this.radioGroup) { this.score++ }
      this.index++
      this.radioGroup = null
      if (this.index >= Object.keys(this.questions).length) {
        this.index = 0
        if (this.hscore < this.score) {
          this.hscore = this.score
        }
        this.tabHscore.push(this.score)
        this.test = false
        this.connecte = true
        this.newHScore()
      }
    }
  }
}
</script>
