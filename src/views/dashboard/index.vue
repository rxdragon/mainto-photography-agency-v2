<template>
  <div class="full-page">
    <div class="img-wrap">
      <img src="../../assets/img/default.png">
      <p>欢迎来到<span class="tip">缦图云端拍摄中心</span></p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  }
}
</script>

<style lang="scss" scoped>
.full-page {
  position: absolute;
  top: 50px;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;

  .img-wrap {
    width: 550px;
    margin-top: -70px;

    img {
      width: 100%;
    }

    p {
      width: 100%;
      height: 38px;
      font-family: var(--fontFamily);
      font-size: 30px;
      font-weight: 600;
      line-height: 38px;
      color: rgba(19, 25, 35, 1);
      text-align: center;

      .tip {
        color: #1769ff;
      }
    }
  }
}
</style>
