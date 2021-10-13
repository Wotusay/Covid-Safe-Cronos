import React from 'react';

const CovidInformation = ({
  certificaat,
  id,
  date,
  dosis,
  group,
  endDate,
}: {
  certificaat: string;
  id: string | undefined;
  date: string;
  endDate: string | undefined | any;
  dosis: string | undefined;
  group: string | undefined;
}): React.ReactElement => {
  return (
    <>
      <p>Data that got fetched: </p>
      <ul>
        {group ? <li> Workplace: {group} </li> : ''}
        <li> Type of certificate: {certificaat} </li>
        <li>
          Date: {date} {endDate ? `- ${endDate}` : ''}
        </li>
        {id ? <li> Certificate identifier: {id} </li> : ''}
        {dosis ? <li> Dosises: {dosis} </li> : ''}
      </ul>
    </>
  );
};

export default CovidInformation;
