import React from 'react';

import ListItem from '../ListItem';

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
        {group ? <ListItem title="Workplace" item={group} /> : null}
        <ListItem title="Type of certificate" item={certificaat} />
        <ListItem title="Date" item={date} secondItem={endDate} />
        {id ? <ListItem title="Identifier" item={id} /> : null}
        {dosis ? <ListItem title="Dosises" item={dosis} /> : null}
      </ul>
    </div>
  );
};

export default CovidInformation;
