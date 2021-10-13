import {
  objectType,
  extendType,
  intArg,
  nonNull,
  stringArg,
  booleanArg,
} from "nexus";

export const PostType = objectType({
  name: "PostType",
  definition: (t) => {
    t.nonNull.id("id");
    t.list.field("comments", {
      type: CommentType,
      resolve: (root, _, ctx) =>
        ctx.prisma.comment.findMany({
          where: {
            postId: root.id,
          },
        }),
    });
  },
});

export const CommentType = objectType({
  name: "CommentType",
  definition: (t) => {
    t.nonNull.id("id");
    t.nonNull.string("content");
    t.nonNull.string("postId");
    t.nonNull.string("userId");

    t.field("post", {
      type: PostType,
      resolve: (root) => ({ id: root.postId }),
    });

    t.list.field("upvotes", {
      type: UpvoteType,
      resolve: async (root, _, ctx) => {
        return ctx.prisma.comment
          .findUnique({
            where: {
              id: root.id,
            },
          })
          .upvotes();
      },
    });

    t.int("upvoteCount", {
      resolve: async (root, _, ctx) =>
        ctx.prisma.upvote.count({
          where: {
            commentId: root.id,
          },
        }),
    });
  },
});

export const PostQuery = extendType({
  type: "Query",
  definition: (t) => {
    t.field("getPostById", {
      type: PostType,
      args: {
        postId: nonNull(stringArg()),
        skip: intArg(),
        take: intArg(),
      },
      resolve: async (_, args, ctx) => {
        let { postId, take, skip } = args;

        take = take || 10;
        skip = skip || 0;

        let comments = await ctx.prisma.comment.findMany({
          where: {
            postId,
          },
          skip,
          take,
        });

        return { id: postId, comments };
      },
    });
  },
});

export const CommentMutation = extendType({
  type: "Mutation",
  definition: (t) => {
    t.field("createComment", {
      type: CommentType,
      args: {
        userId: nonNull(stringArg()),
        postId: nonNull(stringArg()),
        content: nonNull(stringArg()),
      },
      resolve: async (_, args, ctx) => {
        const { userId, postId, content } = args;

        return ctx.prisma.comment.create({
          data: {
            content,

            postId,
            userId,
          },
        });
      },
    });
  },
});

export const UpvoteType = objectType({
  name: "UpvoteType",
  definition: (t) => {
    t.nonNull.id("id");
    t.nonNull.string("userId");
    t.nonNull.string("commentId");

    t.field("comment", {
      type: CommentType,
      resolve: async (root, _, ctx) => {
        return ctx.prisma.comment.findUnique({
          where: {
            id: root.commentId,
          },
        });
      },
    });
  },
});

export const UpvoteMutation = extendType({
  type: "Mutation",
  definition: (t) => {
    t.field("toggleUpvoteOnComment", {
      type: CommentType,
      args: {
        userId: nonNull(stringArg()),
        commentId: nonNull(stringArg()),
      },
      resolve: async (_, args, ctx) => {
        const { commentId, userId } = args;

        let upvoteAlreadyOnPost = await ctx.prisma.upvote.findUnique({
          where: {
            userId_commentId: {
              userId,
              commentId,
            },
          },
        });

        if (!upvoteAlreadyOnPost) {
          await ctx.prisma.upvote.create({
            data: {
              userId,
              commentId,
            },
          });
        } else {
          await ctx.prisma.upvote.delete({
            where: {
              userId_commentId: {
                userId,
                commentId,
              },
            },
          });
        }

        return ctx.prisma.comment.findUnique({
          where: {
            id: commentId,
          },
        });
      },
    });
  },
});
