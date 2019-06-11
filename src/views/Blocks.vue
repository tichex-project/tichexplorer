<template>
  <card title="blocks">
    <div class="card-header">
      <p>TOTAL AMOUNT: {{ lastHeight }}</P>
    </div>
    <el-table
      class="table"
      :data="list"
      style="width: 100%"
    >
      <el-table-column
        class="height"
        label="HEIGHT"
      >
        <template slot-scope="scope">
          <RouterLink
            :to="`/block/${scope.row.header.height}`"
            class="link"
          >{{ scope.row.header.height }}</RouterLink>
        </template>
      </el-table-column>
      <el-table-column
        prop="header.num_txs"
        label="TXN"
      >
      </el-table-column>
      <el-table-column label="VALIDATORS">
        <template slot-scope="scope">
          <span>{{ get(scope, 'row.validators.length') }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop=""
        label="VOTING POWER"
      >
        <template slot-scope="scope">
          <span>{{ countVotingPower(scope.row.validators) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="header.time"
        label="TIMESTAMP"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.header.time | formatTime }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="card-footer">
      <el-pagination
        class="pagination"
        background
        :pager-count="3"
        layout="prev, pager, next"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="lastHeight"
        @prev-click="onPageChange"
        @next-click="onPageChange"
        @current-change="onPageChange"
      />
    </div>
  </Card>
</template>

<script>
import { get } from "lodash";
import Card from "@/components/Card";
import { mapGetters, mapState } from "vuex";

export default {
  components: { Card },
  computed: {
    ...mapGetters("blocks", ["list"]),
    ...mapState("blocks", ["lastHeight", "currentPage", "pageSize"])
  },
  methods: {
    get,
    countVotingPower: function(validators) {
      if (!validators) return "";
      return validators.reduce(
        (prev, current) => prev + Number(current.voting_power),
        0
      );
    },
    onPageChange: function(page) {
      const { pageSize, lastHeight } = this;
      const maxHeight = lastHeight - pageSize * (page - 1) + 1;
      const minHeight = Math.max(0, lastHeight - pageSize * page);
      this.$store.dispatch("blocks/fetchList", { page, maxHeight, minHeight });
    }
  },
  mounted: function() {
    this.$store.dispatch("blocks/fetchList");
  }
};
</script>

<style lang="scss">
.height {
  color: $blue;
}

.card-header {
  margin-bottom: 24px;
}
.card-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
}
</style>


