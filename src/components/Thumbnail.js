import React from "react";

function Thumbnail(props) {
  if (props.restname === "McDonald's") {
    return (
      <img
        alt=""
        src="https://pbs.twimg.com/profile_images/1334527633992761344/kwlzzLs6_400x400.png"
        className="rest-img"
      />
    );
  }
  return <img alt="" src={props.thumbnailURL} className="rest-img" />;
  // return <img alt="" src="https://pbs.twimg.com/profile_images/1334527633992761344/kwlzzLs6_400x400.png" className="rest-img" />
}

export default Thumbnail;
