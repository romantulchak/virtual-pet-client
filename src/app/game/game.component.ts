import {
  Component,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { SubHero } from '../models/subHero.model';
import { SubRequest } from '../models/subRequest.model';
import { GameService } from '../services/game.service';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit, OnDestroy {
  public currentHero: SubHero;
  public isUpdatePrice: boolean = false;
  public errorMessage: string;
  public currentBoss: any;
  public isUpdateAttack: boolean = false;
  public level: number;
  public bossHealth: number;
  private money: number = 0;
  private moneyInterval: any;
  private sendInterval: any;

  constructor(private gameService: GameService,
              private profileService: ProfileService) { }

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event: any) {
    event.preventDefault();
    this.sendMoneyPerMinute();
    return false;
  }

  ngOnInit(): void {
    this.getSelectedHero();
    this.getBoss();
    this.increaseMoney();
  }

  public upMoneyLevel(): void{
    this.sendMoneyPerMinute();
    this.isUpdatePrice = true;
    setTimeout(() => {
      this.gameService.upMoneyLevel(this.subReq()).subscribe(
        res => {
          this.currentHero.money = res.money;
          this.currentHero.currency = res.currency;
        },
        error=>{
          console.log(error.error.message);
        });
        this.isUpdatePrice = false;
    }, 1000);
  }

  public moneyClikcs(): void{
    this.money += this.currentHero.money.moneyMultiplier;
    this.currentHero.currency.money += this.currentHero.money.moneyMultiplier;
    this.updateBoss();
  }

  private getSelectedHero(): void{
    this.gameService.currentHero.subscribe(
      res => {
        if(res !== null){
            this.currentHero = res;
            this.profileService.getSubMoneyCurrency(res.id, res.name).subscribe(
              res=>{
                this.currentHero.money = res.money;
                this.currentHero.currency = res.currency;
              }
            );
        }
    });
  }

  private increaseMoney(): void{
    if (this.currentHero != null) {
      this.moneyEverySecond();
      this.sendInterval = setInterval(() => {
        this.sendMoneyPerMinute();
      }, 60000);
    }
  }


  private getBoss(): void{
    this.gameService.getBoss(this.subReq()).subscribe(
      res => {
      this.currentBoss = res.boss;
      this.level = res.level;
      this.bossHealth = this.currentBoss.health;
    },
    error=>{
      console.log(error);
    });
  }

  private moneyEverySecond(): void{
    this.moneyInterval = setInterval(() => {
      this.money += this.currentHero.money.moneyMultiplier;
      this.updateBoss();
      this.currentHero.currency.money += this.currentHero.money.moneyMultiplier;
    }, 1000);
  }

  public upAttackLevel(): void{
    this.sendMoneyPerMinute();
    this.isUpdateAttack = true;
    setTimeout(() => {
      this.gameService.upAttackLevel(this.subReq()).subscribe(
        res => {
         this.currentHero = res;
      },
      error=>{
        console.log(error.error.message);
      }
      );

      this.isUpdateAttack = false;
    }, 1000);
  }

  private sendMoneyPerMinute(): void{
    this.gameService.sendMoney(this.subReq(), this.money).subscribe(
      () => {
        this.currentHero.currency.money += this.money;
        this.money = 0;
    });
  }

  private updateBoss(): void{
    this.currentBoss.health -= this.currentHero.attack;
    if (this.currentBoss.health <= 0) {
      this.money += this.currentBoss.droppedMoney;
      this.sendMoneyPerMinute();
      this.getBoss();
    }
  }

  private subReq(): SubRequest{
    return new SubRequest(this.currentHero.id, this.currentHero.name, this.currentHero.user);
  }

  ngOnDestroy(): void{
    clearInterval(this.moneyInterval);
    this.sendMoneyPerMinute();
    clearInterval(this.sendInterval);
  }
}
