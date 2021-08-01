import gql from 'graphql-tag'

export const GET_STORIES = gql`
  query getStoriesWithChapter($order: String!, $page: Int!, $limit: Int!) {
    getStoriesWithChapter(order: $order, page: $page, limit: $limit) {
      story {
        _id
        title
        slug
        rating
        avatar
        categories {
          _id
          name
          slug
        }
      }
      chapters {
        _id
        name
        slug
        createdAt
      }
    }
  }
`

export const GET_STORIES_BY_CATEGORY = gql`
  query getStoriesWithChapterByCategory(
    $order: String!
    $page: Int!
    $limit: Int!
    $id: Float!
  ) {
    getStoriesWithChapterByCategory(
      id: $id
      order: $order
      page: $page
      limit: $limit
    ) {
      story {
        _id
        title
        slug
        avatar
        categories {
          _id
          name
          slug
        }
      }
      chapters {
        _id
        name
        slug
        createdAt
      }
    }
  }
`

export const QUICK_SEARCH = gql`
  query quickSeaach($keyword: String!, $size: Int!) {
    quickSearch(keyword: $keyword, size: $size) {
      _id
      title
      slug
    }
  }
`

export const SEARCH_STORY = gql`
  query searchStoriesWithChapter($keyword: String!, $page: Int!, $limit: Int) {
    searchStoriesWithChapter(keyword: $keyword, page: $page, limit: $limit) {
      story {
        _id
        title
        slug
        avatar
        categories {
          _id
          name
          slug
        }
      }
      chapters {
        _id
        name
        slug
        createdAt
      }
    }
  }
`

export const STORIES_RELATED = gql`
  query {
    getStoriesRelated {
      _id
      title
      avatar
      slug
      updatedAt
    }
  }
`
