import React from "react";

import SideBar from "../../components/Header/SideBar";
const data = [
  {
    name: "Anisha",
    email: "Anisha@gmail.com",
    mobile: 7510994412,
  },
  { name: "Aswathi", email: "aswathi@gmail.com", mobile: 73338990 },
];

const Userlists = () => {
  return (
    <div>
      <div className="flex">
        <SideBar />
        <div className="flex-1 p-10">
          <table className="w-[900px] px-4">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Mobile</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((val, key) => {
                return (
                  <tr key={key} className="border-b">
                    <td className="px-4 py-2 text-left">{val.name}</td>
                    <td className="px-4 py-2 text-left">{val.email}</td>
                    <td className="px-4 py-2 text-left">{val.mobile}</td>
                    <td className="px-4 py-2 text-left">
                      {/* <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-sm">
                        Unblock
                      </button> */}
                      <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-sm">
                        Block
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Userlists;
