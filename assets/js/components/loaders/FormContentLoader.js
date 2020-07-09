import React from "react";
import ContentLoader from "react-content-loader";

const FormContentLoader = (props) => (
  <ContentLoader
    speed={10}
    width={600}
    height={350}
    viewBox="0 0 600 350"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="25" rx="5" ry="5" width="557" height="30" /> 
    <rect x="0" y="85" rx="5" ry="5" width="557" height="30" /> 
    <rect x="0" y="144" rx="5" ry="5" width="557" height="30" /> 
    <rect x="0" y="209" rx="5" ry="5" width="557" height="30" /> 
    <rect x="0" y="3" rx="0" ry="0" width="109" height="11" /> 
    <rect x="0" y="67" rx="0" ry="0" width="109" height="11" /> 
    <rect x="0" y="123" rx="0" ry="0" width="109" height="11" /> 
    <rect x="0" y="187" rx="0" ry="0" width="109" height="11" />
    <rect x="0" y="265" rx="5" ry="5" width="109" height="40" /> 
  </ContentLoader>
);

export default FormContentLoader;
