<template>
  <div class="col-12 col-md-6">
    <div class="page-item-detail text">
      <div class="item-thumb hover-details c-image-hover">
        <a
          :href="`/truyen-tranh/${story.slug}.${story._id}`"
          :title="story.title"
        >
          <img
            width="110"
            height="150"
            :data-src="story.avatar"
            data-sizes="(max-width: 110px) 100vw, 110px"
            class="img-responsive effect-fade lazyload"
            src="https://live.mangabooth.com/wp-content/uploads/2017/10/wallhaven-550105-110x150.jpg"
            style="padding-top: 150px"
            alt="wallhaven-550105"
          />
        </a>
      </div>
      <div class="item-summary">
        <div class="post-title font-title">
          <h3 class="h5">
            <span v-if="story.badge" class="manga-title-badges">
              {{ story.badge }}
            </span>
            <a
              :href="`/truyen-tranh/${story.slug}.${story._id}`"
              :title="story.title"
            >
              {{ story.title }}
            </a>
          </h3>
        </div>
        <div class="meta-item rating">
          <div class="post-total-rating allow_vote">
            <i class="ion-ios-star ratings_stars rating_current" />
            <i class="ion-ios-star ratings_stars rating_current" />
            <i class="ion-ios-star ratings_stars rating_current" />
            <i class="ion-ios-star ratings_stars rating_current" />
            <i class="ion-ios-star-half ratings_stars rating_current_half" />
            <span class="score font-meta total_votes">4.3</span>
          </div>
        </div>
        <div class="list-chapter">
          <div
            v-for="(chapter, index2) in chapters"
            :key="index2"
            class="chapter-item"
          >
            <span class="chapter font-meta">
              <a
                :href="`/truyen-tranh/${story.slug}.${story._id}/${chapter.slug}.${chapter._id}`"
                class="btn-link"
              >
                {{ chapter.name }}
              </a>
            </span>
            <span class="post-on font-meta">
              <span
                v-if="Date.now() < chapter.createdAt + 259200000"
                class="c-new-tag"
              >
                <img src="/images/new.gif" alt="" >
              </span>
              <span v-else>
                {{ $moment(chapter.createdAt).format('ll') }}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'StoryItem',
  props: {
    story: {
      type: Object,
      required: true
    },
    chapters: {
      type: Array,
      required: true
    }
  }
}
</script>
