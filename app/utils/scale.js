import { metrics } from "@theme";
export const scaleWidth = (size) => {
    return (metrics.screenWidth * size) / 414;
  };

  export const scaleHeight = (size) => {
    return (metrics.screenHeight * size) / 736;
  };
