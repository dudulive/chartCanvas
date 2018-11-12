import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartDunotComponent } from './chart-dunot.component';
import { ChartPieComponent } from './chart-pie.component';

@NgModule({
  imports: [CommonModule],
  exports: [ChartDunotComponent, ChartPieComponent],
  declarations: [ChartDunotComponent, ChartPieComponent]
})
export class ChartModule {}
