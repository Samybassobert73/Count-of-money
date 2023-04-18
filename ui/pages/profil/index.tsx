import type { NextPage } from "next";
import EditPassword from "../../components/editPassword";
import EditProfil from "../../components/editProfil";
import LayoutSideHead from "../../components/LayoutSideHead";
import SidebarProfil from "../../components/sidebarProfil";
import React, {useState} from 'react';
const Index: NextPage = () => {
  const [nav, setNav] = useState('profil');
  return (
    <LayoutSideHead title="Crypto">
      <div className="flex h-full">
        <SidebarProfil nav={nav} setNav={setNav}/>
        {
          nav === "profil"?
            <EditProfil/>
          :
            <EditPassword/>
        }
      </div>
    </LayoutSideHead>
  )
}

export async function getStaticProps() {
    return {
      props: {
        protected: true,
        userTypes: ["admin"]
      },
    }
  }

  export default Index;
