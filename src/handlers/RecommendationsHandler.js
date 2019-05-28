export default function(data) {
  let recomendations = [];

  for (var i = 0; i < data.length; i++) {
    recomendations.push({
      name: data[i].name,
      previewUrl: data[i].preview_url
    });
  }

  return recomendations;
}
