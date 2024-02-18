"use client";
import { Button, Input } from "@nextui-org/react";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

function Filters() {
  const router = useRouter();
  const [filters, setFilters] = React.useState({
    name: "",
    date: "",
    location: "",
  });

  useEffect(() => {
    setTimeout(() => {
      router.push(
        `/?name=${filters.name}&date=${filters.date}&location=${filters.location}`
      );
    }, 400);
  }, [filters.name]);

  useEffect(() => {
    router.push(
      `/?name=${filters.name}&date=${filters.date}&location=${filters.location}`
    );
  }, [filters.date]);

  useEffect(() => {
    setTimeout(() => {
      router.push(
        `/?name=${filters.name}&date=${filters.date}&location=${filters.location}`
      );
    }, 400);
  }, [filters.location]);

  return (
    <div className="bg-white p-5 rounded-sm mb-5 flex flex-col md:flex-row gap-5 md:items-end">
      <div className="w-full">
        {/* <h1 className="text-sm text-gray-500">Search for an event by name</h1>
        <input
          type="text"
          value={filters.name}
          onChange={(e) => setFilters({ ...filters, name: e.target.value })}
          placeholder="Search for an event"
          className="w-full p-2 rounded-sm border border-gray-400"
        /> */}
        <Input
          label="Search for an event by name"
          placeholder="Enter event name"
          value={filters.name}
          onChange={(e) => setFilters({ ...filters, name: e.target.value })}
          labelPlacement="outside"
        />
      </div>
      <div className="w-full">
        {/* <h1 className="text-sm text-gray-500">Search for an event by date</h1>
        <input
          type="date"
          value={filters.date}
          onChange={(e) => setFilters({ ...filters, date: e.target.value })}
          placeholder="Search for an event"
          className="w-full p-2 rounded-sm border border-gray-400"
        /> */}
        <Input
          label="Search for an event by date"
          placeholder="Enter event date"
          value={filters.date}
          onChange={(e) => setFilters({ ...filters, date: e.target.value })}
          labelPlacement="outside"
          type="date"
        />
      </div>
      <div className="w-full">
        {/* <h1 className="text-sm text-gray-500">
          Search for an event by location
        </h1>
        <input
          type="text"
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          placeholder="Search for an event"
          className="w-full p-2 rounded-sm border border-gray-400"
        /> */}
        <Input
          label="Search for an event by location"
          placeholder="Enter event location"
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          labelPlacement="outside"
        />
      </div>

      <div className="w-60">
        <Button
          className="px-5"
          onClick={() => setFilters({ name: "", date: "", location: "" })}
        >
          Clear Filters
        </Button>
      </div>
    </div>
  );
}
export default Filters;
