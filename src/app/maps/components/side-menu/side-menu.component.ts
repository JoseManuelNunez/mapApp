import { Component } from '@angular/core';

interface MenuItem {
  name: string
  url: string
}

@Component({
  selector: 'maps-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {

  public menuItem: MenuItem[] = [
    { url: '/maps/fullscreen', name: 'FullScreen' },
    { url: '/maps/zoom-range', name: 'ZoomRange' },
    { url: '/maps/markers', name: 'Markers' },
    { url: '/maps/properties', name: 'Houses' },
  ]

}
