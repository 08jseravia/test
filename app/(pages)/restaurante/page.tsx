import HotelExperience from "../../components/retaurant/HotelExperience";
import Gallery from "../../components/retaurant/Gallery";
import RestaurantMenu from "../../components/retaurant/RestaurantMenu";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import RestaurantGrid from "@/app/components/retaurant/RestaurantGrid";
export default function Restaurant() {
  return (
    <>
      <Header />
      <HotelExperience />
      <Gallery />
      {/* <RestaurantMenu /> */}
      <RestaurantGrid />
      <Footer />
    </>
  );
}
