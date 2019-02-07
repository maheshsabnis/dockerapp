export class Product {
  constructor(
    public _id: string,
    public ProductId: number,
    public ProductName: string,
    public CategoryName: string,
    public Manufacturer: string,
    public Price: number
  ) {}
}

export const Categories: string[] = ["Electronics", "Electrical", "Food"];
