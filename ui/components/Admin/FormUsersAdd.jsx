import React, { useState } from "react";

import UserServices from "../../_services/user";

const usersServices = new UserServices();

export default function Form() {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  let handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = {
        name: name,
        lastname: lastname,
        username: username,
        email: email,
        password: password,
      };

      usersServices.addNewUser(user)
    } catch (err) {
      alert(err);
    }
  };

  return (
    <form className="grid grid-cols-2 gap-2" onSubmit={handleSubmit}>
      <label htmlFor="us">Name</label>
      <input
        type="text"
        className="p-2 rounded-xl border-2 border-gray"
        name="name"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <label htmlFor="us">Lastname</label>
      <input
        type="text"
        className="p-2 rounded-xl border-2 border-gray"
        name="lastname"
        placeholder="Lastname"
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
        required
      />

      <label htmlFor="us">Username</label>
      <input
        type="text"
        className="p-2 rounded-xl border-2 border-gray"
        name="username"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />

      <label htmlFor="em">Email address</label>
      <input
        type="email"
        className="p-2 rounded-xl border-2 border-gray"
        name="email"
        placeholder="name@company.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <label htmlFor="ps">Password</label>
      <input
        type="password"
        className="p-2 rounded-xl border-2 border-gray"
        name="password"
        placeholder="*********"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <label htmlFor="ps">Repeat password</label>
      <input
        type="password"
        className="p-2 rounded-xl border-2 border-gray"
        name="password"
        placeholder="*********"
        value={repeatPassword}
        onChange={(e) => setRepeatPassword(e.target.value)}
        required
      />

      <button
        type="submit"
        className="inline-flex w-full justify-center rounded-md border border-transparent bg-purple-linear px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-purple-opacity focus:outline-none focus:ring-2 focus:ring-purple-opacity focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
      >
        Add an user
      </button>
    </form>
  );
}
