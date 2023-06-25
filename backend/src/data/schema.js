import { buildSchema } from "graphql";

const schema = buildSchema(`
  scalar Cursor

  type PageInfo {
    startCursor: String
    hasNextPage: Boolean!
  }

  type Advisor {
    id: ID
    name: String
    status: Int
    language: String
    reviewNumber: Int
  }

  type AdvisorsResult {
    totalCount: String
    edges: [AdvisorEdge!]!
    pageInfo: PageInfo!
  }

  type Query {
    getAdvisors: [Advisor]
    getInfinityAdvisors(first: Int, afterCursor: String): AdvisorsResult!
  }

  type AdvisorEdge {
    cursor: Cursor!
    node: Advisor!
  }
`);

export default schema;
