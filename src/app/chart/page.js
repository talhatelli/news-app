"use client";
import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import Sidebar from "@/components/SideBar";
import AppTitle from "@/components/Title/AppTitle";
import Divider from "@/components/Dividers/Divider";
import MenuBurger from "@/components/MenuBurger";
import Filter from "@/components/filter";
import Loading from "@/components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import "@/styles/chart.css";
import {
  fetchNews,
  setCategory,
  setSelectedCountry,
  setSearchQuery,
} from "@/store/slices/newsSlice";

export default function Charts() {
  const chartRef1 = useRef(null);
  const chartRef2 = useRef(null);
  const chartInstance1 = useRef(null);
  const chartInstance2 = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { articles, loading, error, category, selectedCountry, searchQuery } =
    useSelector((state) => state.news);

  useEffect(() => {
    if (articles.length === 0) return;

    const hours = articles.map((article) =>
      new Date(article.publishedAt).getHours()
    );
    const hourLabels = Array.from({ length: 24 }, (_, i) => `${i}:00`);
    const hourData = Array(24).fill(0);
    hours.forEach((hour) => {
      hourData[hour]++;
    });

    const ctx1 = chartRef1.current.getContext("2d");
    if (chartInstance1.current) {
      chartInstance1.current.destroy();
    }
    chartInstance1.current = new Chart(ctx1, {
      type: "bar",
      data: {
        labels: hourLabels,
        datasets: [
          {
            label: "Haber Sayısı",
            data: hourData,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true },
        },
        scales: {
          y: {
            beginAtZero: true,
            title: { display: true, text: "Haber Sayısı" },
          },
        },
      },
    });

    const sources = articles.map((article) => article.source.name);
    const sourceCounts = sources.reduce((acc, source) => {
      acc[source] = (acc[source] || 0) + 1;
      return acc;
    }, {});
    const sourceLabels = Object.keys(sourceCounts);
    const sourceData = Object.values(sourceCounts);

    const ctx2 = chartRef2.current.getContext("2d");
    if (chartInstance2.current) {
      chartInstance2.current.destroy();
    }
    chartInstance2.current = new Chart(ctx2, {
      type: "pie",
      data: {
        labels: sourceLabels,
        datasets: [
          {
            label: "Kaynaklara Göre Haberler",
            data: sourceData,
            backgroundColor: sourceLabels.map(
              (_, i) =>
                `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
                  Math.random() * 255
                )}, ${Math.floor(Math.random() * 255)}, 0.5)`
            ),
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true },
        },
      },
    });

    return () => {
      if (chartInstance1.current) chartInstance1.current.destroy();
      if (chartInstance2.current) chartInstance2.current.destroy();
    };
  }, [articles]);

  useEffect(() => {
    dispatch(fetchNews({ category, selectedCountry, searchQuery }));
  }, [category, selectedCountry, searchQuery, dispatch]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Move loading check here after hooks are initialized
  if (loading) return <Loading />;

  return (
    <div>
      <AppTitle />
      <MenuBurger toggleSidebar={toggleSidebar} />
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <Filter
        category={category}
        setCategory={(value) => dispatch(setCategory(value))}
        selectedCountry={selectedCountry}
        setSelectedCountry={(value) => dispatch(setSelectedCountry(value))}
        searchQuery={searchQuery}
        setSearchQuery={(value) => dispatch(setSearchQuery(value))}
      />
      <Divider />
      <div className="chart-container">
        <div className="chart-section">
          <div className="chart-card">
            <h2 className="chart-title">News Distribution by Hours</h2>
            <canvas ref={chartRef1}></canvas>
          </div>
          <div className="chart-card">
            <h2 className="chart-title">News Distribution by Sources</h2>
            <canvas ref={chartRef2}></canvas>
          </div>
        </div>
      </div>
    </div>
  );
}
