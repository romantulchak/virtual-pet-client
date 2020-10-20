import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router, RouterOutlet } from '@angular/router';
import { send } from 'process';
import { Subscription } from 'rxjs';
import { SubHero } from '../models/subHero.model';
import { SubRequest } from '../models/subRequest.model';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {

  public currentHero: SubHero;
  private money: number = 0;
  private moneyInterval:any;
  private sendInterval: any;
  public isUpdatePrice: boolean = false;
  public errorMessage: string;
  public currentBoss: any;
  public level: number;
  constructor(private gameService: GameService) {  }

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event: any) {
  event.preventDefault();
  this.sendMoneyPerMinute();
  return false;
}

  ngOnInit(): void {

    this.gameService.currentHero.subscribe(
      res=>{
        this.currentHero = res;
      }
    );
      this.getBoss();

      if(this.currentHero != null){

        this.moneyEverySecond();
        this.sendInterval = setInterval(()=>{
          this.sendMoneyPerMinute();
        },60000);
      }

  }

  private getBoss(){
    this.gameService.getBoss(this.subReq()).subscribe(
      res=>{
        console.log(res);
        this.currentBoss = res.boss;
        this.level = res.level;
      }
    );
  }

  private moneyEverySecond(){
  this.moneyInterval = setInterval(()=>{
        this.money += this.currentHero.moneyMultiplier;
        this.updateBoss();

        this.currentHero.money += this.currentHero.moneyMultiplier;
    }, 1000);
    console.log(this.moneyInterval);

  }

  public upMoneyLevel(){
    this.sendMoneyPerMinute();
    this.isUpdatePrice = true;
    setTimeout(() => {
      this.gameService.upMoneyLevel(this.subReq()).subscribe(
        res=>{

          if(res.httpStatus == 'OK' && this.currentHero.money >= this.currentHero.moneyUpPrice){
            this.currentHero = res.subDTO;

          }else{
            this.errorMessage = "You do not have enough money";
          }
          this.isUpdatePrice = false;

        }
      );

    }, 1000);

  }

  private sendMoneyPerMinute(){

      this.gameService.sendMoney(this.subReq(), this.money).subscribe(
        res=>{
          this.currentHero = res.subDTO;
          this.money = 0;
        }
      );
  }

  private updateBoss(){
    this.currentBoss.health -= this.currentHero.attack;

    if(this.currentBoss.health <= 0){
      this.money += this.currentBoss.droppedMoney;
      this.sendMoneyPerMinute();
      this.getBoss();
    }
  }

  public moneyClikcs(){
    this.money += this.currentHero.moneyMultiplier;
    this.currentHero.money += this.currentHero.moneyMultiplier;
    this.updateBoss();
  }
  private subReq():SubRequest{
    let subRequest = new SubRequest();
    subRequest.name = this.currentHero.name;
    subRequest.subId = this.currentHero.id;
    subRequest.user = this.currentHero.user;
    return subRequest;
  }

  ngOnDestroy(): void {
      clearInterval(this.moneyInterval);
      this.sendMoneyPerMinute();
      clearInterval(this.sendInterval);

  }
}
