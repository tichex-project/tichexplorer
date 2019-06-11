<template>
  <el-menu
    :default-active="$route.path"
    @select="handleSelect"
    class="menu-container"
    mode="horizontal"
    background-color="#3a2b7e"
    text-color="rgba(255,255,255,0.8)"
    active-text-color="#00fffb"
  >
    <el-submenu
      v-for="sub in subMenus"
      :key="sub.name"
      :index="sub.name"
      class="item"
    >
      <template slot="title">{{sub.name.toUpperCase()}}</template>
      <el-menu-item
        v-for="i in sub.children"
        :key="i.link"
        :index="i.link"
        class="item"
      >{{i.name.toUpperCase()}}</el-menu-item>
    </el-submenu>

    <el-menu-item
      v-for="item in menus"
      :key="item.link"
      :index="item.link"
      class="item"
    >
      {{item.name.toUpperCase()}}
    </el-menu-item>
  </el-menu>
</template>

<script>
import { menu } from "@/constants";

export default {
  data() {
    const menus = [];
    const subMenus = [];
    menu.forEach(i => {
      if (i.children) {
        subMenus[subMenus.length] = i;
      } else {
        menus[menus.length] = i;
      }
    });
    return {
      menus,
      subMenus
    };
  },
  methods: {
    handleSelect(key) {
      this.$router.push(key);
    }
  }
};
</script>

<style lang="scss" scoped>
.menu-container {
  border-bottom: none;
  padding-right: 40px;

  .item {
    transition: $trans;
    &:hover {
      background-color: transparent !important;
      color: #00fffb !important;
    }
  }

  a {
    text-decoration: none;
  }
}

@include responsive($sm) {
  .menu-container {
    display: none;
  }
}
</style>
