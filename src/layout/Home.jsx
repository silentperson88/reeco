import React from "react";
import Header from "../component/header";
import Table from "../component/table";
import "./home.scss";

function Home() {
  return (
    <div className="home">
      <div className="headerContainer">
        <Header />
        <div className="breadcumb">Order {" > "} Order12345</div>
        <div className="orderContainer">
          <h2 className="orderTitle">Order12345</h2>
          <div className="orderBtn">
            <button className="backBtn">Back</button>
            <button className="approveBtn">Approve</button>
          </div>
        </div>
      </div>
      <div className="tableContainer">
        <div className="orderInfo">
          <div className="infoCard1">
            <span className="subTitle">Order Information</span>
            <h5 className="info">Lorem Lorem Lorem Lorem</h5>
          </div>
          <div className="infoCard2">
            <span className="subTitle">Order Information</span>
            <h5 className="info">Lorem Lorem Lorem Lorem</h5>
          </div>
          <div className="infoCard3">
            <span className="subTitle">Order Information</span>
            <h5 className="info">Lorem Lorem Lorem Lorem</h5>
          </div>
          <div className="infoCard4">
            <span className="subTitle">Order Information</span>
            <h5 className="info">Lorem Lorem Lorem Lorem</h5>
          </div>
          <div className="infoCard5">
            <span className="subTitle">Order Information</span>
            <h5 className="info">Lorem Lorem Lorem Lorem</h5>
          </div>
        </div>
        <div className="tableCard">
          <Table data={[]} />
        </div>
      </div>
    </div>
  );
}

export default Home;
