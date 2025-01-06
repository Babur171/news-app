import React from "react";
import "./Singlepage.css";
import img1 from "../../assets/srccon_2023_giving.jpg";

const SinglePage = () => {
  return (
    <div className="maincontainer">
      {/* Image above content for better responsiveness */}

      {/* Left Section with Text */}
      <h1 className="post-title">
        How we can give to each other as a community at SRCCON 2023
      </h1>
      <h3>by The OpenNews team</h3>
      <img src={img1} alt="Postimg" className="post-image" />
      <p>
        Yep we're back, back again (for SRCCON in Minneapolis)! (photo/
        <a href="#">Erik Westra</a>)
      </p>
      <p>
        It’s a little hard to process how excited we are to be back in
        Minneapolis next week for SRCCON 2023, and almost as hard to believe
        that 2023 is the 10th year of SRCCON. As much as things around us have
        changed since that first conference in Philly in 2014, our core
        principles remain the same.
        <p>
          We’ve always talked about SRCCON as a beginning of our work as a
          community, not a culmination. What we imagine{" "}
          <a href="#">there becomes</a> real as new tools and ideas come home
          with us.
        </p>
      </p>
    </div>
  );
};

export default SinglePage;
