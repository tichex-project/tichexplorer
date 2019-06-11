<template>
  <card title="tokens">
    <TokenList :list='list' />
    <div class="card-footer">
      <el-pagination
        class="pagination"
        background
        :pager-count="3"
        layout="prev, pager, next"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="Number(totalCount)"
        @prev-click="onPageChange"
        @next-click="onPageChange"
        @current-change="onPageChange"
      />
    </div>
  </card>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import TokenList from "@/components/Tokens/List.vue";

export default {
  components: { TokenList },
  computed: {
    ...mapState("tokens", ["list", "totalCount", "pageSize", "currentPage"])
  },
  methods: {
    onPageChange: function(currentPage) {
      this.$store.dispatch("tokens/fetchList", {
        page: currentPage
      });
    }
  },
  mounted: async function() {
    await this.$store.dispatch("tokens/fetchTotalCount");
    this.$store.dispatch("tokens/fetchList");
  }
};
</script>
