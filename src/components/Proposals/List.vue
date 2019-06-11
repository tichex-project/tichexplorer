<template>
  <el-table :data="list">
    <el-table-column label="ID">
      <template slot-scope="scope">
        <hg-link
          type="proposal"
          :content="scope.row.value.proposal_id"
        />
      </template>
    </el-table-column>
    <el-table-column label="TITLE">
      <template slot-scope="scope">
        <hg-link
          type="proposal"
          :content="scope.row.value.title"
          :link="scope.row.value.proposal_id"
        />
      </template>
    </el-table-column>
    <el-table-column
      label="TYPE"
      prop="value.proposal_type"
    >
    </el-table-column>
    <el-table-column
      label="STATUS"
      prop="value.proposal_status"
    >
    </el-table-column>
    <el-table-column label="SUBMIT TIME">
      <template slot-scope="scope">
        {{ scope.row.value.submit_time | formatTime }}
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    list: {
      required: true,
      type: Array
    },
    type: {
      type: String,
      default: ""
    }
  }
};
</script>

<style lang="scss">
</style>


