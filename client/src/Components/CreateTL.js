import React, { useState } from "react";
import { format } from 'date-fns'


export default function CreateTL({setCustTL, setCustCreated}) {

  const [endDate, setEndDate] = useState(format(Date.now(), 'yyyy-MM-dd'))
  const [startDate, setStartDate] = useState('2003-01-01'); //need to tweak this
  const [modal, setModal] = useState(false)
  const [tlLength, setTLLength] = useState('years')



  let endDateYear = +format(new Date(endDate), 'yyyy');
  let startDateYear = +format(new Date(startDate), 'yyyy')
  const myYears = endDateYear-startDateYear
  const yearsList = Math.ceil(myYears);



  const totalPoints = Array(yearsList+1).fill(startDateYear); //fill with yearslist if universe else fill with start year
  for (let i = 0; i < totalPoints.length; i++) {
    totalPoints[i] += i;
  }

  function handleModalSubmit() {
    setCustCreated(true)
  }


  function handleSubmit(event) {
    event.preventDefault();
    const newTimeLine = {
      start: startDateYear,
      end: endDateYear,
      segments: yearsList,
      arrayTL: totalPoints,
      length: myYears,
    };
    console.log('newTL created', newTimeLine)
    setCustTL([newTimeLine])
    setModal(true)
     // postMyEvent(newEvent);
    setStartDate('2003-08-21');
    setEndDate(format(Date.now(), 'yyyy-MM-dd'));
  };

  return (<main id="mainform">

    {modal && <div id="modalsplash">
      <div className="modal-container"><p style={{margin: "20px"}}>Your new timeline has been created. You can now view it.</p>
        <div id="modal" onClick={handleModalSubmit}><p id="modal-ok" style={{ backgroundColor: "#ffb700", height: "30px",width:"60px",margin: "0px", fontWeight:"bold", color: "rgb(9, 0, 65)" }}>Ok</p></div>
    </div>
    </div>}
    <div className="createform">
    <h1>Create your photo timeline</h1>
    <form onSubmit={handleSubmit}>
      <label>Start Date:
        <input id="start-date" type="date" value={startDate} onChange={e => setStartDate(e.target.value)} required></input>
      </label>
      <label>End Date:
        <input id="end-date" type="date" value={endDate} onChange={e => setEndDate(e.target.value)} required></input>
        </label>
        <label>Timeline Units
          <select name="selectedLength" value={tlLength} onChange={e => setTLLength(e.target.value)}>
            <option value="months">Short (months)</option>
            <option value="years">Standard (years)</option>
            <option value="epic">Epic :O </option>
          </select>
        </label>


      <button id="formsubmit" type="submit">Create</button>
    </form>
  </div>
  </main>)
  }