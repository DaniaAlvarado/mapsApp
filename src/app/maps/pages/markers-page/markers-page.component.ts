import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import * as maplibregl from 'maplibre-gl';
import { Map, LngLat} from 'maplibre-gl';

interface MarkerAndColor {
  color: string;
  marker: maplibregl.Marker
}

interface PlainMarker{
  color: string;
  lngLat: number[];
}

@Component({
  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.css'
})
export class MarkersPageComponent implements AfterViewInit{

  @ViewChild('map') divMap?: ElementRef;

  public markers: MarkerAndColor[] = [];

  public map?: Map;
  public currentLngLat : LngLat = new LngLat(-75.58477710057537, 6.218765944772372);

  ngAfterViewInit(): void {
    if(!this.divMap) throw 'El alemento HTML no fue encontrado'

    this.map = new Map({
      container: this.divMap.nativeElement , // container id
      style: 'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL', //stylesheet location
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: 13 // starting zoom
  });
  this.map.addControl(new maplibregl.FullscreenControl());

  this.readFromLocalStorage();

  // const markerHTML = document.createElement('div');
  // markerHTML.innerHTML = 'Daniela'

  // const market = new maplibregl.Marker({
  //   //color: 'red'
  //   element: markerHTML
  // })
  //   .setLngLat(this.currentLngLat)
  //   .addTo(this.map);

  }

  createMarker(){
    if( !this.map ) return;

    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const lngLat = this.map?.getCenter();

    this.addMarker( lngLat, color);
  }


  addMarker(lngLat: LngLat, color: string){
    if( !this.map ) return;

    const marker = new maplibregl.Marker({
      color: color,
      draggable: true
    })
      .setLngLat( lngLat )
      .addTo( this.map );

    this.markers.push({ color, marker, });
    this.saveToLocalStorage();

    marker.on('dragend', () => this.saveToLocalStorage() );
  }


  deleteMarker(index: number){
    this.markers[index].marker.remove();
    this.markers.splice( index, 1);
  }

  flyTo(marker: maplibregl.Marker){
    this.map?.flyTo({
      zoom: 14,
      center: marker.getLngLat()
    });
  }

  saveToLocalStorage(){
    const plainMarkers: PlainMarker[] = this.markers.map( ({color, marker}) =>{

      return{
        color,
        lngLat: marker.getLngLat().toArray()
      }
    });

    sessionStorage.setItem('plainMarkers', JSON.stringify(plainMarkers) );
  }

  readFromLocalStorage(){
    const plainMarkersString = sessionStorage.getItem('plainMarkers') ?? '[]';
    const plainMarkes: PlainMarker[] = JSON.parse(plainMarkersString); //! CUIDADO

    plainMarkes.forEach( ({color, lngLat}) => {
      const [lng, lat] = lngLat;
      const coords = new LngLat( lng, lat );

      this.addMarker( coords, color);
    })
  }
}
