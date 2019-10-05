<template>
    <div>
      <v-app-bar>
      <v-toolbar-title class="headline text-uppercase">
        <span>Warzazat :</span>
        <span class="font-weight-light">Test de Q.I.</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-on:click="logout">
        <span >Logout</span>
      </v-btn>
    </v-app-bar>

        <v-container v-if="connexion">
          <v-text-field v-model="username" label="Username" required></v-text-field>
          <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
          
          <v-btn v-on:click="login" color="light-blue" dark>Connexion</v-btn>
          <v-btn v-on:click="addLog">Inscription</v-btn>
          <p>{{message}}</p>
        </v-container>

      <v-container v-if="connecte">
                  <h1>BIENVENUE {{username}} </h1>
                  <p> Votre score est de {{hscore}}</p>
                  <div>
                    <li v-for="(sc, s) in tabHscore" :key="s">
                      {{ sc.highscore }}
                    </li>
                  </div>
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
    </div>

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
    tabHscore: [{ highscore: 0 }],
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
        this.tabHscore.push({
          highscore: this.score
        })
        this.test = false
        this.connecte = true
        this.newHScore()
      }
    }
  }
}
</script>
