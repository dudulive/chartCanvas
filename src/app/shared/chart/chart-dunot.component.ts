import { Component, AfterViewInit, ElementRef, ViewChild, Input } from '@angular/core';
import { UtilChart } from './util.chart';

@Component({
  selector: 'ui-chart-dunot',
  template: `
           <div style='display: flex;flex-wrap: nowrap;'> 
                <canvas #canvas></canvas>
                <div #legend></div>
           </div> 
    `
})
export class ChartDunotComponent extends UtilChart implements AfterViewInit {
  @ViewChild('canvas')
  public canvas: ElementRef;
  @ViewChild('legend')
  public legend: ElementRef;

  @Input()
  data: any = {};
  @Input()
  colors: string[] = [];
  private doughnutHoleSize: number = 0.5;

  ngAfterViewInit(): void {
    let canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    let ctx = canvasEl.getContext('2d');

    let total_value = 0;
    let color_index = 0;
    for (var categ in this.data) {
      var val = this.data[categ];
      total_value += val;
    }

    let start_angle = 0;
    for (categ in this.data) {
      val = this.data[categ];
      var slice_angle = (2 * Math.PI * val) / total_value;

      let widthCanvas = canvasEl.width / 2;
      let heightCanvas = canvasEl.height / 2;

      this.drawPieSlice(
        ctx,
        widthCanvas,
        heightCanvas,
        Math.min(widthCanvas, heightCanvas),
        start_angle,
        start_angle + slice_angle,
        this.colors[color_index % this.colors.length]
      );

      start_angle += slice_angle;
      color_index++;
    }

    //to create the doughnut chart
    this.drawPieSlice(
      ctx,
      canvasEl.width / 2,
      canvasEl.height / 2,
      this.doughnutHoleSize * Math.min(canvasEl.width / 2, canvasEl.height / 2),
      0,
      2 * Math.PI,
      '#fff'
    );

    for (categ in this.data) {
      val = this.data[categ];
      slice_angle = (2 * Math.PI * val) / total_value;
      let pieRadius = Math.min(canvasEl.width / 2, canvasEl.height / 2);

      //to create the doughnut chart
      let offset = (pieRadius * this.doughnutHoleSize) / 2;
      let offsetPieRadius = offset + pieRadius / 2;
      let labelX = canvasEl.width / 2 + (offsetPieRadius) * Math.cos(start_angle + slice_angle / 2);
      let labelY = canvasEl.height / 2 + (offsetPieRadius) * Math.sin(start_angle + slice_angle / 2);

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
