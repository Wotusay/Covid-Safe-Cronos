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
  id?: string | undefined;
  date: string;
  endDate?: string | undefined | any;
  dosis?: string | undefined;
  group?: string | undefined;
}): React.ReactElement => {
  return (
    <>
      <p>Data that got fetched: </p>
      <ul>
        {group ? <li> Workplace: {group} </li> : null}
        <li> Type of certificate: {certificaat} </li>
        <li>
          Date: {date} {endDate ? `- ${endDate}` : null}
        </li>
        {id ? <li> Certificate identifier: {id} </li> : null}
        {dosis ? <li> Dosises: {dosis} </li> : null}
      </ul>
    </>
  );
};

export default CovidInformation;
