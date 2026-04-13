export interface Product {
  handle: string;
  title: string;
  description: string;
  longDescription?: string;
  vendor: string;
  category: string;
  type: string;
  tags: string[];
  price: number;
  compareAtPrice: number;
  image: string;
  benefits?: string[];
  ingredients?: string[];
  usage?: string;
  options?: {
    name: string;
    values: string[];
  }[];
}
