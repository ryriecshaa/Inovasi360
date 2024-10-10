import { graphUrl } from "configs/public_url";
import axios from "axios";
import Swal from "sweetalert2";

export const getCareerQuery =async (withNotif = true) => {
    let headers = {
        'Content-Type': 'application/json',
    };

    let queryData = JSON.stringify({
        query: `query NewQuery {
          allCareer (first: 999) {
            edges {
              node {
                career {
                  keterangan
                  jobDeskripsi
                  skill
                  location {
                    id
                    lokasiCareerId
                    name
                  }
                  jobType {
                    id
                    kategoriCareerId
                    name
                  }
                  posisi {
                    id
                    posisiCareerId
                    name
                  }
                }
                databaseId
                id
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

export const addApplicant = async (
  email:string, 
  file:File, 
  jobType:number, 
  location:number, 
  name:string, 
  phone:string, 
  position:number,
  withNotif = true 
  ) => {
    try {
      const queryParams = {
        email,
        jobType,
        location,
        name,
        phone,
        position
      };
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post("https://dev.inovasi360.id/core-service/v1/career", formData, {
        params : queryParams,
        headers:{
          "Content-Type" : "multipart/form-data"
        }
      })
      Swal.fire('Success !', 'Berhasil apply', 'success').then(function(){window.location.reload()})
      return response.status;
    }
    catch (error) {
      Swal.fire('Gagal !', (error.response && error.response.data && error.response.data.message) ? error.response.data.message : error.toString(), 'error')
      console.error("Error making API Request", error);
      throw error;
    }

}