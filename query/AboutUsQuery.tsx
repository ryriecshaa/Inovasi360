import { graphUrl } from "configs/public_url";
import axios from "axios";
import Swal from "sweetalert2";

export const AboutUsQuery =async (withNotif = true) => {
    let headers = {
        'Content-Type': 'application/json',
    };

    let queryData = JSON.stringify({
        query: `query MyQuery2 {
          allAboutUs {
            edges {
              node {
                id
                aboutUs {
                  headline1
                  subHeadline1
                  judulCard11
                  deskripsiCard11
                  judulCard12
                  deskripsiCard12
                  judulCard13
                  deskripsiCard13
                  headline2
                  subHeadline2
                  judulCard21
                  deskripsiCard21
                  judulCard22
                  deskripsiCard22
                  judulCard23
                  deskripsi23
                  headline3
                  subHeadline3
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