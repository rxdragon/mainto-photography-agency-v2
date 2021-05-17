<template>
  <div id="recordDetail">
    <div v-if="!loading" class="container">
      <section class="content">
        <h4><span class="line"/><span>订单信息</span></h4>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WorkRecord'
}
</script>
