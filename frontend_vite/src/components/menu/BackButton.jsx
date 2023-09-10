import { Link } from "@reach/router";
import React from "react";

const BackButton = ({ to }) => {
  return (
    <Link to={to} className="text-xl"><i className='fa fa-angle-left' />Back</Link>
  );
}

export default BackButton;
