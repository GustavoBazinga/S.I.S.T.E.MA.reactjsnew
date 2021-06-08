import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarFooter,
    SidebarContent,
  } from "react-pro-sidebar";
  
  import "react-pro-sidebar/dist/css/styles.css";
  
  import { FaUserCircle } from "react-icons/fa";
  
  import { Link } from "react-router-dom";
  
  import React, { useState, useContext } from "react";
  
  import {
    AiOutlineMenu,
    AiOutlineClose,
    AiOutlineShop,
    AiOutlineShopping,
    AiOutlineUser,
  } from "react-icons/ai";

  import { FaHome } from "react-icons/fa";

  import { SiCashapp } from "react-icons/si"
  
  import { FiCreditCard } from "react-icons/fi";
  
  import { HiOutlineDocumentReport } from "react-icons/hi";
  
  import { BiLogOutCircle } from "react-icons/bi";
  
  import "./sidebar.css";
  
  import StoreContext from "components/Store/Context";
  
  function SidebarSeller() {
    const { setToken } = useContext(StoreContext);
  
    const [collapsed, setCollapsed] = useState(true);
  
    function signOut(event) {
      setToken(null);
    }
  
    return (
      <div id="Layout">
        <aside>
          <ProSidebar collapsed={collapsed}>
            <SidebarContent>
              <Menu iconShape="square">
                <div onClick={() => setCollapsed(!collapsed)}>
                  {collapsed === true && (
                    <MenuItem icon={<AiOutlineMenu size="25px" />}></MenuItem>
                  )}
  
                  {collapsed === false && (
                    <MenuItem icon={<AiOutlineClose size="25px" />}></MenuItem>
                  )}
                </div>
                    <MenuItem icon={<FaHome size="25px"/>}>
                      Inicio
                      <Link to="/mobile" />
                    </MenuItem>
                    <MenuItem icon={<SiCashapp size="25px"/>}>
                      Venda
                      <Link to="/vendas" />
                    </MenuItem>
                
  
                <SidebarFooter className="footerSideBar">
                  <MenuItem
                    icon={<BiLogOutCircle size="25px" onClick={signOut} />}
                  >
                    {/* <Link to="/login"/ > */}
                  </MenuItem>
                </SidebarFooter>
              </Menu>
            </SidebarContent>
          </ProSidebar>
        </aside>
      </div>
    );
  }
  export default SidebarSeller;
  