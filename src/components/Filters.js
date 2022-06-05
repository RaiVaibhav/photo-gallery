import DATA from '../utils/data';
const FILTERS = DATA.FILTERS;

export default function FilterPane({ filters, onFilterChange, hide }) {
  const onChange = (e, key) => {
    const filter = Object.assign({}, filters, { [key]: e.target.value })
    onFilterChange(filter)
  };
  const clearFilter = () => {
    const filter = {order_by: FILTERS.ORDER_BY_RELEVANT}
    onFilterChange(filter, true);

  }
  return (
    <div className="rounded-md shadow-md max-w-screen-xl m-auto overflow-y-hidden py-9 px-3 justify-between flex-wrap" style={{ display: hide ? 'none': 'flex'}}>
      <div className="flex flex-row gap-14 flex-wrap px-12">
        <div className="flex flex-col">
          <span className="text-md font-semibold mb-2">SORT BY</span>
          <div className="flex flex-nowrap	mb-2">
            <input
              className="appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-gray-500 checked:border-gray-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              type="radio"
              value={FILTERS.ORDER_BY_RELEVANT}
              checked={filters["order_by"] === FILTERS.ORDER_BY_RELEVANT}
              onChange={(e) => onChange(e, "order_by")}
            />
            <label
              className="inline-block text-gray-800"
              htmlFor="flexRadioDefault1"
            >
              Relevance
            </label>
          </div>
          <div className="">
            <input
              className="appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-gray-500 checked:border-gray-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              type="radio"
              value={FILTERS.ORDER_BY_LATEST}
              checked={filters["order_by"] === FILTERS.ORDER_BY_LATEST}
              onChange={(e) => onChange(e, "order_by")}
            />
            <label
              className=" inline-block text-gray-800"
              htmlFor="flexRadioDefault1"
            >
              Newest
            </label>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-md font-semibold mb-2">COLOR</span>
          <div className="flex-nowrap mb-2">
            <input
              className="appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-gray-500 checked:border-gray-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              type="radio"
              value={FILTERS.COLOR_ANY}
              checked={filters["color"] === FILTERS.COLOR_ANY}
              onChange={(e) => onChange(e, "color")}
            />
            <label
              className=" inline-block text-gray-800"
              htmlFor="flexRadioDefault1"
            >
              Any Color
            </label>
          </div>
          <div className="">
            <input
              className="appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-gray-500 checked:border-gray-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              type="radio"
              value={FILTERS.COLOR_BG}
              checked={filters["color"] === FILTERS.COLOR_BG}
              onChange={(e) => onChange(e, "color")}
            />
            <label
              className=" inline-block text-gray-800"
              htmlFor="flexRadioDefault1"
            >
              Black and white
            </label>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-md font-semibold mb-2">ORIENTATION</span>
          <div className="flex flex-row gap-11">
            <div className="flex flex-col">
              <div className="flex flex-nowrap mb-2">
                <input
                  className=" appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-gray-500 checked:border-gray-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="radio"
                  value={FILTERS.ORIENTATION_ANY}
                  checked={filters["orientation"] === FILTERS.ORIENTATION_ANY}
                  onChange={(e) => onChange(e, "orientation")}
                />
                <label
                  className=" inline-block text-gray-800"
                  htmlFor="flexRadioDefault1"
                >
                  Any
                </label>
              </div>
              <div className="flex flex-nowrap mb-2">
                <input
                  className="appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-gray-500 checked:border-gray-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="radio"
                  value={FILTERS.ORIENTATION_LANDSCAPE}
                  checked={
                    filters["orientation"] === FILTERS.ORIENTATION_LANDSCAPE
                  }
                  onChange={(e) => onChange(e, "orientation")}
                />
                <label
                  className="inline-block text-gray-800"
                  htmlFor="flexRadioDefault1"
                >
                  Landscape
                </label>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-nowrap mb-2">
                <input
                  className=" appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-gray-500 checked:border-gray-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="radio"
                  value={FILTERS.ORIENTATION_SQUARISH}
                  checked={
                    filters["orientation"] === FILTERS.ORIENTATION_SQUARISH
                  }
                  onChange={(e) => onChange(e, "orientation")}
                />
                <label
                  className=" inline-block text-gray-800"
                  htmlFor="flexRadioDefault1"
                >
                  Square
                </label>
              </div>
              <div className="flex flex-nowrap mb-2">
                <input
                  className="appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-gray-500 checked:border-gray-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="radio"
                  value={FILTERS.ORIENTATION_PORTRAIT}
                  checked={
                    filters["orientation"] === FILTERS.ORIENTATION_PORTRAIT
                  }
                  onChange={(e) => onChange(e, "orientation")}
                />
                <label
                  className=" inline-block text-gray-800"
                  htmlFor="flexRadioDefault1"
                >
                  Portrait
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-md font-semibold mb-2">RESTRICTION LEVEL</span>
          <div className="flex flex-row gap-11">
            <div className="flex flex-col">
              <div className="flex flex-nowrap mb-2">
                <input
                  className=" appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-gray-500 checked:border-gray-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="radio"
                  value={FILTERS.CONTENT_FILTER_LOW}
                  checked={filters["content_filter"] === FILTERS.CONTENT_FILTER_LOW}
                  onChange={(e) => onChange(e, "content_filter")}
                />
                <label
                  className=" inline-block text-gray-800"
                  htmlFor="flexRadioDefault1"
                >
                  Any
                </label>
              </div>
              <div className="flex flex-nowrap mb-2">
                <input
                  className="appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-gray-500 checked:border-gray-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="radio"
                  value={FILTERS.CONTENT_FILTER_HIGH}
                  checked={
                    filters["content_filter"] === FILTERS.CONTENT_FILTER_HIGH
                  }
                  onChange={(e) => onChange(e, "content_filter")}
                />
                <label
                  className="inline-block text-gray-800"
                  htmlFor="flexRadioDefault1"
                >
                  Landscape
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
          className="ml-auto self-end	h-fit bg-gray-700 hover:bg-gray-700 text-white font-bold py-2 px-4 border border-gray-700 rounded-3xl"
          onClick={() => clearFilter()}
        >
          Clear Filters
        </button>
    </div>
  );
}
