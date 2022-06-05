import { createApi } from "unsplash-js";

const accessKey = process.env.REACT_APP_ACCESS_KEY;
const defaultCollectionId = "2423569";

const unsplash = createApi({
  accessKey: accessKey,
});
export const fetchPhotos = async (page) => {
  try {
    const {
      response: { results },
    } = await unsplash.collections.getPhotos({
      collectionId: defaultCollectionId,
      page,
    });
    return results;
  } catch (err) {
    alert("Failed to fetch photos");
  }
};

export const fetchPhotosSearch = async (page, query, filters) => {
  let updatedFilters = {}
  if  (filters) {
    updatedFilters = Object.keys(filters).reduce((map, i) => {
      if(filters[i]) {
        map[i] = filters[i];
      }
      return map
    }, {});
  }
  try {
    const queryFiltered = textToQuery(query);
    const {
      response: { results },
    } = await unsplash.search.getPhotos({
      query: queryFiltered,
      page,
      ...updatedFilters && updatedFilters
    });
    return results;
  } catch (err) {
    console.log(err);
    alert("Failed to fetch photos");
  }
};

function textToQuery(string) {
  let regex = /\W/;
  return string.replace(regex, "+");
}
