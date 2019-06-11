<template>
  <router-link
    :to="`/${type}/${link || content}`"
    :class="`${ellipsis ? 'ellipsis' : ''}`"
  >{{ content }}</router-link>
</template>
<script>
export default {
  props: {
    type: String,
    link: String,
    content: String,
    ellipsis: { type: Boolean, default: true }
  }
};
</script>

<style lang="scss" scoped>
.ellipsis {
  display: inline-block;
  max-width: 200px;
  vertical-align: top;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>
