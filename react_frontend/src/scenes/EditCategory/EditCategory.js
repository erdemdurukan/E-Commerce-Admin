import React from 'react'
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useState,useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';

const EditCategory = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const location =useLocation();
    useEffect(() => {
        setCatName(location.state.id.type)
        setNewCategory(location.state.id.type)
    },[]);

    const navigate=useNavigate();

    const [catName,setCatName]=useState('');
    const [NewCategory,setNewCategory]=useState([]);
  
    const baseURL = "http://localhost:8081/api/categories";
    const baseURL2 = "http://localhost:8081/api/categories/update"
    //console.log(location.state.id.type);
    //console.log(location.state.id.id);
    const [post, setPost] = useState([]);
    const [list, setList] = useState([]);

    

    useEffect(() => {
        axios.get(baseURL).then((response) => {
          setPost([]);
          setList([]);
          setPost(response.data);
          setList(response.data);
          
        });
      });

   

    function handleClick(a){

        
      if(NewCategory.length!==1 && NewCategory.length !==0 ) 
      {

        if (!list.some((item) => item.type === NewCategory)){
            //console.log(a);
           
            axios.put(baseURL2+"/"+a +"?name="+NewCategory)
            .then(data => {
               
                setCatName(NewCategory);
              })
              .catch(err => {
                //console.log(err);
              });
              navigate("/CreateCategory")
        
        }
        else
        {
            alert("Var olan kategori ismi ile yeni kategori oluşturulamaz.")
        }

      }
      else
      {
          alert("Kategori ismi geçersiz");
      }
        
        
      //  console.log(NewCategory)
    }
  
  

  
   
        return (
            <div>
               
              <h1 style={{ marginLeft: '30px', marginTop: '20px' }}>Kategoriyi Düzenle</h1>

              <h6 style={{ marginLeft: '30px', marginTop: '40px' }} >Mevcut kategori ismi : {catName}</h6>
                <input
                style={{ marginLeft: '30px', marginTop: '20px' }}
                name="category"
                onChange={(e) => setNewCategory(e.target.value)}
                //placeholder=" Yeni kategori ismini giriniz: "
                value={NewCategory}
                //defaultValue={NewCategory}
                />
                <button onClick={()=>handleClick(location.state.id.id)}>Değiştir</button>

              </div>
    );
  };
  
export default EditCategory;
