import { ProSidebar, Menu, MenuItem, SubMenu, SidebarFooter, SidebarContent } from 'react-pro-sidebar';

import 'react-pro-sidebar/dist/css/styles.css';

import {FaUserCircle} from 'react-icons/fa';

import { Link } from 'react-router-dom';

import React, { useState } from "react";

import {AiOutlineMenu, AiOutlineClose, AiOutlineShop, AiOutlineShopping, AiOutlineUser} from 'react-icons/ai';

import {FiCreditCard} from 'react-icons/fi';

import {HiOutlineDocumentReport} from 'react-icons/hi';

import {BiLogOutCircle} from 'react-icons/bi'

import '../../styles/components/sidebar.css'


function Sidebar(){


  const [collapsed, setCollapsed] = useState(true);


  return(
    
    <div id="Layout">
      <aside>
          <ProSidebar collapsed={collapsed}>
          <SidebarContent>
              <Menu iconShape="square">
                  <div onClick={() => setCollapsed(!collapsed)}>
                        {collapsed === true &&(
                          <MenuItem icon={<AiOutlineMenu size="25px"/>}></MenuItem>
                        )}

                        {collapsed === false &&(
                          <MenuItem icon={<AiOutlineClose size="25px"/>}></MenuItem>
                        )}
                      </div>
              
                    <SubMenu title="Administrador" icon={<FaUserCircle size="25px" />}>
                      
                      <MenuItem>
                      Inserir 
                      <Link to="/admin/add"/>
                      </MenuItem>
                      <MenuItem>
                      Alterar
                      <Link to="/admin/alt"/>
                      </MenuItem>
                    </SubMenu>
                    <SubMenu title="Cartão" icon={<FiCreditCard size="25px" />}>
                      <MenuItem>
                      Inserir
                      <Link to="/cartao/add"/>
                      </MenuItem>
                   
                      <MenuItem>Alterar
                      <Link to="/cartao/alt"/>
                      </MenuItem>
                      

                    </SubMenu>
 
                    <SubMenu title="Departamento" icon={<AiOutlineShop size="25px" />}>
                      <MenuItem>
                      Inserir
                      <Link to="/departamento/add"/>
                    
                      </MenuItem>
                      <MenuItem>
                      Alterar
                      <Link to="/departamento/alt"/>
                      </MenuItem>
                    </SubMenu>
                    <SubMenu title="Produdo" icon={<AiOutlineShopping size="25px" />}>
                      <MenuItem>
                      Inserir
                      <Link to="/produto/add"/>
                      </MenuItem>
                      <MenuItem>
                      Alterar
                      <Link to="/produto/alt"/>
                      </MenuItem>

                    </SubMenu>
                    <SubMenu title="Vendedor" icon={<AiOutlineUser size="25px" />}>
                      <MenuItem>
                      Inserir
                      <Link to="/vendedor/add"/>
                      </MenuItem>
                      <MenuItem>
                      Alterar
                      <Link to="/vendedor/alt"/>
                      </MenuItem>
                    </SubMenu>
                <MenuItem icon={<HiOutlineDocumentReport size="25px" />}>
                  Relatório
                  <Link to="/rel"/>
                  </MenuItem>
               
                <SidebarFooter className="footerSideBar">
                  <MenuItem icon={<BiLogOutCircle size="25px" />}>
                          
                    <Link to="/authentication"/>
                  </MenuItem>

                 
                </SidebarFooter>
              </Menu>
              </SidebarContent>
                
            </ProSidebar>
      </aside>
      
      
    </div>

  );
}
export default Sidebar;