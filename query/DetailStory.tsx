import { graphUrl } from "configs/public_url";
import axios from "axios";
import Swal from 'sweetalert2';

export const getDetailStory = async (id=0, withNotif = true) => {
    let headers = {
        "Content-Type": "application/json",
    };

    let queryData = JSON.stringify({
        query: `query MyQuery2 {
        storyBy(storyId: ${id}) {
          story {
            judul
            penulis
            story
            banner {
              sourceUrl
          }
        }
      }
    }`,


        variables: {},
    });

    return await axios({
        url: graphUrl,
        method: "POST",
        headers,
        data: queryData,
    })
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
