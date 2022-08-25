import React, { useState, useEffect } from "react";
import { MDBValidation, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createUserStart, updateUserStart } from "../redux/action";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  email: "",
  phone: "",
  address: "",
};

const AddEditUser = () => {
  const [formValue, setFormValue] = useState(initialState);
  const [editMode, setEditMode] = useState(false);
  const { users } = useSelector((state) => state.data);
  const { name, email, phone, address } = formValue;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setEditMode(true);
      const singleUser = users.find((item) => item.id === Number(id));
      setFormValue({ ...singleUser });
    } else {
      setEditMode(false);
      setFormValue({ ...initialState });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && phone && address) {
      if (!editMode) {
        dispatch(createUserStart(formValue));
        toast.success("User Added Successfully", { theme: "colored" });
        setTimeout(() => navigate("/"), 500);
      } else {
        dispatch(updateUserStart({ id, formValue }));
        setEditMode(false);
        toast.success("User UPdated Successfully", { theme: "colored" });
        setTimeout(() => navigate("/"), 500);
      }
    }
  };

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
  return (
    <>
      <MDBValidation
        className="row g-3"
        style={{ marginTop: "100px" }}
        noValidate
        onSubmit={handleSubmit}
      >
        <p className="fs-2 fw-bold">
          {!editMode ? "Add User Detail" : "Update User Detail"}
        </p>
        <div
          style={{
            margin: "auto",
            padding: "15px",
            maxWidth: "400px",
            alignContent: "center",
          }}
        >
          <MDBInput
            value={name || ""}
            name="name"
            type="text"
            onChange={onInputChange}
            required
            label="Name"
            validation="please provide a name"
            invalid
          ></MDBInput>
          <br />
          <MDBInput
            value={email || ""}
            name="email"
            type="email"
            onChange={onInputChange}
            required
            label="Email"
            validation="please provide an email"
            invalid
          ></MDBInput>
          <br />
          <MDBInput
            value={phone || ""}
            name="phone"
            type="number"
            onChange={onInputChange}
            required
            label="Phone"
            validation="please provide a phone no."
            invalid
          ></MDBInput>
          <br />
          <MDBInput
            value={address || ""}
            name="address"
            type="text"
            onChange={onInputChange}
            required
            label="address"
            validation="please provide an address"
            invalid
          ></MDBInput>
          <br />
          <div className="col-12">
            <MDBBtn style={{ marginRight: "10px" }} type="submit">
              {!editMode ? "Add" : "Update"}
            </MDBBtn>
            <MDBBtn onClick={() => navigate("/")} color="danger">
              Go Back
            </MDBBtn>
          </div>
        </div>
      </MDBValidation>
    </>
  );
};

export default AddEditUser;
