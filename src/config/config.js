// require("dotenv").config();
const CryptoJS = require("crypto-js");
const dataEncryptionKey = process.env.REACT_APP_DATAENCRYPTION_KEY;
export const ENV = {
  baseUrl: process.env.REACT_APP_BASE_URL,
  chainId: process.env.REACT_APP_CHAIN_ID,
  WEBSOCKET_URL: process.env.REACT_APP_WEB_SOCKET_URL,
  contractAddress: process.env.REACT_APP_MINT_CONTRACT,
  clientId: process.env.REACT_APP_CLIENT_ID,
  fileBaseUrl: process.env.REACT_APP_FILE_URL,

  encryptUserData: function (data) {
    const userData = localStorage.getItem("encuse");
    if (userData && !data.accessToken) {
      const bytes = CryptoJS.AES.decrypt(userData, dataEncryptionKey);
      let originalData = bytes.toString(CryptoJS.enc.Utf8);
      originalData = JSON.parse(originalData);
      if (originalData && originalData.accessToken) {
        data.accessToken = originalData.accessToken;
      }
    }
    data = JSON.stringify(data);
    const encryptedUser = CryptoJS.AES.encrypt(
      data,
      dataEncryptionKey
    ).toString();
    localStorage.setItem("encuse", encryptedUser);
    return true;
  },
  getUserKeys: function (keys) {
    const userData = localStorage.getItem("encuse");
    if (userData) {
      const bytes = CryptoJS.AES.decrypt(userData, dataEncryptionKey);
      let originalData = bytes.toString(CryptoJS.enc.Utf8);
      originalData = JSON.parse(originalData);
      let user = {};
      if (keys) {
        keys = keys.split(" ");
        for (const key in keys) {
          const keyV = keys[key];
          user[keyV] = originalData[keyV];
        }
      } else {
        user = originalData;
      }
      return user;
    }
    return {};
  },
};
