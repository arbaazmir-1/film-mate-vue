<template lang="pug">
.inset-0.bg-black.bg-opacity-50.flex.justify-center.items-center.z-50.fixed
  .bg-white.rounded-lg.shadow-lg.p-8.mx-auto(class="md:3/5 lg:w-2/5")
    .logo
      h1
        span.text-blue-500.font-bold Film
        span.text-gray-700.font-bold Mate
    h2.text-lg.font-semi-bold.my-4.text-gray-500 {{ titleMsg }}
    p.text-gray-500 {{ msg }}
    .flex.justify-end.items-center.mt-6
      button.bg-blue-500.text-white.font-medium.py-2.px-4.rounded-full(class="hover:bg-blue-600" @click="method")
        | {{ btnName }}
      button.bg-red-500.text-white.font-medium.py-2.px-4.rounded-full.ml-4(class="hover:bg-red-600" @click="closeModal")
        | Cancel
</template>
<script>
import { defineComponent, ref, defineEmits } from 'vue'

export default defineComponent({
  props: {
    message: { type: String, default: '' },
    title: { type: String, default: '' },
    buttonName: { type: String, default: '' },
    method: { type: Function, default: () => {} }
  },

  emits: ['closeModal'], // define the emitted event

  setup(props, { emit }) {
    // use emit from argument
    const msg = ref(props.message)
    const titleMsg = ref(props.title)
    const btnName = ref(props.buttonName)
    const method = () => {
      props.method()
      emit('closeModal') // emit the event
    }

    const closeModal = () => {
      emit('closeModal')
    }

    return {
      msg,
      titleMsg,
      btnName,
      closeModal,
      method
    }
  }
})
</script>
