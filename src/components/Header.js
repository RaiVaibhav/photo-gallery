import React, { useCallback, useMemo } from "react";
import { debounce } from '../utils/lib';

export function Header({
  searchCallback,
  resetData,
  onFilterClick,
  filterDisabled,
}) {
  const searchSubmit = useCallback(
    (value) => {
      if (value !== "") {
        searchCallback(value);
      } else {
        resetData();
      }
    },
    [searchCallback, resetData]
  );

  const onChange = useMemo(() => debounce((e) => {
    searchSubmit(e.target.value)
  }, 500), [searchSubmit])
  return (
    <div className="w-screen  fixed top-0 left-0 bg-white h-[62px] flex items-center p-2.5 z-[11] shadow">
      <div className="w-full flex max-w-screen-xl m-auto ">
        <form
          className="h-10 flex-7 rounded-3xl bg-gray-200 w-full flex items-center pl-2.5 hover:border-gray-500 focus-within:bg-white focus-within:border-gray-500 focus-within:border-[1px]"
          onSubmit={(event) => {
            event.preventDefault();
            searchSubmit(event.currentTarget.input.value);
          }}
        >
          <button
            className="flex items-center justify-center border-none mr-1 bg-none opacity-60 text-gray-300 hover:text-black hover:cursor-pointer"
            type="submit"
          >
            <svg
              className="h-5 w-5 text-gray-500"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {" "}
              <path stroke="none" d="M0 0h24v24H0z" />{" "}
              <circle cx="10" cy="10" r="7" />{" "}
              <line x1="21" y1="21" x2="15" y2="15" />
            </svg>
          </button>
          <input
            className="bg-transparent border-none text-sm font-normal w-full pr-2.5 focus:outline-none active:outline-none"
            placeholder="Search photos"
            name="input"
            autoComplete="off"
            onChange={(event) => onChange(event)}
          ></input>
        </form>
        <button
          className="flex-1 ml-12 bg-gray-700 hover:bg-gray-700 text-white font-bold py-2 px-4 border border-gray-700 rounded-3xl disabled:bg-gray-400 disabled:cursor-not-allowed"
          onClick={onFilterClick}
          disabled={filterDisabled}
        >
          Filters
        </button>
      </div>
    </div>
  );
}
