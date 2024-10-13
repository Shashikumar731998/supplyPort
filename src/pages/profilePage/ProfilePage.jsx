// import main_banner from "../../assets/images/home-banner-graphic.png";
import { Navbar } from "../../components/Navbar";
import LatestAddress from "./LatestAddress";
import OutletAddress from "./OutletAddress";
import ProfileBanner from "./ProfileBanner";
import "./style.css";

const ProfilePage = () => {

  return (
    <>
      <Navbar />
      <div className="container">
      
      <ProfileBanner />
      <OutletAddress />
      <LatestAddress />
      </div>
      {/* <HomeBanner imgSrc={main_banner} /> */}
      {/* <ProductSlider />
      <PreviousPurchaseItem />
      <CategoryGrid />
      <BrandGrid /> */}
      {/* <CreditsGrid /> */}
    </>
  );
};
export default ProfilePage;
