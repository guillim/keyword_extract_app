<template>
  <div style="background-color:#ffffff">
    <div>
      <input
        v-model="color"
        type="color">
      <label
        style="color:black"
        @click="key++"
      >Refresh</label>
    </div>
    <cloud
      :data="wordsFormattedPercent"
      :font-size-mapper="fontSizeMapper"
      :font="'Anton'"
      :colors="[color]"
      :on-word-click="obj => null"
      :key="key"
      class="text-xs-center"
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
        // number maximum of words to print on wordCloud
        maxWords: 50,
        key:0,
        color:'#000000'
      }
    },
    computed:{
      wordsFormatted: function(){
        // we slice the array to get only the required number
        return this.words.map(wordArr => { return { "text" : wordArr[0] , "value" : wordArr[1]} }).slice(0,this.maxWords)
      },
      scaleIsReverse: function(){
        // We rely on the backend to deliever the list of words
        // from the most important to the least important
        // some algorithm (ex: yake) rank the most important words
        // with the smallest number. This is a way to detect that
        const ws = JSON.parse(JSON.stringify(this.wordsFormatted))
        if(ws[0] && ws[1] && ws[0].value && ws[1].value) {
          return (ws[0].value - ws[1].value) / Math.abs(ws[0].value - ws[1].value)
        }else {
          return 1
        }
      },
      minMax: function(){
        let wfs = this.wordsFormatted.map(w => parseFloat(w.value)).sort(function(a,b){return a - b})
        return {
          min : wfs[0],
          max : wfs[wfs.length-1],
          delta : wfs[wfs.length-1] - wfs[0]
        }
      },
      wordsFormattedPercent: function(){
        return this.wordsFormatted.map(w => {
          w.value = 100*(w.value - this.minMax.min)/this.minMax.delta;
          return w
        })
      }
    },
    methods : {
      fontSizeMapper (word) {
        let v =  (this.scaleIsReverse > 0) ? (100 - word.value) : word.value
        return Math.exp(4.1/100*v) + 9
        // return 50 * v + 10
      }
    }
}
</script>
