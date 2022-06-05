import React, { useEffect, useCallback, useRef, useState } from "react";
import { useInfiniteScroll } from "./utils/infiniteScroll";
import { ContainerGrid } from "./components/Grid.js";
import { fetchPhotos, fetchPhotosSearch } from "./utils/fetchData";
import { removeDulpicateImages, ModalProvider } from "./utils/lib";
import { Header } from "./components/Header";
import Filters from "./components/Filters";

import data from "./utils/data";

import DATA from "./utils/data";

const SpinIcon = () => (
  <svg
    className="animate-spin  m-auto flex items-center text-center justify-center text-3xl h-10 w-10 text-black"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);
const FILTERS = DATA.FILTERS;

const screenWidths = [
  data.SCREEN_WIDTH_1COLUMN,
  data.SCREEN_WIDTH_2COLUMNS,
  data.SCREEN_WIDTH_3COLUMNS,
];

const imageWidths = [
  data.IMAGE_WIDTH_1COLUMN,
  data.IMAGE_WIDTH_2COLUMNS,
  data.IMAGE_WIDTH_3COLUMNS,
];

function App() {
  let fetching = useRef(true);

  const [photosArray, setPhotosArray] = useState([]);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilterPane, setShowFilterPane] = useState(false);
  const infiniteLoadRef = useRef(null);

  const [filters, setFilters] = useState({
    order_by: FILTERS.ORDER_BY_RELEVANT,
  });

  useEffect(() => {
    const getPhotos = async (searchText) => {
      setIsLoading(true);
      let nextPhotos;
      if (searchText === null) {
        nextPhotos = await fetchPhotos(page);
      } else {
        nextPhotos = await fetchPhotosSearch(page, searchText, filters);
      }
      if (page === 1) {
        if (nextPhotos && nextPhotos.length === 0) {
          setErrorMessage("No results found");
          setPhotosArray([]);
          setPhotosArray([]);
        } else {
          setErrorMessage(null);
        }
        setPhotosArray(nextPhotos);
        window.scrollTo(0, 0);
      } else {
        setPhotosArray((prevPhotos) =>
          removeDulpicateImages(prevPhotos, nextPhotos)
        );
      }

      fetching.current = false;
      setIsLoading(false);
    };

    getPhotos(searchText);
  }, [page, searchText, filters]);

  const updatePage = useCallback(() => {
    if (!fetching.current) {
      fetching.current = true;
      setPage((prevPage) => {
        return prevPage + 1;
      });
    }
  }, []);

  const resetData = useCallback(() => {
    setErrorMessage(null);
    setPhotosArray([]);
    setSearchText(null);
    setPage(1);
  }, []);

  useInfiniteScroll(infiniteLoadRef, updatePage);

  const onFilterChange = useCallback((val, reset) => {
    setErrorMessage(null);
    setPage(1);
    setPhotosArray([]);
    setFilters(val);
    reset && setShowFilterPane(false);
  }, []);

  return (
    <>
      <Header
        height={data.HEADER_HEIGHT}
        resetData={resetData}
        searchCallback={(value) => {
          setPage(1);
          setSearchText(value);
        }}
        isLoading={isLoading}
        filterDisabled={!searchText}
        onFilterClick={() => setShowFilterPane(!showFilterPane)}
      />
      <div style={{ height: data.HEADER_HEIGHT * 1.5 }}></div>
      <div>
        <Filters
          hide={!showFilterPane || !searchText}
          filters={filters}
          onFilterChange={onFilterChange}
        />
        <ModalProvider>
          <ContainerGrid
            photosArray={photosArray}
            screenWidths={screenWidths}
            imageWidths={imageWidths}
            minColumns={1}
            rowGap={data.ROW_GAP}
            columnGap={data.COLUMN_GAP}
          />
        </ModalProvider>
      </div>
      {errorMessage && !isLoading && (
        <div className="flex w-full justify-center p-12">{errorMessage}</div>
      )}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <SpinIcon />
        </div>
      )}
      <div style={{ height: 10 }} ref={infiniteLoadRef}></div>
    </>
  );
}

export default App;
