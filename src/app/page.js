"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppTitle from "@/components/Title/AppTitle";
import News from "@/components/News/News";
import Filter from "@/components/filter";
import CategoryTitle from "@/components/Title/CategoryTitle";
import Divider from "@/components/Dividers/Divider";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import NoData from "@/components/NoData";
import {
  fetchNews,
  setCategory,
  setSelectedCountry,
  setSearchQuery,
} from "../store/slices/newsSlice";

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { articles, loading, error, category, selectedCountry, searchQuery } =
    useSelector((state) => state.news);

  useEffect(() => {
    dispatch(fetchNews({ category, selectedCountry, searchQuery }));
  }, [category, selectedCountry, searchQuery, dispatch]);

  if (loading) return <Loading />;

  return (
    <div>
      <AppTitle />
      <Filter
        category={category}
        setCategory={(value) => dispatch(setCategory(value))}
        selectedCountry={selectedCountry}
        setSelectedCountry={(value) => dispatch(setSelectedCountry(value))}
        searchQuery={searchQuery}
        setSearchQuery={(value) => dispatch(setSearchQuery(value))}
      />
      <Divider />
      <CategoryTitle category={category} />
      {articles.length > 0 ? <News articles={articles} /> : <NoData />}
    </div>
  );
}
