import { FOAF } from '@inrupt/lit-generated-vocab-common';
import { Text, useSession } from '@inrupt/solid-ui-react';
import { useObserver } from 'mobx-react-lite';
import pdfjs from 'pdfjs-dist';
import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';
import { ROUTES } from 'src/consts';

import { useStores } from '../../contexts/index';
import CovidInformation from '../covidInformation';

pdfjs.GlobalWorkerOptions.workerSrc =
  'https://cdn.bootcss.com/pdf.js/2.4.456/pdf.worker.js';

const FormCovid = (): React.ReactElement => {
  const { session } = useSession();
  const [certificaat, setCertificaat] = useState('vaccinatiecertificaat');
  const [file, setFile] = useState();
  const [date, setDate] = useState('');
  const [dosis, setDosis] = useState('');
  const [id, setId] = useState('');
  const [group, setGroup] = useState('wheelhouse');
  const { solidStore, uiStore } = useStores();
  const history = useHistory();

  const handleDateChange = (e: any): void => {
    setDate(e.target.value);
  };

  const handleGroupChange = (e: any): void => {
    setGroup(e.target.value);
  };

  const handleCertificaatChange = (e: any): void => {
    setCertificaat(e.target.value);
  };

  const handleFilesChange = async (e: any): Promise<void> => {
    const targetFile = e.target.files[0];
    setFile(targetFile);

    if (targetFile) {
      const buffer = await targetFile.arrayBuffer();
      const loadingTask = pdfjs.getDocument({
        data: buffer,
      });
      loadingTask.promise.then(pdfDocument => {
        pdfDocument.getPage(1).then(page => {
          page.getViewport({ scale: 100 });
          page.getTextContent().then(textContent => {
            if (textContent.items.some(item => item.str === 'COVID-19')) {
              const typeCertifcate: string = textContent.items[30].str;
              if (
                typeCertifcate === 'VACCINATION CERTIFICATE' &&
                certificaat === 'vaccinatiecertificaat'
              ) {
                const date: string = textContent.items[6].str;
                const certificateIdentifier: string = textContent.items[68].str;
                const dosis: string = textContent.items[10].str;

                setDosis(dosis);
                setDate(date);
                setId(certificateIdentifier);
              }
            }
          });
        });
      });
    }
  };

  const handleSubmit = async (e): Promise<any> => {
    e.preventDefault();
    solidStore.status = id === '' ? 'loading data' : '';
    if (id !== '' && certificaat === 'vaccinatiecertificaat') {
      await solidStore.createCovidFile(
        date,
        certificaat,
        session,
        dosis,
        id,
        group,
      );
      await uiStore.checkUploadedFiles(session);
      if (file) {
        await solidStore.handleFiles(file, session);
      }
      return history.push(ROUTES.dashboard);
    } else {
      await solidStore.createCovidFile(date, certificaat, session);
      await uiStore.checkUploadedFiles(session);
      return history.push(ROUTES.dashboard);
    }
  };
  return useObserver(() => (
    <>
      <p className="flex content-center justify-center gap-1 mt-10 text-2xl font-bold mb-7">
        Vul je covid gegevens aan van {<Text property={FOAF.name.iri.value} />}
      </p>
      <p className="flex content-center justify-center gap-1 font-medium text-green-700 mb-7">
        {solidStore.status}
      </p>
      <form
        onSubmit={handleSubmit}
        className="grid content-center justify-center gap-7 mb-7 "
      >
        <select
          onChange={handleCertificaatChange}
          required
          name="certificaten"
          id="certificaten"
          value={certificaat}
        >
          <option value="vaccinatiecertificaat">Vaccinatiecertificaat</option>
          <option value="testcertificaat"> Testcertificaat </option>
          <option value="herstelcertificaat">Herstelcertificaat </option>
        </select>

        <select
          onChange={handleGroupChange}
          value={group}
          required
          name="groep"
          id="groep"
        >
          <option value="wheelhouse">Wheelhouse</option>
          <option value="konsolidate"> Konsolidate </option>
          <option value="craftworkz">Craftworkz </option>
        </select>
        {certificaat === 'testcertificaat' ||
        certificaat === 'herstelcertificaat' ? (
          <input
            onChange={handleDateChange}
            min="2020-12-12"
            required
            type="date"
            id="geldigheidsperiode"
          />
        ) : (
          <input
            required
            type="file"
            accept="application/pdf"
            onChange={handleFilesChange}
            id="covidfile"
            name="covidfile"
          />
        )}
        {file ? (
          <CovidInformation
            certificaat={certificaat}
            date={date}
            id={id}
            dosis={dosis}
            group={group}
          />
        ) : null}
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
