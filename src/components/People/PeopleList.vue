<template>
  <div>
    <p v-for="people in peopleList" :key="people.id">{{ people }}</p>
  </div>
</template>
<script>
import API from "../../apis/index";
export default {
  async created() {
    const res = await API.people.getPeopleList(); // 错误情况已在拦截器处理
    console.log("peopleList res:", res);
    this.peopleList = res.list;
  },
  data() {
    return {
      peopleList: []
    };
  }
};
</script>
