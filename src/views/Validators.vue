<template>
  <card title="validators">
    <el-radio-group
      v-model="status"
      @change="onStatusChange"
      class="radios"
    >
      <el-radio
        label="bonded"
        border
      >Bonded</el-radio>
      <el-radio
        label="unbonded"
        border
      >Unbonded</el-radio>
      <el-radio
        label="unbonding"
        border
      >Unbonding</el-radio>
    </el-radio-group>
    <validator-list :list='list' />
  </card>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return { status: "bonded" };
  },
  computed: {
    ...mapState("validators", ["list"])
  },
  methods: {
    onStatusChange(status) {
      this.$store.dispatch("validators/fetchAll", this.status);
    }
  },
  mounted: function() {
    this.$store.dispatch("validators/fetchAll", this.status);
  }
};
</script>

<style lang="scss" scoped>
.radios {
  margin-bottom: $basic-padding;
}
</style>
