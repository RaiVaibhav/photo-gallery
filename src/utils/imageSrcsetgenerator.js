
function addQueryToUrl (baseUrl, query) {
  let url = new URL(baseUrl);
  Object.keys(query).forEach(i => {
    url.searchParams.append(i, query[i]);
  })
  return url.toString();
}

export const makeSrcSet = (params) => {
  let p = params

  const deltaW = params.maxWidth - params.minWidth
  const stepW = deltaW / params.numBreakpoints
  const widths = Array(params.numBreakpoints + 1)
    .fill(undefined)
    .map((_, i) => Math.round(params.minWidth + i * stepW))
    .sort((a, b) => (a > b ? 1 : -1))

  return widths
    .flatMap(w => {
      let p1 = p
      p1 = setWidth(p1, w)
      return [`${p1.baseUrl} ${w}w`]
    })
    .join(', \n')
}

export const makeSrc = (params) => {
  let p = params
  return p.baseUrl
}

const setWidth = (params, width) => {
  const baseUrl = addQueryToUrl(params.baseUrl, {
      w: width.toString()
    });
  return {
    ...params,
    baseUrl
  }
}