<template>
  <div class="part-of-speech">
    <label
      v-for="speechPart in speechParts"
      :key="speechPart"
      class="part-of-speech_check-cont"
    >
      <input
        type="checkbox"
        :value="speechPart"
        v-model="checkedParts"
        @change="onChangeCheckbox"
        class="part-of-speech_checkbox"
      />
      {{speechPart}}
      <span class="part-of-speech_check-mark" />
    </label>
  </div>
</template>

<script>
export default {
  name: 'PartOfSpeechFilter',
  props: {
    speechParts: Array
  },
  data() {
    return {
      checkedParts: []
    };
  },
  methods: {
    onChangeCheckbox() {
      this.$emit('filter-changed', this.checkedParts);
    }
  }
};
</script>

<style scoped lang="less">
  .part-of-speech {
    display: flex;
    flex-direction: column;
    font-size: 12px;

    &_check-cont {
      position: relative;
      padding-left: 25px;
      line-height: 20px;
      margin-bottom: 5px;
    }

    &_checkbox {
      position: absolute;
      opacity: 0;
      cursor: pointer;

      &:checked ~ .part-of-speech_check-mark {
        background-color: #2196F3;
      }
    }

    &_check-mark {
      position: absolute;
      top: 0;
      left: 0;
      height: 20px;
      width: 20px;
      background-color: #fff;
      border-radius: 3px;
    }
  }
</style>
