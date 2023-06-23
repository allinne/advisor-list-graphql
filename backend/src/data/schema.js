import { buildSchema } from "graphql";

const schema = buildSchema(`
  type Advisor {
    id: ID
    name: String
    status: Int
    language: String
    reviewNumber: Int
  }

  type Query {
    getAdvisors: [Advisor]
  }
`);

export default schema;
