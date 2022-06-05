/* eslint-disable no-loop-func */
export function resizedHeight(width, height, newWidth) {
  return (newWidth / width) * height;
}

function shortestColumnDifference(columns) {
  const min = [...columns].reduce((a, b) => Math.min(a, b));
  let shortest = columns.findIndex((val) => val === min);
  return shortest;
}

export function masonryColumns({
  photosArray,
  numberOfColumns,
  IMAGE_WIDTH,
  ROW_GAP,
}) {
  if (!photosArray.length) return;

  let allColumns = Array.from(Array(numberOfColumns), () => []);

  let HeightsArray = Array(numberOfColumns).fill(0);

  let current = 0;
  let currentImage = photosArray[current];
  while (photosArray[current]) {
    allColumns.forEach((column, index) => {
      if (currentImage) {
        let shortest = shortestColumnDifference(HeightsArray);
        let height = resizedHeight(
          currentImage.width,
          currentImage.height,
          IMAGE_WIDTH
        );
        if (shortest === index) {
          column.push(currentImage);
          HeightsArray[index] += height;
          current++;
          currentImage = photosArray[current];
        }
      }
    });
  }
  return allColumns;
}

export default masonryColumns;