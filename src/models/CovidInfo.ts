class CovidInfo {
  id: string | undefined;
  startDate: string;
  endDate: string;
  dosis: number | undefined;
  typeCovidCerticate: string;
  username: string;

  constructor({
    id,
    startDate,
    endDate,
    dosis,
    typeCovidCerticate,
    username,
  }: {
    id: string | undefined;
    startDate: string;
    endDate: string;
    dosis: number | undefined;
    typeCovidCerticate: string;
    username: string;
  }) {
    if (id) {
      this.id = id;
    }
    this.startDate = startDate;
    this.endDate = endDate;
    this.username = username;
    if (dosis) {
      this.dosis = dosis;
    }
    this.typeCovidCerticate = typeCovidCerticate;
  }
}

export default CovidInfo;
