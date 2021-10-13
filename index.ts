import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "apollo-server";
import { makeSchema } from "nexus";
import { join } from "path";
import {
  CommentMutation,
  CommentType,
  PostQuery,
  PostType,
  UpvoteMutation,
  UpvoteType,
} from "./types";

const schema = makeSchema({
  types: [
    PostType,
    PostQuery,
    CommentType,

    CommentMutation,
    UpvoteType,
    UpvoteMutation,
  ],
  outputs: {
    typegen: join(__dirname, "./generated/graphql-types.ts"),
    schema: join(__dirname, "./generated/schema.graphql"),
  },
  contextType: {
    module: join(__dirname, "./index.ts"),
    export: "ContextType",
  },
});

const context = {
  prisma: new PrismaClient(),
};

export type ContextType = typeof context;

const server = new ApolloServer({
  schema,
  context,
});

server.listen().then(({ url }) => console.log(`Server started on ${url}`));
