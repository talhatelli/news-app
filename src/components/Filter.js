"use client";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries } from "@/store/slices/filterSlice";
import "@/styles/filter.css";

export default function Filter({
  category,
  setCategory,
  selectedCountry,
  setSelectedCountry,
  searchQuery,
  setSearchQuery,
}) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [countryOpen, setCountryOpen] = useState(false);
  const searchRef = useRef(null);

  const dispatch = useDispatch();
  const countries = useSelector((state) => state?.filters?.countries || []);
  const handleSearchToggle = () => setSearchOpen(!searchOpen);
  const handleCountryToggle = () => setCountryOpen(!countryOpen);

  useEffect(() => {
    dispatch(fetchCountries())
      .unwrap()
      .then((data) => console.log("Fetched countries:", data))
      .catch((error) => console.error("Error fetching countries:", error));
  }, [dispatch]);

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

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      alert("Please enter a search term!");
      return;
    }
  };

  return (
    <div className="filter-container">
      <div className="filter-buttons">
        {[
          "General",
          "Business",
          "Entertainment",
          "Health",
          "Science",
          "Sports",
          "Technology",
        ].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat.toLowerCase())}
            className={`filter-button ${
              category === cat.toLowerCase() ? "active" : "inactive"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="filter-options">
        <div className="filter-dropdown">
          <img
            src="/icons/country-icon.svg"
            alt="Country"
            onClick={handleCountryToggle}
          />
          {countryOpen && (
            <div className="filter-dropdown-content">
              <img
                src="/icons/x-symbol-icon.svg"
                alt="Close"
                onClick={handleCountryToggle}
                className="filter-close-icon"
              />

              <select
                id="country"
                value={selectedCountry}
                onChange={handleCountryChange}
                className="filter-select"
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

        <div className="filter-dropdown">
          <img
            src="/icons/search-icon.svg"
            alt="Search"
            onClick={handleSearchToggle}
          />
          {searchOpen && (
            <div ref={searchRef} className="filter-dropdown-content">
              <img
                src="/icons/x-symbol-icon.svg"
                alt="Close"
                onClick={handleSearchToggle}
                className="filter-close-icon"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="filter-input"
                placeholder="Search..."
              />
              <button onClick={handleSearch} className="filter-search-button">
                Search
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
