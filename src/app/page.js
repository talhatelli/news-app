"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../app/components/header";
import Loading from "../app/utils/loading";
import News from "../app/components/news";
import Filter from "../app/components/filter";
import CategoryTitle from "../app/components/CategoryTitle";
import Divider from "../app/components/Divider";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("general");
  const [selectedCountry, setSelectedCountry] = useState("us");
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [timeRange, setTimeRange] = useState("6months");

  useEffect(() => {
    async function fetchCountries() {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        const sortedCountries = data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        setCountries(sortedCountries);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    }
    fetchCountries();
  }, []);

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
        setArticles(response.data.articles);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching news:", error);
        setLoading(false);
      }
    }
    fetchNews();
  }, [category, selectedCountry, searchQuery]);

  if (loading) return <Loading />;

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <Header />
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
      <News articles={articles} />
    </div>
  );
}
