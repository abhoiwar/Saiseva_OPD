import React, { useEffect, useState } from "react";

import Service from "../../services/Service";
import { ReactComponent as HeaderLogo } from "../../images/header-logo.svg";
//const img ='./assets/images/logo.jpg';

const getPid=()=>{
  const pid=JSON.parse(localStorage.getItem("PatientID"));
  return pid
}

export default function Print() {
  const PId=getPid();
  console.log(PId);
 const [printData, setPrintData] = useState();
  const [pAge,setpAge]=useState();

/*useEffect(() => {
  console.log(PId);
  Service.getPatientById(PId).then((res) => {
   var Bdate=new Date(res.data.birthDate);
   var today=new Date();
   var Age = today.getFullYear() - Bdate.getFullYear();
   setpAge(Age);
   setPrintData(res.data);
   console.log(res.data);
 })
}, [PId]);*/

useEffect(() => {
  Service.getPatientById(PId).then((res) => {
    var Bdate=new Date(res.data.birthDate);
   var today=new Date();
   var Age = today.getFullYear() - Bdate.getFullYear();
   setpAge(Age);
    setPrintData(res.data);
    console.log(res.data);
  });
}, [PId]);

  return (
    <div>
      <div className="row justify-content-end mt-5" id="print-invoice">
        <div className="col-6">
          <div className=" card receipt rounded-0 ">
            <table style={{ width: "100%" }}>
              <tr>
                <td style={{ textAlign: "left" }}>
                 
                  <HeaderLogo style={{ width: "100px"}}/>
                    
                  
                </td>
                <td style={{ textAlign: "right" }}>
                  <b>
                    <label className="Hospitalname mx-3 ">
                      Sai Seva Multispeciality Hospital
                    </label>
                  </b>
                </td>
              </tr>
              
              <tr>
                  <td style={{ textAlign: "left" }}>
                  <label className="mx-3 capital">Doctor Name: {printData && printData.doctorName} </label>
                  </td>
                  <td style={{ textAlign: "right" }}>
                  <label className="Hospitalname mx-3"> <b>Address-</b>Airport Road, Opposite to</label>
                  <label className="Hospitalname mx-3">Appa Cha Dhaba, Korhale, Shirdi - 423107.</label>
                  </td>
                </tr>
            </table>
            <hr></hr>

            <table style={{ width: "100%" }}>
              <tr>
                <td style={{ textAlign: "left" }}>
                <label className="mx-3 capital">Patient Name: {printData && printData.patientName} </label>
                </td>
                <td style={{ textAlign: "right" }}>
                <label className="Hospitalname mx-3"><b>Date:</b> { new Date().toLocaleDateString('en-GB') }</label>
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>
                <label className="mx-3 pr-3 capital">Address: {printData && printData.address}</label>
                </td>
                <td style={{ textAlign: "right" }}>
                <label className="Hospitalname mx-3">Patient ID: {printData && printData.pId}</label>
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>
                <label className="mx-3">Contact: {printData && printData.contactNo}</label>
                </td>
                <td style={{ textAlign: "right" }}>
                   <label className="Hospitalname mx-3">Gender : {printData && printData.gender}</label>
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>
                </td>
                <td style={{ textAlign: "right" }}>
                   <label className="Hospitalname mx-3">Age :{ pAge }</label>
                </td>
              </tr>
              </table>
              <table style={{ width: "100%" }}>
              <hr></hr> 
              <tr>
                <td style={{ textAlign: "left" }}>
                <b><label className="mx-3">History:</label></b>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <b><label className="mx-3">Rx.</label></b>
                </td>
              </tr>
              </table>
            
           <table style={{ width: "100%" }}>
           <tr>
                <td style={{ textAlign: "left" ,width:"23%"}}>
                  <table style={{ width: "100%" }}>
                    <tr>
                      <td style={{ textAlign: "left"}}>
                      <label>Clinical Ex</label>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "left"}}>
                      <label>Ht:  {printData && printData.height}</label>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "left"}}>
                      <label>Wt:  {printData && printData.weight}</label>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "left"}}>
                      <label>PR:</label>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "left"}}>
                      <label>RR:</label>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "left"}}>
                      <label>BP:</label>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "left"}}>
                      <label>Spo2:</label>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "left"}}>
                      <label>BSL&nbsp;:F&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;PP&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;R</label>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "left"}}>
                      <label>......................................</label>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "left"}}>
                      <label>Inv.</label>
                      </td>
                    </tr>
                  </table>
                </td>
                <td style={{ borderLeft: "3px solid Black",height: "615px", left: "23%", textAlign: "left" }}>
                </td>
            </tr>
           </table>
           <hr></hr>
        <table style={{ width: "100%" }}>
          <tr>
            <td style={{ textAlign: "right"}}>
              <label>{printData && printData.doctorName}</label>
            </td>
          </tr>
          <tr>
            <td style={{ textAlign: "right"}}>
              &nbsp;
            </td>
          </tr>
          <tr>
            <td style={{ textAlign: "right"}}>
              <label>Doctor's Sign</label>
            </td>
          </tr>
        </table>
          </div>
        </div>
        <div className="col-3">
          
        </div>
      </div>
    </div>
  );
}
