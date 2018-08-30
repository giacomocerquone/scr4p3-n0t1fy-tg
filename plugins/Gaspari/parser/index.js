const cheerio = require("cheerio");

function parseHtml(page) {
  const $ = cheerio.load(page);
  const rides = $(".table-result").find("tr");
  if (rides.length > 0) {
    rides.each((i, ride) => {
      const cl = ride.children();
      if (cl.eq(4).text() < 9) {
        return {
          departure: cl.eq(0).text(),
          arrival: cl.eq(1).text(),
          duration: cl.eq(2).text(),
          price: cl.eq(4).text()
        };
      }
      return null;
    });
  }
}

function parser(data) {
  let parsedData = [];
  if (Array.isArray(data)) {
    parsedData = data.map(page => parseHtml(page)).filter(page => page && page);
  } else {
    parsedData = [parseHtml(data)];
  }
  return parsedData;
}

module.exports = parser;
