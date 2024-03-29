import { Component, AfterViewInit, ElementRef, ViewChild, Input } from '@angular/core';
import { UtilChart } from './util.chart';

@Component({
  selector: 'canvas-chart-pie',
  template: `
           <div style='display: flex;flex-wrap: nowrap;'>
                <canvas #canvas></canvas>
                <div #legend></div>
           <div>
    `
})
export class ChartPieComponent extends UtilChart implements AfterViewInit {
  @ViewChild('canvas')
  public canvas: ElementRef;
  @ViewChild('legend')
  public legend: ElementRef;

  @Input()
  data: any = {};
  @Input()
  colors: string[] = [];

  ngAfterViewInit(): void {
    let canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    let ctx = canvasEl.getContext('2d');

    let total_value = 0;
    let color_index = 0;
    let categ: any = {};
    let val: any = {};
    let slice_angle = 0;
    for (categ in this.data) {
      val = this.data[categ];
      total_value += val;
    }

    let start_angle = 0;
    for (categ in this.data) {
      val = this.data[categ];
      slice_angle = (2 * Math.PI * val) / total_value;

      this.drawPieSlice(
        ctx,
        canvasEl.width / 2,
        canvasEl.height / 2,
        Math.min(canvasEl.width / 2, canvasEl.height / 2),
        start_angle,
        start_angle + slice_angle,
        this.colors[color_index % this.colors.length]
      );

      start_angle += slice_angle;
      color_index++;
    }

    for (categ in this.data) {
      val = this.data[categ];
      slice_angle = (2 * Math.PI * val) / total_value;
      let pieRadius = Math.min(canvasEl.width / 2, canvasEl.height / 2);
      let labelX = canvasEl.width / 2 + (pieRadius / 2) * Math.cos(start_angle + slice_angle / 2);
      let labelY = canvasEl.height / 2 + (pieRadius / 2) * Math.sin(start_angle + slice_angle / 2);

      let labelText = Math.round((100 * val) / total_value);
      if (labelText > 0) {
        ctx.fillStyle = 'white';
        ctx.font = 'bold 1em Arial';
        ctx.fillText(labelText + '%', labelX, labelY);
      }
      start_angle += slice_angle;
    }

    if (this.legend) {
      color_index = 0;
      let legendHTML = '';
      for (categ in this.data) {
        legendHTML +=
          "<div><span style='display:inline-block;width:20px;background-color:" +
          this.colors[color_index++] +
          ";'>&nbsp;</span> " +
          categ +
          '</div>';
      }
      this.legend.nativeElement.innerHTML = legendHTML;
    }
  }
}
