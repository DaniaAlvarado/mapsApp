import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';

import * as maplibregl from 'maplibre-gl';
import { Map, LngLat, Marker } from 'maplibre-gl';

@Component({
  selector: 'map-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css'
})
export class MiniMapComponent implements AfterViewInit {

  @ViewChild('map') divMap?: ElementRef;
  @Input() lngLat?: [number, number];

  public map?: Map;

  ngAfterViewInit(): void {
    if (!this.divMap?.nativeElement) throw 'Map Div not found';
    if (!this.lngLat) throw "LngLat can't be null";

    const map = new Map({
      container: this.divMap.nativeElement, // container id
      style: 'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL', //stylesheet location
      center: this.lngLat, // starting position [lng, lat]
      zoom: 15, // starting zoom
      interactive: false
    });
    map.addControl(new maplibregl.FullscreenControl());

    new Marker()
      .setLngLat(this.lngLat)
      .addTo(map)

  }


}
