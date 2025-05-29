import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import OurService from "@/app/components/services/OurService";
import ServiceSection from "@/app/components/services/ServiceSection";
import Script from "next/script";

export default function Services() {
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
      <ServiceSection />
      <OurService />
      <Footer />
    </>
  );
}
