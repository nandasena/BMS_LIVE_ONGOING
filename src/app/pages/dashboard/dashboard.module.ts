import { NgModule } from '@angular/core';

import { NgxEchartsModule } from 'ngx-echarts';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SmartTableService } from '../../@core/data/smart-table.service';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { StatusCardComponent } from './status-card/status-card.component';
import { ContactsComponent } from './contacts/contacts.component';
import { RoomsComponent } from './rooms/rooms.component';
import { RoomSelectorComponent } from './rooms/room-selector/room-selector.component';
import { TemperatureComponent } from './temperature/temperature.component';
import { TemperatureDraggerComponent } from './temperature/temperature-dragger/temperature-dragger.component';
import { TeamComponent } from './team/team.component';
import { KittenComponent } from './kitten/kitten.component';
import { SecurityCamerasComponent } from './security-cameras/security-cameras.component';
import { ElectricityComponent } from './electricity/electricity.component';
import { ElectricityChartComponent } from './electricity/electricity-chart/electricity-chart.component';
import { WeatherComponent } from './weather/weather.component';
import { SolarComponent } from './solar/solar.component';
import { PlayerComponent } from './rooms/player/player.component';
import { TrafficComponent } from './traffic/traffic.component';
import { TrafficChartComponent } from './traffic/traffic-chart.component';
import { MyTasksComponent } from './my-tasks/my-tasks.component';
// import { TargetOverallComponent } from './target-overall/target-overall.component';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';
// import { of as observableOf } from 'rxjs/observable/of';
import { RoleProviderService } from '../../services/role-provider.service';

@NgModule({
  imports: [
    ThemeModule,
    NgxEchartsModule,
    Ng2SmartTableModule,

    NbSecurityModule.forRoot({
      accessControl: {
        admin: {
          view: ['news', 'comments'],
        },
        lv3: {
          parent: 'admin',
          create: 'comments',
        },
        default: {
          parent: 'lv3',
          create: 'news',
          remove: '*',
        },
      }
    }),
  ],
  declarations: [
    DashboardComponent,
    StatusCardComponent,
    TemperatureDraggerComponent,
    ContactsComponent,
    RoomSelectorComponent,
    TemperatureComponent,
    RoomsComponent,
    TeamComponent,
    KittenComponent,
    SecurityCamerasComponent,
    ElectricityComponent,
    ElectricityChartComponent,
    WeatherComponent,
    PlayerComponent,
    SolarComponent,
    TrafficComponent,
    TrafficChartComponent,
    MyTasksComponent,
    // TargetOverallComponent,
  ],
  entryComponents: [
    MyTasksComponent
  ],
  providers: [
    SmartTableService,
    { 
      provide: NbRoleProvider,
      useClass: RoleProviderService
    },
  ]
})
export class DashboardModule { }
