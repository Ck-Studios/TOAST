import {createHttpLink} from "apollo-link-http";
import {setContext} from "apollo-link-context";
import {InMemoryCache} from "apollo-cache-inmemory";
import {ApolloClient} from 'apollo-client';
import {AsyncStorage} from "react-native";

const TOKEN_KEY = "@Toast:token1234";

// GRAPHQL ENDPOINT
// const GRAPHQL_URL = 'http://127.0.0.1:8000/api/v2/';
const GRAPHQL_URL = 'https://luna.toast.one/api/v2/';

const httpLink = new createHttpLink({
  uri: GRAPHQL_URL,
});

async function _storeToken(token) {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  }
  catch (e) {
    console.warn(e)
  }
}


const client = (function () {
    let instance;
    return {
      getInstance: function () {
        if (instance == null) {
          const authLink = setContext(async (_, {headers}) => {
            const token = await AsyncStorage.getItem(TOKEN_KEY);
            if (!token)
              return {
                headers: {
                  ...headers,
                }
              };
            else
              return {
                headers: {
                  ...headers,
                  authorization: `JWT ${token}`,
                }
              };
          });
          instance = new ApolloClient({
            link: authLink.concat(httpLink),
            cache: new InMemoryCache()
          });
        }
        return instance;
      },
      setToken: function (token) {
        _storeToken(token);
        const authLink = setContext(async (_, {headers}) => {
          const token = await AsyncStorage.getItem(TOKEN_KEY);
          return {
            headers: {
              ...headers,
              authorization: `JWT ${token}`,
            }
          };
        });
        instance = new ApolloClient({
          link: authLink.concat(httpLink),
          cache: new InMemoryCache()
        });
      }
    }
  }
)();

export default client;
