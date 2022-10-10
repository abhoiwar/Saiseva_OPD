import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import Footer1 from '../reception/Footer1'
import './AdminHome.css'
import { useForm } from "react-hook-form";
import Service from '../../services/Service';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export default function Doctor() {

useEffect(() => {
    loadAllDoctorData();
  }, [])

  const {
    register, 
    handleSubmit, 
    
    formState: { errors },
    reset
  
  } = useForm();
  const [DoctorData, setDoctorData] = useState();
  const [isUpdate, setIsUpdate] = useState(false);
  const [did, setDid] = useState();
      
  const navigate = useNavigate();
//logout user
    const logout = () => {
        localStorage.removeItem("AdminLogin");
        localStorage.setItem("isAdminLoggedIn",false);
        navigate("/");
      };

  //update data
  const onEdit = (item) => {
    console.log(item);
    reset(item);
    setIsUpdate(true);
    setDid(item.dId);
  };
const loadAllDoctorData = () => {
  Service.getAllDoctor().then(res => {
    setDoctorData(res.data);
  })
}
const saveData = (data) => {
  if (!isUpdate) {
      console.log(data);
      Service.saveDoctor(data).then(res => {
        
        console.log(res.data);
      
        toast.success('Record successfully Added');
        loadAllDoctorData();
      })
      .catch(error => {
          toast.error('Record already present');
      });
  }
  else{
     Service.updateDoctors(did, data).then((res) => {
      console.log(res.data);

      //localStorage.setItem("PatientID", pid);
      toast.success('Data Updated successfully...');
      //navigate("/print");
      reset({
        doctorName: "",
        contactNo: "",
        address: "",
        email: "",
       // qualification: "",
        designation: "",
        specialization: "",
        username: "",
        password: "",
      });
      setIsUpdate(false);
      loadAllDoctorData();
    });
  }
  
};
const ondelete = (item) => {
    if(window.confirm('Are you really want to delete this record?'))
    {
        console.log(item.dId);
        Service.deleteDoctorRecord(item.dId).then(res => {
          toast.success('Record deleted successfully...');
          loadAllDoctorData();                
        })
    }

}

return (
  <div>
    <div className="main-container ">
      <header className="header">
        <img
          className="header-logo"
          src="/assets/images/logo.jpg"
          alt="logo"
        />
        <div>
          <button
            type="button"
            className="btn backgroundcolor text-white rounded-0"
            onClick={() => navigate("/doctor")} >
            Add Doctor
          </button>
          <button
            type="button"
            className="btn backgroundcolor ms-3 me-3 text-white rounded-0"
            onClick={() => navigate("/billing")} >
            Add Treatment
          </button>
          <button
            type="button"
            className="btn backgroundcolor me-4 text-white rounded-0"
            onClick={() => navigate("/DailyReports")}
          >
            Daily Reports
          </button>
          <a
            onClick={logout}
            className="btn-logout text-decoration-none"
            style={{ cursor: "pointer" }}
          >
            Logout
          </a>
        </div>
      </header>
      <div className="section" style={{ marginTop: 30,marginBottom:10 }}>
        <div className="row">
          <div className="col-md-4">
              <form onSubmit={handleSubmit(saveData)}>
                  <div className="card patient-reg-card ">
                      <div className="card-header patient-reg-card-header">
                        <h5 className="text-center">Add Doctor Details</h5>
                      </div>
                      <br/>
                      <div className="row ms-5 gy-2 mb-3" style={{ width: "90%" }}>
                      <div className="col-10">
                          <input
                          className="form-control fo0rm-control-sm ps-3 rounded-3"
                          type="text"
                          placeholder="Enter Full Name"
                          aria-label="default input example"
                          {...register("doctorName", {
                              required: "please enter your name.",
                              pattern: {
                              value: /^[a-z A-Z]+$/,
                              message: "Enter valid Name",
                              },
                          })}
                          />
                          {errors.doctorName && (
                          <span className="text-danger">
                              {errors.doctorName.message}
                          </span>
                          )}
                      </div>
                      <div className="col-10">
                          <input
                          className="form-control form-control-sm rounded-3"
                          type="text"
                          placeholder="Conatct No"
                          aria-label="default input example"
                          {...register("contactNo", {
                              required: "please enter your contactNo.",

                              pattern: {
                              value: /^[0][1-9]\d{9}$|^[1-9]\d{9}$/,
                              message: "Enter valid Contact Number",
                              },
                          })}
                          />
                          {errors.contactNo && (
                          <span className="text-danger">
                              {errors.contactNo.message}
                          </span>
                          )}
                      </div>
                      <div className="col-10">
                          <input
                          className="form-control form-control-sm ps-3 rounded-3"
                          type="text"
                          placeholder="Enter Email ID [not mandatory]"
                          aria-label="default input example"
                          {...register("email", {
                              pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "Enter valid email",
                              },
                          })}
                          />
                          {errors.email && (
                          <span className="text-danger">
                              {errors.email.message}
                          </span>
                          )}
                      </div>                    
                      <div className="col-10" >
                          <select
                          className="form-select form-select-sm rounded-3"
                          aria-label="Default select example"
                          {...register("qualification", {
                              required: "Select one option.",
                          })}
                          >
                          <option value="">Select Qualification</option>
                          <option value="MBBS">MBBS</option>
                          <option value="BAMS">BAMS</option>
                          <option value="BDS">BDS</option>
                          </select>
                          {errors.qualification && (
                          <span className="text-danger">
                              {errors.qualification.message}
                          </span>
                          )}
                      </div>  
                      <div className="col-10" >
                          <input
                          className="form-control form-control-sm rounded-3"
                          type="text"
                          placeholder="Designation"
                          aria-label="default input example"
                          {...register("designation", {
                              required: "please enter your designation.",
                              pattern: {
                              value:/^[a-z A-Z 0-9]+$/,
                              message: "Enter valid designation",
                              },
                          })}
                          />
                          {errors.designation && (
                          <span className="text-danger">
                              {errors.designation.message}
                          </span>
                          )}
                      </div> 
                      <div className="col-10" >
                          <input
                              className="form-control form-control-sm rounded-3"
                              type="text"
                              placeholder="Specialization"
                              aria-label="default input example"
                              {...register("specialization", {
                                  required: "please enter your Specialization.",
                                  pattern: {
                                      value:/^[a-z A-Z 0-9]+$/,
                                      message: "Enter valid Specialization",
                                  },
                              })}
                              />
                              {errors.specialization && (
                              <span className="text-danger">
                                  {errors.specialization.message}
                              </span>
                          )}
                      </div> 
                      <div className="col-10" >
                          <input
                              className="form-control form-control-sm rounded-3"
                              type="text"
                              placeholder="UserName"
                              aria-label="default input example"
                              {...register("userName", {
                                  required: "please enter UserName.",
                                  pattern: {
                                      value:/^[a-z A-Z 0-9]+$/,
                                      message: "Enter valid Username",
                                  },
                              })}
                              />
                              {errors.userName && (
                              <span className="text-danger">
                                  {errors.userName.message}
                              </span>
                          )}
                      </div> 
                      <div className="col-10" >
                          <input
                              className="form-control form-control-sm rounded-3"
                              type="text"
                              placeholder="Password"
                              aria-label="default input example"
                              {...register("password", {
                                  required: "please enter proper password.",
                                  pattern: {
                                      // value:/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})+$/,
                                      value:/^[a-z A-Z 0-9]+$/,
                                      message: "Enter valid Password",
                                  },
                              })}
                              />
                              {errors.password && (
                              <span className="text-danger">
                                  {errors.password.message}
                              </span>
                          )}
                      </div> 
                      <div className="col-10">
                          <div
                          className="row gx-2 gy-2"
                          style={{ width: "100%" }}
                          >
                          <div className="col-6 d-grid gap-2">
                              <button
                              className="btn btn-primary btn-registration-form"
                              type="submit"
                              >
                              Save
                              </button>
                          </div>
                          <div className="col-6 d-grid gap-2">
                              <button
                              className="btn btn-primary btn-registration-form"
                              type="reset"
                              >
                              Cancel
                              </button>
                          </div>
                          </div>
                      </div>
                      
                      </div>
                  </div>
              </form>
          </div>
                      
          <div className="col-md-8">
            <div className="card patient-reg-card">
              <div className="card-header patient-reg-card-header">
                <h5 className="text-center">List of Doctors</h5>
              </div>
              <div className="card-body patient-list-card-body" >
                <div className="row ms-5" style={{ width: "90%" }}>

                  <table className="table borderless">
                    <thead className="table-light ">
                      <tr>
                        <th scope="col">Sr. No.</th>
                        <th scope="col">Doctor Name</th>
                        <th scope="col">Contact No</th>
                        <th scope="col">Email-id</th>
                        <th scope="col">Specialization</th>
                      </tr>
                    </thead>
                    <tbody>
                      {DoctorData && DoctorData.map((item, i) => (
                        <tr key={i}>
                          <td className="capital">{i + 1}</td>
                          <td>{item.doctorName}</td>
                          <td>{item.contactNo}</td>
                          <td>{item.email}</td>
                          <td>{item.specialization}</td>
                          <td> 
                              <i
                                  onClick={() => onEdit(item)}
                                  className="bi bi-pencil-square ms-2 me-2"
                              ></i>
                              < i onClick={() => ondelete(item)} 
                              className="bi bi-x text-danger"></i>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer1  />
    
  </div>
);
}
