"use client";

import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function Charts() {
  const chartRef = useRef(null);

  useEffect(() => {
    const data = {
      labels: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "23:59"],
      datasets: [
        {
          label: "Haber Sayısı",
          data: [5, 10, 15, 25, 10, 18, 20],
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };

    const config = {
      type: "line",
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Zaman",
            },
          },
          y: {
            title: {
              display: true,
              text: "Haber Sayısı",
            },
            beginAtZero: true,
          },
        },
      },
    };

    // Grafik oluşturma
    const ctx = chartRef.current.getContext("2d");
    new Chart(ctx, config);

    // Temizleme işlemi (component unmount)
    return () => {
      ctx && Chart.instances.forEach((chart) => chart.destroy());
    };
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Haber Grafiklerini Gör</h1>
      <canvas ref={chartRef} style={{ maxWidth: "600px" }}></canvas>
    </div>
  );
}
