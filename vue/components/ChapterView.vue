<template>
  <div class="page-break no-gaps">
    <v-stage
      v-observe-visibility="{
        callback: visibilityChanged,
        once: true
      }"
      :config="stageSize"
      @contextmenu.native.prevent
    >
      <v-layer ref="layer">
        <v-image
          :config="{
            image: image
          }"
        />
      </v-layer>
    </v-stage>
  </div>
</template>

<script>
const width = window.innerWidth

export default {
  name: 'ChapterView',
  props: {
    imageData: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      width,
      pic: this.imageData,
      stageSize: {
        width: width >= 800 ? 800 : width,
        height: 450
      },
      image: null
    }
  },
  methods: {
    async visibilityChanged(isVisible, entry) {
      if (isVisible) {
        const image = new window.Image()
        image.src = this.pic
        image.onload = () => {
          const { width, height } = this.resizeImage(image.naturalWidth, image.naturalHeight, this.width)
          this.stageSize.width = width
          this.stageSize.height = height
          image.width = width
          image.height = height
          this.image = image
        }
      }
    },

    resizeImage(_naturalWidth, _naturalHeight, _width) {
      if (_width > 850) {
        return {
          width: 850,
          height: Math.round((_naturalHeight * 850) / _naturalWidth)
        }
      } else {
        return {
          width: _width,
          height: Math.round((_naturalHeight * _width) / _naturalWidth)
        }
      }
    }
  }
}
</script>
