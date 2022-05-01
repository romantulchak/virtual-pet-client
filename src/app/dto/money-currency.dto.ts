import { Currency } from "../models/currency.model";
import { Money } from "../models/sub/money.model";

export class MoneyCurrencyDTO{
    public money: Money;
    public currency: Currency;
}