<template lang="html">
  <section>
    <h4>Dashboard</h4>
    <div>
      <h2>Stats n shit here</h2>
      <span>
        {{ allVisitorData }}
      </span>
    </div>
  </section>
</template>

<script>
import { mapGetters }               from "vuex";

export default {
  computed: {
    ...mapGetters([
      "allVisitorData"
    ])
  },
  data(){
    return {
    }
  }
}
</script>

<style lang="css">

</style>
