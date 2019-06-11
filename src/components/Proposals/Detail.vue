<template>
  <div>
    <sub-title
      title="PROPOSAL"
      :sub="id"
    />
    <div class="content">
      <card
        title="Proposal Details"
        v-if="detail"
      >
        <data-item label="Proposal ID">
          <span>{{ detail.value.proposal_id}}</span>
        </data-item>
        <data-item label="Type">
          <span>{{ detail.value.proposal_type }}</span>
        </data-item>
        <data-item label="Status">
          <span>{{ detail.value.proposal_status }}</span>
        </data-item>
        <data-item label="Title">
          <span>{{ detail.value.title }}</span>
        </data-item>
        <data-item label="Description">
          <span>{{ detail.value.description }}</span>
        </data-item>
        <data-item label="Submit Time">
          <span>{{ detail.value.submit_time | formatTime }}</span>
        </data-item>
        <data-item label="Deposit End Time">
          <span>{{ detail.value.deposit_end_time | formatTime }}</span>
        </data-item>
        <data-item label="Total Deposit">
          <data-amount :list="detail.value.total_deposit" />
        </data-item>
      </card>

      <card
        title="Voting Status"
        v-if="detail && detail.value.proposal_status !== 'DepositPeriod'"
      >
        <data-item label="Voting Start Time">
          <span>{{ detail.value.voting_start_time | formatTime }}</span>
        </data-item>
        <data-item label="Voting End Time">
          <span>{{ detail.value.voting_end_time | formatTime }}</span>
        </data-item>
        <data-item label="Voting Result">
          <div class="voting-result">
            <div class="yes">
              <span>{{detail.value.final_tally_result.yes}}</span>
              <p>YES</p>
            </div>
            <div class="no">
              <span>{{detail.value.final_tally_result.no}}</span>
              <p>NO</p>
            </div>
            <div class="veto">
              <span>{{detail.value.final_tally_result.no_with_veto}}</span>
              <p>NO WITH VETO</p>
            </div>
            <div class="abstain">
              <span>{{detail.value.final_tally_result.abstain}}</span>
              <p>ABSTAIN</p>
            </div>
          </div>
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
      id: this.$route.params.id
    };
  },
  methods: {
    get
  },
  computed: {
    ...mapState("proposals", ["details"]),
    detail: function() {
      return get(this.details, this.id);
    }
  },
  mounted: function() {
    this.$store.dispatch("proposals/fetchDetail", this.id);
  }
};
</script>

<style lang="scss">
.voting-result {
  display: flex;
  text-align: center;
  justify-content: space-between;
  flex-wrap: wrap;
  & > div {
    flex-basis: 120px;
    span {
      font-size: 24px;
    }
  }
  .yes {
    color: green;
  }
  .no {
    color: orange;
  }
  .veto {
    color: red;
  }
}
</style>