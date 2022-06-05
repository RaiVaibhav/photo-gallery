import { Image } from "./Image";
import { useState, useRef, useEffect } from "react";
import { useScreenResize } from "../utils/handlers";
import { masonryColumns } from "../utils/masonry";

export function ContainerGrid({
  photosArray,
  rowGap,
  columnGap,
  minColumns,
  screenWidths,
  imageWidths,
}) {
  const [maxImageWidth, setMaxImageWidth] = useState(
    imageWidths[imageWidths.length - 1]
  );
  const [currentImageWidth, setCurrentImageWidth] = useState(
    imageWidths[imageWidths.length - 1]
  );
  const [columns, setColumns] = useState([]);
  const [numberOfColumns, setNumberOfColumns] = useState(
    imageWidths.length - 1
  );

  const gridRef = useRef();
  let [screenWidth] = useScreenResize(100);

  useEffect(() => {

    for (let i = 0; i < screenWidths.length; i++) {
      if (screenWidth < screenWidths[i]) {
        setNumberOfColumns(i + minColumns);
        setMaxImageWidth(imageWidths[i]);
        break;
      }
      setNumberOfColumns(screenWidths.length - 1);
      setMaxImageWidth(screenWidths[screenWidths.length - 1]);
    }
  }, [screenWidth, imageWidths, screenWidths, minColumns]);

  useEffect(() => {
    if (photosArray && photosArray.length !== 0) {
      setColumns(
        masonryColumns({
          photosArray,
          numberOfColumns,
          IMAGE_WIDTH: maxImageWidth,
          ROW_GAP: rowGap,
        })
      );
    }
  }, [photosArray, numberOfColumns, rowGap, maxImageWidth]);

  useEffect(() => {
    if (gridRef.current) {
      const newWidth = gridRef.current.clientWidth / columns.length - columnGap;
      if (newWidth > maxImageWidth) {
        setCurrentImageWidth(maxImageWidth);
      } else {
        setCurrentImageWidth(newWidth); //for fullscreen = 1320/3 => 440 => 440 - 26 = 416
      }
    }
  }, [columnGap, screenWidth, columns, maxImageWidth]);

  if (photosArray === undefined || photosArray.length === 0) {
    return null;
  }

  return (
    <div className="grid g-t-col-100 gap-6 justify-evenly max-w-screen-xl m-auto overflow-y-hidden py-8 px-3" style={{ gap: columnGap }} ref={gridRef}>
      {columns.map((column, index) => {
        return (
          <div className="flex flex-col w-auto" key={index}>
            {column.map((image) => {
              return (
                <Image
                  key={image.id}
                  image={image}
                  IMAGE_WIDTH={currentImageWidth}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}