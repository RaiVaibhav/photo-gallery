import { makeSrc, makeSrcSet } from "../utils/imageSrcsetgenerator";
import { useScreenResize } from "../utils/handlers";
import { useEffect, useState } from "react";
import { Blurhash } from "react-blurhash";
import { resizedHeight } from "../utils/masonry";

export default function ModalImage({ image }) {
  const [screenWidth] = useScreenResize();
  const [width, setWidth] = useState(screenWidth - 80);
  useEffect(() => {
    setWidth(screenWidth - 80);
  }, [screenWidth])

  return (
    <>
      <img
        src={image.urls.raw + `&w=${width}`}
        className="w-full absolute box-border top-0 left-0 z-[5]"
        style={{
          maxWidth: width,
        }}
        alt={image.description || image.alt_description}
      />

      {image.blur_hash !== null && (
        <Blurhash
          alt={image.description || image.alt_description}
          hash={image.blur_hash}
          className=" box-border blurHash absolute left-0 top-0 z-[2]"
          style={{
            width: "100%",
            maxWidth: width,
          }}
          height={resizedHeight(image.width, image.height, width)}
          resolutionX={32}
          resolutionY={32}
          punch={1}
        />
      )}
    </>
  )
}