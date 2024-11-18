import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box } from "@mui/material";
import dayjs from "dayjs";

export default function BasicDatePicker({ onDateChange }) {
  const handleDateChange = (field, value) => {
    onDateChange(field, value ? value.format("YYYY-MM-DD") : null); // format date as string YYYY-MM-DD
    console.log("Date: ", value)
};

  return (
    <Box display="flex" gap="10px">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Starting from"
          onChange={(value) => handleDateChange("start_date", value)}
        />
        <DatePicker
          label="Ending at"
          onChange={(value) => handleDateChange("end_date", value)}
        />
      </LocalizationProvider>
    </Box>
  );
}
