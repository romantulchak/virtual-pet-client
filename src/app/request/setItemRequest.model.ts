export class SetItemRequest{
  public subId: number;
  public bodyPosition: string;
  public itemId: number;
  public itemType: string;

  constructor(subId: number, bodyPosition: string, itemId: number, itemType: string){
    this.subId = subId;
    this.bodyPosition = bodyPosition;
    this.itemId = itemId;
    this.itemType = itemType;
  }
}
