import HotelExperience from "../../components/retaurant/HotelExperience";
import Gallery from "../../components/retaurant/Gallery";
import RestaurantMenu from "../../components/retaurant/RestaurantMenu";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import RestaurantGrid from "@/app/components/retaurant/RestaurantGrid";
import Script from "next/script";
export default function Restaurant() {
  return (
    <>
      {" "}
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=AW-16881320456"
      />
      <Script
        id="google-ads-config"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'AW-16881320456');
      `,
        }}
      />
      <Header />
      <HotelExperience />
      <Gallery />
      {/* <RestaurantMenu /> */}
      <RestaurantGrid />
      <Footer />
    </>
  );
}
