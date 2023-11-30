import React from 'react'
import SideBar from '../../components/Header/SideBar';
import AdminHeader from '../../components/Header/AdminHeader';

const data = [
  {
    name: "Anisha",
    email: "Anisha@gmail.com",
    mobile: 7510994412,
    experience: 7,
    joberole: "Javascript developer",
    company:"samsung"
  },
  { name: "Nesla", email: "nes@gmail.com", mobile: 7333899055, experience:5,joberole:'software developer',company:"Nokia" },
];
const Instructorlist = () => {
  return (
    <div>
      <AdminHeader />
      <div className="flex">
        <SideBar />
        <div className="flex-1 p-10">
          <table className="w-[900px] px-4">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Mobile</th>
                <th className="px-4 py-2 text-left">Year of experience</th>
                <th className="px-4 py-2 text-left">Job Role</th>
                <th className="px-4 py-2 text-left">Company Name</th>

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
                    <td className="px-4 py-2 text-left">{val.experience}</td>
                    <td className="px-4 py-2 text-left">{val.joberole}</td>
                    <td className="px-4 py-2 text-left">{val.company}</td>

                    <td className="px-4 py-2 text-left">
                      <div className="flex space-x-2">
                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-sm">
                          Verify
                        </button>
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-sm">
                          Reject
                        </button>
                      </div>
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


export default Instructorlist
