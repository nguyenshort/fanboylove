<template>
  <div
    v-observe-visibility="{
      callback: visibilityChanged,
      once: true
    }"
    class="row c-row related-manga"
  >
    <div class="col-12 col-sm-12 col-md-12 col-lg-12">
      <div class="c-blog__heading style-2 font-heading">
        <h4>
          <i class="icon ion-ios-star" />
          CÓ THỂ BẠN CŨNG THÍCH
        </h4>
      </div>
    </div>
    <div
      v-for="(story, index) in stories"
      :key="index"
      class="col-12 col-sm-6 col-md-3"
    >
      <div class="related-reading-wrap">
        <div class="related-reading-img widget-thumbnail c-image-hover">
          <a
            :href="`/truyen-tranh/${story.slug}.${story._id}`"
            :title="story.title"
          >
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
            <a
              :href="`/truyen-tranh/${story.slug}.${story._id}`"
              :title="story.title"
            >
              {{ story.title }}
            </a>
          </h5>
        </div>
        <div class="post-on font-meta">
          <span>
            {{ $moment(story.updatedAt).format('ll') }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { STORIES_RELATED } from '../graphql/queries'

export default {
  name: 'RelatedManga',
  data() {
    return {
      stories: []
    }
  },
  methods: {
    async visibilityChanged(isVisible, entry) {
      if (isVisible) {
        const {
          data: { getStoriesRelated }
        } = await this.$apollo.query({
          query: STORIES_RELATED
        })
        this.stories = getStoriesRelated
      }
    }
  }
}
</script>
