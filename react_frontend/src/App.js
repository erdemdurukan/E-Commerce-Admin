import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import ÜrünlerListesi from "./scenes/ÜrünlerListesi";
import FAQ from "./scenes/Ürünler";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import CreateItem from "./scenes/CreateItem";
import CreateCategory from "./scenes/CreateCategory/CreateCategory";
import EditCategory from "./scenes/EditCategory/EditCategory";
import EditItem from "./scenes/EditItem/EditItem";



function App() {

  
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/ÜrünlerListesi" element={<ÜrünlerListesi />} />
              <Route path="/CreateItem" element={<CreateItem />} />
              <Route path="/CreateCategory" element={<CreateCategory />} />
              <Route path="/Ürünler" element={<FAQ />} />
              <Route path="/EditCategory" element={<EditCategory/>} />
              <Route path="/EditItem" element={<EditItem/>} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
