import React, { useState } from "react";
import {format} from 'date-fns'

export default function CreateTL({setCustTL, custTL}) {

  const [endDate, setEndDate] = useState(format(Date.now(), 'yyyy-MM-dd'))
  const [startDate, setStartDate] = useState('1970-01-01'); //need to tweak this
  const [tlLength, setTLLength] = useState('years');
  const [tlType, setTLType] = useState('custom');

  let endDateYear = +format(new Date(endDate), 'yyyy');
  let startDateYear = +format(new Date(startDate), 'yyyy')

  // let type = 'individual'
  const myYears = endDateYear-startDateYear
  const yearsList = Math.ceil(myYears);


  // const types = ['individual', 'h_history', 'life', 'universe']
  // const unit_types = ['years', 'centuries', 'millions', 'billions']


  const totalPoints = Array(yearsList+1).fill(startDateYear); //fill with yearslist if universe else fill with start year
  for (let i = 0; i < totalPoints.length; i++) {
    totalPoints[i] += i; //minus i of universe else fill plus i
    //if (i === totalPoints.length - 1) { totalPoints[i] = 'Now' }
    //else if (i === totalPoints.length - 2) { totalPoints[i] += ' year ago' }
    //else {totalPoints[i] += ' years ago'}
  }

  function handleSubmit(event) {
    event.preventDefault();
    const newTimeLine = {
      start: startDateYear,
      end: endDateYear,
      segments: yearsList,
      arrayTL: totalPoints,
      length: tlLength,
      type: tlType
    };
    console.log('newTL created',newTimeLine)
    setCustTL(newTimeLine)
    // postMyEvent(newEvent);
    setStartDate('1982-08-21');
    setEndDate(format(Date.now(), 'yyyy-MM-dd'));
  };


  return (<div className="createform">
    {/* Create your timeline
    <form onSubmit={handleSubmit}>
      <label>Type of Timeline
        <select name="selectedType" value={tlType} onChange={e=> setTLType(e.target.value)}>
          <option value="custom">Custom</option>
          <option value="movies">Movies</option>
          <option value="games">Games</option>
          <option value="music">Music</option>
          <option value="history">Human History</option>
          <option value="life">Life </option>
          <option value="universe">Universe</option>
        </select>
      </label>
      <label>Start Date
        <input id="start-date" type="date" value={startDate} onChange={e => setStartDate(e.target.value)} required></input>
      </label>
      <label>End Date
        <input id="end-date" type="date" value={endDate} onChange={e => setEndDate(e.target.value)} required></input>
      </label>
      {tlType === 'custom' &&
        <label>Length of Timeline
          <select name="selectedLength" value={tlLength} onChange={e => setTLLength(e.target.value)}>
            <option value="months">Short (months)</option>
            <option value="years">Standard (years)</option>
            <option value="epic">Epic :O </option>
          </select>
        </label>}
      <button type="submit">Create</button>
    </form> */}
    </div>)
  }