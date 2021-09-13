import { FOAF } from '@inrupt/lit-generated-vocab-common';
import { Text } from '@inrupt/solid-ui-react';
import React, { FC, useState } from 'react';

const FormCovid = ({ solidStore, session }): FC => {
  const [certificaat, setCertificaat] = useState('vaccinatiecertificaat');
  const [date, setDate] = useState();
  const [state, setState] = useState();

  const handleSubmit = async (e): Promise<any> => {
    e.preventDefault();
    await solidStore.createCovidFile(date, certificaat, session);
    setState(solidStore.status);
  };
  return (
    <>
      <p className="font-bold text-2xl mt-10 flex gap-1 mb-7 content-center justify-center">
        Covid gegevens van {<Text property={FOAF.name.iri.value} />}
      </p>
      <p className="flex font-medium gap-1 mb-7 content-center justify-center text-green-700">
        {state}
      </p>
      <form
        onSubmit={e => handleSubmit(e)}
        className="grid gap-7 mb-7 content-center justify-center "
      >
        <select
          onChange={e => setCertificaat(e.target.value)}
          required
          name="certificaten"
          id="certificaten"
        >
          <option defaultValue value="vaccinatiecertificaat">
            Vaccinatiecertificaat
          </option>
          <option value="testcertificaat"> Testcertificaat </option>
          <option value="herstelcertificaat">Herstelcertificaat </option>
        </select>

        <input
          onChange={e => setDate(e.target.value)}
          min="2020-12-12"
          required
          type="date"
          id="geldigheidsperiode"
        />

        <input
          type="submit"
          className="font-semibold text-white bg-indigo-700 w-44 rounded-sm p-5"
          value="Save information"
        />
      </form>
    </>
  );
};

export default FormCovid;
