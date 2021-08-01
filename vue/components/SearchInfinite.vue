<template>
  <div id="loop-listing" class="page-content-listing item-default">
    <div
      v-for="(group, index) in listStories"
      :key="index"
      class="page-listing-item"
    >
      <div class="row row-eq-height">
        <story-item
          v-for="(item, index2) in group"
          :key="index2"
          :story="item.story"
          :chapters="item.chapters"
        />
      </div>
    </div>
    <nav class="navigation-ajax">
      <a
        id="navigation-ajax"
        href="javascript:void(0)"
        class="btn btn-default load-ajax"
        :class="{
          'show-loading': isLoading
        }"
        @click="getStories()"
      >
        <div class="load-title">
          XEM THÊM
          <i class="icon ion-md-arrow-dropdown" />
        </div>
        <div />
        <div />
        <div />
      </a>
    </nav>
  </div>
</template>

<script>
import moment from 'moment'
import { SEARCH_STORY } from '../graphql/queries'
import StoryItem from './includes/StoryItem.vue'

export default {
  name: 'LoopInfinite',
  components: { StoryItem },
  props: {
    keyword: {
      type: String,
      required: true
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
        const {
          data: { searchStoriesWithChapter }
        } = await this.$apollo.query({
          query: SEARCH_STORY,
          variables: {
            keyword: this.keyword,
            page: this.page,
            limit: 8
          }
        })
        if (searchStoriesWithChapter.length) {
          this.stories.push(...searchStoriesWithChapter)
        }
      } catch (e) {}
      this.page++
      this.isLoading = false
    }
  }
}
</script>
