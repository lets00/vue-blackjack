<template>
  <textarea rows="200" cols="15" :value="convertToString" readonly></textarea>
</template>

<script>
export default {
  props: ["logs"],
  data: () => {
    return {
      textLog: ""
    };
  },
  computed: {
    convertToString() {
      return this.logs.reduce((acc, value) => {
        return `${acc}\n${value.hour}:${value.minute}- ${value.message}`;
      }, "");
    }
  }
};
</script>

<style>
textarea {
  min-height: 400px;
  background: rgba(76, 175, 80, 0.3);
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 1px 1px 1px #999;
  font-weight: bold;
  color: gold;
}
</style>