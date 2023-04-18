import type { NextPage } from "next";
import Layout from "../../components/Layout/Layout";
import Table from "../../components/Admin/UsersTable";

import { useEffect, useState } from "react";
import AddForm from "../../components/Admin/FormUsersAdd";
import ModalUser from "../../components/Admin/ModalWithProps";
import UserServices from "../../_services/user";

const usersServices = new UserServices();
const Users: NextPage = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [events, setEvents] = useState<boolean>(false);

  return (
    <Layout title="Users">
      <div className="flex justify-end mr-3">
        <button
          type="button"
          onClick={() => {
            setOpen(!open); setEvents(!events)
          }}
          className="bg-btn hover:bg-btn-over shadow-default hover:shadow-default m-4 w-fit text-white font-medium p-btn-sm rounded-btn"
        >
          Add an user
        </button>
        <ModalUser
          title="Add an user"
          children={<AddForm />}
          open={open}
          setOpen={setOpen}
          setEvents={setEvents}
        />

      </div>
      {!events ? <Table events={events} /> : null}
    </Layout>
  );
};

export async function getStaticProps() {
  return {
    props: {
      protected: true,
      userTypes: ["admin"],
    },
  };
}

export default Users;
