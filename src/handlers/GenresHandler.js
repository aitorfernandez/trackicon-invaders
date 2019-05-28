export default function(data) {
  let genres = [];

  for (var i = 0; i < data.length; i++) {
    genres.push({
      id: data[i],
      name: data[i].charAt(0).toUpperCase() + data[i].slice(1)
    });
  }

  return genres;
}
