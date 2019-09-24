<template>
  <v-container>
    <v-layout text-center wrap>
      <v-form v-model="valid">
        <v-container>
          <v-row>

          </v-row>
        </v-container>
      </v-form>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({valid: false,
    name: '',
    description: '',
    todos: []
  }),
  methods: {
    login () {
      // connecter l'utilisateur
      this.axios.post('http://localhost:4000/api/login', {
        data: {
          login: 'louis',
          password: 'truc'
        }
      })
        .then(jsondata => console.log('response is:', jsondata))
    },
    logout () {
    },
    addElement () {
      this.todos.push({
        id: this.todos.length,
        name: this.name,
        description: this.description
      })
      console.log('ajouté !')
    },
    rmElement (index) {
      console.log('index', index)
      this.todos.splice(index, 1)
    }
  }
}

</script>
