import { CustomDragDrop } from "./CustomContainer";

import { useState, useEffect  } from "react";

export default function DragComponent({ setFiles }) {
  const [ownerLicense, setOwnerLicense] = useState([]);

useEffect(() => {
    setFiles(ownerLicense);
  }, [ownerLicense, setFiles]);

  function uploadFiles(f) {
    setOwnerLicense([...ownerLicense, ...f]);
  }
// function uploadFiles(f) {
//     const decodedFiles = f.map(file => {
//       const decodedContent = JSON.parse(atob(file.content.split(',')[1]));
//       return {
//         ...file,
//         content: decodedContent
//       };
//     });

//     setOwnerLicense([...ownerLicense, ...decodedFiles]);
//     setFiles([...ownerLicense, ...decodedFiles]);
//   }


  function deleteFile(indexImg) {
    const updatedList = ownerLicense.filter((ele, index) => index !== indexImg);
    setOwnerLicense(updatedList);
    setFiles(updatedList);
  }

  return (
    <div className="bg-white shadow rounded-lg w-full px-5 pt-3 pb-5">
      <div className="pb-[8px] border-b border-[#e0e0e0]">
        <h2 className="text-black text-[17px] font-[600]">
          Json Configuration file
        </h2>
      </div>
      
      <CustomDragDrop
        ownerLicense={ownerLicense}
        onUpload={uploadFiles}
        onDelete={deleteFile}
        count={2}
        formats={["json"]}
      />
    </div>
  );
}

