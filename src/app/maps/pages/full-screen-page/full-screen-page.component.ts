import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import * as maplibregl from 'maplibre-gl';

@Component({
  templateUrl: './full-screen-page.component.html',
  styleUrl: './full-screen-page.component.css'
})
export class FullScreenPageComponent implements AfterViewInit {

  @ViewChild('map') divMap?: ElementRef;

  ngAfterViewInit(): void {
    if(!this.divMap) throw 'El alemento HTML no fue encontrado'

    const map = new maplibregl.Map({
      container: this.divMap?.nativeElement , // container id
      style: 'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL', //stylesheet location
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
  });
  map.addControl(new maplibregl.FullscreenControl());
  }

}
