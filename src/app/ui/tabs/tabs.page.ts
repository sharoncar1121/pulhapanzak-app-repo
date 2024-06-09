import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { home, person, folderOpen } from 'ionicons/icons';
import {
  IonIcon,
  IonLabel,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [ CommonModule, IonIcon, IonLabel, IonTabButton, IonTabs,  IonTabBar]
})
export class TabsPage {

  constructor() {
    addIcons({ home, person, folderOpen });
  }

  }


