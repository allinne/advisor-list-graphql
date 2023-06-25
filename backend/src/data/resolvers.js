import { Advisor } from './dbConnectors.js';

const resolvers = {
  getAdvisors: async() => {
    try {
      let advisors = await Advisor.find();
      return advisors;
    } catch (error) {
      throw error;
    }
  },
  getInfinityAdvisors: async (args) => {
    const { first, afterCursor } = args;
    let afterIndex = 0;
    const data = await Advisor.find();

    if (afterCursor) {
      let nodeIndex = data.findIndex(datum => datum.id === afterCursor);

      if (nodeIndex >= 0) {
        afterIndex = nodeIndex + 1;
      }
    }
    const slicedData = data.slice(afterIndex, afterIndex + first)

    const edges = slicedData.map(node => ({
      node,
      cursor: node.id
    }));

    let startCursor = null

    if (edges.length > 0) {
      startCursor = edges[edges.length - 1].node.id;
    }

    let hasNextPage = data.length > afterIndex + first;

    return {
      totalCount: data.length,
      edges,
      pageInfo: {
        startCursor,
        hasNextPage,
      },
    };
  }
}

export default resolvers;
