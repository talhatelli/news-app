import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCountries } from "@/lib/api";

export const fetchCountries = createAsyncThunk(
  "filters/fetchCountries",
  async () => {
    return await getCountries();
  }
);

const filterSlice = createSlice({
  name: "filters",
  initialState: {
    countries: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.loading = false;
        state.countries = action.payload;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default filterSlice.reducer;
