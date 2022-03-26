<template>
  <div ref="imageWrapper" class="images-wrapper">
    <img class="before-image" :src="beforeImage" alt="Before image">
    <div class="compare-overlay" :style="{ width: `${compareWidth}%`}">
      <img class="after-image" :src="afterImage" alt="After image" :style="{ width: `${width}px` }">
    </div>
    <input
      class="compare__range"
      type="range"
      min="0"
      max="100"
      :step="step"
      :value="compareWidth"
      @input="handleInput"
      tabindex="-1"
    />
    <div
      class="handle-wrap"
      :style="{ left: `${compareWidth}%` }"
    >
      <div class="handle">
        <svg
          class="handle__arrow handle__arrow--l"
          xmlns="http://www.w3.org/2000/svg"
          width="24" height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="15 18 9 12 15 6"/>
        </svg>
        <svg
          class="handle__arrow handle__arrow--r"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </div>
      <span class="handle-line"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BeforeAfter',

  props: {
    value: {
      type: Number,
      default: 50
    },

    beforeImage: {
      type: String,
      default: ''
    },

    afterImage: {
      type: String,
      default: ''
    },

    step: {
      type: Number,
      default: 0.1
    }
  },

  data() {
    return {
      width: null,
      compareWidth: this.value,
    }
  },

  mounted() {
    this.width = this.$refs.imageWrapper.getBoundingClientRect().width
    window.addEventListener('resize', this.resizeHandler)
  },

  destroyed() {
    window.removeEventListener('resize', this.resizeHandler)
  },

  methods: {
    handleInput(e) {
      this.compareWidth = e.target.value
    },

    resizeHandler() {
      this.width = this.$refs.imageWrapper.getBoundingClientRect().width
    }
  }
}
</script>

<style scoped>
.images-wrapper {
  width: 100%;
  position: relative;
}

.compare-overlay {
  position: absolute;
  overflow:hidden;
  height: auto;
  top:0;
}

.before-image,
.after-image {
  width: 100%;
  height: auto;
}

.after-image {
  z-index: 2;
  width: 50%;
  position: relative;
}

.compare__range {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 999;
  right: 0;
  left: 0;
  height: 50px;
  cursor: ew-resize;
  background: rgba(0, 0, 0, .4);
  opacity: 0;
}

.handle__arrow {
  position: absolute;
  width: 20px;
}

.handle__arrow--l {
  left:0;
}

.handle__arrow--r {
  right:0;
}

.handle-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  height: 100%;
  transform: translate(-50%, -50%);
  z-index: 5;
}

.handle {
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background: #FF0000;
  border-radius: 50%;
  width: 30px;
  height: 30px;
}

.handle-line {
  content: '';
  position: absolute;
  top:0;
  width: 2px;
  height: 100%;
  background: #FF0000;
  z-index: 4;
  pointer-events:none;
  user-select:none;
}

@media screen and (max-width: 568px) {
  .handle {
    width: 25px;
    height: 25px;
  }

  .handle__arrow {
    width: 20px;
  }
}

@media screen and (max-width: 480px) {
  .handle {
    width: 15px;
    height: 15px;
  }

  .handle__arrow {
    width: 10px;
  }
}
</style>
