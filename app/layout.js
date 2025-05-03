import { Poppins } from "next/font/google";
import "./globals.css";
import AppProvider from "@/context/AppProvider";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Nayai - Platform to know your rights",
  description: "Platform to know your rights",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} relative min-h-screen flex flex-col `}>
        <AppProvider>
        <Header />
        <main className="mt-18 mx-auto px-5 py-16 w-full flex flex-col flex-1 b ">{children}</main>
        <Footer />
        </AppProvider>
        
      </body>
    </html>
  );
}