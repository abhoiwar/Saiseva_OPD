import React, { useEffect, useState } from "react";
import Service from "../../services/Service";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

//import { Link } from "react-router-dom";
import "./PatientReg.css";
import Footer1 from "./Footer1";
import moment from 'moment'
//changes by jayashri on 8-9
import PatientModal from "./PatientModal.jsx";
import { toast } from "react-toastify";

//Patient methods-
export default function PatientReg() {
  const [PatientData, setPatientData] = useState();
  const [DoctorData, setDoctorData] = useState();
  const [selectedDoctor, setSelectedDoctor] = useState();
  const [isUpdate, setIsUpdate] = useState(false);
  const [filteredPatients, setFilterPatients] = useState([]);
  const [DoctorId, setDoctorId] = useState();
  const [Pname, setPname] = useState();

  //changes by jayashri on 8-9
  const [PatientModalOpen, setPatientModalOpen] = useState(false);

  const [deleteReason, setDeleteReason] = useState();
  const [isDismiss, setIsDismiss] = useState();
  const [deleteData, setDeleteData] = useState();
  const [delreason, setdelreason] = useState();
  const [show, setshow] = useState(false);

  //const [selectedPatient, setSelectedPatient] = useState();
  const navigate = useNavigate();
  const {
    register,
    // handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm();

  useEffect(() => {
    loadAllPatientsData();
  }, []);

  //fetch data
  const loadAllPatientsData = () => {
    Service.getAllPatients()
      .then((res) => {
        setPatientData(res.data);
        setFilterPatients(res.data);
      })

      .catch((error) => {
        console.log(error);
      });
  };


  const onDoctorPrint = (item) => {
    //console.log(item);
    setSelectedDoctor(item.dId);
    console.log(selectedDoctor);
    reset(item);
    setPatientData(item);
  };

  //update data
  const openEditModal = (item) => {
    console.log(item);
    reset(item);
    setPatientData(item);
  };

  //Assign control values
  const onPatientNameChange = (e) => {
    const value = e.target.value;
    setPatientData({ ...PatientData, patientName: value });
  }
  const oncontactNoChange = (e) => {
    const value = e.target.value;
    setPatientData({ ...PatientData, contactNo: value });
  }
  const onaddressChange = (e) => {
    const value = e.target.value;
    setPatientData({ ...PatientData, address: value });
  }
  const onemailChange = (e) => {
    const value = e.target.value;
    setPatientData({ ...PatientData, email: value });
  }
  const onbirthDateChange = (e) => {
    const value = e.target.value;
    setPatientData({ ...PatientData, birthDate: value });
  }
  const ongenderChange = (e) => {
    const value = e.target.value;
    setPatientData({ ...PatientData, gender: value });
  }
  const onweightChange = (e) => {
    const value = e.target.value;
    setPatientData({ ...PatientData, weight: value });
  }
  const onheightChange = (e) => {
    const value = e.target.value;
    setPatientData({ ...PatientData, height: value });
  }
  const onbloodGroupChange = (e) => {
    const value = e.target.value;
    setPatientData({ ...PatientData, bloodGroup: value });
  }

  const ondoctorOptionChange = (e) => {
    const value = e.target.value;
    setPatientData({ ...PatientData, dId: value });
  }

  //input field validation

  /*validate(){
    let input = this.state.input;
    let errors = {};
    let isValid = true;
  
    if (!input["username"]) {
      isValid = false;
      errors["username"] = "Please enter your username.";
    }
  
    if (typeof input["username"] !== "undefined") {
      const re = /^\S*$/;
      if(input["username"].length < 6 || !re.test(input["username"])){
          isValid = false;
          errors["username"] = "Please enter valid username.";
      }
    }
  
    if (!input["email"]) {
      isValid = false;
      errors["email"] = "Please enter your email Address.";
    }
  
    if (typeof input["email"] !== "undefined") {
        
      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!pattern.test(input["email"])) {
        isValid = false;
        errors["email"] = "Please enter valid email address.";
      }
    }
  
    if (!input["password"]) {
      isValid = false;
      errors["password"] = "Please enter your password.";
    }
  
    if (!input["confirm_password"]) {
      isValid = false;
      errors["confirm_password"] = "Please enter your confirm password.";
    }
  
    if (typeof input["password"] !== "undefined") {
      if(input["password"].length < 6){
          isValid = false;
          errors["password"] = "Please add at least 6 charachter.";
      }
    }
  
    if (typeof input["password"] !== "undefined" && typeof input["confirm_password"] !== "undefined") {
        
      if (input["password"] != input["confirm_password"]) {
        isValid = false;
        errors["password"] = "Passwords don't match.";
      }
    }
  
    this.setState({
      errors: errors
    });
  
    return isValid;
  }*/

  //Update changes in db
  const handleSubmit = (e) => {
    const dFlag = 0;
    //console.log(data);
    e.preventDefault();

    Service.updatePatients(PatientData.pId, dFlag, PatientData).then((res) => {
      console.log(res.data);
      setIsDismiss("modal");
      //alert("Data Updated successfully...");     
      toast.success('Data Updated successfully...');
      loadAllPatientsData();
      console.log(res);
    });

  };

  const ondoctorUpdate = (event) => {

    event.preventDefault();
    const dFlag = 1;
    Service.updatePatients(PatientData.pId, dFlag, PatientData).then((res) => {
      console.log(res.data);
      setIsDismiss("modal");
      localStorage.setItem("PatientID", PatientData.pId);
      setSelectedDoctor('');
      navigate("/print");
    });

  };

  //delete data
  const onDelete = () => {
    var data = {
      pId: deleteData.pId,
      deleteReason: deleteReason,
    };

    console.log(data);
    if (deleteReason) {
      Service.deleteRecord(data)
        .then((res) => {
          setIsDismiss("modal");
          setdelreason("Record Successfully Deleted...");
          // toast.success('Record Successfully Deleted...');
          loadAllPatientsData();
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      //setIsDismiss("modal");
      setdelreason("Please enter delete reason.");
      //console.log(delreason);
      //setshow(true);
      //delreasonmsg.value="Please enter delete reason";
      // alert('Please enter delete reason.');
      // toast.warning('Please enter delete reason.');
    }
  };

  const openDeleteModal = (item) => {
    setDeleteData(item);
  };

  //Doctor method-

  useEffect(() => {
    loadAllDoctorData();
  }, []);

  const loadAllDoctorData = () => {
    Service.getAllDoctor()
      .then((res) => {
        if (res.data && res.data.length) {
          setDoctorData(res.data);
          setSelectedDoctor(res.data[0].dId);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onchange = (item) => {
    setSelectedDoctor(item.dId);
    console.log(item);
    // reset();
    Service.getAllPatientsByDoctor(item.dId).then((res) => {
      console.log(item);
      setPatientData(res.data);
      setFilterPatients(res.data);
    });
  };
  //print icon
  const onPrint = (event) => {
    event.preventDefault();
    const dFlag = 1;
    Service.updatePatients(PatientData.pId, dFlag, PatientData).then((res) => {
        console.log(res.data);
        setIsDismiss("modal");
        localStorage.setItem("PatientID", PatientData.pId);
        setSelectedDoctor('');
        navigate("/print");
    });
  };
  //search filter

  const handleSearchPatients = (event) => {
    const text = event.target.value;
    if (text) {
      const filtered = PatientData.filter((item) =>
        item.patientName.toLowerCase().includes(text.toLowerCase()) ||
        item.contactNo.toLowerCase().includes(text.toLowerCase())

      );
      setFilterPatients(filtered);
    } else {
      setFilterPatients(PatientData);
    }
  };

  const logout = () => {
    localStorage.removeItem("RecLogin");
    localStorage.removeItem("DocLogin");
    localStorage.removeItem("isRecLoggedIn");
    localStorage.removeItem("isDocLoggedIn");
    navigate("/");
  };

  const onDeleteReasonChange = (reason) => {
    if (reason) {
      setDeleteReason(reason);
      setdelreason("");
    }
  };

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
              className="btn  backgroundcolor ms-2 me-2 text-white rounded-2"
              onClick={() => navigate("/SearchPatient")}
            >
              Search Patient
            </button>
            <button
              type="button"
              className="btn  backgroundcolor ms-2 me-2 text-white rounded-2"
              onClick={() => navigate("/patient")}
            >
              Patient Registration
            </button>
            <button
              type="button"
              className="btn backgroundcolor ms-2 me-2 text-white rounded-2"
              onClick={() => navigate("/billing")}
            >
              Generate Patient Bill
            </button>
            <button
              type="button"
              className="btn backgroundcolor ms-2 me-2 text-white rounded-2"
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
        <div className="section" style={{ marginTop: 30 }}>
          <div className="row">
            <div className="col-md-12">
              <div className="card patient-reg-card">
                <div
                  className="card-header patient-list-card-header"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h6>List of Patient</h6>
                  <div className="input-group input-group-sm input-patient-search">
                    <input
                      type="text"
                      className="form-control search-patient"
                      aria-label="patient-search"
                      aria-describedby="patient-search-sm"
                      placeholder="Search Patient"
                      onChange={handleSearchPatients}
                    />
                    <span>
                      <i className="bi bi-search"></i>
                    </span>
                  </div>
                </div>

                <div className="card-body patient-list-card-body">
                  {/* <div className="row gx-1 gy-1" style={{ width: "100%" }}>
                    {DoctorData &&
                      DoctorData.map((item, i) => (
                        <div className="col-3 col-md-3">
                          <div
                            className={`btn-doctors-tabs ${
                              selectedDoctor === item.dId ? "active" : ""
                            } `}
                            key={i}
                            onClick={() => onchange(item)}
                          >
                            {item.doctorName}
                          </div>
                        </div>
                      ))}
                  </div> */}

                  <table className="table borderless ">
                    <thead className="table-light">
                      <tr>
                        <th scope="col">Sr.No</th>
                        <th scope="col">Date</th>
                        <th scope="col">Patient Id</th>
                        <th scope="col">Patient Name</th>
                        <th scope="col">Doctor Name</th>
                        <th scope="col">Contact No.</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPatients &&
                        filteredPatients.map((item, i) => (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td className="capital">{moment(item.createdDate).format('DD/MM/YYYY')}</td>
                            <td className="capital">{item.pId}</td>
                            <td className="capital">{item.patientName}</td>
                            <td className="capital">
                              {item.doctorName}
                            </td>
                            <td>{item.contactNo}</td>
                            <td>
                              <i
                                onClick={() => openEditModal(item)}
                                className="bi bi bi-pencil-square ms-2 me-2"
                                data-bs-toggle="modal"
                                data-bs-target="#EditModal"
                              ></i>

                              <i
                                onClick={() => onDoctorPrint(item)}
                                className="bi bi-printer me-2"
                                data-bs-toggle="modal"
                                data-bs-target="#DoctorModal"
                              ></i>

                              <i
                                onClick={() => openDeleteModal(item)}
                                className="bi bi-trash3"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                              ></i>
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
      <Footer1 style={{ width: '93%' }} />

      <div
        class="modal fade"
        id="DoctorModal"
        tabindex="-1"
        aria-labelledby="DoctorModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header patient-reg-card-header">
              <h5 class="modal-title" id="DoctorModalLabel">
                Consult another Doctor ?
              </h5>
            </div>
            <div class="patient-reg-card-body">
              <div className="row gy-2 gx-0" style={{ width: "100%" }}>
                <div className="col-12">
                  <div >
                    <div
                      className="col-10 "
                      style={{ display: "flex" }}
                    >
                      <label className="Doctor-label col-4">Doctor Name : </label>
                      <select
                        className="form-select form-select-sm rounded-3"
                        aria-label="Default select example"
                        onChange={(event) => ondoctorOptionChange(event)}
                      >
                        {<option value="">Select Doctor</option>}
                        {(DoctorData)?.map((option) => (
                          <option selected={selectedDoctor === option.dId ? "active" : ""} key={option} value={option.dId}>
                            {option.doctorName}
                          </option>

                        ))}
                      </select>

                    </div>
                    <br />
                    <div className="col-12">
                      <div
                        className="row gx-2 gy-2"
                        style={{ width: "100%" }}
                      >
                        <div className="col-6 d-grid gap-2">
                          <button
                            className="btn btn-primary btn-registration-form"
                            type="button"
                            data-bs-dismiss="modal"
                            onClick={(event) => ondoctorUpdate(event)}
                          >
                            Change Doctor
                          </button>
                        </div>
                        <div className="col-6 d-grid gap-2">
                          <button
                            type="button"
                            class="btn btn-primary"
                            data-bs-dismiss="modal"
                            onClick={(event) => onPrint(event)}
                          >
                            Print
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div
        class="modal fade"
        id="EditModal"
        tabindex="-1"
        aria-labelledby="EditModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header patient-reg-card-header">
              <h5 class="modal-title" id="EditModalLabel">
                Update Patient details..
              </h5>
            </div>
            <div class="patient-reg-card-body">
              <div className="row gy-2 gx-0" style={{ width: "100%" }}>
                <div className="col-12">
                  <input
                    className="form-control form-control-sm ps-3 rounded-3"
                    type="text"
                    placeholder="Enter Full Name"
                    aria-label="default input example"
                    required="true"

                    {...register("patientName", {
                      required: "please enter your name.",
                      pattern: {
                        value: /^[a-z A-Z]+$/,
                        message: "Enter valid Name",
                      },
                      onChange: e => onPatientNameChange(e)
                    })}
                  />
                  {errors.patientName && (
                    <span className="text-danger">
                      {errors.patientName.message}
                    </span>
                  )}
                </div>
                <div className="col-12">
                  <input
                    className="form-control form-control-sm ps-3 rounded-3"
                    type="text"
                    placeholder="Address"
                    aria-label="default input example"
                    required="true"
                    {...register("address", {
                      required: "please enter your address.",
                      pattern: {
                        value: /^[a-z A-Z 0-9]+$/,
                        message: "Enter valid Address",
                      },
                      onChange: e => onaddressChange(e)
                    })}
                  />
                  {errors.address && (
                    <span className="text-danger">
                      {errors.address.message}
                    </span>
                  )}
                </div>
                <div className="col-12">
                  <input
                    className="form-control form-control-sm ps-3 rounded-3"
                    type="text"
                    placeholder="Conatct No"
                    aria-label="default input example"
                    required="true"
                    {...register("contactNo", {
                      required: "please enter your contactNo.",

                      pattern: {
                        value: /^[0][1-9]\d{9}$|^[1-9]\d{9}$/,
                        message: "Enter valid Contact Number",
                      },
                      onChange: e => oncontactNoChange(e)
                    })}
                  />
                  {errors.contactNo && (
                    <span className="text-danger">
                      {errors.contactNo.message}
                    </span>
                  )}
                </div>
                <div className="col-12">
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
                      onChange: e => onemailChange(e)
                    })}
                  />
                  {errors.email && (
                    <span className="text-danger">
                      {errors.email.message}
                    </span>
                  )}
                </div>
                <div className="col-12">
                  <input
                    className="form-control form-control-sm ps-3 rounded-3"
                    type="date"
                    placeholder="Date of Birth or Birth Year"
                    aria-label="default input example"
                    {...register("birthDate", {
                      required: "please enter your birthDate.",


                      onChange: e => onbirthDateChange(e)

                    })}
                  />

                  {errors.birthDate && (
                    <span className="text-danger">
                      {errors.birthDate.message}
                    </span>
                  )}
                </div>
                <div className="col-12">
                  <div className="row gx-2 gy-2">
                    <div
                      className="col-6 col-md-6"
                      style={{ display: "flex" }}
                    >
                      <label className="gender-label">Gender</label>
                      <select
                        className="form-select form-select-sm rounded-3"
                        aria-label="Default select example"
                        required="true"
                        {...register("gender", {
                          required: "Select one option.",

                          onChange: e => ongenderChange(e)
                        })}
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.gender && (
                        <span className="text-danger">
                          {errors.gender.message}
                        </span>
                      )}
                    </div>

                    <div className="co-6 col-md-6">
                      <input
                        className="form-control form-control-sm rounded-3"
                        type="text"
                        placeholder="Enter Weight"
                        aria-label="default input example"
                        required="true"
                        {...register("weight", {
                          required: "please enter your weight.",

                          onChange: e => onweightChange(e)
                        })}
                      />
                      {errors.weight && (
                        <span className="text-danger">
                          {errors.weight.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="row gx-2 gy-2">
                    <div className="co-6 col-md-6">
                      <input
                        className="form-control form-control-sm rounded-3"
                        type="text"
                        placeholder="Blood Group"
                        aria-label="default input example"
                        required="true"
                        {...register("bloodGroup", {
                          required: "please enter your bloodGroup.",
                          onChange: e => onbloodGroupChange(e),
                          pattern: {
                            value: /^(A|B|AB|O)[+-]$/,
                            message: "Enter valid Blood Group",
                          },
                        })}
                      />
                      {errors.bloodGroup && (
                        <span className="text-danger">
                          {errors.bloodGroup.message}
                        </span>
                      )}
                    </div>
                    <div className="co-6 col-md-6">
                      <input
                        className="form-control form-control-sm rounded-3"
                        type="text"
                        placeholder="Enter Height(cm)"
                        aria-label="default input example"
                        required="true"
                        {...register("height", {
                          required: "please enter your height.",

                          onChange: e => onheightChange(e)
                        })}
                      />
                      {errors.height && (
                        <span className="text-danger">
                          {errors.height.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div
                    className="row gx-2 gy-2"
                    style={{ width: "100%" }}
                  >
                    <div className="col-6 d-grid gap-2">
                      <button
                        className="btn btn-primary btn-registration-form"
                        type="button"
                        onClick={e => handleSubmit(e)}
                        data-bs-dismiss="modal"
                      // onClick={ () => { this.form.dispatchEvent(new Event('submit',{ cancelable: true })) } }                                      
                      >
                        Update
                      </button>
                    </div>
                    <div className="col-6 d-grid gap-2">
                      <button
                        type="reset"
                        class="btn btn-primary"
                        data-bs-dismiss="modal"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"

        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                You want to delete. ?
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <input
                type="text"
                className="form-control  rounded-4"
                placeholder="Please enter delete reason"
                {...register("deleteReason", {
                  required: "please enter your reason.",
                  pattern: {
                    value: /^[a-z A-Z 0-9]+$/,
                    message: "Enter valid Address",
                  },
                  onChange: (e) => onDeleteReasonChange(e.target.value)
                })}
              />
              {errors.deleteReason && (
                <span className="text-danger">
                  {errors.deleteReason.message}
                </span>
              )}
              <label className=" info-color-dark ms-5" id="delreasonmsg" >{delreason}</label>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                // data-bs-dismiss="modal"
                onClick={onDelete}

              >
                Delete
              </button>
              <button
                type="button"
                class="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
