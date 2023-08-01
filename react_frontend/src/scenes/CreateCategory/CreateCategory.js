import { useState,useEffect } from "react";
import axios from "axios";
import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate,Link } from "react-router-dom";

const CreateCategory = () => {
    const baseURL = 'http://localhost:8081/api/categories';
    const baseURL2 = 'http://localhost:8081/api/categories/HowMany';
    const baseURL3 = 'http://localhost:8081/api/categories/DeleteCategory'
    const [category, setCategory] = useState('');
    const [list, setList] = useState([]);
    const [post2, setPost2] = useState([]);
    const [post, setPost] = useState([]);
    const [post3, setPost3] = useState([]);
    const navigate= useNavigate();
    const headers= {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    }; 
  
    useEffect(() => {
      axios.get(baseURL).then((response) => {
        setPost([]);
        setList([]);
        setPost(response.data);
        setList(response.data);
      });
    });

    const handleClick2 =(a)=>{
      const config = {     
        headers: { 
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json', }
      };
    
                            
      axios.delete(baseURL3+"/"+a.id,config)
      .then(response =>{
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
      alert("Kategori silindi")
    }

 
  
    function handleClick() {
      
      if(category.length!==1 && category.length !==0 ) 
      {

          

          if (!list.some((item) => item.type === category)) 
          {
            const data = { type: category };
            axios
              .post(baseURL + '/create', data)
              .then((data) => {
                console.log(data.data);
              })
              .catch((err) => {
                console.log(err);
              });
          } 
          else 
          {
            alert('Aynı isimli kategori oluşturulamaz');
          }
      }
      else
      {
          alert("Kategori ismi geçersiz")
      }
      
    }
   
  
    useEffect(() => {
      const handle = (id) => {
        axios.get(baseURL2 + '/' + id).then((response) => {
          setPost3((prevPost3) => ({ ...prevPost3, [id]: response.data }));
        });
      };
  
      post.forEach((a) => {
        handle(a.id);
      });
    }, [post]);
    
  
    return (
      <div>
        <h1 style={{ marginLeft: '30px', marginTop: '20px' }}>Yeni kategori oluştur</h1>
          <div style={{ display: 'flex', alignItems: 'center' }}>
              <input
                style={{ marginLeft: '30px', marginTop: '20px', width: '300px', // Kutucuğun genişliği
                height: '40px', fontSize: '18px' }}
                name="category"
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Kategoriyi giriniz: "
                value={category}
              />
              <button style={{  width: '60px', height: '40px' ,marginTop:'20px' }} 
              onClick={handleClick}>Ekle
              </button>
          </div>

        <h1 style={{ marginLeft: '30px', marginTop: '20px' }}>Kategoriler</h1>

        {post.map((a) => (
          <div style={{ marginLeft: '30px', marginTop: '20px' }} key={a.id}>
              <li style={{ width: '40%' }} >{a.type + ' (' + post3[a.id] + ')'  }  
              <ClearIcon style={{'marginLeft':'10px'}} onClick={()=>{
                  if( post3[a.id] === 0 )
                  { 
                      console.log(a) ;
                      handleClick2(a);      
                  }
                  else
                  {
                    alert("Kategorinin içinde ürün var kategori silinemez");
                  }
              }}> Kategoriyi sil</ClearIcon>
              <Link to="/EditCategory" style={{'marginLeft':'10px'}} state={{id:a}}   onClick={() => navigate("/")}>
              Kategoriyi Düzenle
              </Link>
              
              </li>
                        
          </div>
        ))}
      </div>
    );
  };
  
export default CreateCategory;
