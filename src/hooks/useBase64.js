import { useCallback, useState } from "react";

export const useBase64 = (initialValue) => {
    const [logo, setLogo] = useState(initialValue)

    const handleCreateBase64 = useCallback(async (receivedFile) => {
        const file = receivedFile;

        file instanceof Array && file.map(async el => {
            const base64 = await convertToBase64(el)
            // Object.values(logo)
            // console.log(base64)
            setLogo([...logo, base64])
        }) 
        const base64 = await convertToBase64(file);
        setLogo(base64);
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

    return { handleCreateBase64, logo }
}