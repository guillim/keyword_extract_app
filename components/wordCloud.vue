<template>
  <div style="background-color:#ffffff">
    <cloud
      :data="wordsFormatted"
      :font-size-mapper="fontSizeMapper"
      :font="'Anton'"
      :on-word-click="obj => null"
      @click="obj => null"
    />
  </div>
</template>

<script>
import Cloud from 'vue-d3-cloud'

export default {
    components: {
        Cloud,
    },
    props: {
      words: {
        type: Array,
        required: true
      },
    },
    data() {
      return {
        fontSizeMapper: word => 50 * (Math.exp(1-word.value) - 1),
      }
    },
    computed:{
      wordsFormatted: function(){
        // we remove socre above 1
        return this.words.filter(wordArr => wordArr[1] < 1).map(wordArr => { return { "text" : wordArr[0] , "value" : wordArr[1]} })
      }
    }
}
</script>
