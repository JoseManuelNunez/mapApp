import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MapsRoutingModule } from '../../../maps/maps-routing.module';

interface MenuItem {
  name: string
  url: string
}

@Component({
  selector: 'side-menu',
  standalone: true,
  imports: [CommonModule, MapsRoutingModule],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {

  public menuItem: MenuItem[] = [
    { url: '/maps/fullscreen', name: 'FullScreen' },
    { url: '/maps/zoom-range', name: 'ZoomRange' },
    { url: '/maps/markers', name: 'Markers' },
    { url: '/maps/properties', name: 'Houses' },
    { url: '/alone', name: 'Alone' },

  ]

}
