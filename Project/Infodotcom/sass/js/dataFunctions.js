export const getSearchTerm = () => {
    const rawSearchTerm = document.getElementById("search").value.trim();
    const regex = /[ ]{2,}/gi;
    const searchTerm = rawSearchTerm.replaceAll(regex, " ");
    return searchTerm;
  };
  
  export const retrieveSearchResults = async (searchTerm) => {
    const wikiSearchString = getWikiSearchString(searchTerm);
    const wikiSearchResults = await requestData(wikiSearchString);
    console.log("Wiki search results: ", wikiSearchResults); // Add this line
    let resultArray = [];
    if (wikiSearchResults.hasOwnProperty("query")) {
      resultArray = processWikiResults(wikiSearchResults.query.pages);
    }
    return resultArray;
  };
  

  
  const getWikiSearchString = (searchTerm) => {
    const encodedSearchTerm = encodeURIComponent(searchTerm);
    const rawSearchString = `https://en.wikipedia.org/api/rest_v1/page/title/${encodedSearchTerm}`;
    const searchString = encodeURI(rawSearchString);
    return searchString;
  };
  const getMaxChars = () => {
    const width = window.innerWidth || document.body.clientWidth;
    let maxChars;
    if (width < 414) maxChars = 65;
    if (width >= 414 && width < 1400) maxChars = 100;
    if (width >= 1400) maxChars = 130;
    return maxChars;
  };
  
  const requestData = async (searchString) => {
    try {
      const response = await fetch(searchString);
      console.log("Response: ", response); // Add this line
      const data = await response.json();
      console.log("Data: ", data); // Add this line
      return data;
    } catch (err) {
      console.error(err);
    }
  };
  
  const processWikiResults = (results) => {
    console.log("Results: ", results); // Add this line
    const resultArray = [];
    Object.keys(results).forEach((key) => {
      const id = key;
      const title = results[key].title;
      const text = results[key].extract;
      const img = results[key].hasOwnProperty("thumbnail")
        ? results[key].thumbnail.source
        : null;
      const item = {
        id: id,
        title: title,
        img: img,
        text: text
      };
      resultArray.push(item);
    });
    return resultArray;
  };
  