import { graphUrl } from "configs/public_url";
import axios from "axios";
import Swal from 'sweetalert2';

export const getPortofolioQuery = async (maxLength = '999', withNotif = true) => {
  let headers = {
    "Content-Type": "application/json",
  };

  let queryData = JSON.stringify({
    query: `query NewQuery {
      allPortfolio(first: ${maxLength}) {
        edges {
          node {
            id
            portfolioId
            title
            product {
              namePortfolio
              headline1
              subHeadline1
              bannerHeadline1 {
                sourceUrl
                uri
              }
              headline2
              subHeadline2
              linkWebsite
              linkPlaystore
              linkAppStore
              gambar {
                sourceUrl
                uri
              }
              judulGambar
              deskripsiGambar
              headline3
              subHeadline3
              judulCard1
              deskripsiCard1
              judulCard2
              deskripsiCard2
              judulCard3
              deskripsiCard3
              headline4
              subHeadline4
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

export const getCategoryPortfolioQuery = async (withNotif = true) => {
  let headers = {
    "Content-Type": "application/json",
  };

  let queryData = JSON.stringify({
    query: `query MyQuery2 {
      kategoriPortopolio {
        edges {
          node {
            id
            name
            kategoriPortofolioId
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
