import { useState,useEffect } from "react";


const useDate = (date) => {
  const [hour, setHour] = useState("05");
  const [min, setMin] = useState("30");

  const updateDate = (currentDate) => {
    let ldate = currentDate.toLocaleTimeString().split(":");
    let lhour = parseInt(ldate[0]);

    let ampm = " PM"

    if (lhour > 12) {
      lhour %= 12;
    }else{
        ampm = " AM";
    }

    if (lhour < 10) {
      lhour = "0" + lhour;
    }

    setHour(lhour);
    setMin(ldate[1] + ampm);
  };

  useEffect(() => {
      updateDate(date)
  }, [])

  return [hour,min,updateDate];
};

export default useDate;

