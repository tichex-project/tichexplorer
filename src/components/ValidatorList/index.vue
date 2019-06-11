<template>
  <el-table :data="list">
    <el-table-column
      class="jailed-status"
      label="ACTIVE"
    >
      <template slot-scope="record">
        <span :class="record.row.jailed ? 'jailed' : 'active'">{{ record.row.jailed ? 'FALSE' : 'TRUE' }}</span>
      </template>
    </el-table-column>
    <el-table-column
      class="operator-address"
      label="OPERATOR ADDRESS"
      prop="operator_address"
    >
      <template slot-scope="record">
        <hg-link
          type="validator"
          :content="record.row.operator_address"
        />
      </template>
    </el-table-column>
    <el-table-column
      class="name"
      label="NAME"
      prop="description.moniker"
    />
    <el-table-column
      class="voting-power"
      label="VOTING POWER"
      prop="tokens"
    >
      <template slot-scope="record">
        {{ record.row.tokens | formatSTAKE }}
      </template>
    </el-table-column>
    <el-table-column
      label="RANKING"
      prop="number"
    />
    <el-table-column
      class="bond-height"
      label="UNBONDING HEIGHT"
      prop="unbonding_height"
    />
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
.jailed {
  color: red;
}

.active {
  color: green;
}
</style>


