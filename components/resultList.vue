<template>
  <v-layout row>
    <v-flex
      xs12
      sm6
      offset-sm3>
      <v-card>
        <v-toolbar
          color="black"
          class="title"
          dark>
          <v-toolbar-title>Results</v-toolbar-title>
        </v-toolbar>
        <v-list>
          <v-list-tile
            v-for="result in results"
            :key="result[0]"
            avatar
          >
            <v-list-tile-content>
              <v-list-tile-title v-text="result[0]"/>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-list-tile-action-text>{{ result[1] }}</v-list-tile-action-text>
            </v-list-tile-action>

          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>



<script>
  export default {
    props: {
      resultkeywords: {
        type: Array,
        required: true
      },
    },
    computed: {
      results: function() {
        return this.resultkeywords
      }
    }
  }
</script>

<style >
.title .v-toolbar__content{
  justify-content: center;
}
</style>
