<template>
  <div>
    <sub-title
      title="VALIDATOR"
      :sub="address"
    />
    <div class="content">
      <card
        title="Validator Profile"
        v-if="detail"
      >
        <data-item label="Operator Address">
          <span>{{ detail.operator_address}}</span>
        </data-item>
        <data-item label="Name">
          <span>{{ detail.description.moniker }}</span>
        </data-item>
        <data-item label="Comission Rate">
          <span>{{ Number(get(detail, 'commission.rate')) * 100 }} %</span>
        </data-item>

        <data-item label="Website">
          <span>{{ detail.description.website || '-' }}</span>
        </data-item>

        <data-item label="Details">
          <span>{{ detail.description.details || '-' }}</span>
        </data-item>

        <data-item label="Identity">
          <span>{{ detail.description.Identity || '-' }}</span>
        </data-item>
      </card>

      <card
        title="Current Status"
        v-if="detail"
      >
        <data-item label="Voting Power">
          <span>{{ detail.tokens | formatSTAKE }}</span>
        </data-item>
        <data-item label="Jailed">
          <span>{{ detail.jailed ? 'True' : 'False' }}</span>
        </data-item>
        <data-item label="Unbonding Height">
          <span>{{ detail.unbonding_height || '-' }}</span>
        </data-item>
        <data-item label="Unbonding Time">
          <span>{{ detail.unbonding_time | formatTime }}</span>
        </data-item>
      </card>
    </div>
  </div>
</template>

<script>
import { get } from "lodash";
import { mapGetters, mapState } from "vuex";

export default {
  data: function() {
    return {
      address: this.$route.params.address
    };
  },
  methods: {
    get
  },
  computed: {
    ...mapState("validators", ["details"]),
    detail: function() {
      return get(this.details, this.address);
    }
  },
  mounted: function() {
    this.$store.dispatch("validators/fetchDetail", this.address);
  }
};
</script>
