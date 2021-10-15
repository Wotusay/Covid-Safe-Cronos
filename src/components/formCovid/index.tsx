import { FOAF } from '@inrupt/lit-generated-vocab-common';
import { Text, useSession } from '@inrupt/solid-ui-react';
import { useObserver } from 'mobx-react-lite';
import pdfjs from 'pdfjs-dist';
import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';
import { ROUTES } from 'src/consts';

import { useStores } from '../../contexts/index';
import CovidInformation from '../covidInformation';
import SelectInput from '../Select';

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
      solidStore.status = '';
      return history.push(ROUTES.dashboard);
    }
  };
  return useObserver(() => (
    <div className="flex items-center justify-center w-screen">
      <div className="grid justify-center w-3/12 p-3 pb-4 mt-24 shadow-xl rounded-xl bg-blueAccent">
        <div className="grid pb-1 rounded-md shadow-xl p-9 bg-whiteAccent">
          <p className="text-xl font-medium mb-7 text-navyBlue">
            Vul je covid gegevens aan van{' '}
            <Text property={FOAF.name.iri.value} />
          </p>
          <p className="flex content-center justify-center gap-1 font-medium text-green-700 mb-7">
            {solidStore.status}
          </p>
          <form
            onSubmit={handleSubmit}
            className="grid content-center justify-center gap-7 mb-7 "
          >
            <SelectInput
              item={certificaat}
              handleChange={handleCertificaatChange}
              name="certificaten"
              options={[
                'vaccinatiecertificaat',
                'testcertificaat',
                'herstelcertificaat',
              ]}
            />

            <SelectInput
              item={group}
              handleChange={handleGroupChange}
              name="groep"
              options={['wheelhouse', 'konsolidate', 'craftworkz']}
            />

            {certificaat === 'testcertificaat' ||
            certificaat === 'herstelcertificaat' ? (
              <input
                className="pl-2 pr-2 border border-textColor rounded-xl bg-whiteAccent text-navyBlue"
                onChange={handleDateChange}
                min="2020-12-12"
                required
                type="date"
                id="geldigheidsperiode"
              />
            ) : (
              <input
                required
                className="pl-2 pr-2 bg-whiteAccent text-navyBlue"
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
              className="p-5 mt-10 font-medium shadow-lg bg-oceanBlue text-whiteAccent rounded-3xl"
              value="Save information"
            />
          </form>
        </div>
      </div>
    </div>
  ));
};

export default FormCovid;
