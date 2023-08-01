import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import React, { useEffect,useState } from "react";
import axios from "axios";


const ÜrünlerListesi = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [tableData, setTableData] = useState([])

  useEffect(() => {
    axios.get("http://localhost:8081/api/items").then((response) => {
      
      setTableData(response.data);
    });
   
  }, []);

  
  

  const columns = [
    
    {
      field: "name",
      headerName: "İsim",
      flex: 1,
      
      cellClassName: "name-column--cell",
    },
    {
      field: "type",
      headerName: "Kategori adı",
      flex: 1,
    },
    {
      field: "count",
      headerName: "Stoktaki ürün sayısı",
      flex: 1,
    },
    {
      field: "price",
      headerName: "Fiyat(TL)",
      flex: 1,
     
    },
    {
      field: "imageData",
      headerName: "Resim",
      flex: 1,
      renderCell: (params)=>{
        return (
          <div>
              <img  src={`data:image/png;base64,${ params.row.imageData}` } alt="Image" 
               style={{'width': '100px', 'height': '50px'}} 
              ></img>    
          </div>
        )
      }
    },
  ];

  return (
    <Box m="20px">
      <Header title="Ürünler Listesi" subtitle="" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
         /* "& .MuiDataGrid-cell": {
            borderBottom: "none",

          },
          */
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={tableData} columns={columns} pageSize={5}  />
      </Box>
    </Box>
  );
};

export default ÜrünlerListesi;
