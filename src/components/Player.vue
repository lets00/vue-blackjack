<template>
  <div>
    <p>{{playerName}}</p>
    <p>{{playerValue}}</p>
  </div>
</template>

<script>
export default {
  props: ["playerName", "playerValue"]
};
</script>

<style>
</style>