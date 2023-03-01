import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartDunotComponent } from './chart-dunot.component';
import { ChartPieComponent } from './chart-pie.component';
import { ChartBarComponent } from './chart-bar.component';

@NgModule({
  imports: [CommonModule],
  exports: [ChartDunotComponent, ChartPieComponent, ChartBarComponent],
  declarations: [ChartDunotComponent, ChartPieComponent, ChartBarComponent]
})
export class ChartModule {}
