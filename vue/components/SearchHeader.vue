<template>
  <form
      id="blog-post-search"
      class="ajax manga-search-form"
      action="/tim-kiem"
      method="get"
      :class="{
        isSearch: isLoading,
        has_Result: stories.length
      }"
  >
    <input
        type="text"
        placeholder="Tìm Kiếm..."
        name="keyword"
        value=""
        class="manga-search-field ui-autocomplete-input"
        autocomplete="off"
        :class="{
          'ui-autocomplete-loading': isLoading
        }"
        v-model="keyword"
        @keyup="search()"
    >
    <input type="submit" value="Search">
    <div class="loader-inner line-scale">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div class="quick-searck-result">
      <div
          v-for="(story, index) in stories"
          :key="index"
          class="quick-searck-item"
      >
        <a :title="story.title" :href="`/truyen-tranh/${story.slug}.${story._id}`">
          {{ story.title }}
        </a>
      </div>
    </div>
  </form>
</template>

<script>
import debounce from 'lodash.debounce'

export default {
  name: "SearchHeader",
  data() {
    this.search = debounce(this.search, 800)
    return {
      isLoading: false,
      keyword: '',
      stories: []
    }
  },
  methods: {
    async search() {
      if (!this.keyword) {
        return false
      }
      this.isLoading = true
      try {
         const { data } = await this.$http.get('/api/quick-search', {
           params: {
             keyword: this.keyword
           }
         })
        this.stories = data
      } catch (e) {}
      this.isLoading = false
    }
  }
}
</script>