import { graphUrl } from "configs/public_url";
import axios from "axios";
import Swal from 'sweetalert2';

export const getDetailPortofolioQuery = async (id = 0, withNotif = true) => {
  let headers = {
    "Content-Type": "application/json",
  };

  let queryData = JSON.stringify({
    query: `query NewQuery {
      portfolioBy(portfolioId: ${id}) {
        product {
          namePortfolio
          headline1
          headline2
          headline3
          headline4
          subHeadline1
          subHeadline2
          subHeadline3
          subHeadline4
          judulCard1
          judulCard2
          judulCard3
          deskripsiCard1
          deskripsiCard2
          deskripsiCard3
          bannerHeadline1 {
            sourceUrl
            uri
          }
          gambar {
            sourceUrl
            uri
          }
          linkAppStore
          linkPlaystore
          linkWebsite
          judulGambar
          deskripsiGambar
        }
        kategoriPortopolio {
          edges {
            node {
              kategoriPortofolioId
              name
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
