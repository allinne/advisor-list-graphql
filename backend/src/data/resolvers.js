import { Advisor } from './dbConnectors.js';

const resolvers = {
  getAdvisors: async() => {
    try {
      let advisors = await Advisor.find();
      return advisors;
    } catch (error) {
      throw error;
    }
  }
}

export default resolvers;
