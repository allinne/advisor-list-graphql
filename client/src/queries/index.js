export const advisorsQuery = `
  {
    getAdvisors {
      id
      name
      status
      language
      reviewNumber
    }
  }
`;

export const infinityAdvisorsQuery = (afterCursor, itemCount = 30) => {
  return `{
    getInfinityAdvisors(first: ${itemCount}, afterCursor: "${afterCursor}") {
      totalCount
      edges {
        cursor
        node {
          id
          name
          status
          language
          reviewNumber
        }
      }
      pageInfo {
        hasNextPage
        startCursor
      }
    }
  }`
};
