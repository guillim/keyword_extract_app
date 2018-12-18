<template>
  <v-layout
    column
    justify-center
    align-center>
    <v-flex
      xs12
      sm8
      md6>
      <div class="text-xs-center">
        <img
          src="/extractor.png"
          alt="Vuetify.js"
          class="mb-5">
      </div>
      <v-card>
        <v-card-title class="headline">Welcome to the Extractor</v-card-title>
        <v-card-text>
          <p>Make use of <strong>Artificial Intelligence</strong> to extract Keywords from text</p>
          <br>
          <hr class="my-3">
          <div class="text-xs-left">
            <em><small>Is the extractor ready: {{ isReady }}</small></em>
          </div>
        </v-card-text>
        <v-card-actions v-if="isReady">
          <v-spacer/>
          <v-btn
            flat
            nuxt
            to="/sendAText">Continue</v-btn>
        </v-card-actions>
        <v-card-actions v-else>
          <p>Pease wait for the extractor to set up. <small> Refresh your page if you see no changes in 30seconds</small></p>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>




<script>
import axios from 'axios'
export default {
  data () {
    return {
      isReady: false,
    }
  },
  mounted () {
    console.log('here');
    let thisBis = this
    axios.get(`${'https://cors-anywhere.herokuapp.com/'}http://keyword-extract-api.herokuapp.com/status`)
      .then(function (response) {
        console.log('good',response);
        thisBis.isReady = true
      })
      .catch(function (error) {
        console.log('error',error);
      })
      .then(function () {
        console.log('end of get status of api using axios');
      });
  },
}
</script>
