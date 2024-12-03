export interface IExperience {
  id?: number;
  position: string;
  status: string;
  company: ICompany;
  start: string;
  end?: any;
  location: string;
  responsibilities: IResponsibility[];
}
interface IResponsibility {
  id: number;
  responsibility: string;
}
interface ICompany {
  name: string;
  logo: string;
}
