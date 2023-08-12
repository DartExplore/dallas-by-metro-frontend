import { createContext } from "react";
import DBMClient from "../../client";

const API_URL: string = import.meta.env.VITE_API_URL;

const client = new DBMClient(API_URL);

export interface ClientContextType {
  client: DBMClient;
}

export const ClientContext = createContext<ClientContextType>({
  client: client,
});

export interface FilterContextType {
  filter: {
    currentStation: number;
    maxStationConnections: number;
    amenityIds: string;
    types: string;
    maxWalkTime: number;
    returnStationsWithNoPOIs: boolean;
  };
  setFilter: (filter: FilterContextType["filter"]) => void;
}

export const FilterContext = createContext<FilterContextType>({
  filter: {
    currentStation: 0,
    maxStationConnections: 0,
    amenityIds: "",
    types: "",
    maxWalkTime: 0,
    returnStationsWithNoPOIs: false,
  },
  setFilter: () => {
    throw new Error("setFilter function must be overridden by a Provider");
  },
});
