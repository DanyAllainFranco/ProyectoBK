import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlimentomasPedidoServiceService } from '../../../service/grafico-service.service';
import { CombomasPedidoServiceService } from '../../../service/grafico-service.service';
import { PostremasPedidoServiceService } from '../../../service/grafico-service.service';
import { PaquetemasPedidoServiceService } from '../../../service/grafico-service.service';
import { Graficos } from '../../../models/GraficosViewModel';
import { ChartModule } from 'primeng/chart';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';



@Component({
  templateUrl: './chartsdemo.component.html',
})
export class GraficosComponent implements OnInit, OnDestroy {

  pieDataAlimentos: any;
  pieDataCombos: any;
  pieDataPaquetes: any;
  pieDataPostres: any;
  pieOptions: any;
  pieOptionsAlimentos: any;
  pieOptionsCombos: any;
  pieOptionsPaquetes: any;
  pieOptionsPostres: any;
  subscriptionAlimentos: Subscription;
  subscriptionCombos: Subscription;
  subscriptionPaquetes: Subscription;
  subscriptionPostres: Subscription;
  textColor: string = '#000';
  usuario: string;
  

  constructor(
      private alimentomasPedidoService: AlimentomasPedidoServiceService,
      private combomasPedidoService: CombomasPedidoServiceService,
      private paquetemasPedidoService: PaquetemasPedidoServiceService,
      private postremasPedidoService: PostremasPedidoServiceService,
      private route: ActivatedRoute,
      private router: Router
  ) {}

  ngOnInit() {
      this.route.queryParams.subscribe(params => {
          this.usuario = params['usuario'];
          if (this.usuario) {
              this.loadData();
          }
      });

      localStorage.setItem('lastVisitedRoute', this.router.url);
  }

  loadData() {
    this.subscriptionAlimentos = this.alimentomasPedidoService.getAlimentomasPedido(this.usuario)
    .subscribe((data: Graficos[]) => {
        this.initChartsAlimentos(data);
    });

      this.subscriptionCombos = this.combomasPedidoService.getCombomasPedido(this.usuario)
          .subscribe((data: Graficos[]) => {
              this.initChartsCombos(data);
          });

      this.subscriptionPaquetes = this.paquetemasPedidoService.getPaquetemasPedido(this.usuario)
          .subscribe((data: Graficos[]) => {
              this.initChartsPaquetes(data);
          });

      this.subscriptionPostres = this.postremasPedidoService.getPostremasPedido(this.usuario)
          .subscribe((data: Graficos[]) => {
              this.initChartsPostres(data);
          });
  }

  initChartsAlimentos(data: Graficos[]) {
    if (!Array.isArray(data)) {
      console.error('data no es un arreglo');
      return;
    }
  
    const labels = data.map(item => item.alim_Descripcion);
    const values = data.map(item => item.totalPedidosAlimentos);
  
    this.pieDataAlimentos = {
        labels: labels,
        datasets: [{
            data: values,
            backgroundColor: ['#FFCE56', '#FFA07A', '#FFD700','#FF6384', '#36A2EB', '#20B2AA'],
            hoverBackgroundColor: ['#FFCE56','#FFA07A', '#FFD700', '#FF6384', '#36A2EB', '#20B2AA']
            
        }]
    };
  
    this.pieOptionsAlimentos = {
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                    color: this.textColor
                }
            }
        }
    };
  }
  
  

  initChartsCombos(data: Graficos[]) {
      const labels = data.map(item => item.comb_Descripcion);
      const values = data.map(item => item.totalPedidosCombos);
  
      this.pieDataCombos  = {
          labels: labels,
          datasets: [{
              data: values,
              backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0', '#9966FF'], 
              hoverBackgroundColor: ['#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0', '#9966FF'] 
          }]
      };
  
      this.pieOptionsCombos = {
          plugins: {
              legend: {
                  labels: {
                      usePointStyle: true,
                      color: this.textColor
                  }
              }
          }
      };
  }

  initChartsPaquetes(data: Graficos[]) {
    if (Array.isArray(data)) {
        const labels = data.map(item => item.paqe_Descripcion);
        const values = data.map(item => item.totalPedidosPaquetes);

        this.pieDataPaquetes = {
            labels: labels,
            datasets: [{
                data: values,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF8C00', '#20B2AA', '#FFD700'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF8C00', '#20B2AA', '#FFD700']
                
            }]
        };

        this.pieOptionsPaquetes = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        color: this.textColor
                    }
                }
            }
        };
    } else {
        console.error('El argumento data no es un array en initChartsPaquetes.');
    }
}



  initChartsPostres(data: Graficos[]) {
      const labels = data.map(item => item.post_Descripcion);
      const values = data.map(item => item.totalPedidosPostres);
  
      this.pieDataPostres = {
          labels: labels,
          datasets: [{
              data: values,
              backgroundColor: [ '#9966FF', '#FF8C00','#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
              hoverBackgroundColor: ['#9966FF', '#FF8C00','#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']

          }]
      };
  
      this.pieOptionsPostres = {
          plugins: {
              legend: {
                  labels: {
                      usePointStyle: true,
                      color: this.textColor
                  }
              }
          }
      };
  }

  ngOnDestroy() {
      if (this.subscriptionAlimentos) {
          this.subscriptionAlimentos.unsubscribe();
      }
      if (this.subscriptionCombos) {
          this.subscriptionCombos.unsubscribe();
      }
      if (this.subscriptionPaquetes) {
          this.subscriptionPaquetes.unsubscribe();
      }
      if (this.subscriptionPostres) {
          this.subscriptionPostres.unsubscribe();
      }
  }
}
