import { Component } from '@angular/core';
//import { CommonModule } from '@angular/common';
import { CounterAloneComponent } from "../../components/counter-alone/counter-alone.component";
import { SideMenuComponent } from "../../side-menu/side-menu.component";

@Component({
  standalone: true,
  imports: [CounterAloneComponent, SideMenuComponent],
  templateUrl: './alone-page.component.html',
  styleUrl: './alone-page.component.css',
})
export class AlonePageComponent {

}
