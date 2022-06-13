import { useImageLazyLoad } from "../utils/infiniteScroll";
import { resizedHeight } from "../utils/masonry.js";
import { Blurhash } from "react-blurhash";
import { useModal } from '../utils/lib';

import { CreditsImage } from "./Credit";

export function Image({ image, IMAGE_WIDTH }) {
  const [isVisible, imageRef] = useImageLazyLoad();
  const modal = useModal();

  return (
    <div
      className="mb-6 cursor-zoom-in relative"
      ref={imageRef}
      style={{
        height: resizedHeight(image.width, image.height, IMAGE_WIDTH),
      }}
      onClick={() => {
      	modal.showImage(image);
      }}
    >
      <div className="absolute top-0 left-0 w-full h-full z-10 opacity-0 duration-200 hover:opacity-100 hover:bg-l-vig">
        {<CreditsImage image={image} />}
      </div>
      {isVisible && (
        <img
          src={image.urls.raw + `&w=${IMAGE_WIDTH}`}
          className="w-full absolute box-border top-0 left-0 z-[5]"
          style={{
            maxWidth: IMAGE_WIDTH,
          }}
          alt={image.description || image.alt_description}
        />
      )}

      {image.blur_hash !== null && (
        <Blurhash
          alt={image.description || image.alt_description}
          hash={image.blur_hash}
          className=" box-border blurHash absolute left-0 top-0 z-[2]"
          style={{
            width: "100%",
            maxWidth: IMAGE_WIDTH,
          }}
          height={resizedHeight(image.width, image.height, IMAGE_WIDTH)}
          resolutionX={32}
          resolutionY={32}
          punch={1}
        />
      )}
    </div>
  );
}
