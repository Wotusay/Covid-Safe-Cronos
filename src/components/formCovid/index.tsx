import { FOAF } from '@inrupt/lit-generated-vocab-common';
import { Text, useSession } from '@inrupt/solid-ui-react';
import { useObserver } from 'mobx-react-lite';
import React, { FC, useState } from 'react';

import { useStores } from '../../contexts/index';

const FormCovid = (): FC => {
  const { session } = useSession();
  const [certificaat, setCertificaat] = useState('vaccinatiecertificaat');
  const [date, setDate] = useState();
  const [user, setUser] = useState();
  const [file, setFile] = useState();
  const { solidStore } = useStores();

  const handleFiles = (e: any): void => {
    const file = e.target.files[0];
    setFile(file);
  };

  const handleSubmit = async (e): Promise<any> => {
    e.preventDefault();
    await solidStore.createCovidFile(date, certificaat, session);

    if (file) {
      await solidStore.handleFiles(file, session);
    }

    await solidStore.grantAccesToCovidFile(session, user);
  };
  return useObserver(() => (
    <>
      <p className="flex content-center justify-center gap-1 mt-10 text-2xl font-bold mb-7">
        Covid gegevens van {<Text property={FOAF.name.iri.value} />}
      </p>
      <p className="flex content-center justify-center gap-1 font-medium text-green-700 mb-7">
        {solidStore.status}
      </p>
      <form
        onSubmit={handleSubmit}
        className="grid content-center justify-center gap-7 mb-7 "
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
          placeholder="Username to access"
          className="border-b-2 border-gray-900"
          onChange={e => setUser(e.target.value)}
          type="text"
          id="user-access"
        />

        <input
          type="file"
          onChange={handleFiles}
          id="covidfile"
          name="covidfile"
        />

        <input
          type="submit"
          className="p-5 font-semibold text-white bg-indigo-700 rounded-sm w-44"
          value="Save information"
        />
      </form>
    </>
  ));
};

export default FormCovid;
