export interface IExperience {
  id?: number;
  position: string;
  status: string;
  company: ICompany;
  start: string;
  end?: string | null;
  location: string;
  responsibilities: IResponsibility[];
}
interface IResponsibility {
  id: number;
  responsibility: string;
}
interface ICompany {
  name: string;
  logo?: string;
  shortName?: string;
}
