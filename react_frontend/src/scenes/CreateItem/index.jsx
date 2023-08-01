import { Box } from "@mui/material";

import { useState,useEffect } from "react";
import './index.css';
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const CreateItem = () => {

  const baseURL='http://localhost:8081/api/categories';

  const baseURL2='http://localhost:8081/api/items/CreateItem';

  const baseURL3='http://localhost:8081/api/items/names';

  const [inputText, setInputText] = useState("");
  const [inputText2, setInputText2] = useState("");

  const navigate= useNavigate();

  const [post, setPost] = useState([]);
  const [post2, setPost2] = useState([]);
  const [post3, setPost3] = useState([]);

  const [inputText3, setInputText3] = useState("");
  const [inputText4, setInputText4] = useState("");

  const [image,SetImage]=useState('');
  function handleImage(e){
      console.log(e.target.files);
      SetImage(e.target.files[0]);    
  }

  useEffect(() => {
    axios.get(baseURL).then((response) => {
    setPost([]);
    setPost(response.data);
 
    });    
  } ,[]); //empty array bit kez calisiyor

  const options = post.map((item) => ({
    value: item.id,     
    label: item.type,   
  }));
  

  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: '400px',
      minHeight: '30px',
      fontSize: '14px',
      marginLeft:'30px',
      marginTop:'20px',
      fontSize: '20px',     
    }),
    
  };
  

  
  useEffect(() => {
    axios.get(baseURL3).then((response) => {
      setPost3([]);
      setPost3(response.data); 
  }); 

  } ); 

  const handleClick = (e) => {

    //const str=image.slice(-4);    

    if (inputText.length!==1 && inputText.length !==0 ) 
    {          
        if(inputText2.length!==0)
        {            
            if(inputText3.length!==0)
            {
                const str=inputText3.toString();
                if (!isNaN(str)) 
                {
                    if( parseInt(str)>=0)
                    {
                        if(inputText4.length!==0)
                        {                                     
                            const str4=inputText4.toString();
                            if (!isNaN(str4) && str4!="0" && parseInt(str4)>0) 
                            {   
                                if(image.length!==0)
                                {                                      
                                  console.log(image)
                                  const im = image.name.toString();                     
                                    if ( im.endsWith(".jpg") || im.endsWith(".jpeg") || im.endsWith(".png") )
                                    {                                                   
                                        e.preventDefault();
                                        

                                        let formData = new FormData();    //formdata object

                                        formData.append('file1', image);   //append the values with key, value pair
                                        formData.append('name1', inputText);
                                        formData.append('catId1', inputText2);
                                        formData.append('price1', inputText3);
                                        formData.append('count1', inputText4);

                                        const config = {     
                                            headers: { 'content-type': 'multipart/form-data' }
                                        }
                                                                  
                                        if (!post3.some((item) => item === inputText))
                                        {           
                                            axios.post(baseURL2 , formData,config)
                                            .then(data => {             
                                            console.log(data.data)
                                            })
                                            .catch(err => {
                                              console.log(err);
                                            });
                                            alert("Ürün eklendi");
                                            navigate("/Ürünler")
                                        }   
                                        else
                                        {           
                                            alert("Bu isimde bir ürün oluşturulamaz")
                                        } 
                                    }
                                    else
                                    {
                                        alert("Dosya formatı uygun değil.")
                                    }
                                }
                                else
                                {
                                    alert("Resim yüklenmesi zorunludur."); 
                                }                           
                            }
                            else
                            {
                                alert("Stoktaki ürün adedi geçersiz")
                            }                      
                        }
                        else
                        {
                            alert("Stok sayısı hatalı")
                        }
                    }
                    else
                    {
                      alert("Ürünün fiyatı negatif olamaz");
                    }
                }
                else
                {
                    alert("Ürünün fiyatı sayı değil");
                }
            }
            else
            {
                alert("Ürün fıyatı hatalı");
            }
          
        }
        else
        {
            alert("Kategori ismi hatalı");
        }      
              
    }
    else
    {
        alert("Ürün ismi geçersiz")
    }       
        
  } //handleClickin
  
  
return(

    <div>
        <h1 style={{ marginLeft: '30px' }}>Yeni ürün oluştur</h1>
        
        <Box display="flex">
            <Box>
            <div>
                <label style={{ marginLeft: '30px',fontSize:'20px',marginTop:'20px' }} for="erdem">Ürünün ismi</label>
            </div>
            <div>
                <input  
                    style={{ marginLeft: '30px',marginTop:'10px'}}
                    type="text"
                    id="erdem"
                    className="bigger-input"
                    onChange={ (e) => setInputText(e.target.value)}  
                    placeholder="Ürünün ismini giriniz "
                    value={inputText} 
                />
            </div>  
            </Box> 
        <Box> 

        <div>
            <label style={{ marginLeft: '30px',fontSize:'20px',marginTop:"10px" }} for="erdem1">Kategori</label>  
        </div>  

        <div>           
                <Select 
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: 0,
                    colors: {
                      ...theme.colors,
                      primary25: 'grey',
                      primary: 'grey',
                    },
                  })}
                  id="erdem1"
                  styles={{
                    ...customStyles,
                    option: (provided) => ({
                      ...provided,
                      color: 'black', // Yazı rengini istediğiniz renkle değiştirin
                    }),
                  }}
                  style={{ marginLeft: '30px',marginTop:'10px'}}
                  placeholder="Kategori seçiniz"
                  options={options}                  
                  onChange={ (e) => setInputText2(e.value)}                 
                />

        </div>
          </Box>

        </Box>

        <Box display="flex">
            <Box>
            <div>
                <label style={{ marginLeft: '30px' ,fontSize:'20px',marginTop:"10px"}} for="erdem2">Fiyat</label>
            </div>   

            <div>
                <input
                    id="erdem2"  
                    style={{ marginLeft: '30px' ,marginTop:'10px'}} 
                    className="bigger-input2"
                    type="text"
                    onChange={ (e) => setInputText3(e.target.value)}    
                    placeholder="Ürünün fiyatını TL cinsinden giriniz "
                    value={inputText3} 
                />
            </div>
            </Box>

            <Box>

            <div>
                <label style={{ marginLeft: '30px' ,fontSize:'20px',marginTop:"10px"}} for="erdem3">Stoktaki ürün sayısı</label>  
            </div> 

            <div>
                <input 
                    id="erdem3"  
                    style={{ marginLeft: '30px' ,marginTop:'10px'}} 
                    className="bigger-input2"
                    type="text"
                    onChange={ (e) => setInputText4(e.target.value)}  
                    placeholder="Ürünün stoktaki sayısını giriniz "
                    value={inputText4} 
                />
            </div>
            </Box>
        </Box>    

        <div  style={{ marginLeft: '30px' ,marginTop:'20px'}} >
                  <div>
                    <h3 style={{  marginTop:'20px'}}>Ürünün resmini yükleyin</h3>
                      <input  
                      style={{  marginTop:'20px'}}
                      type="file"
                      name ='file' 
                      onChange={handleImage}
                      />  
                  </div>
            <button onClick={handleClick}  className="bigger-input3"  >Ekle</button>
        </div>

    </div>
    

  );
};

export default CreateItem;