import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { graphUrl } from "configs/public_url";

export const FaqQuery = async () => {
  const client = new ApolloClient({
    uri: graphUrl,
    cache: new InMemoryCache(),
  });
  const faqData = await client.query({
    query: gql`
      query NewQuery {
        allFAQ {
          edges {
            node {
              id
              kategoriFAQ {
                nodes {
                  id
                  name
                }
              }
              faq {
                jawaban
                pertanyaan
              }
            }
          }
        }
      }
    `,
  });

  const faq = faqData.data.allFAQ.edges;
  return {
    props: {
      faq,
    },
  };
};
