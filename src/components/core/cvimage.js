import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const CvImage = ({ imageObject, className = "h-24 w-24 mx-auto mb-4 object-contain" }) => {
  if (!imageObject) return null;

  const imgData = getImage(imageObject?.localFile);

  if (imgData) {
    return (
      <GatsbyImage
        image={imgData}
        alt={imageObject.alt || ""}
        className={className}
      />
    );
  }

  // Fallback to localFile public URL for SVG's
  if (imageObject?.localFile?.publicURL) {
    return (
      <img
        src={imageObject.localFile.publicURL}
        alt={imageObject.alt || ""}
        className={className}
      />
    );
  }

  // Fallback to external link
  if (imageObject?.link) {
    return (
      <img
        src={imageObject.link}
        alt={imageObject.alt || ""}
        className={className}
      />
    );
  }

  return null;
};

export default CvImage;