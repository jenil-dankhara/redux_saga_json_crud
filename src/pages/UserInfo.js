import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { MDBBtn } from "mdb-react-ui-kit";

const UserInfo = () => {
  const { users } = useSelector((state) => state.data);
  console.log("users", users);
  const { id } = useParams();
  console.log("id", id);
  const navigate = useNavigate();
  const singleUser = users.find((item) => item?.id === Number(id));
  console.log("singleUser", singleUser);
  return (
    <div style={{ marginTop: "100px" }}>
      <div
        className="row"
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "450px",
          alignContent: "center",
        }}
      >
        <p className="col-md-12 fs-3">User Details</p>
        <hr />
        <p className="col-md-6 fw-bold">ID:</p>
        <p className="col-md-6">{singleUser.id}</p>
        <p className="col-md-6 fw-bold">Name:</p>
        <p className="col-md-6">{singleUser.name}</p>
        <p className="col-md-6 fw-bold">Email:</p>
        <p className="col-md-6">{singleUser.email}</p>
        <p className="col-md-6 fw-bold">Address:</p>
        <p className="col-md-6">{singleUser.address}</p>
      </div>
      <MDBBtn onClick={() => navigate("/")} color="danger">
        Go Back
      </MDBBtn>
    </div>
  );
};

export default UserInfo;
