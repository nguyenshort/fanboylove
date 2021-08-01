<template>
  <form
    id="blog-post-search"
    class="ajax manga-search-form"
    action="/tim-kiem"
    method="get"
    :class="{
      isSearch: isLoading,
      has_Result: quickSearch && quickSearch.length
    }"
  >
    <input
      v-model="keyword"
      type="text"
      placeholder="Tìm Kiếm..."
      name="keyword"
      value=""
      class="manga-search-field ui-autocomplete-input"
      autocomplete="off"
      :class="{
        'ui-autocomplete-loading': isLoading
      }"
    />
    <input type="submit" value="Search" />
    <div class="loader-inner line-scale">
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
    <div class="quick-searck-result">
      <div
        v-for="(story, index) in quickSearch"
        :key="index"
        class="quick-searck-item"
      >
        <a
          :title="story.title"
          :href="`/truyen-tranh/${story.slug}.${story._id}`"
        >
          {{ story.title }}
        </a>
      </div>
    </div>
  </form>
</template>

<script>
import { QUICK_SEARCH } from '../graphql/queries'

export default {
  name: 'SearchHeader',
  data() {
    return {
      isLoading: 0,
      keyword: ''
    }
  },
  apollo: {
    quickSearch: {
      query: QUICK_SEARCH,
      variables() {
        return {
          keyword: this.keyword,
          size: 5
        }
      },
      skip() {
        return !this.keyword
      },
      loadingKey: 'isLoading',
      debounce: 300
    }
  }
}
</script>
