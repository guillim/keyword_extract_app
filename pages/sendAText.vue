<template>
  <v-layout>
    <v-flex
      v-if="resultKeywords.length === 0"
      text-xs-center>
      <logo/>
      <blockquote class="blockquote">
        &#8220;Get the juice from your oranges.&#8221;
        <footer>
          <small>
            <em>Use the extractor</em>
          </small>
          <v-btn
            nuxt
            small
            dark="true"
            to="/sendATextPremium">access to premium version
          </v-btn>
        </footer>
      </blockquote>
      <v-form
        v-if="!isLoading"
        ref="form"
        v-model="valid"
        lazy-validation>
        <!-- <v-text-field
          v-model="description"
          :rules="descriptionRules"
          :counter="100"
          label="Description: so that you remember which text you sent !"
          required
        /> -->
        <v-text-field
          ref="text"
          v-model="text"
          :rules="textRules"
          :counter="7000"
          label="Text: the text you want to extract keywords from - must be in french"
          required
        />
        <br>
        <v-checkbox
          v-model="checkbox"
          label="Customize parameters"
        />

        <v-select
          v-if="checkbox"
          ref="method"
          v-model="method"
          :items="methodAvailable"
          label="Method to use for this keyword extraction"
        />

        <v-select
          v-if="checkbox"
          ref="normalize"
          v-model="normalize"
          :items="normalizeAvailable"
          label="Normalization to apply before keyword extraction"
        />

        <v-select
          v-if="checkbox"
          ref="ngrams"
          v-model="ngrams"
          :items="ngramsAvailable"
          label="Ngrams to use: 0 for all kind of ngrams"
        />

        <v-select
          v-if="checkbox"
          ref="topn"
          v-model="topn"
          :items="topnAvailable"
          label="Number of results to display"
        />

        <v-btn
          :disabled="!valid"
          @click="submit"
        >
          submit
        </v-btn>
        <v-btn @click="clear">clear</v-btn>
      </v-form>
      <span
        v-else>
        Don't close this window: you would loose the result you asked for
        <br>
        <br>
        <v-progress-circular
          :width="3"
          color="white"
          indeterminate
        />
      </span>
    </v-flex>
    <v-flex v-else>
      <wordCloud :words="resultKeywords"/>
      <resultList :resultkeywords="resultKeywords.slice(0,50)"/>
      <div class="layout row">
        <div class="flex xs12 sm6 offset-sm3 forceFlex">
          <v-btn @click="goBackToNewText">Back</v-btn>
          <download :words="resultKeywords"/>
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>



<script>
import axios from 'axios'
import logo2 from '../components/logo2.vue'
import resultList from '../components/resultList.vue'
import wordCloud from '../components/wordCloud.vue'
import download from '../components/download.vue'

export default {
  components: {
    logo: logo2,
    resultList: resultList,
    download: download,
    wordCloud: wordCloud
  },
  data () {
    return {
      isLoading: false,
      resultKeywords: [],
      checkbox: false,
      valid: true,
      description: '',
      descriptionRules: [
        v => !!v || 'Description is required',
        v => (v && v.length <= 100) || 'Description must be less than 100 characters'
      ],
      text: '',
      textRules: [
        v => !!v || 'Text is required',
        v => (v && v.length <= 7000) || 'Text must be less than 7000 characters',
        v => (v && v.length >= 100) || 'Text must be at least 100 characters'
      ],
      method: '',
      methodAvailable: ['yake','sgrank','textrank','scake'],
      normalize: '',
      normalizeAvailable: [null,'lemma','lower'],
      topn: '',
      topnAvailable: [...Array(100).keys()],
      ngrams: '',
      ngramsAvailable: [...Array(10).keys()]
    }
  },
  methods: {
    submit () {
      if (this.$refs.form.validate()) {

        let method = (this.$refs.method && this.$refs.method.value) ? this.$refs.method.value : "yake"
        let normalize = (this.$refs.normalize && this.$refs.normalize.value) ? this.$refs.normalize.value : 'lower'
        let topn = (this.$refs.topn && this.$refs.topn.value) ? this.$refs.topn.value : 10
        let ngrams = (this.$refs.ngrams && this.$refs.ngrams.value) ? this.$refs.ngrams.value : 0
        let text = (this.$refs.text && this.$refs.text.value) ? this.$refs.text.value : ''

        let data = {
          "method": method,
          "params": {
            "normalize": normalize,
            "topn": topn,
            "ngrams": ngrams
          },
          "text": text
        }
        if (ngrams === 0) {
          delete data.params['ngrams']
        }else{
          if (method === "yake") {
            data.params['ngrams'] = [...Array(data.params['ngrams']).keys()]
          }
        }
        this.isLoading = true
        let thisBis = this
        this.$refs.form.reset()
        // axios.post(`http://localhost:5000/keywords`,JSON.stringify(data),{  // for localhost testing
        // axios.post(`${'https://cors-anywhere.herokuapp.com/'}http://base-url.herokuapp.com`,JSON.stringify(data),{   // only for testing purposes
        let endpoint = window.location.protocol + `//` + this.$config.BASE_URL + `/keywords`
        axios.post(endpoint,JSON.stringify(data),{  // for localhost testing
          "headers": {
            "Content-Type": "application/json",
          }
        })
        .then(function (response) {
          thisBis.resultKeywords = response.data.keywords
        })
        .catch(function (error) {
          console.log('error from axios:',error);
        })
        .then(function () {
          console.log('end of post keywords of api using axios');
          thisBis.isLoading = false
        });
      }
    },
    clear () {
      this.$refs.form.reset()
    },
    goBackToNewText(){
      this.resultKeywords = []
    }
  }
}
</script>

<style scoped>
.forceFlex{
  display: flex;
  justify-content: center;
}
</style>
