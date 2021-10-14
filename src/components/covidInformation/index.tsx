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
    <div className="mb-12">
      <p className="mb-6 text-sm font-normal text-textColor">
        Data that got fetched
      </p>
      <ul>
        {group ? (
          <li className="text-md text-navyBlue">
            <span className="mr-2 text-textColor"> Workplace: </span> {group}
          </li>
        ) : null}
        <li className="text-md text-navyBlue">
          <span className="mr-2 text-textColor">Type of certificate: </span>
          {certificaat}
        </li>
        <li className="text-md text-navyBlue">
          <span className="mr-2 text-textColor">Date: </span> {date}
          {endDate ? `- ${endDate}` : null}
        </li>
        {id ? (
          <li className="text-md text-navyBlue">
            <span className="mr-2 text-textColor">Identifier:</span>
            {id}
          </li>
        ) : null}
        {dosis ? (
          <li className="text-md text-navyBlue">
            <span className="mr-2 text-textColor">Dosises:</span> {dosis}
          </li>
        ) : null}
      </ul>
    </div>
  );
};

export default CovidInformation;
