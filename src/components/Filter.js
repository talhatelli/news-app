"use client";
import React, { useEffect, useState, useRef } from "react";

import SearchIcon from "../app/assets/icons/search-icon.svg";
import DateIcon from "../app/assets/icons/date-icon.svg";
import CountryIcon from "../app/assets/icons/country-icon.svg";
import XSymbol from "../app/assets/icons/x-symbol-icon.svg";

export default function Filter({
  category,
  setCategory,
  selectedCountry,
  setSelectedCountry,
  searchQuery,
  setSearchQuery,
  timeRange,
  setTimeRange,
}) {
  const [countries, setCountries] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [countryOpen, setCountryOpen] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);
  const searchRef = useRef(null);

  const handleSearchToggle = () => setSearchOpen(!searchOpen);
  const handleDateToggle = () => setDateOpen(!dateOpen);
  const handleCountryToggle = () => setCountryOpen(!countryOpen);

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
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleTimeRangeChange = (event) => {
    setTimeRange(event.target.value);
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      alert("Lütfen bir arama terimi girin!");
      return;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "20px",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "15px",
        }}
      >
        {[
          "General",
          "Business",
          "Entertainment",
          "Health",
          "Science",
          "Sports",
          "Technology dsasdasd",
        ].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat.toLowerCase())}
            style={{
              backgroundColor:
                category === cat.toLowerCase() ? "#0073e6" : "#f0f0f0",
              color: category === cat.toLowerCase() ? "#fff" : "#333",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
              boxShadow:
                category === cat.toLowerCase()
                  ? "0px 4px 6px rgba(0, 0, 0, 0.1)"
                  : "none",
              transition: "all 0.3s ease",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginLeft: "10px",
        }}
      >
        <div style={{ position: "relative" }}>
          <CountryIcon
            onClick={handleCountryToggle}
            style={{ fontSize: "24px", cursor: "pointer" }}
          />
          {countryOpen && (
            <div
              style={{
                position: "absolute",
                top: "40px",
                right: 0,
                width: "300px",
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 8px 15px rgba(0, 0, 0, 0.1)",
                zIndex: 1000,
              }}
            >
              <XSymbol
                onClick={handleCountryToggle}
                style={{
                  position: "absolute",
                  top: "12px",
                  right: "12px",
                  cursor: "pointer",
                  color: "#999",
                }}
              />

              <select
                id="country"
                value={selectedCountry}
                onChange={handleCountryChange}
                style={{
                  padding: "10px",
                  fontSize: "1em",
                  borderRadius: "5px",
                  border: "1px solid #ddd",
                  width: "240px",
                }}
              >
                {countries.map((country) => (
                  <option key={country.cca2} value={country.cca2}>
                    {country.name.common}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div style={{ position: "relative" }}>
          <DateIcon
            onClick={handleDateToggle}
            style={{ fontSize: "24px", cursor: "pointer" }}
          />
          {dateOpen && (
            <div
              style={{
                position: "absolute",
                top: "40px",
                right: 0,
                width: "300px",
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 8px 15px rgba(0, 0, 0, 0.1)",
                zIndex: 1000,
              }}
            >
              <XSymbol
                onClick={handleDateToggle}
                style={{
                  position: "absolute",
                  top: "12px",
                  right: "12px",
                  cursor: "pointer",
                  color: "#999",
                }}
              />

              <select
                id="timeRange"
                value={timeRange}
                onChange={handleTimeRangeChange}
                style={{
                  padding: "10px",
                  fontSize: "1em",
                  borderRadius: "5px",
                  border: "1px solid #ddd",
                  width: "240px",
                }}
              >
                <option value="6months">Last 6 months</option>
                <option value="1year">Last 1 year</option>
                <option value="all">All time</option>
              </select>
            </div>
          )}
        </div>

        <div style={{ position: "relative", display: "inline-block" }}>
          <SearchIcon
            onClick={handleSearchToggle}
            style={{ fontSize: "24px", cursor: "pointer" }}
          />
          {searchOpen && (
            <div
              ref={searchRef}
              style={{
                position: "absolute",
                top: "40px",
                right: 0,
                width: "300px",
                backgroundColor: "#fff",
                padding: "20px 25px",
                borderRadius: "10px",
                boxShadow: "0 8px 15px rgba(0, 0, 0, 0.1)",
                zIndex: 1000,
              }}
            >
              <XSymbol
                onClick={handleSearchToggle}
                style={{
                  position: "absolute",
                  top: "12px",
                  right: "12px",
                  cursor: "pointer",
                  color: "#999",
                }}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search here..."
                style={{
                  width: "100%",
                  padding: "12px 15px 12px 35px",
                  fontSize: "1em",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch();
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
