import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';

interface MarkerAndColor {
  color: string
  marker: Marker
}

interface PlainMarker {
  color: string
  lngLat: number[]
}

@Component({
  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.css'
})
export class MarkersPageComponent implements AfterViewInit {

  @ViewChild("map")
  public divMap?: ElementRef

  public map?: Map
  public currentLngLat: LngLat = new LngLat(-74.5, 40)
  public markers: MarkerAndColor[] = []

  ngAfterViewInit(): void {
    if (!this.divMap) return
    console.log(this.divMap.nativeElement)
    this.map = new Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: 13, // starting zoom
    })
    this.readFromLocalStorage()
    // const marker = new Marker().setLngLat(this.currentLngLat).addTo(this.map)

  }

  createMarker() {
    if( !this.map ) return

    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));

    const lngLat = this.map.getCenter()

    this.addMarker(lngLat, color)
  }

  addMarker( lngLat: LngLat, color: string) {
    if( !this.map ) return

    const marker = new Marker({
      color,
      draggable: true
    }).setLngLat( lngLat )
    .addTo(this.map)

    this.saveToLocalStorage()
    this.markers.push({
      color,
      marker
    })


    marker.on('dragend', () => (
      this.saveToLocalStorage()
    ))

  }

  deleteMarker( index: number ) {
    this.markers[index].marker.remove()
    this.markers.splice(index, 1)

    this.saveToLocalStorage()
  }

  flyTo(marker: Marker) {
    this.map?.flyTo({
      zoom: 14,
      center: marker.getLngLat()
    })
  }

  saveToLocalStorage() {
    const plainMarker: PlainMarker[] = this.markers.map(({color, marker}) => {
      return {
        color,
        lngLat: marker.getLngLat().toArray()
      }
    })

    localStorage.setItem('plainMarkers', JSON.stringify(plainMarker))
  }

  readFromLocalStorage() {
    const plainMarkersString = localStorage.getItem('plainMarkers') || '[]'
    const plainMarkers: PlainMarker[] = JSON.parse(plainMarkersString)

    plainMarkers.forEach(({color, lngLat}) => {
      const [lng, lat] = lngLat
      const coords = new LngLat(lng, lat)
        this.addMarker(coords, color)
    });
  }

}
