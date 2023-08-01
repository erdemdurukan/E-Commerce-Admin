import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useState,useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate,Link } from "react-router-dom";

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const baseURL = "http://localhost:8081/api/items";
  
  const [post, setPost] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setPost(response.data);
       
    });
    
} ); //empty array bit kez calisiyor

  return (
    
   
    <div>
          <h1 style={{ marginLeft: '50px',marginTop:'20px' }}>Ürünler</h1>

          <div style={{ display: 'flex', flexWrap: 'wrap',marginLeft:'30px',marginTop:'40px' }}>
              {post.map(item => (
                
                <div key={item.id} style={{ width: '20%' }}>
                  
                    <img  src={`data:image/png;base64,${ item.imageData}`} alt="Image" style={{'width': '250px', 'height': '200px','marginLeft':'10px','marginTop':'10px'}}></img>  
                    <p style={{marginLeft:'10px',marginTop:'20px'}}>{"\n   Kategori: " + item.type}</p>
                    <p style={{marginLeft:'10px'}}>{"\n   İsim: " + item.name}</p>
                    {/*<p style={{marginLeft:'10px'}}>{"\n   Fiyat: " + item.price + " TL"}{" \n"}</p> */}
                    <p style={{ marginLeft: '10px' }}>{"\n   Fiyat: " + item.price.toLocaleString("tr-TR", { style: "currency", currency: "TRY" })}{" \n"}</p>
                    <p style={{marginLeft:'10px'}}>{"\n   Stoktaki ürün adedi: " + item.count + ""}{" \n"}</p>
                    <button  onClick={()=>{
                      axios.delete(baseURL+"/"+item.id)
                      .then(data =>{
                        console.log(data);
                      })
                      .catch(err => {
                        console.log(err);
                      });
                      alert("Ürün silindi");
                      }}  style={{marginLeft:'10px'}} > Ürünü sil</button>  

                    
                     
                      <Link to="/EditItem" style={{'marginLeft':'10px'}} state={{id:item }}   onClick={() => navigate("/")}>
                      Ürünü Düzenle
                      </Link>
                     
                                                               
                </div>
              ))}
          </div>
    </div>
  );
};

export default FAQ;