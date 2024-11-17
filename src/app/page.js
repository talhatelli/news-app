"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/header";
import Loading from "../components/loading";
import News from "../components/news";
import Filter from "../components/filter";
import CategoryTitle from "../components/CategoryTitle";
import Divider from "../components/Divider";
import NoData from "../app/assets/icons/no-data-icon.svg";
import { useRouter } from "next/navigation";
import XSymbol from "../app/assets/icons/x-symbol-icon.svg";
import MenuBurger from "../app/assets/icons/menu-burger-icon.svg";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("general");
  const [selectedCountry, setSelectedCountry] = useState("us");
  const [searchQuery, setSearchQuery] = useState("");
  const [timeRange, setTimeRange] = useState("6months");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchNews() {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://newsapi.org/v2/top-headlines",
          {
            params: {
              category,
              country: selectedCountry,
              q: searchQuery,
              apiKey: process.env.NEXT_PUBLIC_NEWS_API_KEY,
            },
          }
        );
        if (response.data.totalResults === 0) {
          setArticles([]);
        } else {
          setArticles(response.data.articles);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching news:", error);
        setLoading(false);
      }
    }
    fetchNews();
  }, [category, selectedCountry, searchQuery]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navigateToPage = (path) => {
    router.push(path);
    setIsSidebarOpen(false);
  };

  if (loading) return <Loading />;

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <Header />
      <div
        style={{
          fontSize: "30px",
          cursor: "pointer",
          position: "fixed",
          top: "20px",
          left: "20px",
        }}
        onClick={toggleSidebar}
      >
        <MenuBurger />
      </div>

      <div
        style={{
          position: "fixed",
          top: "0",
          left: isSidebarOpen ? "0" : "-250px",
          width: "250px",
          height: "100%",
          backgroundColor: "#333",
          color: "#fff",
          transition: "left 0.3s ease",
          zIndex: 999,
          padding: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            fontSize: "30px",
            cursor: "pointer",
            top: "20px",
            left: "20px",
          }}
          onClick={toggleSidebar}
        ></div>
        <h2 style={{ color: "#fff", marginBottom: "20px" }}>Menü</h2>
        <XSymbol style={{ color: "#fff" }} />

        <ul style={{ listStyle: "none", padding: "0" }}>
          <li
            style={{
              padding: "10px 0",
              cursor: "pointer",
              borderBottom: "1px solid #555",
            }}
            onClick={() => navigateToPage("/")}
          >
            Haberler
          </li>
          <li
            style={{
              padding: "10px 0",
              cursor: "pointer",
              borderBottom: "1px solid #555",
            }}
            onClick={() => navigateToPage("/charts")}
          >
            Haber Grafiklerini Gör
          </li>
        </ul>
        <button
          style={{
            marginTop: "20px",
            padding: "10px",
            width: "100%",
            backgroundColor: "#555",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
          onClick={toggleSidebar}
        >
          Kapat
        </button>
      </div>

      <Filter
        category={category}
        setCategory={setCategory}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        timeRange={timeRange}
        setTimeRange={setTimeRange}
      />
      <Divider />
      <CategoryTitle category={category} />
      {articles.length > 0 ? (
        <News articles={articles} />
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "150px",
          }}
        >
          <NoData
            style={{ width: "150px", height: "150px", marginBottom: "20px" }}
          />
          <p>
            This type of filtering is included in premium. Please create a
            premium membership.
          </p>
        </div>
      )}
    </div>
  );
}
