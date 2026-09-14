"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { DEFAULT_LOCATION_ID, getLocationById, locations } from "@/data/mockData";
import type { ClinicLocation, LocationId } from "@/types";

interface LocationContextValue {
  locationId: LocationId;
  location: ClinicLocation;
  locations: ClinicLocation[];
  setLocationId: (id: LocationId) => void;
}

const LocationContext = createContext<LocationContextValue | null>(null);

export function LocationProvider({ children }: { children: ReactNode }) {
  const [locationId, setLocationId] = useState<LocationId>(DEFAULT_LOCATION_ID);
  const value = useMemo(
    () => ({
      locationId,
      location: getLocationById(locationId),
      locations,
      setLocationId,
    }),
    [locationId],
  );

  return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>;
}

export function useClinicLocation(): LocationContextValue {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useClinicLocation must be used within LocationProvider");
  }
  return context;
}
