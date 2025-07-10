'use client'
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useAuth } from "@/lib/contexts/auth";

export default function Sidenav({ sidebarOpen, setSidebarOpen }) {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [showProductSubmenu, setShowProductSubmenu] = useState(false);
  const [showConfigurationSubmenu, setShowConfigurationuctSubmenu] = useState(false);
  const [showAuctionSubmenu, setShowAuctionSubmenu] = useState(false);
  const [showAuctionClientSubmenu, setShowAuctionClientSubmenu] = useState(false);
  const [showRoleSubmenu, setShowRoleSubmenu] = useState(false);
  const [showPaymentSubmenu, setShowPaymentSubmenu] = useState(false);
  const [showClaimSubmenu, setShowClaimSubmenu] = useState(false);
  const sidebar = useRef(null);
  const router = useRouter();
  const { logout } = useAuth();

  useEffect(() => {
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  const handleSideBarChange = async () => {
    setSidebarExpanded(!sidebarExpanded);
    if (!sidebarExpanded) {
      setShowProductSubmenu(false);
      setShowAuctionSubmenu(false);
    }
  };

  return (
    <>
      {/* Sidebar backdrop */}
      <div
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className={`fixed inset-0 border-r border-gray-200 sm:translate-x-0 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`fixed flex flex-col z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar lg:w-64 w-72 bg-white lg:sidebar-expanded:w-20 shrink-0 border-r border-gray-200 sm:translate-x-0 p-4 transition-all duration-200 ${sidebarOpen ? "translate-x-0" : "-translate-x-72"
          }`}
      >
        <div className="flex justify-between pr-3 sm:px-2">
          <Link href="/">
            <span
              className={`${sidebarExpanded ? "lg:hidden" : "block"
                } welcome-step text-2xl font-medium tracking-tighter text-black focus:outline-none focus:ring whitespace-nowrap cursor-pointer mb-6`}
            >
              <Image
                className="mt-2 mb- h-100 w-32"
                src="/clickbidBanner.jpg"
                height={32}
                width={300}
                alt="logo"
              />
            </span>
          </Link>

          <Link href="/">
            <Image
              className={`${!sidebarExpanded ? "lg:hidden" : "block"
                } mt-1 mb-8 h-8 w-8`}
              src="/clickbid logo.png"
              height={100}
              width={100}
              alt="logo"
            />
          </Link>
        </div>

        {/* Links */}
        <div className="space-y-4">

          <ul className="space-y-2">
            {/* PRODUCTS */}
            <li>
              <button
                onClick={() => {
                  if (!sidebarExpanded) {
                    setShowProductSubmenu(!showProductSubmenu);
                  } else {
                    router.push("/Product");
                    setSidebarOpen(false);
                  }
                }}
                className="flex items-center w-full p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 font-light hover:font-semibold"
              >
                <div className="text-brand">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                  </svg>
                </div>

                <span className={`${sidebarExpanded ? "lg:hidden opacity-0 ml-0" : "opacity-100 ml-3 block"} ml-3 whitespace-nowrap`}>
                  Productos
                </span>


                <span className="ml-auto">
                  {!sidebarExpanded && (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={showProductSubmenu ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                      />
                    </svg>
                  )}
                </span>
              </button>
              {showProductSubmenu && (
                <ul className="ml-10 mt-1 space-y-1">
                  <li>
                    <Link
                      onClick={() => setSidebarOpen(false)}
                      name={Link.name}
                      href="/Product"
                      className="block p-1 text-sm text-gray-700 hover:text-black hover:font-medium"
                    >
                      <span className="block p-1 text-sm text-gray-700 hover:text-black hover:font-medium">
                        <span
                          className={`${sidebarExpanded
                            ? "lg:hidden opacity-0 ml-0"
                            : "opacity-100 block"
                            }ml-3 whitespace-nowrap `}
                        >
                          Listado de Productos
                        </span>
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => setSidebarOpen(false)}
                      name={Link.name}
                      href="/Product/Create"
                      className="block p-1 text-sm text-gray-700 hover:text-black hover:font-medium"
                    >
                      <span className="block p-1 text-sm text-gray-700 hover:text-black hover:font-medium">
                        <span
                          className={`${sidebarExpanded
                            ? "lg:hidden opacity-0 ml-0"
                            : "opacity-100 block"
                            }ml-3 whitespace-nowrap `}
                        >
                          Registrar Nuevo Producto
                        </span>
                      </span>
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* AUCTIONS */}
            <li>
              <button
                onClick={() => {
                  if (!sidebarExpanded) {
                    setShowAuctionSubmenu(!showAuctionSubmenu);
                  } else {
                    router.push("/Auction");
                    setSidebarOpen(false);
                  }
                }}
                className="flex items-center w-full p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 font-light hover:font-semibold"
              >
                <div className="text-brand">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-gavel"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M13 10l7.383 7.418c.823 .82 .823 2.148 0 2.967a2.11 2.11 0 0 1 -2.976 0l-7.407 -7.385" /><path d="M6 9l4 4" /><path d="M13 10l-4 -4" /><path d="M3 21h7" /><path d="M6.793 15.793l-3.586 -3.586a1 1 0 0 1 0 -1.414l2.293 -2.293l.5 .5l3 -3l-.5 -.5l2.293 -2.293a1 1 0 0 1 1.414 0l3.586 3.586a1 1 0 0 1 0 1.414l-2.293 2.293l-.5 -.5l-3 3l.5 .5l-2.293 2.293a1 1 0 0 1 -1.414 0z" /></svg>
                </div>

                <span className={`${sidebarExpanded ? "lg:hidden opacity-0 ml-0" : "opacity-100 ml-3 block"} ml-3 whitespace-nowrap`}>
                  Subastas
                </span>


                <span className="ml-auto">
                  {!sidebarExpanded && (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={showAuctionSubmenu ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                      />
                    </svg>
                  )}
                </span>
              </button>
              {showAuctionSubmenu && (
                <ul className="ml-10 mt-1 space-y-1">
                  <li>
                    <Link
                      onClick={() => setSidebarOpen(false)}
                      name={Link.name}
                      href="/Auction"
                      className="block p-1 text-sm text-gray-700 hover:text-black hover:font-medium"
                    >
                      <span className="block p-1 text-sm text-gray-700 hover:text-black hover:font-medium">
                        <span
                          className={`${sidebarExpanded
                            ? "lg:hidden opacity-0 ml-0"
                            : "opacity-100 block"
                            }ml-3 whitespace-nowrap `}
                        >
                          Listado de Subastas
                        </span>
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => setSidebarOpen(false)}
                      name={Link.name}
                      href="/Auction/Create"
                      className="block p-1 text-sm text-gray-700 hover:text-black hover:font-medium"
                    >
                      <span className="block p-1 text-sm text-gray-700 hover:text-black hover:font-medium">
                        <span
                          className={`${sidebarExpanded
                            ? "lg:hidden opacity-0 ml-0"
                            : "opacity-100 block"
                            }ml-3 whitespace-nowrap `}
                        >
                          Crear Subasta
                        </span>
                      </span>
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* AUCTIONS CLIENTS */}
            <li>
              <button
                onClick={() => {
                  if (!sidebarExpanded) {
                    setShowAuctionClientSubmenu(!showAuctionClientSubmenu);
                  } else {
                    router.push("/AuctionClient");
                    setSidebarOpen(false);
                  }
                }}
                className="flex items-center w-full p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 font-light hover:font-semibold"
              >
                <div className="text-brand">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-gavel"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M13 10l7.383 7.418c.823 .82 .823 2.148 0 2.967a2.11 2.11 0 0 1 -2.976 0l-7.407 -7.385" /><path d="M6 9l4 4" /><path d="M13 10l-4 -4" /><path d="M3 21h7" /><path d="M6.793 15.793l-3.586 -3.586a1 1 0 0 1 0 -1.414l2.293 -2.293l.5 .5l3 -3l-.5 -.5l2.293 -2.293a1 1 0 0 1 1.414 0l3.586 3.586a1 1 0 0 1 0 1.414l-2.293 2.293l-.5 -.5l-3 3l.5 .5l-2.293 2.293a1 1 0 0 1 -1.414 0z" /></svg>
                </div>

                <span className={`${sidebarExpanded ? "lg:hidden opacity-0 ml-0" : "opacity-100 ml-3 block"} ml-3 whitespace-nowrap`}>
                  Subastas
                </span>


                <span className="ml-auto">
                  {!sidebarExpanded && (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={showAuctionClientSubmenu ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                      />
                    </svg>
                  )}
                </span>
              </button>
              {showAuctionClientSubmenu && (
                <ul className="ml-10 mt-1 space-y-1">
                  <li>
                    <Link
                      onClick={() => setSidebarOpen(false)}
                      name={Link.name}
                      href="/AuctionClient"
                      className="block p-1 text-sm text-gray-700 hover:text-black hover:font-medium"
                    >
                      <span className="block p-1 text-sm text-gray-700 hover:text-black hover:font-medium">
                        <span
                          className={`${sidebarExpanded
                            ? "lg:hidden opacity-0 ml-0"
                            : "opacity-100 block"
                            }ml-3 whitespace-nowrap `}
                        >
                          Activas
                        </span>
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => setSidebarOpen(false)}
                      name={Link.name}
                      href="/AuctionClient/Won"
                      className="block p-1 text-sm text-gray-700 hover:text-black hover:font-medium"
                    >
                      <span className="block p-1 text-sm text-gray-700 hover:text-black hover:font-medium">
                        <span
                          className={`${sidebarExpanded
                            ? "lg:hidden opacity-0 ml-0"
                            : "opacity-100 block"
                            }ml-3 whitespace-nowrap `}
                        >
                          Ganadas
                        </span>
                      </span>
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* ROLES */}
            <li>
              <button
                onClick={() => {
                  if (!sidebarExpanded) {
                    setShowRoleSubmenu(!showRoleSubmenu);
                  } else {
                    router.push("/User");
                    setSidebarOpen(false);
                  }
                }}
                className="flex items-center w-full p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 font-light hover:font-semibold"
              >
                <div className="text-brand">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                </div>

                <span className={`${sidebarExpanded ? "lg:hidden opacity-0 ml-0" : "opacity-100 ml-3 block"} ml-3 whitespace-nowrap`}>
                  Roles
                </span>


                <span className="ml-auto">
                  {!sidebarExpanded && (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={showRoleSubmenu ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                      />
                    </svg>
                  )}
                </span>
              </button>
              {showRoleSubmenu && (
                <ul className="ml-10 mt-1 space-y-1">
                  <li>
                    <Link
                      onClick={() => setSidebarOpen(false)}
                      name={Link.name}
                      href="/Role"
                      className="block p-1 text-sm text-gray-700 hover:text-black hover:font-medium"
                    >
                      <span className="block p-1 text-sm text-gray-700 hover:text-black hover:font-medium">
                        <span
                          className={`${sidebarExpanded
                            ? "lg:hidden opacity-0 ml-0"
                            : "opacity-100 block"
                            }ml-3 whitespace-nowrap `}
                        >
                          Roles y Permisos
                        </span>
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => setSidebarOpen(false)}
                      name={Link.name}
                      href="/Role/User"
                      className="block p-1 text-sm text-gray-700 hover:text-black hover:font-medium"
                    >
                      <span className="block p-1 text-sm text-gray-700 hover:text-black hover:font-medium">
                        <span
                          className={`${sidebarExpanded
                            ? "lg:hidden opacity-0 ml-0"
                            : "opacity-100 block"
                            }ml-3 whitespace-nowrap `}
                        >
                          Usuarios y Roles
                        </span>
                      </span>
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* PROFILE CONFIGURATION */}
            <li>
              <button
                onClick={() => {
                  if (!sidebarExpanded) {
                    setShowConfigurationuctSubmenu(!showConfigurationSubmenu);
                  } else {
                    router.push("/Configuration");
                    setSidebarOpen(false);
                  }
                }}
                className="flex items-center w-full p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 font-light hover:font-semibold"
              >
                <div className="text-brand stroke-brand">
                  <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13v-2a1 1 0 0 0-1-1h-.757l-.707-1.707.535-.536a1 1 0 0 0 0-1.414l-1.414-1.414a1 1 0 0 0-1.414 0l-.536.535L14 4.757V4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v.757l-1.707.707-.536-.535a1 1 0 0 0-1.414 0L4.929 6.343a1 1 0 0 0 0 1.414l.536.536L4.757 10H4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h.757l.707 1.707-.535.536a1 1 0 0 0 0 1.414l1.414 1.414a1 1 0 0 0 1.414 0l.536-.535 1.707.707V20a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-.757l1.707-.708.536.536a1 1 0 0 0 1.414 0l1.414-1.414a1 1 0 0 0 0-1.414l-.535-.536.707-1.707H20a1 1 0 0 0 1-1Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                  </svg>
                </div>

                <span className={`${sidebarExpanded ? "lg:hidden opacity-0 ml-0" : "opacity-100 ml-3 block"} ml-3 whitespace-nowrap`}>
                  Usuario
                </span>


                <span className="ml-auto">
                  {!sidebarExpanded && (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showConfigurationSubmenu ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                    </svg>
                  )}
                </span>
              </button>
              {showConfigurationSubmenu && (
                <ul className="ml-10 mt-1 space-y-1">
                  <li>
                    <Link
                      onClick={() => setSidebarOpen(false)}
                      name={Link.name}
                      href="/User"
                      className="block p-1 text-sm text-gray-700 hover:text-black hover:font-medium"
                    >
                      <span className="block p-1 text-sm text-gray-700 hover:text-black hover:font-medium">
                        <span
                          className={`${sidebarExpanded
                            ? "lg:hidden opacity-0 ml-0"
                            : "opacity-100 block"
                            }ml-3 whitespace-nowrap `}
                        >
                          Configuracion
                        </span>
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => setSidebarOpen(false)}
                      name={Link.name}
                      href="/User/ChangePassword"
                      className="block p-1 text-sm text-gray-700 hover:text-black hover:font-medium"
                    >
                      <span className="block p-1 text-sm text-gray-700 hover:text-black hover:font-medium">
                        <span
                          className={`${sidebarExpanded
                            ? "lg:hidden opacity-0 ml-0"
                            : "opacity-100 block"
                            }ml-3 whitespace-nowrap `}
                        >
                          Seguridad
                        </span>
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => setSidebarOpen(false)}
                      name={Link.name}
                      href="/User/Activity"
                      className="block p-1 text-sm text-gray-700 hover:text-black hover:font-medium"
                    >
                      <span className="block p-1 text-sm text-gray-700 hover:text-black hover:font-medium">
                        <span
                          className={`${sidebarExpanded
                            ? "lg:hidden opacity-0 ml-0"
                            : "opacity-100 block"
                            }ml-3 whitespace-nowrap `}
                        >
                          Historial de Actividad
                        </span>
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => setSidebarOpen(false)}
                      name={Link.name}
                      href="/User/Auctions"
                      className="block p-1 text-sm text-gray-700 hover:text-black hover:font-medium"
                    >
                      <span className="block p-1 text-sm text-gray-700 hover:text-black hover:font-medium">
                        <span
                          className={`${sidebarExpanded
                            ? "lg:hidden opacity-0 ml-0"
                            : "opacity-100 block"
                            }ml-3 whitespace-nowrap `}
                        >
                          Historial de Subastas
                        </span>
                      </span>
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* CLAIMS */}
            <li>
              <button
                onClick={() => {
                  if (!sidebarExpanded) {
                    setShowClaimSubmenu(!showClaimSubmenu);
                  } else {
                    router.push("/Claim");
                    setSidebarOpen(false);
                  }
                }}
                className="flex items-center w-full p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 font-light hover:font-semibold"
              >
                <div className="text-brand stroke-brand">

                  <svg className="w-6 h-6 text-brand" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 9H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h6m0-6v6m0-6 5.419-3.87A1 1 0 0 1 18 5.942v12.114a1 1 0 0 1-1.581.814L11 15m7 0a3 3 0 0 0 0-6M6 15h3v5H6v-5Z" />
                  </svg>

                </div>

                <span className={`${sidebarExpanded ? "lg:hidden opacity-0 ml-0" : "opacity-100 ml-3 block"} ml-3 whitespace-nowrap`}>
                  Reclamos
                </span>


                <span className="ml-auto">
                  {!sidebarExpanded && (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showConfigurationSubmenu ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                    </svg>
                  )}
                </span>
              </button>
              {showClaimSubmenu && (
                <ul className="ml-10 mt-1 space-y-1">
                  <li>
                    <Link
                      onClick={() => setSidebarOpen(false)}
                      name={Link.name}
                      href="/Claim"
                      className="block p-1 text-sm text-gray-700 hover:text-black hover:font-medium"
                    >
                      <span className="block p-1 text-sm text-gray-700 hover:text-black hover:font-medium">
                        <span
                          className={`${sidebarExpanded
                            ? "lg:hidden opacity-0 ml-0"
                            : "opacity-100 block"
                            }ml-3 whitespace-nowrap `}
                        >
                          Listado de Reclamos
                        </span>
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => setSidebarOpen(false)}
                      name={Link.name}
                      href="/Claim/Create"
                      className="block p-1 text-sm text-gray-700 hover:text-black hover:font-medium"
                    >
                      <span className="block p-1 text-sm text-gray-700 hover:text-black hover:font-medium">
                        <span
                          className={`${sidebarExpanded
                            ? "lg:hidden opacity-0 ml-0"
                            : "opacity-100 block"
                            }ml-3 whitespace-nowrap `}
                        >
                          Crear Reclamo
                        </span>
                      </span>
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* PAYMENTS */}
            <li>
              <button
                onClick={() => {
                  if (!sidebarExpanded) {
                    setShowPaymentSubmenu(!showPaymentSubmenu);
                  } else {
                    router.push("/User");
                    setSidebarOpen(false);
                  }
                }}
                className="flex items-center w-full p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 font-light hover:font-semibold"
              >
                <div className="text-brand">
                  <svg className="w-6 h-6 text-gray-brand dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M6 14h2m3 0h5M3 7v10a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1Z" />
                  </svg>

                </div>

                <span className={`${sidebarExpanded ? "lg:hidden opacity-0 ml-0" : "opacity-100 ml-3 block"} ml-3 whitespace-nowrap`}>
                  Pagos
                </span>


                <span className="ml-auto">
                  {!sidebarExpanded && (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={showPaymentSubmenu ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                      />
                    </svg>
                  )}
                </span>
              </button>
              {showPaymentSubmenu && (
                <ul className="ml-10 mt-1 space-y-1">
                  <li>
                    <Link
                      onClick={() => setSidebarOpen(false)}
                      name={Link.name}
                      href="/Payment"
                      className="block p-1 text-sm text-gray-700 hover:text-black hover:font-medium"
                    >
                      <span className="block p-1 text-sm text-gray-700 hover:text-black hover:font-medium">
                        <span
                          className={`${sidebarExpanded
                            ? "lg:hidden opacity-0 ml-0"
                            : "opacity-100 block"
                            }ml-3 whitespace-nowrap `}
                        >
                          Gestion de Tarjetas
                        </span>
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => setSidebarOpen(false)}
                      name={Link.name}
                      href="/User/Create"
                      className="block p-1 text-sm text-gray-700 hover:text-black hover:font-medium"
                    >
                      <span className="block p-1 text-sm text-gray-700 hover:text-black hover:font-medium">
                        <span
                          className={`${sidebarExpanded
                            ? "lg:hidden opacity-0 ml-0"
                            : "opacity-100 block"
                            }ml-3 whitespace-nowrap `}
                        >
                          Crear Rol
                        </span>
                      </span>
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>

        {/* Sidebar toggle */}
        <div className="pt-3 lg:inline-flex mt-auto">
          <div className="flex-1" />
          <div className="px-3 py-2 justify-end">
            <button onClick={() => handleSideBarChange()}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg
                className={`w-6 h-6 hidden lg:block fill-current ${!sidebarExpanded ? "rotate-0" : "rotate-180"
                  }`}
                viewBox="0 0 24 24"
              >
                <path
                  d="M10.5 19.5L3 12M3 12L10.5 4.5M3 12H21"
                  stroke="#0F172A"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="mt-auto p-4">
          <button
            onClick={logout}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
