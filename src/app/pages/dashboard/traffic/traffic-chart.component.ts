import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

declare const echarts: any;

const points = [300, 520, 435, 530, 730, 620, 660, 860];

@Component({
  selector: 'ngx-traffic-chart',
  styleUrls: ['./traffic.component.scss'],
  template: `
    <div echarts [options]="option" class="echart"></div>
  `,
})
export class TrafficChartComponent implements AfterViewInit, OnDestroy {

  type = 'month';
  types = ['week', 'month', 'year'];
  option: any = {};
  themeSubscription: any;

  constructor(private theme: NbThemeService) {
  }

  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().delay(1).subscribe(config => {

      const trafficTheme: any = config.variables.traffic;

      this.option = Object.assign({}, {
        grid: {
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: points,
        },
        yAxis: {
          boundaryGap: [0, '5%'],
          axisLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#434e75',
              opacity: 0.06,
              width: '1',
            },
          },
        },
        tooltip: {
          axisPointer: {
            type: 'shadow',
          },
          textStyle: {
            color:'white',
            fontWeight: trafficTheme.tooltipFontWeight,
            fontSize: 16,
          },
          position: 'top',
          backgroundColor: '#434e75',
          borderColor: '#434e75',
          borderWidth: 3,
          formatter: '{c0} MB',
          extraCssText: trafficTheme.tooltipExtraCss,
        },
        series: [
          {
            type: 'line',
            symbol: 'circle',
            symbolSize: 8,
            sampling: 'average',
            silent: true,
            itemStyle: {
              normal: {
                color: '#434e75',
              },
              emphasis: {
                color: '#434e75',
                borderColor: '#434e75',
                borderWidth: 0,
              },
            },
            lineStyle: {
              normal: {
                width: 2,
                color: '#434e75',
              },
            },
            data: points.map(p => p - 15),
          },
          {
            type: 'line',
            symbol: 'circle',
            symbolSize: 6,
            sampling: 'average',
            itemStyle: {
              normal: {
                color: '#434e75',
                borderColor: trafficTheme.itemBorderColor,
                borderWidth: 2,
              },
              emphasis: {
                color: 'white',
                borderColor: trafficTheme.itemEmphasisBorderColor,
                borderWidth: 2,
              },
            },
            lineStyle: {
              normal: {
                width: 2,
                color: '#434e75',
                shadowColor: '#434e75',
                shadowBlur: '#434e75',
              },
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#7790c1',
                }, {
                  offset: 1,
                  color: '#7790c1',
                }]),
                opacity: 1,
              },
            },
            data: points,
          },
        ],
      });
    });
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }
}
