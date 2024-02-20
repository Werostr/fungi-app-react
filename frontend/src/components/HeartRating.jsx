import React from "react";
import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
  },
});

export default function HeartRating({
  name,
  value,
  defaultValue,
  precision,
  getLabelText,
  onChange,
  disabled,
  readOnly,
}) {
  return (
    <StyledRating
      name={name}
      value={value}
      defaultValue={defaultValue}
      precision={precision}
      getLabelText={getLabelText}
      icon={<FavoriteIcon fontSize="inherit" />}
      emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
      onChange={onChange}
      disabled={disabled}
      readOnly={readOnly}
    />
  );
}
