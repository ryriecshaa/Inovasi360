import { graphUrl } from "configs/public_url";
import axios from "axios";
import Swal from 'sweetalert2';

export const getFooterQuery = async (withNotif = true) => {
    let headers = {
        "Content-Type": "application/json",
    };

    let queryData = JSON.stringify({
        query: `query MyQuery {
            allWordingFooter {
              edges {
                node {
                  wording {
                    judul
                    subJudul
                    aksiTerapkan
                  }
                }
              }
            }
          }`,
        variables: {}
    });

    return await axios.post(graphUrl, queryData, { headers })
        .then((res) => {
            return { status: res.status, ...res.data };
        })
        .catch((error) => {
            if (withNotif) {
                Swal.fire('Gagal !', (error.response && error.response.data && error.response.data.message) ? error.response.data.message : error.toString(), 'error')
                return [];
            }
            console.log(error);
        });
};
