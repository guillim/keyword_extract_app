<template>
  <v-layout>
    <v-flex text-xs-center>
      <img
        src="/extractor.png"
        alt="Vuetify.js"
        class="mb-5">
      <blockquote class="blockquote">
        &#8220;Get the juice from your oranges.&#8221;
        <footer>
          <small>
            <em>Use the extractor</em>
          </small>
        </footer>
      </blockquote>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation>
        <v-text-field
          v-model="description"
          :rules="descriptionRules"
          :counter="100"
          label="Description: so that you remeber which text you sent !"
          required
        />
        <v-text-field
          v-model="text"
          :rules="textRules"
          :counter="100000"
          label="Text: the text you want to extract keywords from"
          required
        />
        <br>
        <v-checkbox
          v-model="checkbox"
          label="Send result by email?"
        />
        <v-text-field
          v-if="checkbox"
          v-model="email"
          :rules="emailRules"
          label="E-mail: if you want to get the result by email after is is processed"
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
    </v-flex>
  </v-layout>
</template>

<style scoped>
  .mb-5 {
    max-width: 200px;
    margin-bottom: 0px !important;
  }

  .mb-5 {
    /* display: inline-block; */
    animation: turn 2s linear forwards 1s;
    transform: rotateY(180deg);
    position: relative;
    overflow: hidden;
    /* height: 180px; */
    /* width: 245px; */
  }

  @keyframes turn {
    100% {
      transform: rotateX(0deg);
    }
  }
</style>


<script>
import axios from 'axios'
export default {
  data () {
    return {
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
        v => (v && v.length <= 100000) || 'Text must be less than 100 000 characters'
      ],
      email: '',
      emailRules: [
       v => !!v || 'E-mail is required',
       v => /.+@.+/.test(v) || 'your E-mail is not valid'
      ],
    }
  },
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        axios.post(`${'https://cors-anywhere.herokuapp.com/'}http://keyword-extract-api.herokuapp.com/status`)
        .then(function (response) {
          console.log('good',response);
        })
        .catch(function (error) {
          console.log('error',error);
        })
        .then(function () {
          console.log('end of get status of api using axios');
        });
        // axios.post('/api/submit', {
        //   name: this.name,
        //   email: this.email,
        //   select: this.select,
        //   checkbox: this.checkbox
        // })
      }
    },
    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>
