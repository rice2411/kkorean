import { LandingPage } from "@/components/Pages";
import { useEffect } from "react";
import NProgress from "nprogress";
function Landing() {
  useEffect(() => {
    NProgress.done();
  }, []);
  return <LandingPage />;
}

export default Landing;
