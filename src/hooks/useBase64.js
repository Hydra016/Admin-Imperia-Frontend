import { useCallback, useState } from "react";

export const useBase64 = (initialValue) => {
    const [logo, setLogo] = useState(initialValue)

    const handleDeleteFiles = (receivedFile) => {
      if(logo instanceof Object) {
        const newImg = logo.filter(obj => obj !== receivedFile)
        setLogo(newImg)
      }
    }

    const handleCreateBase64 = useCallback(async (receivedFile) => {
        let file = receivedFile;
        if(initialValue instanceof Object) {
          file = Object.values(receivedFile)

          let files = await Promise.all(file.map(el => convertToBase64(el)))
          setLogo([...logo, ...files])
        } else {
          file = await convertToBase64(receivedFile);
          setLogo(file)
        }
      });
    
      const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          if (!file) {
            console.log("no image");
          } else {
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
              resolve(fileReader.result);
            };
          }
          fileReader.onerror = (error) => {
            reject(error);
          };
        });
      };

    return { handleCreateBase64, handleDeleteFiles,logo }
}