import { Component, ElementRef, ViewChild,OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { NotificacionService } from 'src/app/demo/service/notificacion.service';
import { Notificacion } from 'src/app/demo/api/Notificacion';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit {

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    notificaciones!: Notificacion[];

    constructor(public layoutService: LayoutService, private NotificacionService: NotificacionService) { }

    ngOnInit(): void{
        this.NotificacionService.getCategoriass().subscribe(
          response => {
            this.notificaciones = response as Notificacion[]
            console.log(response);
          }
        );

      }
}
