<template>
  <div :class="`search-container ${mini && !expand?'mini':''}`">
    <el-autocomplete
      ref="input"
      class="search-inner"
      placeholder="Token ID/ Token Symbol/ Address/ Txhash/ Block"
      v-model.trim="value"
      :fetch-suggestions="querySearch"
      :trigger-on-focus="false"
      @keyup.enter.native="onSearch"
      @blur="onBlur"
      @select="handleSelect"
      :clearable="!mini"
      autofocus
    ></el-autocomplete>
    <i
      class="el-icon-search search-icon"
      @click="expandSearch"
    ></i>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { isEmpty } from "lodash";

export default {
  props: {
    mini: Boolean,
    expand: Boolean
  },
  data() {
    return {
      value: ""
    };
  },
  computed: {
    ...mapGetters("blocks", { blocksLastList: "lastList" })
  },
  methods: {
    expandSearch() {
      if (this.mini && !this.expand) {
        this.$emit("focus");
        this.$refs.input.focus();
      }
    },
    onBlur() {
      if (this.mini && this.expand) {
        this.$emit("blur");
      }
    },
    querySearch: async function(queryString, cb) {
      cb([]);
      if (isEmpty(queryString)) {
        return;
      }
      const data = await this.$store.dispatch("tokens/search", {
        symbol: queryString
      });
      if (isEmpty(data)) {
        return;
      }
      const res = data.map(i => {
        i.value = `${i.symbol} ( ${i.name} ${i.issue_id} )`;
        return i;
      });
      cb(res);
    },
    handleSelect(v) {
      this.$router.push(`/token/${v.issue_id}`);
    },
    onSearch() {
      let { value } = this;
      value = value.replace(/ /g, "");
      // jump to block detail page;
      const numberPattern = /^\d+$/g;
      if (numberPattern.test(value)) {
        if (value - 0 > this.blocksLastList[0].header.height - 0) {
          this.$router.push("/notFound");
          return false;
        }
        this.$router.push({ path: "/block/" + value });
        return false;
      }

      // jump to address detail page;
      const addressPattern = /^cosmos.{39}$/;
      if (addressPattern.test(value)) {
        this.$router.push({ path: "/address/" + value });
        return false;
      }

      // jump to validator detail page;
      const valPattern = /^cosmosvaloper.{39}$/;
      if (valPattern.test(value)) {
        this.$router.push({ path: "/validator/" + value });
        return false;
      }

      // jump to token detail page;
      const tokenPattern = /^coin.{10}$/;
      if (tokenPattern.test(value)) {
        this.$router.push({ path: "/token/" + value });
        return false;
      }

      // jump to tx detail page;
      const txPattern = /^[0-9A-F]{64}$/;
      if (txPattern.test(value)) {
        this.$router.push({ path: "/tx/" + value });
        return false;
      }

      // else show 404
      this.$router.push({ path: "/404" });
    }
  }
};
</script>

<style lang="scss" scoped>
.search-container {
  width: 100%;
  //   margin: 64px auto 120px;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  height: 48px;
  border: 1px solid white;
  border-radius: 4px;
  transition: all $trans;

  .search-inner {
    flex: 1 1 auto;
  }

  .search-icon {
    margin-right: 24px;
    font-size: 18px;
    color: rgba(255, 255, 255, 0.75);
    z-index: 9;
  }

  &.mini {
    width: 40px;
    border: none;
    .search-inner {
      width: 8px;
    }

    .search-icon {
      margin-right: 0;
      cursor: pointer;
      &:hover {
        color: white;
      }
    }
  }
}

@include responsive($sm) {
  .search-container {
    margin-top: $basic-padding;
  }
}
</style>
