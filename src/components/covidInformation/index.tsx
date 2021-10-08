import React from 'react';

const CovidInformation = ({
  certificaat,
  id,
  date,
  dosis,
}: {
  certificaat: string;
  id: string;
  date: string;
  dosis: string;
}): React.FC => {
  return (
    <>
      <p>Data that got fetched: </p>
      <ul>
        <li> Type of certificate : {certificaat} </li>
        <li> Date: {date} </li>
        <li> Certificate identifier: {id} </li>
        <li> Dosises: {dosis} </li>
      </ul>
    </>
  );
};

export default CovidInformation;
