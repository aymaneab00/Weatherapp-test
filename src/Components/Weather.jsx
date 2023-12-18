import React from "react";

export default function Weather({ weather, location }) {
//   const {
//     temperature_2m_max: max,
//     temperature_2m_min: min,
//     time: dates,
//     weathercode: codes,
//   } = Weather;
  return (
    <div>
      <h2>Weather of : {location}</h2>
      <ul>
        {weather?.time.map((date, i) => 
          <Day date={date} 
          max={weather?.temperature_2m_max[i]}
          min={weather?.temperature_2m_min[i]}
          code={weather?.weathercode[i]}
          key={date}/>
         )}
      </ul>
    </div>
  );
}
function Day({date,max,min,code}) {
  return (
  <div style={{display:"flex",gap:"14px"}}>
  <p>
    Date :{date} :
    </p>  
  <p>
   Max : {max} ° - Min : {min} °
    </p>  
    </div> )
}
