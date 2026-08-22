const START_DIMENSION = 640;
const MIN_DIMENSION = 200;
const TARGET_BYTES = 250 * 1024; // 250KB

// Decoded byte size of a base64 data URL, without actually decoding it.
function dataUrlByteSize(dataUrl) {
  const base64 = dataUrl.slice(dataUrl.indexOf(",") + 1);
  const padding = base64.endsWith("==") ? 2 : base64.endsWith("=") ? 1 : 0;
  return Math.floor(base64.length * 0.75) - padding;
}

function drawAtCap(img, cap) {
  let width = img.width;
  let height = img.height;
  if (width > height && width > cap) {
    height = Math.round((height * cap) / width);
    width = cap;
  } else if (height > cap) {
    width = Math.round((width * cap) / height);
    height = cap;
  }
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  canvas.getContext("2d").drawImage(img, 0, 0, width, height);
  return canvas;
}

// Step quality down first; if even the lowest quality is still over budget
// at this size, shrink the dimensions and try the quality ladder again.
// Keeps every upload under ~250KB regardless of the source photo. Shared by
// the profile-picture upload and the OMR upload — both need the same target.
function compressUnderTarget(img) {
  let cap = START_DIMENSION;
  let best = null;

  while (true) {
    const canvas = drawAtCap(img, cap);
    let quality = 0.85;
    let dataUrl = canvas.toDataURL("image/jpeg", quality);
    let size = dataUrlByteSize(dataUrl);

    while (size > TARGET_BYTES && quality > 0.35) {
      quality -= 0.1;
      dataUrl = canvas.toDataURL("image/jpeg", quality);
      size = dataUrlByteSize(dataUrl);
    }

    if (!best || size < dataUrlByteSize(best)) best = dataUrl;
    if (size <= TARGET_BYTES || cap <= MIN_DIMENSION) return best;

    cap = Math.max(MIN_DIMENSION, Math.round(cap * 0.75));
  }
}

export function resizeImageToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => resolve(compressUnderTarget(img));
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}
