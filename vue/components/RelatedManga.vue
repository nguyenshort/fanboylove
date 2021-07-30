<template>
  <div
      class="row c-row related-manga"
      v-observe-visibility="{
        callback: visibilityChanged,
        once: true,
      }"
  >
    <div class="col-12 col-sm-12 col-md-12 col-lg-12">
      <div class="c-blog__heading style-2 font-heading"><h4><i
          class="icon ion-ios-star"></i>
        CÓ THỂ BẠN CŨNG THÍCH
      </h4></div>
    </div>
    <div v-for="(story, index) in stories" :key="index" class="col-12 col-sm-6 col-md-3">
      <div class="related-reading-wrap">
        <div class="related-reading-img widget-thumbnail c-image-hover">
          <a :href="`/truyen-tranh/${story.slug}.${story._id}`" :title="story.title">
            <img
                width="75"
                height="106"
                :data-src="story.avatar"
                src="https://live.mangabooth.com/wp-content/uploads/2017/10/wallhaven-550105-110x150.jpg"
                alt="Ghét Anh Thích Anh"
                class="img-responsive effect-fade lazyload"
            >
          </a>
        </div>
        <div class="related-reading-content">
          <h5 class="widget-title">
            <a :href="`/truyen-tranh/${story.slug}.${story._id}`" :title="story.title">
              {{ story.title }}
            </a>
          </h5>
        </div>
        <div class="post-on font-meta">
          <span>
          {{ formatTime(story.updatedAt) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment"

export default {
  name: "RelatedManga",
  data() {
    return {
      stories: []
    }
  },
  methods: {
    async visibilityChanged(isVisible, entry) {
      if (isVisible) {
        const { data } = await this.$http.get('/api/stories/related', {
          params: {
            order: 'createdAt',
            page: 0,
            limit: 4
          }
        })
        this.stories = data
      }
    },
    formatTime(time) {
      return moment(time).locale('vi').format('ll')
    }
  }
}
</script>