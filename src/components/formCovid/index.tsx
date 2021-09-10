import React, { FC, useState } from 'react';

const FormCovid = ({ solidStore, session }): FC => {
  const [certificaat, setCertificaat] = useState();
  const [date, setDate] = useState();

  const handleSubmit = (e): any => {
    e.preventDefault();
    solidStore.createCovidFile(date, certificaat, session);
  };
  return (
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
        <option value="vaccinatiecertificaat"> Vaccinatiecertificaat </option>
        <option value="testcertificaat"> Testcertificaat </option>
        <option value="herstelcertificaats">Herstelcertificaat </option>
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
  );
};

export default FormCovid;
