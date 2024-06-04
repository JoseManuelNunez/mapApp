import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { LngLat, Map } from 'mapbox-gl';


@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrl: './zoom-range-page.component.css'
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy {

  @ViewChild("map")
  public divMap?: ElementRef

  public zoom: number = 10
  public map?: Map
  public currentLngLat: LngLat = new LngLat(-74.5, 40)

  ngAfterViewInit(): void {
    if (!this.divMap) return
    console.log(this.divMap.nativeElement)
    this.map = new Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    })

    this.mapListerners()
  }
  ngOnDestroy(): void {
    this.map?.remove()
  }

  mapListerners() {
    if (!this.map) return

    this.map.on('zoom', (e) => {
      this.zoom = this.map!.getZoom()
    })

    this.map.on('zoomend', (ev) => {
      if(this.map!.getZoom() < 18) return
      this.map!.zoomTo(18)
    })

    this.map?.on('move', () => {
      this.currentLngLat = this.map!.getCenter()
    })
  }

  zoomIn() {
    this.map?.zoomIn()
  }

  zoomOut() {
    this.map?.zoomOut()
  }

  zoomChanged(value: string) {
    this.zoom = Number(value)
    this.map?.zoomTo(this.zoom)
  }
}
