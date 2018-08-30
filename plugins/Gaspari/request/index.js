const axios = require("axios");
const headers = require("./header");

async function getTickets(dataAndata) {
  return axios.post(
    "https://www.gasparionline.it/cerca-corse/",
    {
      ar: "false",
      ba: "normal",
      bagagli: "0",
      dataAndata,
      dataRitorno: "",
      end: "22",
      qt: "1",
      start: "3",
      step: "1a",
      submit: "Cerca"
    },
    { headers }
  );
}

module.exports = getTickets();
