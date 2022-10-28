interface IVisit {
  id: number;
  locationId: number;
  date: number;
}

interface ILocation {
  id: number;
  name: string;
  tags: string[];
}
