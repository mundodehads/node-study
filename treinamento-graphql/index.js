const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`
    type Query {
        hello: String
        users: [User]
    }

    type User {
        id: ID
        name: String
        email: String
    }
`;

const USERS_MOCK = [
    { id: 1, name: 'User 1', email: 'user1@mail.com' },
    { id: 2, name: 'User 2', email: 'user2@mail.com' },
    { id: 3, name: 'User 3', email: 'user3@mail.com' },
    { id: 4, name: 'User 4', email: 'user4@mail.com' },
    { id: 5, name: 'User 5', email: 'user5@mail.com' },
];

const resolvers = {
    Query: {
        hello: () => 'Hello World',
        users: () => USERS_MOCK,
    }
};

const server = new ApolloServer({ typeDefs, resolvers});
server.listen().then(({ url }) => console.log(`Server started at ${url}`));
