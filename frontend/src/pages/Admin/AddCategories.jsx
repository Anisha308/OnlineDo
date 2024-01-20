import React, { useEffect, useState } from "react";
import SideBar from "../../components/Header/SideBar"
import apiInstance from "../../../Api";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
const AddCategories = () => {
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedOption, setSelectedOption] = useState("List");
  const [categories, setCategories] = useState([]);
  const Navigate = useNavigate();

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handleNameChange = (e) => {
    setCategoryName(e.target.value);
  };
  const addCategory = async () => {
    try {
      const response = await apiInstance.post("/api/admin/addcategory", {
        categoryName,
        description,
        liststatus: selectedOption,
      });

      if (response.data) {
        toast.success("Category added successfullyy");
      } else {
        toast.error("failed to add course");
      }
    } catch (error) {
      console.error("Failed to add category,Response data is undefined");
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await apiInstance.get("/api/admin/getcategory");

      if (response.data) {
        setCategories(response.data);
      }
    } catch (error) {
      console.error("failed to fetch categories:", error);
      Navigate("/admin/Login");
      console.error("Unauthorized access. Redirecting to login...");
    }
  };
  const handleListStatusChange = async (categoryId, newListStatus) => {
    try {
      const response = await apiInstance.patch(
        `/api/instructor/${categoryId}`,
        {
          liststatus: newListStatus,
        }
      );
      if (response.data) {
        toast.success(
          `category ${
            newListStatus === "List" ? "listed" : "unlisted"
          } successfully`
        );
        fetchCategories();
      } else {
        toast.error("failed to update list status");
      }
    } catch (error) {
      console.error("Failed to update list status:", error);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="flex">
      <SideBar />
      <div className="flex-grow">
        <>
          <link
            rel="stylesheet"
            href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css"
          />
          <link
            rel="stylesheet"
            href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"
          />

          <section className=" py-1 bg-blueGray-50 flex-wrap flex">
            <div className="w-full lg:w-4/12 px-4  mt-6">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                  <div className="text-center flex justify-between">
                    <h6 className="text-blueGray-700 text-xl font-bold">
                      Categories
                    </h6>
                  </div>
                </div>
                <div className="flex-auto px-4 lg:px-4 py-4 pt-0 ">
                  <form onSubmit={(e) => e.preventDefault()}>
                    <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                      Add Category
                    </h6>
                    <div className="flex flex-wrap mb-4">
                      <div className="w-full  px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Category Name:
                          </label>
                          <input
                            type="text"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            id="inline-category-name"
                            value={categoryName}
                            onChange={handleNameChange}
                          />
                        </div>
                      </div>
                      <div className="w-full lg:w-6/12 px-4 ">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Description
                          </label>
                          <input
                            type="text"
                            id="'description"
                            value={description}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            onChange={handleDescriptionChange}
                          />
                        </div>
                      </div>
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            list/unlist
                          </label>
                          <select
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            value={selectedOption}
                            onChange={handleSelectChange}
                          >
                            <option value="List" key="0">
                              List
                            </option>
                            <option value="Unlist" key="1">
                              Unlist
                            </option>
                          </select>
                        </div>
                      </div>

                      <div className="w-full lg:w-4/12 px-4 mt-6">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          ></label>
                          <div className="flex">
                            <button
                              type="button"
                              className="bg-blue-900 text-white border-0 px-5 py-3 rounded text-sm shadow focus:outline-none focus:ring mr-4 ease-linear transition-all duration-150"
                              onClick={addCategory}
                            >
                              Create
                            </button>
                            <button
                              type="button"
                              className="bg-gray-500 text-white border-0 px-5 py-3 rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150 ml-28"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div>
              <div className="w-full lg:w-8/12 px-4 mt-6">
                <div className=" w-[1000px]   ">
                  <div className=" flex items-center justify-between pb-6">
                    <div className="float-left">
                      <h2 className="text-gray-600 font-semibold">
                        Category list
                      </h2>
                      <span className="text-xs">All categories</span>
                    </div>
                    <div className="flex items-center justify-between"></div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto flex flex-wrap">
                <div className="inline-block min-w-200 shadow rounded-lg overflow-hidden">
                  <table className="min-w-200 leading-normal ">
                    <thead>
                      <tr>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Description
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          LIST/UNLIST
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories &&
                        categories.map((category) => (
                          <tr key={category.id} className="">
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <div className="ml-3">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {category.categoryName}
                                </p>
                              </div>
                            </td>

                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {category.description}
                              </p>
                            </td>

                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <div className="flex space-x-4">
                                {category.liststatus === "List" && (
                                  <button
                                    className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight absolute inset-0 bg-green-200 opacity-50 rounded-full"
                                    onClick={() =>
                                      handleListStatusChange(
                                        category._id,
                                        "List"
                                      )
                                    }
                                  >
                                    {category.liststatus}
                                  </button>
                                )}
                                {category.liststatus === "Unlist" && (
                                  <button
                                    className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight absolute inset-0 bg-red-200 opacity-50 rounded-full"
                                    onClick={() =>
                                      handleListStatusChange(
                                        category._id,
                                        "Unlist"
                                      )
                                    }
                                  >
                                    Unlist
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        </>
      </div>
    </div>
  );
};

export default AddCategories;
