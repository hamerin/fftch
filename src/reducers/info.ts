import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AccessTime, BattleJob, Content, CraftingJob, GrandCompany, Job, Race, SheetInfo, Status } from "../utils/types";

const initialState: SheetInfo = {
  name: "",
  server: "",
  accesstimes: [],
  favcontents: [],
  levels: {},
  markers: {
    main: [],
    specialist: [],
  },
  description: "",
};

export const infoSlice = createSlice({
  name: "info",
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setServer: (state, action: PayloadAction<string>) => {
      state.server = action.payload;
    },
    setGrandCompany: (state, action: PayloadAction<string>) => {
      state.grandcompany = action.payload === "" ? undefined : action.payload as GrandCompany;
    },
    setFreeCompanyName: (state, action: PayloadAction<string>) => {
      state.freecompany = {
        name: action.payload,
        abbr: state.freecompany?.abbr ?? "",
      };
    },
    setFreeCompanyAbbr: (state, action: PayloadAction<string>) => {
      state.freecompany = {
        name: state.freecompany?.name ?? "",
        abbr: action.payload,
      };
    },
    resetFreeCompany: (state) => {
      state.freecompany = undefined;
    },
    setStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload === "" ? undefined : action.payload as Status;
    },
    setRace: (state, action: PayloadAction<string>) => {
      if(action.payload === "") state.race = undefined;
      else {
        const [race, subrace, gender] = action.payload.split(" | ");
        state.race = {race, subrace, gender} as Race;     
      }
    },
    setAccessTimes: (state, action: PayloadAction<string[]>) => {
      state.accesstimes = action.payload as AccessTime[];
    },
    setFavContents: (state, action: PayloadAction<string[]>) => {
      state.favcontents = action.payload as Content[];
    },
    setLevel: (state, action: PayloadAction<{ job: Job, level: number }>) => {
      if (action.payload.level !== 0) state.levels[action.payload.job] = action.payload.level;
      if (action.payload.level === 0 && action.payload.job in state.levels) delete state.levels[action.payload.job];
    },
    setMainJob: (state, action: PayloadAction<string[]>) => {
      state.markers.main = action.payload as BattleJob[];
    },
    setSpecialistJob: (state, action: PayloadAction<string[]>) => {
      state.markers.specialist = action.payload as CraftingJob[];
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
  }
});

export const {
  setName,
  setServer,
  setGrandCompany,
  setFreeCompanyName,
  setFreeCompanyAbbr,
  resetFreeCompany,
  setStatus,
  setRace,
  setAccessTimes,
  setFavContents,
  setLevel,
  setMainJob,
  setSpecialistJob,
  setDescription,
} = infoSlice.actions;
