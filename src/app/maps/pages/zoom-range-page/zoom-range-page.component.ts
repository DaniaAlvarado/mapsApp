import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';

import * as maplibregl from 'maplibre-gl';
import { Map, LngLat} from 'maplibre-gl';

@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrl: './zoom-range-page.component.css'
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy{

  @ViewChild('map') divMap?: ElementRef;

  public zoom: number = 10;
  public map?: Map;
  public currentLngLat : LngLat = new LngLat(-75.58477710057537, 6.218765944772372);

  ngAfterViewInit(): void {
    if(!this.divMap) throw 'El alemento HTML no fue encontrado'

    this.map = new Map({
      container: this.divMap.nativeElement , // container id
      style: 'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL', //stylesheet location
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: this.zoom // starting zoom
  });
  this.map.addControl(new maplibregl.FullscreenControl());

  this.mapListener();
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  mapListener(){
    if ( !this.map) throw 'Mapa no inicializado';

    this.map.on('zoom', (ev) => {
      this.zoom = this.map!.getZoom();
    });

    this.map.on('zoomend', (ev) => {
      if( this.map!.getZoom() < 18 ) return;
      this.map!.zoomTo(18);

    });

    this.map.on('move', () => {
      this.currentLngLat = this.map!.getCenter();
    })

  }

  zoomIn(){
    this.map?.zoomIn();
  }

  zoomOut(){
    this.map?.zoomOut();
  }

  zoomChanged( value: string){
    this.zoom = Number(value);
    this.map?.zoomTo(this.zoom);
  }

}
