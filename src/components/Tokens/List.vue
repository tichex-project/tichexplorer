<template>
  <el-table :data="list">
    <el-table-column label="ID">
      <template slot-scope="scope">
        <hg-link
          type="token"
          :content="scope.row.issue_id"
        />
      </template>
    </el-table-column>
    <el-table-column
      label="SYMBOL"
      prop="symbol"
    >
    </el-table-column>
    <el-table-column
      label="NAME"
      prop="name"
    >
    </el-table-column>
    <el-table-column label="ISSUER">
      <template slot-scope="scope">
        <hg-link
          type="address"
          :content="scope.row.issuer"
        />
      </template>
    </el-table-column>
    <el-table-column label="ISSUE TIME">
      <template slot-scope="scope">
        {{ scope.row.issue_time | formatTime }}
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { isEmpty, get } from "lodash";
import { mapGetters, mapState } from "vuex";

export default {
  props: {
    list: Array,
    load: { type: Boolean, default: false }
  },
  methods: { get }
};
</script>

