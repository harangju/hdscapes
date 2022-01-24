const minWidth = 144;

let image = document.getElementById('scape');
let button = document.getElementById('get-scape');
let scapeIDField = document.getElementById('scapeID');
let widthField = document.getElementById('width');

button.addEventListener('click', function () {
  let scapeID = scapeIDField.value;
  fetch("https://cdn.punkscape.xyz/scapes/sm/" + scapeID + ".png")
    .then(response => {
      if (!response.ok) {
        alert(`Failed to get image with status ${response.status}.`);
      }
      return response.blob();
    })
    .then(data => {
      let width = parseInt(widthField.value);
      if (isNaN(width)) {
        alert(`"${width}" is not a number. Please enter a number as the width.`);
        return;
      }
      if (width < minWidth) {
        alert(`Width ${width} should be greater than ${minWidth}.`)
        return;
      }
      displayScaledImage(data, parseInt(width));
    })
    .catch(error => console.log(error));
});

function displayScaledImage(data, width) {
  let height = parseInt(width/72*24);
  let buffer = new Image();
  buffer.onload = function() {
    let canvas = document.createElement('canvas');
    let context = canvas.getContext('2d');
    context.drawImage(buffer, 0, 0);
    let newCanvas = document.createElement('canvas');
    let newContext = newCanvas.getContext('2d');
    newCanvas.width = width;
    newCanvas.height = parseInt(width/72*24);
    let scale = width/72;
    let side = Math.ceil(scale);
    for (var x = 0; x < 72; x++) {
      for (var y = 0; y < 24; y++) {
        let p = context.getImageData(x, y, 1, 1).data;
        let newX = Math.floor(side*x);
        let newY = Math.floor(side*y);
        newContext.fillStyle = `rgb(${p[0]},${p[1]},${p[2]})`;
        newContext.fillRect(newX, newY, side, side);
      }
    }
    image.src = newCanvas.toDataURL("image/png");
  };
  buffer.src = URL.createObjectURL(data);
}
