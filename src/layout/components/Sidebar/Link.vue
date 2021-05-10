<<<<<<< HEAD

<template>
  <!-- eslint-disable vue/require-component-is -->
  <component v-bind="linkProps(to)">
=======
<template>
  <component :is="type" v-bind="linkProps(to)">
>>>>>>> e3633d95afd5e894053241692fe8a95f8b70f9e6
    <slot />
  </component>
</template>

<script>
import { isExternal } from '@/utils/validate'

export default {
  props: {
    to: {
      type: String,
      required: true
    }
  },
<<<<<<< HEAD
  methods: {
    linkProps (url) {
      if (isExternal(url)) {
        return {
          is: 'a',
          href: url,
=======
  computed: {
    isExternal () {
      return isExternal(this.to)
    },
    type () {
      if (this.isExternal) {
        return 'a'
      }
      return 'router-link'
    }
  },
  methods: {
    linkProps (to) {
      if (this.isExternal) {
        return {
          href: to,
>>>>>>> e3633d95afd5e894053241692fe8a95f8b70f9e6
          target: '_blank',
          rel: 'noopener'
        }
      }
      return {
<<<<<<< HEAD
        is: 'router-link',
        to: url
=======
        to: to
>>>>>>> e3633d95afd5e894053241692fe8a95f8b70f9e6
      }
    }
  }
}
</script>
