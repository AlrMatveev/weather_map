import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// First, create the thunk
export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async function (coords) {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${coords[0]}&lon=${coords[1]}&appid=7f6b4081e42acb33bcce11a03f4d3526`
    );
    const data = response.json();
    return data;
  }
);

export const weatherSlice = createSlice({
  name: "weather",
  initialState: { data: {}, status: "loading" },
  reducers: {},
  extraReducers: {
    [fetchWeather.pending]: (state) => {
      state.status = "loading";
    },
    [fetchWeather.fulfilled]: (state, action) => {
      let { speed } = action.payload.wind;
      let { temp, humidity } = action.payload.main;
      temp = Math.round(temp - 273.15);
      state.data = { temp, humidity, speed };
      state.status = "loaded";
    },
    [fetchWeather.rejected]: (state) => {
      state.status = "error";
    },
  },
});

export default weatherSlice.reducer;
