<template>
  <div class="page-content-listing item-default" id="loop-listing">
    <div
        v-for="(group, index) in listStories"
        :key="index"
        class="page-listing-item"
    >
      <div class="row row-eq-height">
        <div v-for="(item, index2) in group" :key="index2" class="col-12 col-md-6">
          <div class="page-item-detail text">
            <div class="item-thumb hover-details c-image-hover">
              <a :href="`/truyen-tranh/${item.story.slug}.${item.story._id}`" :title="item.story.title">
                <img
                    width="110"
                    height="150"
                    :data-src="item.story.avatar"
                    data-sizes="(max-width: 110px) 100vw, 110px"
                    class="img-responsive effect-fade lazyload"
                    src="https://live.mangabooth.com/wp-content/uploads/2017/10/wallhaven-550105-110x150.jpg"
                    style="padding-top:150px;"
                    alt="wallhaven-550105"
                />
              </a>
            </div>
            <div class="item-summary">
              <div class="post-title font-title">
                <h3 class="h5">
                  <span v-if="item.story.badge" class="manga-title-badges <%= story.badge.toLowerCase() %>">
                        {{ item.story.badge }}
                  </span>
                  <a :href="`/truyen-tranh/${item.story.slug}.${item.story._id}`" :title="item.story.title">
                    {{ item.story.title }}
                  </a>
                </h3>
              </div>
              <div class="meta-item rating">
                <div class="post-total-rating allow_vote">
                  <i class="ion-ios-star ratings_stars rating_current"></i>
                  <i class="ion-ios-star ratings_stars rating_current"></i>
                  <i class="ion-ios-star ratings_stars rating_current"></i>
                  <i class="ion-ios-star ratings_stars rating_current"></i>
                  <i class="ion-ios-star-half ratings_stars rating_current_half"></i>
                  <span class="score font-meta total_votes">4.3</span>
                </div>
              </div>
              <div class="list-chapter">
                <div
                    v-for="(chapter, index2) in item.chapters"
                    :key="index2"
                    class="chapter-item"
                >
                  <span class="chapter font-meta">
                    <a
                        :href="`/truyen-tranh/${item.story.slug}.${item.story._id}/${chapter.slug}.${chapter._id}`"
                        class="btn-link"
                    >
                      {{ chapter.name }}
                    </a>
                  </span>
                  <span class="post-on font-meta">
                    {{ formatTime(chapter.createdAt) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <nav class="navigation-ajax">
      <a
          href="javascript:void(0)"
          id="navigation-ajax"
          class="btn btn-default load-ajax"
          :class="{
                  'show-loading': isLoading
                 }"
          @click="getStories()"
      >
        <div class="load-title">
          XEM THÊM
          <i class="icon ion-md-arrow-dropdown"></i>
        </div>
        <div></div>
        <div></div>
        <div></div>
      </a>
    </nav>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: "LoopInfinite",
  props: {
    endpoint: {
      type: String,
      require: true
    },
    params: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      isLoading: false,
      page: 1,
      stories: []
    }
  },
  computed: {
    listStories() {
      const list = []
      for (let index = 0; index < this.stories.length / 2; index++) {
        list.push(this.stories.slice(index * 2, index * 2 + 2))
      }
      return list
    }
  },
  methods: {
    async getStories() {
      this.isLoading = true
      try {
        const {data} = await this.$http.get(
            this.endpoint,
            {
              params: Object.assign({}, this.params, { page: this.page, limit: 8 })
            }
        )
        if (data.length) {
          this.stories.push(...data)
        }
        this.page++
      } catch (e) {
      }
      this.isLoading = false
    },

    formatTime(time) {
      return moment(time).locale('vi').format('ll')
    }
  }
}
</script>