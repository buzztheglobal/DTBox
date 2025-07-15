import ReactGA from "react-ga4";

export const initGA = () => {
  ReactGA.initialize("G-KSDBXCR4RJ"); // https://linked.com
  // later to be changed to the actual GA4 ID
  // You can also use a different ID for development and production
};

export const logPageView = (path) => {
  ReactGA.send({ hitType: "pageview", page: path });
};