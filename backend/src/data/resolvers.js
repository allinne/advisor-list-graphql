import { Advisors } from './dbConnectors.js';

const resolvers = {
  getAdvisors: async() => {
    try {
      let advisors = await Advisors.find();
      return advisors;
    } catch (error) {
      throw error;
    }
  }
}

export default resolvers;
