import { SmartphoneSpecs } from "./SmartphoneSpecs";

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  specs?: SmartphoneSpecs|undefined;
  url: string;
  url2? : string
}
