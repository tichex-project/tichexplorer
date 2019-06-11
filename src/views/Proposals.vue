<template>
  <card title="proposals">
    <ProposalList :list='list' />
  </card>
</template>

<script>
import { mapState } from "vuex";
import ProposalList from "@/components/Proposals/List.vue";

export default {
  components: { ProposalList },
  computed: {
    ...mapState("proposals", ["list"])
  },
  mounted: function() {
    this.$store.dispatch("proposals/fetchList");
  }
};
</script>
