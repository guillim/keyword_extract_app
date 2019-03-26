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
          ref="n_keyterms"
          v-model="n_keyterms"
          :items="n_keytermsAvailable"
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
      <resultList :resultkeywords="resultKeywords"/>
      <div class="layout row">
        <div class="flex xs12 sm6 offset-sm3 forceFlex">
          <v-btn @click="goBackToNewText">Back</v-btn>
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>



<script>
import axios from 'axios'
import logo2 from '../components/logo2.vue'
import resultList from '../components/resultList.vue'

export default {
  components: {
    logo: logo2,
    resultList: resultList
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
      methodAvailable: ['sgrank','textrank','singlerank'],
      normalize: '',
      normalizeAvailable: [null,'lemma'],
      n_keyterms: '',
      n_keytermsAvailable: [...Array(100).keys()],
      ngrams: '',
      ngramsAvailable: [...Array(10).keys()]
    }
  },
  methods: {
    submit () {
      if (this.$refs.form.validate()) {

        let method = (this.$refs.method && this.$refs.method.value) ? this.$refs.method.value : "sgrank"
        let normalize = (this.$refs.normalize && this.$refs.normalize.value) ? this.$refs.normalize.value : null
        let n_keyterms = (this.$refs.n_keyterms && this.$refs.n_keyterms.value) ? this.$refs.n_keyterms.value : 10
        let ngrams = (this.$refs.ngrams && this.$refs.ngrams.value) ? this.$refs.ngrams.value : 0
        let text = (this.$refs.text && this.$refs.text.value) ? this.$refs.text.value : ''

        let data = {
          "method": method,
          "params": {
            "normalize": normalize,
            "n_keyterms": n_keyterms,
            "ngrams": ngrams
          },
          "text": text
        }
        if (ngrams === 0 || method === 'textrank' ||  method === 'singlerank') {
          delete data.params['ngrams']
        }
        console.log(this.$refs);
        console.log(data);
        this.isLoading = true
        let thisBis = this
        this.$refs.form.reset()
        // axios.post(`http://localhost:5000/keywords`,JSON.stringify(data),{  // for localhost testing
        // axios.post(`${'https://cors-anywhere.herokuapp.com/'}http://keyword-extract-api.herokuapp.com/keywords`,JSON.stringify(data),{   // only for testing purposes
        axios.post(`http://keyword-extract-api.herokuapp.com/keywords`,JSON.stringify(data),{  // for localhost testing
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
