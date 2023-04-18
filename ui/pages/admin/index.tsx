import type { NextPage } from "next";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Layout from "../../components/Layout/Layout";
import { RootState } from "../../store/store";
import router from "next/router";

const Admin: NextPage = () => {
  // @ts-ignore
   const {is_admin, is_logged} = useDispatch((state : RootState) => state)

   useEffect(() => {
     if(is_admin === false)
       router.push('/').then(r => null)
   }, [])

  return (
    <Layout title="Admin">
    </Layout>
  );
};

export default Admin;
