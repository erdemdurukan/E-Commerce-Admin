import { useState,useEffect } from "react";
import './index.css';
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import './index.css';


const EditItem = () => {

  const baseURL='http://localhost:8081/api/categories';
  const baseURL2='http://localhost:8081/api/items/CreateItem';
  const baseURL3='http://localhost:8081/api/items/names';
  const baseURL4='http://localhost:8081/api/items/update';

  const [inputText , setInputText ] = useState("");
  const [inputText2, setInputText2] = useState("");
  const [nameCat , setNameCat ] = useState("");


  const navigate= useNavigate();
  const location =useLocation();

  const [post, setPost] = useState([]);
  const [post2, setPost2] = useState([]);
  const [post3, setPost3] = useState([]);

  const [inputText3, setInputText3] = useState("");
  const [inputText4, setInputText4] = useState("");

  const [image,SetImage]=useState('');
 
  function handleImage(e){      
      SetImage(e.target.files[0]);
      console.log(e.target.files[0])
  }


  useEffect(() => {
      axios.get(baseURL).then((response) => {
      setPost([]);
      setPost(response.data);    
      }); 

      setInputText(location.state.id.name)
      //setInputText2(location.state.id.category)
      setInputText2(location.state.id.type)
      console.log(inputText2)
      setNameCat(location.state.id.type);
      
      setInputText3(location.state.id.price) 
      setInputText4(location.state.id.count) 
      console.log(location.state.id)    
      console.log(location.state.id.category.id)         
      SetImage(location.state.id.imageData) 
      console.log(image)      
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

  useEffect(() => {
    console.log(inputText2)
    if (inputText2 === location.state.id.type) {
      console.log("erdem");
      setInputText2(location.state.id.category.id);
    }
    console.log(inputText2)
  }, [inputText2]);

  

  const handleClick = (e) => {
    console.log("here")
    
    if (inputText.length!==1 && inputText.length !==0 ) 
    {          
        if(inputText2.length!==0)
        {            
            if(inputText3.length!==0)
            {
                //const str=inputText3.toString();
                
                   /* if( parseInt(str)>=0)
                    {
                      */
                        if(inputText4.length!==0)
                        {                                     
                            const str4=inputText4.toString();
                            if (!isNaN(str4) && str4!=="0" && parseInt(str4)>0) 
                            {   
                                if(image.length!==0)
                                { 
                                  var im; 
                                  if(image.length>100){
                                     im = image.toString();                     
                                  }else{
                                     im = image.name.toString();
                                  }
                                    console.log(image)
                                    console.log(im)                                    
                                    if (image.length>100 || ( im.endsWith(".jpg") || im.endsWith(".jpeg") || im.endsWith(".png") ) )
                                    {                                                   
                                        e.preventDefault();
                                      /*  if(inputText2===location.state.id.type){
                                          console.log("erdem");
                                          setInputText2(location.state.id.category.id);
                                          console.log(inputText2)
                                        }
                                        */
                                       
                                        
                                        console.log(inputText);
                                        console.log(inputText2);
                                        console.log(inputText3);
                                        console.log(inputText4);
                                        console.log(image.name);
                                        console.log(image);


                                        let formData = new FormData();    //formdata object

                                         //append the values with key, value pair
                                        formData.append('name1', inputText);
                                        formData.append('category', inputText2);                                                                  
                                        formData.append('count1', inputText4);
                                        formData.append('price1', inputText3); 
                                        formData.append('file1', image);
                                     
                                                                  
                                            if ( (post3.some((item) => item === location.state.id.name)) || (!post3.some((item) => item === inputText) ) )
                                            { 
                                                    console.log(inputText2)  
                                                axios.put(baseURL4+"/"+location.state.id.id , formData)
                                                .then(data => {             
                                                console.log(data.data)
                                                
                                                })
                                                .catch(err => {
                                                  console.log(err);
                                                });
                                                alert("Ürün değiştirildi");
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
                   /* }
                    else
                    {
                      alert("Ürünün fiyatı negatif olamaz");
                    }
                    */
                
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
  
  <div class="row">
     
    <div class="column">
        <h1 style={{ marginLeft: '30px' }}>Ürünü düzenle</h1>

       
           
            <div>
                <label style={{ marginLeft: '30px',fontSize:'20px',marginTop:'20px' }} for="erdem">Ürünün ismi</label>
            </div>
            <div>
                <input
                    id="erdem"  
                    style={{ marginLeft: '30px',marginTop:'10px'}}
                    type="text"
                    className="bigger-input"
                    onChange={ (e) => setInputText(e.target.value)}  
                    value={inputText} 
                />
            </div>
            

           
        <div>
          {/*  <label style={{ marginLeft: '30px',fontSize:'20px',marginTop:"10px" }} for="erdem1">Kategori</label>  */}
        </div> 


        <div>

        <h4 style={{ marginLeft: '30px',fontSize:'20px',marginTop:"10px" }}>Seçili kategori: {nameCat} </h4>   


        

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

                  //placeholder="Kategori seçiniz"
                  style={{ marginLeft: '30px',marginTop:'10px' }}
                  placeholder="Kategoriyi değiştirmek istiyorsanız seçiniz"
                  options={options}
                  onChange={ (e) => setInputText2(e.value)}                      
                  value={inputText2 ? options.find(option => option.label === inputText2) : null}
             
                />
                

        </div>
            

                <div>
                    <label style={{ marginLeft: '30px' ,fontSize:'20px',marginTop:"10px"}} for="erdem2">Fiyat</label>
                </div>

                <div>
                    <input
                        id="erdem2" 
                        style={{ marginLeft: '30px',marginTop:"10px" }} 
                        className="bigger-input2"
                        type="text"
                        onChange={ (e) => setInputText3(e.target.value)}
                        value={inputText3} 
                    />
                          
                </div> 
           
            <div>
                <label style={{ marginLeft: '30px' ,fontSize:'20px',marginTop:"10px"}} for="erdem3">Stoktaki ürün sayısı</label>  
            </div> 
            
                <div>
                  
                    <input
                        id="erdem3"  
                        style={{ marginLeft: '30px' ,marginTop:'10px'}} 
                        className="bigger-input2"
                        type="number"
                        onChange={ (e) => setInputText4(e.target.value)}  
                        value={inputText4}
                        
                    />
                </div> 
           
                

          <div  style={{ marginLeft: '30px' ,marginTop:'20px'}} >
          <div>
                <h4 style={{ marginTop:'20px'}}>Ürünün resmini değiştirmek istiyorsanız yükleyin</h4>
                <input  
                    style={{  marginTop:'20px'}}
                    type="file"
                    name ='file' 
                    onChange={handleImage}
                    />  
          </div>
              <button onClick={handleClick}  className="bigger-input3"  >Değiştir</button>
          </div>

        </div> 

        
        <div class="column">  
            <div>
                <label style={{ marginLeft: '30px' ,fontSize:'20px',marginTop:"65px"}} for="erdem3">Ürünün resmi</label>  
            </div> 
            <img  src={`data:image/png;base64,${ location.state.id.imageData}`} alt="Image" style={{'width': '300px', 'height': '300px','marginLeft':'10px','marginTop':'30px'}}></img>  
                                         
        </div>
            


     </div>
   
      
  );
};

export default EditItem;