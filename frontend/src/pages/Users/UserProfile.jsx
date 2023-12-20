import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const ProfileScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("submit");
  };

  return (
    <section className="bg-gray-100 ">
      <div className="container ">
        <div className="row">
          <div className="col ">
            <nav
              aria-label="breadcrumb"
              class="bg-light rounded-3 p-3 mb-4 flex items-center"
            >
              <ol class="list-none flex space-x-2">
                <li class="breadcrumb-item">
                  <a href="#" class="text-blue-500">
                    Home
                  </a>
                </li>
                <li class="breadcrumb-item">
                  <span class="text-gray-500">/</span>
                </li>
                <li class="breadcrumb-item">
                  <a href="#" class="text-blue-500">
                    User
                  </a>
                </li>
                <li class="breadcrumb-item">
                  <span class="text-gray-500">/</span>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                  User Profile
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="flex items-center justify-between ">
          <div className="w-1/3 mr-4 h-100">
            <div className="card mb-4 bg-gradient-to-r from-white via-white to-gray-200 border shadow-2xl">
              <div className="card-body text-center bg-white p-4 flex flex-col items-center">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle mb-3"
                  style={{ width: 150, height: 150 }}
                />
                <h5 className="my-2">John Smith</h5>
                <p className="text-muted mb-2">Full Stack Developer</p>
                <p className="text-muted mb-4">Bay Area, San Francisco, CA</p>
                <div className="flex justify-center mb-2">
                  {/* <button type="button" className="btn btn-blue me-1">
                    Edit profile
                  </button> */}
                  <button type="button" className="btn btn-outline-success">
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
         
          </div>
          <div className=" w-3/4 mr-4 h-96 bg-gradient-to-r from-white via-white to-gray-200 border shadow-2xl sm:w-full px-6">
            <div className="card-body justify-content-center ">
              <div className=" flex">
                <div className="col-sm-3">
                  <p className="mb-2">Full Name : </p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-4">Johnatan Smith</p>
                </div>
              </div>
              <hr />
              <div className="flex">
                <div className="col-sm-3">
                  <p className="mb-2">Email : </p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-4">example@example.com</p>
                </div>
              </div>
              <hr />
              <div className="flex">
                <div className="col-sm-3">
                  <p className="mb-2">Phone : </p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-4">(097) 234-5678</p>
                </div>
              </div>
              <hr />
              <div className="flex">
                <div className="col-sm-3">
                  <p className="mb-2">Mobile : </p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-4">(098) 765-4321</p>
                </div>
              </div>
              <hr />
              <div className="flex">
                <div className="col-sm-3">
                  <p className="mb-2">Address</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-4">Bay Area, San Francisco, CA</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileScreen;
