import React from 'react';

const CovidInformation = ({
  certificaat,
  id,
  date,
  dosis,
  group,
}: {
  certificaat: string;
  id: string;
  date: string;
  dosis: string;
  group: string;
}): React.FC => {
  return (
    <>
      <p>Data that got fetched: </p>
      <ul>
        <li> Workplace: {group} </li>
        <li> Type of certificate: {certificaat} </li>
        <li> Date: {date} </li>
        <li> Certificate identifier: {id} </li>
        <li> Dosises: {dosis} </li>
      </ul>
    </>
  );
};

export default CovidInformation;
