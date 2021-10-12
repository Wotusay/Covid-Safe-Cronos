class CovidInfo {
  id: string;
  startDate: string;
  endDate: string;
  dosis: number;
  typeCovidCerticate: string;

  constructor({
    id,
    startDate,
    endDate,
    dosis,
    typeCovidCerticate,
  }: {
    id: string;
    startDate: string;
    endDate: string;
    dosis: number;
    typeCovidCerticate: string;
  }) {
    if (id) {
      this.id = id;
    }
    this.startDate = startDate;
    this.endDate = endDate;
    if (dosis) {
      this.dosis = dosis;
    }
    this.typeCovidCerticate = typeCovidCerticate;
  }
}

export default CovidInfo;
