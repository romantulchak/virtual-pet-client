import {
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { NavigationStart, Router, RouterOutlet } from '@angular/router';
import { send } from 'process';
import { Subscription } from 'rxjs';
import { PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { SubHero } from '../models/subHero.model';
import { SubRequest } from '../models/subRequest.model';
import { GameService } from '../services/game.service';
import * as THREE from 'three';
/*
var OrbitControls = require('three-orbit-controls')(THREE)
var STLLoader = require('three-stl-loader')(THREE)

var loader = new STLLoader();*/
//THREE
/*import * as THREE from 'three';
var OrbitControls = require('three-orbit-controls')(THREE)
var STLLoader = require('three-stl-loader')(THREE)
var loader = new STLLoader();
import Scene = THREE.Scene;
import Mesh = THREE.Mesh;
import PerspectiveCamera = THREE.PerspectiveCamera;
import WebGLRenderer = THREE.WebGLRenderer;
*/
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit, OnDestroy {
  public currentHero: SubHero;
  private money: number = 0;
  private moneyInterval: any;
  private sendInterval: any;
  public isUpdatePrice: boolean = false;
  public errorMessage: string;
  public currentBoss: any;
  public isUpdateAttack: boolean = false;
  public level: number;
  public bossHealth: number;
  constructor(private gameService: GameService) { }
  /*constructor(private gameService: GameService, private render: Renderer2) {  }*/

  /*
  @ViewChild("myCanvas") myCanvas:any;
  private path:string = '../../assets/images/game/Squirtle.stl';
  private scene: Scene;
  private camera: PerspectiveCamera;
  private renderer: WebGLRenderer;
  private controls: any;
*/

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event: any) {
    event.preventDefault();
    this.sendMoneyPerMinute();
    return false;
  }
  ngAfterViewInit(): void {
    //  this.init3D();
  }
  ngOnInit(): void {
    /*let global = this.render.listen('window', 'resize', (evt) => {
      this.onWindowResize();
    });*/
    this.gameService.currentHero.subscribe((res) => {
      this.currentHero = res;


    });


    this.getBoss();

    if (this.currentHero != null) {
      this.moneyEverySecond();
      this.sendInterval = setInterval(() => {
        this.sendMoneyPerMinute();
      }, 60000);
    }
  }

  private getBoss() {
    this.gameService.getBoss(this.subReq()).subscribe((res) => {
      this.currentBoss = res.boss;
      this.level = res.level;
      this.bossHealth = this.currentBoss.health;
    });
  }

  private moneyEverySecond() {
    this.moneyInterval = setInterval(() => {
      this.money += this.currentHero.moneyMultiplier;
      this.updateBoss();

      this.currentHero.currency.money += this.currentHero.moneyMultiplier;
    }, 1000);
  }
  public upAttackLevel() {
    this.sendMoneyPerMinute();
    this.isUpdateAttack = true;
    setTimeout(() => {
      this.gameService.upAttackLevel(this.subReq()).subscribe((res) => {
        if (
          res.httpStatus == 'OK' &&
          this.currentHero.currency.money >=
          this.currentHero.subAttack.attackMoneyUp
        ) {
          this.currentHero = res.subDTO;
        } else {
          this.errorMessage = 'You do not have enough money';
        }
        this.isUpdateAttack = false;
      });
    }, 1000);
  }
  public upMoneyLevel() {
    this.sendMoneyPerMinute();
    this.isUpdatePrice = true;
    setTimeout(() => {
      this.gameService.upMoneyLevel(this.subReq()).subscribe((res) => {
        if (
          res.httpStatus == 'OK' &&
          this.currentHero.currency.money >= this.currentHero.moneyUpPrice
        ) {
          this.currentHero = res.subDTO;
        } else {
          this.errorMessage = 'You do not have enough money';
        }
        this.isUpdatePrice = false;
      });
    }, 1000);
  }

  private sendMoneyPerMinute() {
    this.gameService.sendMoney(this.subReq(), this.money).subscribe((res) => {
      this.currentHero = res.subDTO;
      this.money = 0;
    });
  }


  private updateBoss() {
    this.currentBoss.health -= this.currentHero.attack;

    if (this.currentBoss.health <= 0) {
      this.money += this.currentBoss.droppedMoney;
      this.sendMoneyPerMinute();
      this.getBoss();
    }
  }

  public moneyClikcs() {
    this.money += this.currentHero.moneyMultiplier;
    this.currentHero.currency.money += this.currentHero.moneyMultiplier;
    this.updateBoss();
  }
  private subReq(): SubRequest {
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

  /*
  private init3D(){
    console.log(this.myCanvas.nativeElement);

    this.renderer = new THREE.WebGLRenderer({alpha: true, canvas:  this.myCanvas.nativeElement});
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color( 0xFFFFFF );
    this.camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 0.01, 10000 );
    this.camera.position.set( 113, 111, 113 );
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.scene.add( new THREE.AmbientLight( 0x222222 ) );
    this.scene.add( this.camera ); // required, because we are adding a light as a child of the camera
    this.controls = new OrbitControls(this.camera,this.renderer.domElement);
    var light = new THREE.PointLight( 0xffffff, 0.8 );
    this.camera.add( light );

    loader.load(this.path, geometry => {
      var material = new THREE.MeshPhongMaterial( { color: 0xBEBEBE } );

      var mesh = new THREE.Mesh( geometry, material );
      this.scene.add(mesh)
    });
    this.animate();
  }

  animate() {
    this.camera.lookAt( this.scene.position );
    this.renderer.render(this.scene, this.camera);
    window.requestAnimationFrame(_ => this.animate());

  }

  private onWindowResize(){
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }*/
}
