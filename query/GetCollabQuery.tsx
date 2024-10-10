import { graphUrl } from "configs/public_url";
import axios from "axios";
import Swal from "sweetalert2";

export const GetCollabQuery =async (withNotif = true) => {
    let headers = {
        'Content-Type': 'application/json',
    };

    let queryData = JSON.stringify({
        query: `query NewQuery {
            allKategoriGetCollab(first: 999) {
              edges {
                node {
                  id
                  kategoriGetCollabId
                  name
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



export const FormGetCollabQuery = async (withNotif = true) => {
  let headers = {
    "Content-Type": "application/json",
  };

  let queryData = JSON.stringify({
    query: `query NewQuery {
      allGetCollab(first: 999) {
        edges {
          node {
            id
            applicant {
              nama
              email
              keteranganUser
            }
            kategoriGetCollab {
              edges {
                node {
                  id
                  kategoriGetCollabId
                  name
                }
              }
            }
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

export const AddCollab = async (withNotif = true, category = 0, description = "", name = "", email = "") => {
  let headers = {
    "Content-Type": "application/json",
  };

  let queryData = JSON.stringify({
    category: category,
    name: name,
    description: description,
    email: email
  });

  return await axios({
    url: "https://dev.inovasi360.id/core-service/v1/get-collab",
    method: "POST",
    headers,
    data: queryData,
  })
    .then((res) => {
      Swal.fire('Success !', 'Berhasil input collab', 'success')
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