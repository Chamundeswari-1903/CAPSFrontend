import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Card from "../../components/ui/Card";
import axios from "axios";
import { useParams,useLocation,useNavigate} from "react-router-dom";
import { API } from "../../host";



const FormValidationSchema = yup.object({

  firstname: yup.string().required("First Name is required"),
  
  phone: yup.string().required("Phone Number is required"),
  email: yup.string().required("Email is Required"),

});

const UpdateAdmin = () => {
  const {
    setValue,
    
  } = useForm({
    resolver: yupResolver(FormValidationSchema),
  });

 
 // const { userid } = useParams();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const userid = params.get("userid");
  const [fname, setFname] = useState("");
  
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  
 const navigate = useNavigate()


  useEffect(() => {
    const fetchUserData = async () => {
      try {
       
        const response = await axios.get(`${API}/getadmin?userid=${userid}`);
        const responseData = response.data;
       // console.log(responseData)

        setFname(responseData.fname)
       
        setEmail(responseData.email)
        setPhone(responseData.phone)       
        

        setValue("fname", responseData.fname);
       
        setValue("email", responseData.email);
        setValue("phone", responseData.phone);
        

      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, [userid]);

  const Update = async (e) => {
    e.preventDefault();

    try {
      
      const response = await axios.put(`${API}/updateadmin?userid=${userid}`, {
        userid,
        fname: fname,
       
        email: email,
        phone: phone,
        
        
      });

      // console.log(response);
      navigate('/admin');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {/* <div className="flex justify-between flex-wrap items-center mb-6">
        <h5 className="font-medium lg:text-2xl text-xl capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4">
          Update Admin
        </h5>
      </div> */}
      <div>
        <div className="d-flex  align-items-center">
          <div className="col-md-6">
            <div className="bg-transparent">
              <Card title='Update User'>

                <form className="space-y-3" onSubmit={Update} >
                  <div >
                    <label htmlFor="fname" className="capitalize form-label"><b>FirstName </b></label>
                    <input
                      type="text"
                      name="fname"
                      className=" form-control py-2 "
                      id="fname"
                      placeholder="First Name"
                      value={fname}
                      onChange={(e) => setFname(e.target.value)}
                    />
                  </div>

                 

                  <div >
                    <label htmlFor="email" className="capitalize form-label"><b>Email</b></label>
                    <input
                      type="text"
                      name="email"
                      className=" form-control py-2 "
                      id="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div >
                    <label htmlFor="phone" className="capitalize form-label"><b>Phone </b></label>
                    <input
                      type="text"
                      name="phone"
                      className=" form-control py-2"
                      id="phone"
                      placeholder="Phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>

                 

                  <div className="ltr:text-right rtl:text-left">
                    <button className="btn btn-dark text-center" type="submit">
                      UPDATE
                    </button>
                  </div>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateAdmin;
