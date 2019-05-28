export default function getParams(params) {
  let objectParams = {};

  if (params == null) {
    return objectParams;
  }

  let r = /([^&;=]+)=?([^&;]*)/g,
      q = params.substring(1);

  let e = r.exec(q);
  while (e) {
    objectParams[e[1]] = decodeURIComponent(e[2]);
    e = r.exec(q);
  }

  return objectParams;
}
