import React, { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";

const monthes = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const days = Array.from({ length: 31 }, (_, index) => (index + 1).toString());

const hours = Array.from({ length: 24 }, (_, index) => (index + 1).toString());

const minutes = Array.from({ length: 60 }, (_, index) =>
  (index + 1).toString()
);

function RaidFormTime({ onTimeChange }) {
  const [time, setTime] = useState({
    month: "",
    day: "",
    year: "2023",
    hour: "",
    minutes: "",
  });
  const handleChange = (e) => {
    setTime({
      ...time,
      [e.target.name]: e.target.value,
    });
    onTimeChange({
      ...time,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <Form as={Row}>
        <Form.Group as={Col}>
          <Form.Label>Month</Form.Label>
          <Form.Select required name="month" onChange={handleChange}>
            {monthes.map((month, idx) => (
              <option key={idx} value={month}>
                {month}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Day</Form.Label>
          <Form.Select required name="day" onChange={handleChange}>
            {days.map((day, idx) => (
              <option key={idx} value={day}>
                {day}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Year</Form.Label>
          <Form.Control
            required
            name="year"
            type="text"
            defaultValue={"2023"}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Hour</Form.Label>
          <Form.Select required name="hour" onChange={handleChange}>
            {hours.map((hour, idx) => (
              <option key={idx} value={hour}>
                {hour}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Minutes</Form.Label>
          <Form.Select required name="minutes" onChange={handleChange}>
            {minutes.map((minute, idx) => (
              <option key={idx} value={minute}>
                {minute}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Form>
    </div>
  );
}

export default RaidFormTime;
