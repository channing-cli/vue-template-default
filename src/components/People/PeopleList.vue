<template>
  <div>
    <Loading v-if="loading"></Loading>
    <template v-else>
      peopleList
      <p v-for="people in peopleList" :key="people.id">{{ people }}</p>
      <button @click="handleSlice">
        slice
      </button>
    </template>
  </div>
</template>
<script>
import peopleMixin from "@/mixins/peopleMixin";
import Loading from "@/components/common/Loading";

import { mapGetters, mapMutations } from "vuex";
import { SET_PEOPLE_LIST } from "@/store/modules/people/mutations-type";

export default {
  mixins: [peopleMixin],

  created() {
    this.getPeopleList();
  },

  computed: {
    ...mapGetters("people", ["peopleList"])
  },

  methods: {
    ...mapMutations("people", [SET_PEOPLE_LIST]),
    async getPeopleList() {
      this.loading = true;

      await this.$store.dispatch("people/getPeopleList"); // 错误情况已在拦截器处理

      this.loading = false;
    },
    handleSlice() {
      if (this.peopleList && this.peopleList.length > 0)
        this[SET_PEOPLE_LIST](this.peopleList.slice(1));
    }
  },

  data() {
    return {
      // peopleList: [],
      loading: false
    };
  },

  components: {
    Loading
  }
};
</script>
