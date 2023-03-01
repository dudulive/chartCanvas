import { Component, AfterViewInit, ElementRef, ViewChild, Input } from '@angular/core';
import { UtilChart } from './util.chart';

@Component({
  selector: 'canvas-chart-bar',
  template: ` <div style='display: flex;flex-wrap: nowrap;'>
  <canvas #canvas></canvas>
  <div #legend></div>
<div>`
})
export class ChartBarComponent extends UtilChart implements AfterViewInit {
  @ViewChild('canvas')
  public canvas: ElementRef;
  @ViewChild('legend')
  public legend: ElementRef;

  @Input()
  data: any = {};
  @Input()
  colors: string[] = [];
  @Input()
  seriesName = "";

  private canvasEl: HTMLCanvasElement;
  private ctx;
  private padding = 40;
  private gridStep = 1;
  private gridColor = "black";
  private align = "center";
  private fill = "black";
  private font = {
    weight: "bold",
    size: "18px",
    family: "Lato"
  };
  private maxValue = 0;

  ngAfterViewInit(): void {
    this.canvasEl = this.canvas.nativeElement;
    this.ctx = this.canvasEl.getContext('2d');
    for (let categ in this.data) {
      if (this.data[categ] > this.maxValue)
        this.maxValue = this.data[categ];
    }
    this.maxValue = this.maxValue + 1;
    this.draw();
  }

  drawGridLines() {
    let canvasActualHeight = this.canvasEl.height - this.padding * 2;

    let gridValue = 0;
    while (gridValue <= this.maxValue) {
      let gridY =
        canvasActualHeight * (1 - gridValue / this.maxValue) +
        this.padding;
      this.drawLine(
        this.ctx,
        0,
        gridY,
        this.canvasEl.width,
        gridY,
        this.gridColor
      );
      this.drawLine(
        this.ctx,
        15,
        this.padding / 2,
        15,
        gridY + this.padding / 2,
        this.gridColor
      );
      // Writing grid markers
      this.ctx.save();
      this.ctx.fillStyle = this.gridColor;
      this.ctx.textBaseline = "bottom";
      this.ctx.font = "bold 10px Arial";
      this.ctx.fillText(gridValue, 0, gridY - 2);
      this.ctx.restore();
      gridValue += this.gridStep;
    }
  }
  drawBars() {
    let canvasActualHeight = this.canvasEl.height - this.padding * 2;
    let canvasActualWidth = this.canvasEl.width - this.padding * 2;
    let barIndex = 0;
    let numberOfBars = Object.keys(this.data).length;
    let barSize = canvasActualWidth / numberOfBars;
    for (let categ in this.data) {
      if(this.data[categ]){
        let val = this.data[categ];
        let barHeight = Math.round((canvasActualHeight * val) / this.maxValue);
        this.drawBar(
          this.ctx,
          this.padding + barIndex * barSize,
          this.canvasEl.height - barHeight - this.padding,
          barSize,
          barHeight,
          this.colors[barIndex % this.colors.length]
        );
        barIndex++;
      }
    }
  }
  drawLabel() {
    this.ctx.save();
    this.ctx.textBaseline = "bottom";
    this.ctx.textAlign = this.align;
    this.ctx.fillStyle = this.fill;
    this.ctx.font = `${this.font.weight} ${this.font.size} ${this.font.family}`;
    let xPos = this.canvasEl.width / 2;
    if (this.align == "left") {
      xPos = 10;
    }
    if (this.align == "right") {
      xPos = this.canvasEl.width - 10;
    }
    this.ctx.fillText(this.seriesName, xPos, this.canvasEl.height);
    this.ctx.restore();
  }
  drawLegend() {
    let pIndex = 0;
    let ul = document.createElement("ul");
    this.legend.nativeElement.append(ul);
    for (let ctg of Object.keys(this.data)) {
      let li = document.createElement("li");
      li.style.listStyle = "none";
      li.style.borderLeft =
        "20px solid " + this.colors[pIndex % this.colors.length];
      li.style.padding = "5px";
      li.textContent = ctg;
      ul.append(li);
      pIndex++;
    }
  }
  drawLine(ctx, startX, startY, endX, endY, color) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
    ctx.restore();
  }

  drawBar(ctx, upperLeftCornerX, upperLeftCornerY, width, height, color) {
    ctx.save();
    ctx.fillStyle = color;
    ctx.fillRect(upperLeftCornerX, upperLeftCornerY, width, height);
    ctx.restore();
  }

  draw() {
    this.drawGridLines();
    this.drawBars();
    this.drawLabel();
    this.drawLegend();
  }

}
