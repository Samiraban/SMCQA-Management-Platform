/**
 * ---------------------------------------------------------------------------
 * IMAGE FILE HELPERS
 * ---------------------------------------------------------------------------
 * Lets the admin panel upload photos/icons straight from a computer (files &
 * folders) instead of only pasting an image URL. There's no file server
 * behind this app, so instead of uploading to disk (which would be wiped on
 * every backend redeploy on Render), we read the picked file, shrink/
 * compress it in the browser, and store it as a base64 data URL directly on
 * the record — it saves to MongoDB along with everything else, no extra
 * hosting setup required.
 * ---------------------------------------------------------------------------
 */

export function fileToImageDataUrl(
  file,
  { maxSize = 1600, quality = 0.85, forcePng = false } = {}
) {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error("No file selected."));
      return;
    }

    if (!file.type.startsWith("image/")) {
      reject(new Error("Please choose an image file."));
      return;
    }

    const reader = new FileReader();

    reader.onerror = () => reject(new Error("Could not read that file."));

    reader.onload = () => {
      const img = new Image();

      img.onerror = () => reject(new Error("Could not load that image."));

      img.onload = () => {
        const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
        const width = Math.max(1, Math.round(img.width * scale));
        const height = Math.max(1, Math.round(img.height * scale));

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        const outputType =
          forcePng || file.type === "image/png" ? "image/png" : "image/jpeg";

        try {
          resolve(canvas.toDataURL(outputType, quality));
        } catch (error) {
          reject(error);
        }
      };

      img.src = reader.result;
    };

    reader.readAsDataURL(file);
  });
}

/** True if a stored value should be rendered as an <img>, not a lucide icon name. */
export function isImageSource(value) {
  return (
    typeof value === "string" &&
    (value.startsWith("data:image") ||
      value.startsWith("http://") ||
      value.startsWith("https://") ||
      value.startsWith("/"))
  );
}