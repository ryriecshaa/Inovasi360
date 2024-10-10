import { graphUrl } from "configs/public_url";
import axios from "axios";
import Swal from "sweetalert2";

export const getPrivacyAndPolicyQuery = async (maxLength = '999', withNotif = true) => {
  let headers = {
    'Content-Type': 'application/json',
  };

  let queryData = JSON.stringify({
    query: `query MyQuery2 {
          allPrivacyAndPolicy (first: ${maxLength}) {
            edges {
              node {
                privacyAndPolicy {
                  judul
                  subJudul
                  content
                  aksiTerapkan
                }
              }
            }
          }
        }`,
    variables: {},
  });

  return await axios({
    url: graphUrl,
    method: 'POST',
    headers,
    data: queryData
  })

    .then((res) => {
      return { status: res.status, ...res.data };
    })
    .catch((error) => {
      if (withNotif) {
        Swal.fire('Gagal !', (error.response && error.response.data && error.response.data.message) ? error.response.data.message : error.toString(), 'error')
        return []
      }
      console.log(error);
    });
};