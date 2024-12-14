const output = document.getElementById("output");

document.getElementById("run").addEventListener("click", async () => {
    const fileInput = document.getElementById("upload");

    fileInput.click();

    fileInput.addEventListener("change", async () => {
        if (!fileInput.files.length) {
          alert("Please upload an image.");
          return;
        }

        const file = fileInput.files[0];
    
        if (!file.type.startsWith("image/")) {
          alert("Please upload a valid image file.");
          return;
        }
      
        const image = await loadImage(file);

        const configs = [
            { name: "32x32.png", extension: "png", width: 32, },
            { name: "128x128.png", extension: "png", width: 128, },
            { name: "256x256.png", extension: "png", width: 256, },
            { name: "icon.png", extension: "png", width: 512, },
            // { name: "icon.icns", extension: "icns", width: 512, },
            // { name: "icon.ico", extension: "ico", width: 512 },
        ];
        
        output.innerHTML = ""; 

        const requestPool = [];

        for (const config of configs) {
            switch (config.extension) {
                case "png":
                    requestPool.push(requestGeneratePng(image, config.name, config.width));
                    break;
                case "icns":
                    break;
                case "ico":
                    break;
            }
        }

        await Promise.all(requestPool);
    });
  });
  
  function loadImage(file) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();
  
      reader.onload = e => {
        img.src = e.target.result;
        img.onload = () => resolve(img);
      };
  
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
  
  function resizeImage(image, width, height) {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
  
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0, width, height);
  
    return canvas;
  }

  function requestGeneratePng(image, name, width) {
    return new Promise((resolve) => {
        const resizedCanvas = resizeImage(image, width, width);
        const img = document.createElement("img");

        img.src = resizedCanvas.toDataURL("image/png");
        img.alt = `${name}`;

        fetch(img.src)
          .then((res) => {
            res.blob()
              .then((blob) => {
                const blobUrl = URL.createObjectURL(blob);

                const link = document.createElement('a');
                link.href = blobUrl;
                link.download = name;

                output.appendChild(link);
                
                link.click();

                URL.revokeObjectURL(blobUrl);

                resolve();
              })
              .catch((e) => {
                console.error(e);
              });
          })
          .catch((e) => {
            console.error(e);
          });
    });
  }
  