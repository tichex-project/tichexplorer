<template>
  <div>
    <sub-title
      title="ADDRESS"
      :sub="address"
    />
    <div
      class="address-detail-content"
      v-if="info"
    >
      <card title="Address Information">
        <data-item label="Balance">
          <data-amount :list="info" />
        </data-item>
        <data-item label="Address">
          <span>{{ address }}</span>
        </data-item>
      </card>
      <card
        v-if="!isEmpty(transactionList)"
        title="Transaction List"
      >
        <transaction-list
          :fields="send.filter(i => !i.hideInTable)"
          :load="load"
          :list="transactionList"
        />
      </card>
    </div>
  </div>
</template>

<script>
import { get, isEmpty } from "lodash";
import { mapState, mapGetters } from "vuex";

import { txFieldsMap } from "@/constants";

export default {
  data: function() {
    return txFieldsMap;
  },
  methods: { get, isEmpty },

  computed: {
    ...mapState("address", ["info"]),
    ...mapState("transactions", { transactionList: "list", load: "load" }),
    address: function() {
      return this.$route.params.address;
    }
  },

  beforeRouteUpdate(to, from, next) {
    const address = to.params.address;
    this.$store.dispatch("address/fetch", address);
    this.$store.dispatch("transactions/fetchAddressTxList", {
      action: "send",
      sender: address
    });
    next();
  },

  mounted() {
    this.$store.dispatch("address/fetch", this.address);
    this.$store.dispatch("transactions/fetchAddressTxList", {
      action: "send",
      sender: this.address
    });
  }
};
</script>