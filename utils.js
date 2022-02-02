function getRandomColor() {
  let nos = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += nos[Math.floor(Math.random() * 16)];
  }
  return color;
}

function distance(p1, p2) {
  let dist = 0;
  for (var i = 0; i < p1.length; i++) {
    dist += (p1[i] - p2[i]) * (p1[i] - p2[i]);
  }
  return Math.sqrt(dist);
}

function getColor(cursorX, cursorY, ctx) {
  const imageData = ctx.getImageData(cursorX, cursorY, 1, 1);
  const oneDArray = imageData.data;
  const COLOR = [];
  COLOR[0] = oneDArray[0];
  COLOR[1] = oneDArray[1];
  COLOR[2] = oneDArray[2];
  return COLOR;
}

function getPointerPixels(imageData, threshold, sizeX, sizeY, color) {
  var pixelLocations = [];
  for (let i = 0; i < sizeY; i++) {
    for (let j = 0; j < sizeX; j++) {
      const r = imageData[sizeX * i * 4 + 4 * j + 0];
      const g = imageData[sizeX * i * 4 + 4 * j + 1];
      const b = imageData[sizeX * i * 4 + 4 * j + 2];
      if (distance(color, [r, g, b]) < threshold) {
        pixelLocations.push([j, i]);
      }
    }
  }
  return pixelLocations;
}

function average(locations) {
  let x = 0;
  let y = 0;
  const n = locations.length;
  for (let i = 0; i < n; i++) {
    x += locations[i][0];
    y += locations[i][1];
  }
  return [Math.floor(x / n), Math.floor(y / n)];
}
