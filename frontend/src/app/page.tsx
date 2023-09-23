"use client"
import { SearchBar } from '@/components/search-bar';
import { useGeolocated } from '@/hooks/geolocation';
import { CityCard } from '@/components/city-card';
import useSWR from "swr";

export default function Home() {
    return (
    <>
      <SearchBar />
      <CityCard />
    </>
  );
}
