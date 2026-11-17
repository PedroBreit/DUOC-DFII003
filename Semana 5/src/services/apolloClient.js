import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';

export const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: `${import.meta.env.BASE_URL}graphql`,
  }),
  cache: new InMemoryCache(),
});
