"use client";
import "./globals.css";
import Sidenav from "./components/SideNav";
import { useEffect, useState } from "react";
import Header from "./components/MobileHeader";
import StoreProvider from "./StoreProvider";
//import 'react-notifications/lib/notifications.css';
import { ToastContainer, toast } from 'react-toastify';

export default function RootLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <StoreProvider>
      <html lang="en">
        <body>
          <div className="flex h-screen bg-gray-200">
            <div>
              <Sidenav
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
              />
            </div>
            <div className="relative flex flex-col flex-1 lg:overflow-y-auto lg:overflow-x-hidden">
              {isMobile && (
                <Header
                  setSidebarOpen={setSidebarOpen}
                  className="sticky top-0 bg-white border-b border-slate-200 z-30"
                />
              )}
              <main>{children}</main>
            </div>
          </div>
        </body>

      </html>
    </StoreProvider>
  );
}