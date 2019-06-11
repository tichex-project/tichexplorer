<template>
  <div>
    <sub-title
      title="TOKEN"
      :sub="id"
    />
    <div class="content">
      <card
        title="Issuing Info"
        v-if="detail"
      >
        <data-item label="Token ID">
          <span>{{ detail.issue_id}}</span>
        </data-item>
        <data-item label="Symbol">
          <span>{{ detail.symbol}}</span>
        </data-item>
        <data-item label="Name">
          <span>{{ detail.name}}</span>
        </data-item>
        <data-item label="Issue Time">
          <span>{{ detail.issue_time | formatTime }}</span>
        </data-item>
        <data-item label="Issuer">
          <hg-link
            type="address"
            :content="detail.issuer"
            :ellipsis="false"
          />
        </data-item>
      </card>
      <card
        title="Token Details"
        v-if="detail"
      >
        <data-item label="Total Supply">
          <span>{{ supply }}</span>
        </data-item>
        <data-item label="Decimals">
          <span>{{ detail.decimals}}</span>
        </data-item>
        <data-item label="Owner">
          <hg-link
            type="address"
            :content="detail.owner"
            :ellipsis="false"
          />
        </data-item>
        <data-item label="Orgnization">
          <span>{{ description.organization}}</span>
        </data-item>
        <data-item label="Website">
          <a
            :href="description.website"
            target="_blank"
          >{{ description.website }}</a>
        </data-item>
        <data-item label="Logo">
          <img
            class="logo"
            :src="description.logo"
          />
        </data-item>
        <data-item label="Description">
          <span>{{ description.description}}</span>
        </data-item>
      </card>
      <card
        title="Token Status"
        v-if="detail"
      >
        <data-item label="Total Supply">
          <span>{{ supply }}</span>
        </data-item>
        <data-item label="Minting">
          <span>{{ !detail.minting_finished }}</span>
        </data-item>
        <data-item label="Burning">
          <span>{{ !detail.burning_off}}</span>
        </data-item>
        <data-item label="Burning From">
          <span>{{ !detail.burning_from_off}}</span>
        </data-item>
        <data-item label="Burning Any">
          <span>{{ !detail.burning_any_off}}</span>
        </data-item>
      </card>
    </div>
  </div>
</template>

<script>
import { get, isEmpty } from "lodash";
import Big from "big.js";
import numeral from "numeral";
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
    ...mapState("tokens", ["details"]),
    detail: function() {
      return get(this.details, this.id);
    },
    description() {
      return this.detail.description ? JSON.parse(this.detail.description) : {};
    },
    supply() {
      const { total_supply, decimals } = this.detail;
      if (isEmpty(total_supply)) {
        return "0";
      }
      const n = Big(total_supply).div(Math.pow(10, decimals));
      return numeral(n.toString()).format("0,0.[000000]");
    }
  },
  mounted: function() {
    this.$store.dispatch("tokens/fetchDetail", this.id);
  }
};
</script>

<style lang="scss" scoped>
.logo {
  max-width: 120px;
}
</style>