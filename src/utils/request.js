import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import { API_BASE_URL } from "../env";

const defaultRequestOptions = {
  Accept: "application/json",
  "Content-Type": "application/json",
};
const axiosMockInstance = axios.create(defaultRequestOptions);
const axiosLiveInstance = axios.create(defaultRequestOptions);
const axiosAwsLiveInstance = axios.create(defaultRequestOptions);
export const axiosMockAdapterInstance = new AxiosMockAdapter(
  axiosMockInstance,
  { delayResponse: 500 }
);
const axiosInstance = axiosLiveInstance; //USE_MOCK ? axiosMockInstance : axiosLiveInstance;

// if (USE_MOCK) {
//   mocks(axiosMockAdapterInstance);
// }

axiosInstance.defaults.withCredentials = true;
axiosInstance.interceptors.request.use(
  (config) => {
    // config.headers["Authorization"] = `Bearer ${selectUserToken(
    //   store.getState()
    // )}`;

    // config.headers["x-rol-language"] = selectUserLocale(store.getState()) || "en";

    // if (USE_MOCK) {
    //   console.log(`******* REQUEST`);
    //   console.log(`${config.method} ${config.url}`, config);
    //   console.log(`***************`);
    // }

    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  (response) => {
    if (response.errors && response.errors.length > 0) {
      throw response.errors;
    }
    return response;
  },
  (error) => {
    if (
      error.response &&
      error.response.data &&
      error.response.data.errors &&
      error.response.data.errors.length > 0
    ) {
      return Promise.reject(error.response.data.errors.map((err) => err));
    }
    return Promise.reject(error);
  }
);

const getS3AuthUploadUrl = (fileName, mimeType) => {
  //todo: this url must be changed with the back-end API protected behind JWT auth
  return basicRequest(
    `https://s3url.com?key=${fileName}&type=${mimeType}`,
    "GET",
    null,
    {
      withCredentials: false,
    },
    axiosLiveInstance
  );
};

const basicRequest = (url, method, data, header, instance = axiosInstance) => {
  const requestParams = {
    method,
    url,
    data,
    headers: Object.assign({}, defaultRequestOptions, header),
  };

  return instance(requestParams);
};

const userInfoRequest = (path, method = "GET", data = {}, header = {}) => {
  const url = `${API_BASE_URL}${path}`;
  // header["Authorization"] = `Bearer ${selectUserToken(store.getState())}`;
  axiosLiveInstance.defaults.withCredentials = true;
  const requestParams = {
    method,
    url,
    data,
    headers: Object.assign({}, defaultRequestOptions, header),
  };
  return axiosLiveInstance(requestParams);
};

const request = (path, method = "GET", data = {}, header = {}) => {
  const url = `${API_BASE_URL}${path}`;
  return basicRequest(url, method, data, header);
};

const downloadRequest = (path, method = "GET", data = {}, header = {}) => {
  const url = `${API_BASE_URL}${path}`;

  const requestParams = {
    method,
    url,
    data,
    responseType: 'blob',
    withCredentials: true,
    headers: Object.assign({
    }, defaultRequestOptions, header),
  };

  return axiosInstance(requestParams).then((response) => {
      let filename = response.headers.get('Content-Disposition');
      if(filename) {
        filename = filename.split(';')[1]
            .split('filename=')[1]
            .replaceAll('"', '');
      }else{
        filename = "file.xls";
      }
      // create file link in browser's memory
      const href = URL.createObjectURL(response.data);

      // create "a" HTML element with href to file & click
      const link = document.createElement('a');
      link.href = href;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();

      // clean up "a" element & remove ObjectURL
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
  });
};

const s3Upload = async (
  signedURL,
  file,
  formData,
  onProgress,
  onSuccess,
  onError
) => {
  return axiosAwsLiveInstance({
    method: "PUT",
    url: signedURL,
    data: file,
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: ({ total, loaded }) => {
      onProgress(
        { percent: Math.round((loaded / total) * 100).toFixed(2) },
        file
      );
    },
  })
    .then((response) => {
      onSuccess(response, file);
      return response;
    })
    .catch((error) => {
      onError(error);
    });
};

const s3Delete = async (fileName) => {
  //todo: this url must be changed with the back-end API protected behind JWT auth
  return basicRequest(
    `https://url.on.aws?key=${fileName}`,
    "DELETE",
    {},
    {},
    axiosLiveInstance
  )
    .then((response) => {
      return true;
    })
    .catch((err) => false);
};

export { userInfoRequest, request, s3Upload, s3Delete, downloadRequest };
