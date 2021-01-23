<template>
  <v-btn
    nuxt
    dark="true"
    @click="download()">Download all
  </v-btn>
</template>

<script>
export default {
  props: {
    words: {
      type: Array,
      required: true
    },
  },
  methods : {
    download() {
      let csvContent = "data:text/csv;charset=utf-8,";
      const ws = JSON.parse(JSON.stringify(this.words))
      ws.forEach(function(w){
        csvContent += w.join(",") + "\n"
      });
      window.open(encodeURI(csvContent),"_self");
    },
  }
}
</script>
