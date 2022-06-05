import { makeSrc, makeSrcSet } from "../utils/imageSrcsetgenerator";

export default function ModalImage({ image }) {
  // Todo: optimize rendering with lazy loading

  const { urls, alt_description } = image;
  const params = {
    baseUrl: urls.raw,
    numBreakpoints: 5,
    minWidth: 400,
    maxWidth: 1280,
    maxHeight: 1280,
  }
  const srcset = makeSrcSet(params)
  const src = makeSrc(params)
  return (
    <img alt={alt_description}
      srcSet={srcset}
      src={src}
    />
  )
}