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
        <logo/>
      </div>
      <v-card>
        <v-card-title class="headline">Welcome to the Extractor</v-card-title>
        <v-card-text>
          <p>Make use of <strong>Artificial Intelligence</strong> to extract Keywords from text</p>
          <br>
        </v-card-text>
      </v-card>
      <div class="layout row">
        <div
          class="block"
          style="margin:auto">
          <v-btn
            v-if="isReady"
            nuxt
            dark="true"
            to="/sendAText">Continue
          </v-btn>
          <v-card-actions v-else>
            <p>Pease wait for the extractor to set up. </p>
            <p><small> Refresh your page if you see no changes in 30seconds</small></p>
          </v-card-actions>
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>




<script>
import axios from 'axios'
import logo from '../components/logo.vue'

export default {
  components: {
    logo: logo
  },
  data () {
    return {
      isReady: false,
    }
  },
  mounted () {
    console.log('here');
    let thisBis = this
    // axios.get(`http://localhost:5000/status`)  // for localhost testing
    // axios.get(`${'https://cors-anywhere.herokuapp.com/'}http://keyword-extract-api.herokuapp.com/status`)  // only for testing purposes
    axios.get(`http://keyword-extract-api.herokuapp.com/status`)
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
