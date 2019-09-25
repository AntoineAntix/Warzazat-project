<template>
  <v-container>
    <v-layout text-center wrap>
      <v-form v-model="valid">
        <v-container>
            <v-col cols="12" md="4">
              <v-text>BIENVENUE</v-text>
            </v-col>
        </v-container>
      </v-form>
    </v-layout>
  </v-container>
</template>

<script>

export default {
  data: () => ({
    valid: false,
    name: '',
    description: '',
    todos: []
  }),
  methods: {
  }
}
</script>
