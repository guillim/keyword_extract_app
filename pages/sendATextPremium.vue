<template>
  <v-layout>
    <v-flex
      v-if="resultKeywords.length === 0"
      text-xs-center>
      <logo/>
      <blockquote class="blockquote">
        &#8220;Visual texts insights&#8221;
        <footer>
          <small>
            <em>Use the extractor <i>- premium version -</i></em>
          </small>
        </footer>
      </blockquote>
      <v-form
        v-if="!isLoading"
        ref="form"
        v-model="valid"
        lazy-validation>
        <v-text-field
          ref="text"
          v-model="text"
          :rules="textRules"
          :counter="1000000"
          label="Text: the text you want to extract keywords from - must be in french - 1M max"
          required
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
import logo3 from '../components/logo3.vue'
import resultList from '../components/resultList.vue'
import wordCloud from '../components/wordCloud.vue'
import download from '../components/download.vue'

export default {
  middleware: ['password-protect'],
  components: {
    logo: logo3,
    resultList: resultList,
    download: download,
    wordCloud: wordCloud
  },
  data () {
    return {
      isLoading: false,
      resultKeywords: [],
      valid: true,
      description: '',
      descriptionRules: [
        v => !!v || 'Description is required',
        v => (v && v.length <= 100) || 'Description must be less than 100 characters'
      ],
      text: '',
      textRules: [
        v => !!v || 'Text is required',
        v => (v && v.length <= 1000000) || 'Text must be less than 1M characters',
        v => (v && v.length >= 100) || 'Text must be at least 100 characters'
      ],
    }
  },
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        let text = (this.$refs.text && this.$refs.text.value) ? this.$refs.text.value : ''
        let data = {
          "text": text
        }
        console.log(this.$refs,data);
        this.isLoading = true
        let thisBis = this
        this.$refs.form.reset()

        let apiPremium = '/api/premium'
        axios.post(apiPremium,{data: JSON.stringify(text)})
        .then(function (response) {
          // console.log('response',response);
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
