import React from "react";
import { useState } from "react";

function ImageUpload(){
    const [image,SetImage]=useState('');
    function handleImage(e){
        console.log(e.target.files);
        SetImage(e.target.files[0]);
    }

    return(
        <div>
            <h2>Ürünün resmini yükleyin</h2>
            <input type="file" name ='file' onChange={handleImage}/>
            
        </div>
    )

}
export default ImageUpload;


