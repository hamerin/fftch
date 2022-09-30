import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BattleJob, CraftingJob, Frame, Gradient, JobMarkerVariant, SheetConfig } from "../utils/types";

const initialState: SheetConfig = {
  theme: "light",
  markervariant: "icon",
  frame: "elegant",
  watermarkColor: 0x856c5d,
  highlightColor: 0xfbe28c,
  markerColor: 0xda8a29,
};

export const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setMarkerVariant: (state, action: PayloadAction<string>) => {
      state.markervariant = action.payload as JobMarkerVariant;
    },
    setFrame: (state, action: PayloadAction<string | undefined>) => {
      state.frame = action.payload === "" ? undefined : action.payload as Frame;
    },
    setGradient: (state, action: PayloadAction<string | undefined>) => {
      state.gradient = action.payload === "" ? undefined : action.payload as Gradient;
    },
    setWatermarkColor: (state, action: PayloadAction<number>) => {
      state.watermarkColor = action.payload;
    },
    setHighlightColor: (state, action: PayloadAction<number>) => {
      state.highlightColor = action.payload;
    },
    setMarkerColor: (state, action: PayloadAction<number>) => {
      state.markerColor = action.payload;
    },
    resetColors: (state) => {
      state.watermarkColor = initialState.watermarkColor;
      state.highlightColor = initialState.highlightColor;
      state.markerColor = initialState.markerColor;
    },
    resetConfig: () => initialState
  }
});

export const {
  setMarkerVariant,
  setFrame,
  setGradient,
  setWatermarkColor,
  setHighlightColor,
  setMarkerColor,
  resetColors,
  resetConfig
} = configSlice.actions;
