import { FOAF } from '@inrupt/lit-generated-vocab-common';
import { Text, useSession } from '@inrupt/solid-ui-react';
import pdfjs from 'pdfjs-dist';
import React, { FC, useState } from 'react';

import { useStores } from '../../contexts/index';
import CovidInformation from '../covidInformation';

pdfjs.GlobalWorkerOptions.workerSrc =
  'https://cdn.bootcss.com/pdf.js/2.4.456/pdf.worker.js';

const FormCovid = (): FC => {
  const { session } = useSession();
  const [certificaat, setCertificaat] = useState('vaccinatiecertificaat');
  const [file, setFile] = useState();
  const [date, setDate] = useState<boolean>('');
  const [dosis, setDosis] = useState<string>();
  const [id, setId] = useState<string>();
  const { solidStore } = useStores();

  const handleFiles = async (e: any): Promise<void> => {
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
            // Retrieving text per page as string
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
            } else {
              return;
            }
          });
        });
      });
    }
  };

  const handleSubmit = async (e): Promise<void> => {
    e.preventDefault();
    await solidStore.createCovidFile(date, certificaat, session, dosis, id);

    if (file) {
      await solidStore.handleFiles(file, session);
    }
  };
  return (
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
          type="file"
          accept="application/pdf"
          onChange={handleFiles}
          id="covidfile"
          name="covidfile"
        />
        {file ? (
          <CovidInformation
            certificaat={certificaat}
            date={date}
            id={id}
            dosis={dosis}
          />
        ) : null}
        <input
          type="submit"
          className="p-5 font-semibold text-white bg-indigo-700 rounded-sm w-44"
          value="Save information"
        />
      </form>
    </>
  );
};

export default FormCovid;
