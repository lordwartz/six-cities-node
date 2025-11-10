export type MockServerData = {
  id: string;
  names: string[];
  descriptions: string[];
  cities: string[];
  previewImages: string[];
  images: string[][];
  types: string[];
  goods: string[];
  users: {
    name: string;
    email: string;
    type: string;
  }[];
}
