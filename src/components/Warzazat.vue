<template>
    <div>
      <v-app style="background: url(https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg )">
      <v-navigation-drawer fixed clipped v-model="drawer" v-if="connexion === false && test === false && drawerbar" app>
        <v-layout align-content-space-around justify-center>
        <v-icon x-large>person</v-icon>
        <span>
        <h1> {{username}} </h1>
        <p> High Score : {{hscore}} </p>
        </span>
        </v-layout>
        <v-flex class="text-center">
        <v-btn color="light-blue" v-on:click="showInformation" rounded>Voir Info. </v-btn>
        </v-flex>
        <v-divider dark class="my-3"></v-divider>
        <v-flex align-content-space-around>

        <v-btn text block v-on:click="homeReturn">
          <v-icon>home</v-icon>
          Accueil
        </v-btn>
        <v-divider dark class="my-3"></v-divider>

        <v-btn text block v-on:click="showClassement">
          <v-icon>liste</v-icon> Voir classement
        </v-btn>
        <v-divider dark class="my-3"></v-divider>

         <v-btn text block v-on:click="showHistory">
          <v-icon>history</v-icon> Historique partie
        </v-btn>
        <v-divider dark class="my-3"></v-divider>

        <br> <br> <br>
          <v-btn v-on:click="removeLog" color="red" block rounded> Supprimer le compte </v-btn>
        </v-flex>
      </v-navigation-drawer>

      <v-toolbar dense fixed clipped-left app max-height="50">
        <v-app-bar-nav-icon v-if="connexion === false && test === false" @click.stop="drawerbar=!drawerbar"></v-app-bar-nav-icon>
      <v-toolbar-title class="headline text-uppercase">
        <span>Warzazat :</span>
        <span class="font-weight-light">Test de Warzatitude.</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="connexion === false" v-on:click="homeReturn" rounded>
        <v-icon>home</v-icon>
      </v-btn>
      <v-btn v-if="connexion === false" v-on:click="logout" color="light-blue" rounded>
        <span >Déconnexion</span>
      </v-btn>
      </v-toolbar>

    <v-content>
      <v-container text-center v-if="connexion" class="align-center">
        <br> <br> <br>
        <v-card class="mx-auto" width="300" max-height="550" min-height="300" elevation="20">
        <v-row justify="center">
            <div v-if="inscription === false">
          <v-text-field prepend-icon="person" v-model="username" label="Username" required></v-text-field>
          <v-text-field prepend-icon="lock" v-model="password" label="Password" type="password" required ></v-text-field>
            </div>
          <div v-if="inscription">
          <v-text-field prepend-icon="assignment" v-model="nom" label="Nom" required :rules='loginRules'></v-text-field>
          <v-text-field prepend-icon="assignment" v-model="prenom" label="Prenom" required :rules='loginRules'></v-text-field>
          <v-text-field prepend-icon="person" v-model="username" label="Username" required :rules='loginRules'></v-text-field>
          <v-text-field prepend-icon="lock" v-model="password" label="Password" type="password" required :rules='loginRules'></v-text-field>
            </div>
        </v-row>
          <br>
          <v-btn v-if="inscription === false" v-on:click="login" color="light-blue" rounded>Connexion</v-btn>
          <v-btn v-if="inscription === false" @click.stop="inscription=!inscription" rounded>Inscription</v-btn>
          <v-btn v-if="inscription" @click.stop="addLog" rounded>Inscription</v-btn>
          <p>{{message}}</p>
        </v-card>
      </v-container>

      <v-container text-center v-if="connecte" class="justify-center">
                  <h1>BIENVENUE {{username}} </h1>
                  <p> Votre Meilleur Score est de {{hscore}}</p>

                  <v-card class="mx-auto" max-width="1000" outlined>
                    <v-layout class="align-center">
                        <v-flex min-width="300">
                  <v-card-text>
                    <span> Liste des scores :</span> <br>
                      <span v-for="(item,s) in tabHscore" :key="s">
                         {{ item }} <br>
                      </span>
                  </v-card-text>
                      </v-flex>
                   <v-card-text>
                       <v-sheet color="rgba(0, 0, 0, .12)" v-if="tabHscore.length > 1">
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
                        <span v-if="tabHscore.length === 0" > Veuillez faire 2 tests pour voir votre courbe de progression </span>
                        <span v-if="tabHscore.length === 1" > Veuillez faire 1 tests pour voir votre courbe de progression </span>
                    </v-card-text>
                    </v-layout>
                  </v-card>

                  <br><br>
                  <v-btn v-on:click="lancementTest" color="orange" rounded>Lancer le test</v-btn>
      </v-container>

      <v-container v-if="test">
        <v-row justify="center">
              <p>Score actuel : {{ score }} </p>
        </v-row>
              <br>
              <v-row justify="center">
                  <div v-if="index >= 0">
                    <span style="bold"> Question {{ index + 1 }}:</span>
                    <br>
                    <span> {{ questions[index].title }}</span>
                    <br>
                    <v-radio-group v-model="radioGroup">
                      <v-radio v-for="(item, i) in questions[index].prop" :key="i" :label="item">  </v-radio><br>
                    </v-radio-group>
                  </div>
                  </v-row>
                  <br>
                  <v-row justify="end">
                    <v-btn v-if="(index+1) < questions.length" v-on:click="nextQ" color="light-blue" rounded>Question suivante</v-btn>
                    <v-btn v-if="(index+1) === questions.length" v-on:click="nextQ" color="orange" rounded>Fin du test</v-btn>
                  </v-row>
      </v-container>

      <v-container v-if="classement">
        <v-card class="mx-auto" max-width="500" outlined>
          <v-card-text>
            <span v-for="(item, i) in tabrank" :key="i">
              <v-layout align-content-space-around>
                  <h3> {{item.username}} </h3>
                  <v-spacer></v-spacer>
                  <h3> Rang: {{item.rank}} </h3>
              </v-layout>
                <br>
                <span>  High score: {{ item.hscore }} points </span>
              <br>
              <v-divider dark class="my-3"></v-divider>
              <br>
              </span>
          </v-card-text>
        </v-card>
      </v-container>

      <v-container v-if="history">
        <v-layout align-content-space-around v-if="correction === false">
          <span v-if="partieJouer === 0"> L'historique est vide tant que vous ne finissez pas une partie </span>
          <span v-for="(item, i) in partieJouer" :key="i" :label="item">
            <v-btn v-on:click="startCorrection(i)"> partie {{i+1}} </v-btn>
          </span>
        </v-layout>
        <v-row justify="center" v-if="correction">
                  <div v-if="index >= 0">
                    <span style="bold"> Question {{ index + 1 }}:</span>
                    <br>
                    <span> {{ questions[index].title }}</span>
                    <br>
                    <span> Votre réponse est : {{ questions[index].prop[indexRep] }}</span>
                    <br> <br>
                    <v-card class="mx-auto" max-width="200" outlined>
                      <v-card-text>
                        <span v-if="grep" style="color:green"> Bonne Réponse </span>
                        <span v-if="grep === false" style="color:red"> Mauvaise Réponse </span>
                      </v-card-text>
                    </v-card>
                    <br> <br>
                    <v-btn v-if="(index+1) < questions.length" v-on:click="nextQ" color="light-blue" rounded>Question suivante</v-btn>
                    <v-btn v-if="(index+1) === questions.length" v-on:click="nextQ" color="orange" rounded>Fin du test</v-btn>
                    </div>
                  </v-row>
      </v-container>

      <v-container v-if="information">
        <v-card class="mx-auto" max-width="500" outlined>
          <v-card-text>
            <v-row justify="center" align-content-space-around>
              <div>
              <v-icon x-large>person</v-icon>
              <br>
            <h3> Nom : {{nom}} </h3> <v-spacer></v-spacer> <h3> Prenom : {{prenom}}</h3>
            <br>
            <h3> Username : {{username}}</h3> <v-spacer></v-spacer> <h3> Rang : {{rank}}</h3>
            <br>
            <h3> High Score : {{hscore}}</h3> <v-spacer></v-spacer> <h3> Partie Jouée : {{partieJouer}}</h3>
              </div>
            </v-row>
          </v-card-text>
        </v-card>
      </v-container>

    </v-content>

    <v-layout class="align-end">
            <span :class="`d-flex justify-start`"> Made by LUCAS Antoine & MESSET Mathieu</span>
            <v-spacer></v-spacer>
            <span :class="`d-flex justify-end`"><v-img src="./Img/logo-ESIEA.jpg" max-width="172" max-height="90"> </v-img></span>
    </v-layout>

      </v-app>
    </div>
</template>

<script>

export default {
  data: () => ({
    url: '', // http://localhost:4000',
    loginRules: [v => !!v || 'The input is required'],

    drawerbar: false,
    radioGroup: null,
    connexion: true,
    connecte: false,
    test: false,
    classement: false,
    history: false,
    correction: false,
    information: false,
    inscription: false,

    username: '',
    password: '',
    nom: '',
    prenom: '',
    hscore: 0,
    tabHscore: [],
    partieJouer: 0,
    historique: [],
    rank: 0,

    questions: [
      { title: 'Combien font 2 + 2 ?', prop: ['2 au carré', '2', 'Bonjour'] },
      { title: 'Comment je vais ?', prop: ['Bien', 'Pas bien'] },
      { title: "Combien de jours d'anniversaires a une personne qui a vécu 50 ans ", prop: ['0 anniversaire', '1 anniversaire', '25 anniversaires', '50 anniversaires', '49 anniversaires'] },
      { title: "Certains mois de l'année comptent 31 jours. Combien en ont 28 ?", prop: ['Aucun', '1 mois', '6 mois', '12 mois'] },
      { title: "Monsieur et Madame Doeuf on un fils, comment s'appelle-t-il?", prop: ['John', 'Donald', 'Mathieu'] },
      { title: 'Paris ou Marseille ?', prop: ['Paris', 'Marseille'] },
      { title: 'Je ne vole pas, je me transforme, je vole, qui suis-je ?', prop: ['un lapin', 'une chenille', 'un oeuf'] }
    ],

    message: '',
    index: 0,
    indexCorrection: 0,
    indexRep: 0,
    repQ: [],
    grep: false,
    tabrank: [{
      username: '',
      hscore: 0,
      rank: 0
    }],
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
      if (this.message === 'Connecté') {
        this.connexion = false
        this.connecte = true
        this.hscore = response.data.score
        this.tabHscore = response.data.tabHscore
        this.partieJouer = response.data.partieJouer
        this.historique = response.data.historique
      }
    },
    async addLog () {
      if (this.username !== '' && this.password !== '' && this.nom !== '' && this.prenom !== '') {
        const response = await this.axios.post(this.url + '/api/addLog', {
          login: this.username,
          password: this.password,
          nom: this.nom,
          prenom: this.prenom
        })
        this.message = response.data.message
        if (this.message === 'Utilisateur créé avec succés') {
          this.inscription = false
        }
      } else { this.message = 'Veuillez remplir tous les champs' }
    },
    async logout () {
      const response = await this.axios.post(this.url + '/api/logout', {
      })
      this.message = response.data.message
      if (this.message === 'Déconnecté') {
        this.test = false
        this.connecte = false
        this.connexion = true
        this.classement = false
        this.history = false
        this.correction = false
        this.information = false
        this.drawerbar = false
      }
    },

    async removeLog () {
      var validationSuppr = window.confirm('Toutes vos données vont être supprimées de manière définitive. \n Voulez vous suprimer votre compte ? ')
      if (validationSuppr) {
        const response = await this.axios.post(this.url + '/api/removeLog', {
          login: this.username,
          password: this.password
        })
        this.message = response.data.message
        if (this.message === 'Compte Supprimé') {
          this.test = false
          this.connecte = false
          this.connexion = true
          this.classement = false
          this.history = false
          this.information = false
          this.drawerbar = false
        }
      }
    },

    async newHScore () {
      const response = await this.axios.post(this.url + '/api/newHscore', {
        login: this.username,
        password: this.password,
        hscore: this.hscore,
        tabHscore: this.tabHscore,
        partieJouer: this.partieJouer,
        historique: this.historique
      })
      await this.axios.post(this.url + '/api/rankClassement', {
      })
      this.tabrank = response.data.tabrank
      this.rank = response.data.rank
      console.log(response)
    },

    async nextQ () {
      if (this.test === true) {
        const response = await this.axios.post(this.url + '/api/nextQ', {
          index: this.index,
          rep: this.radioGroup
        })
        if (response.data.message === 'good') { this.score++ } else { console.log('wrong answer') }

        this.index++
        if (this.radioGroup != null) { this.historique.push(this.radioGroup) }
        if (this.radioGroup === null) { this.historique.push(null) }
        this.radioGroup = null
        if (this.index >= Object.keys(this.questions).length) {
          this.index = 0
          if (this.hscore < this.score) {
            this.hscore = this.score
          }
          this.partieJouer++
          this.tabHscore.push(this.score)
          this.test = false
          this.connecte = true
          this.newHScore()
        }
      }
      if (this.correction === true) {
        this.indexCorrection++
        this.index++
        this.indexRep = this.historique[this.indexCorrection]
        if (this.index >= Object.keys(this.questions).length) {
          this.indexCorrection = 0
          this.indexRep = 0
          this.index = 0
          this.correction = false
        }
        const response = await this.axios.post(this.url + '/api/nextQ', {
          index: this.index,
          rep: this.indexRep
        })
        if (response.data.message === 'good') { this.grep = true } else { this.grep = false }
      }
    },
    async startCorrection (i) {
      this.drawerbar = false
      this.correction = true
      this.indexCorrection = i * 7
      this.indexRep = this.historique[this.indexCorrection]
      const response = await this.axios.post(this.url + '/api/nextQ', {
        index: this.index,
        rep: this.indexRep
      })
      if (response.data.message === 'good') { this.grep = true } else { this.grep = false }
    },
    async showClassement () {
      this.drawerbar = false
      this.connecte = false
      this.classement = true
      this.history = false
      this.correction = false
      this.information = false
      const response = await this.axios.post(this.url + '/api/rankClassement', {
      })
      this.tabrank = response.data.tabrank
      this.rank = response.data.rank
    },
    async showInformation () {
      this.drawerbar = false
      this.connecte = false
      this.history = false
      this.classement = false
      this.correction = false
      this.information = true
      const response = await this.axios.post(this.url + '/api/showInf', {
        login: this.username,
        password: this.password
      })
      this.nom = response.data.nom
      this.prenom = response.data.prenom
      this.rank = response.data.rank
      this.username = response.data.username
      this.hscore = response.data.hscore
      this.partieJouer = response.data.partieJouer
    },

    lancementTest () {
      this.connecte = false
      this.test = true
      this.score = 0
      this.index = 0
    },
    homeReturn () {
      this.drawerbar = false
      this.connecte = true
      this.connexion = false
      this.classement = false
      this.history = false
      this.test = false
      this.correction = false
      this.information = false
    },
    showHistory () {
      this.drawerbar = false
      this.connecte = false
      this.history = true
      this.classement = false
      this.correction = false
      this.information = false
    }
  }
}
</script>
