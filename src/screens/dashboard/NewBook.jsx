import React, { useState } from "react";
import { generateDate, months } from "../../utils/calendar.js";
import cn from "../../utils/cn.js";
import dayjs from "dayjs";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

function NewBook() {
  const days = ["SUN", "MON", "TUE", "WED", "THUR", "FRI", "SAT"];

  const currentDate = dayjs();

  const [today, setToday] = useState(currentDate);
  const [select, setSelect] = useState(currentDate);
  const [result, setResult] = useState(0);

  return (
    <div className="flex items-center h-screen gap-10 mx-10 divide-x-2 w-100">
      <div className=" w-100 h-96">
        <div className="flex justify-between">
          <h1 className="font-semibold">
            {months[today.month()]}, {today.year()}
          </h1>

          <div className="flex items-center gap-5">
            <GrFormPrevious
              className="w-5 h-5 cursor-pointer"
              onClick={() => {
                setToday(today.month(today.month() - 1));
              }}
            />
            <h1
              className="cursor-pointer"
              onClick={() => {
                setToday(currentDate);
              }}
            >
              Today
            </h1>
            <GrFormNext
              className="w-5 h-5 cursor-pointer"
              onClick={() => {
                setToday(today.month(today.month() + 1));
              }}
            />
          </div>
        </div>
        <div className="grid w-full grid-cols-7 text-gray-500 ">
          {days.map((day, index) => (
            <h1 key={index} className="grid text-sm h-14 place-content-center">
              {day}
            </h1>
          ))}
        </div>

        <div className="grid w-full grid-cols-7 ">
          {generateDate(today.month(), today.year()).map(
            ({ date, currentMonth, today }, index) => (
              <div key={index} className="grid border-t h-14 place-content-center">
                <h1
                  className={cn(
                    currentMonth ? "" : "text-gray-400",
                    today ? "bg-red-600 text-white" : "",
                    "h-10 w-10 grid place-content-center rounded-full hover:bg-black hover:text-white transition-all cursor-pointer",
                    select.toDate().toDateString() === date.toDate().toDateString()?"bg-black text-white":"",
                  )}
                  onClick={()=>{
                    setSelect(date)
                  }}
                >
                  {date.date()}
                </h1>
              </div>
            )
          )}
        </div>
      </div>
      <div className="px-5 h-96 w-96">
        <h1 className="font-semibold">
          Schedule for {select.format("dddd, MMMM D, YYYY")}
        </h1>
        <p>No meetings for today.</p>
      </div>
    </div>
  );
}

export default NewBook;
