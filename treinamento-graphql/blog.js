/*
query post {
  post(id:1) {
    id
    title
    content
    user {
      id
      username
    }
    comments {
      id
      content
      user {
        id
        username
      }
    }
  }
}
*/

const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
    type Mutation {
      createUser(id: ID! , username: String): User
      deleteUser(id: ID!): User
    }

    type Query {
        posts: [Post]
        post(id: ID!): Post
        users: [User]
        user(id: ID!): User
        comments: [Comment]
    }

    type Post {
      id: ID
      title: String
      content: String
      user: User
      comments: [Comment]
    }

    type User {
        id: ID
        username: String
    }

    type Comment {
      id: ID
      content: String
      post: Post
      user: User
    }
`;


const USERS_MOCK = [
  { id: 1, username: 'User 1' },
  { id: 2, username: 'User 2' },
];

const POSTS_MOCK = [
    { id: 1, title: 'Post 1', content: 'Content for post 1', user: USERS_MOCK[0] },
];

const COMMENTS_MOCK = [
  { id: 1, content: 'Content for a comment made by an user on post 1', post: POSTS_MOCK[0], user: USERS_MOCK[1] },
];

const resolvers = {
    Mutation: {
      createUser: (_, { id, username }) => {
        const user = { id, username };

        if (USERS_MOCK.find(findUser => findUser.id === id)) {
          throw Error('This user already exists');
        }

        USERS_MOCK.push(user);

        return user;
      },
      deleteUser: (_, { id }) => {
        const user = USERS_MOCK.findIndex(findUser => findUser.id === id);

        if (user === -1) {
          throw Error('This user does not exist');
        }

        USERS_MOCK.splice(user, 1);

        return USERS_MOCK[user];
      },
    },
    Query: {
        posts: () => POSTS_MOCK,
        post: (_, { id }) => {
          const post = POSTS_MOCK.find(findPost => findPost.id === id);

          if (!post) {
            throw Error('This post does not exist');
          }

          const comments = COMMENTS_MOCK.filter(filterComment => filterComment.post.id === id);
          post.comments = comments;

          return post;
        },
        users: () => USERS_MOCK,
        user: (_, { id }) => {
          const user = USERS_MOCK.find(findUser => findUser.id === id);

          if (!user) {
            throw Error('This user does not exist');
          }

          return user;
        },
        comments: () => COMMENTS_MOCK,
    }
};

const server = new ApolloServer({ typeDefs, resolvers});
server.listen().then(({ url }) => console.log(`Server listing at ${url}`));
