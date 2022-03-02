import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import Stack from '@mui/material/Stack';

export default function DateValidPicker(props) {
  const [valueStart, setValueStart] = React.useState(null);
  const [valueEnd, setValueEnd] = React.useState(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
          renderInput={(params) => <TextField {...params} />}
          label="Select start date"
          value={valueStart}
          onChange={(newValue) => {
            setValueStart(newValue);
            props.handleDateChange(valueStart, valueEnd)
          }}
          minDateTime={new Date()}
        />

        <DateTimePicker
          renderInput={(params) => <TextField style={{marginLeft: 15}} {...params} />}
          label="Select end date"
          value={valueEnd}
          onChange={(newValue) => {
            setValueEnd(newValue);
            props.handleDateChange(valueStart, valueEnd)
          }}
          minDateTime={valueStart}
        />

       
    </LocalizationProvider>
  );
}
