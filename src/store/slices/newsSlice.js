import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getNews } from "@/lib/api";

export const fetchNews = createAsyncThunk(
  "news/fetchNews",
  async ({ category, selectedCountry, searchQuery }, { rejectWithValue }) => {
    try {
      return await getNews({
        category,
        country: selectedCountry,
        query: searchQuery,
      });
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState: {
    articles: [],
    loading: false,
    error: null,
    category: "general",
    selectedCountry: "us",
    searchQuery: "",
  },
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setSelectedCountry: (state, action) => {
      state.selectedCountry = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCategory, setSelectedCountry, setSearchQuery } =
  newsSlice.actions;

export default newsSlice.reducer;
