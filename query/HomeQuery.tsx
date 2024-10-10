import { graphUrl } from "configs/public_url";
import axios from "axios";
import Swal from 'sweetalert2';

export const HomeSectionOne = async (maxLength = '999', withNotif = true) => {
  let headers = {
    "Content-Type": "application/json",
  };

  let queryData = JSON.stringify({
    query: `query NewQuery {
      allWordingBanner (first: ${maxLength}) {
        edges {
          node {
            id
            title
            wording {
              judul
              subJudul
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

export const HomeSectionTwo = async (maxLength = '999', withNotif = true) => {
  let headers = {
    "Content-Type": "application/json",
  };

  let queryData = JSON.stringify({
    query: `query NewQuery {
      allWordingPortfolioHome (first: ${maxLength}) {
        edges {
          node {
            id
            title
            wording {
              judul
              subJudul
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

export const HomeSectionTwoProduct = async (maxLength = '999', withNotif = true) => {
  let headers = {
    "Content-Type": "application/json",
  };

  let queryData = JSON.stringify({
    query: `query NewQuery {
      allPortfolio (first: ${maxLength}) {
        edges {
          node {
            portfolioId
            product {
              headline1
              subHeadline1
              bannerHeadline1 {
                sourceUrl
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

export const HomeSectionThree = async (maxLength = '999', withNotif = true) => {
  let headers = {
    "Content-Type": "application/json",
  };

  let queryData = JSON.stringify({
    query: `query NewQuery {
      allWordingAchievement (first: ${maxLength}) {
        edges {
          node {
            wordingAchievement {
              judul
              subJudul
              judulCard1
              deskripsiCard1
              judulCard2
              deskripsiCard2
              judulCard3
              deskripsiCard3
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

export const HomeSectionFour = async (maxLength = '999', withNotif = true) => {
  let headers = {
    "Content-Type": "application/json",
  };

  let queryData = JSON.stringify({
    query: `query NewQuery {
      allWordingClient (first: ${maxLength}) {
        edges {
          node {
            wordingClient {
              namaPerusahaan
              logo {
                sourceUrl
              }
              terapkan
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

export const HomeSectionFive = async (maxLength = '999', withNotif = true) => {
  let headers = {
    "Content-Type": "application/json",
  };

  let queryData = JSON.stringify({
    query: `query NewQuery {
      allEvent(first: ${maxLength}) {
        edges {
          node {
            id
            event {
              judulEvent
              pemateri
              tanggal
              link
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
