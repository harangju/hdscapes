let image = document.getElementById('scape');
let button = document.getElementById('get-scape');
let scapeIDField = document.getElementById('scapeID');
let widthField = document.getElementById('width');

button.addEventListener('click', function () {
  let scapeID = scapeIDField.value;
  fetch("https://cdn.punkscape.xyz/scapes/sm/" + scapeID + ".png")
    .then(response => {
      if (!response.ok) {
        throw new Error(`Request failed with status ${reponse.status}`);
        alert(`Failed to get image with status ${response.status}.`);
      }
      return response.blob();
    })
    .then(data => {
      const imageObjectURL = URL.createObjectURL(data);
      image.src = imageObjectURL;
    })
    .catch(error => console.log(error));
});
