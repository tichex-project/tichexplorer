<template>
  <div v-if="detail">
    <sub-title
      title="BLOCK"
      :sub="`#${height}`"
    />
    <div class="block-detail-content">
      <card title="Block Information">
        <data-item label="Height">
          <span>{{ detail.header.height }}</span>
        </data-item>
        <data-item label="TimeStamp">
          <span>{{ detail.header.time }}</span>
        </data-item>
        <data-item label="Hash">
          <span>{{ detail.header.app_hash }}</span>
        </data-item>
        <data-item label="Transactions number">
          <span>{{ detail.header.num_txs }}</span>
        </data-item>
        <data-item label="Proposer Address">
          <hg-link
            type="validator"
            :content="get(consPubMap, [get(proposers, [height, 'pub_key']), 'operator_address'])"
            :ellipsis="false"
          />
        </data-item>
      </card>
      <card title="Last Block">
        <data-item label="Last Block Hash">
          {{ detail.last_commit.block_id.hash }}
        </data-item>
      </card>
      <card title="Transactions">
        <transaction-list
          :fields="fields"
          :load="load"
          :list="transactionList"
        />
      </card>
      <card
        v-if="validatorList"
        title="Validators"
      >
        <validator-list :list="validatorList" />
      </card>
    </div>
  </div>
</template>

<script>
import { get, isEmpty } from "lodash";
import { mapGetters, mapState } from "vuex";
import sha256 from "crypto-js/sha256";
import hmacSHA512 from "crypto-js/hmac-sha512";
import Base64 from "crypto-js/enc-base64";

import { txFieldsMap } from "@/constants";

export default {
  data: function() {
    return {
      height: this.$route.params.id,
      fields: txFieldsMap.all
    };
  },
  computed: {
    ...mapState("blocks", {
      blockDetails: "details",
      proposers: "proposers",
      validatorsets: "validatorsets"
    }),
    ...mapState("transactions", {
      transactionDetails: "details",
      load: "load"
    }),
    ...mapState("validators", ["consPubMap"]),

    detail: function() {
      const { height, blockDetails } = this;
      return get(blockDetails, [height, "block"]);
    },

    txs: function() {
      if (isEmpty(this.detail)) return false;
      const txs = this.detail.data.txs;
      if (!isEmpty(txs)) {
        return txs.map(this.decodeTx);
      }
    },

    transactionList: function() {
      const { txs, transactionDetails } = this;
      if (isEmpty(txs)) return null;
      return txs
        .map(hash => get(transactionDetails, [hash]))
        .filter(item => !!item);
    },

    validatorList: function() {
      const { height, validatorsets, consPubMap } = this;
      const validatorset = get(validatorsets, [height, "validators"]);
      if (isEmpty(validatorset) || isEmpty(consPubMap)) {
        return [];
      }
      return validatorset.map(i => get(consPubMap, [i.pub_key]));
    }
  },
  methods: {
    get,
    decodeTx: function(tx) {
      return sha256(Base64.parse(tx))
        .toString()
        .toUpperCase();
    },
    fetchData: async function() {
      if (isEmpty(this.consPubMap)) {
        this.$store.dispatch("validators/fetchAll");
      }

      const height = this.height;
      const data = await this.$store.dispatch("blocks/fetchDetail", height);
      const txs = data.block.data.txs;
      if (isEmpty(txs)) {
        return false;
      }
      txs
        .map(this.decodeTx)
        .map(hash => this.$store.dispatch("transactions/fetch", hash));
    }
  },
  mounted() {
    this.fetchData();
  }
};
</script>