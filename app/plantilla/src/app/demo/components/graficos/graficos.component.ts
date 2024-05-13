import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlimentomasPedidoServiceService } from '../../service/grafico-service.service';
import { CombomasPedidoServiceService } from '../../service/grafico-service.service';
import { PostremasPedidoServiceService } from '../../service/grafico-service.service';
import { PaquetemasPedidoServiceService } from '../../service/grafico-service.service';
import { Graficos } from '../../models/GraficosViewModel';
import { ChartModule } from 'primeng/chart';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './graficos.component.html',
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
      private route: ActivatedRoute
  ) {}

  ngOnInit() {
      this.route.queryParams.subscribe(params => {
          this.usuario = params['usuario'];
          if (this.usuario) {
              this.loadData();
          }
      });
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
      const labels = data.map(item => item.alim_Descripcion);
      const values = data.map(item => item.totalPedidosAlimentos);
  
      this.pieDataAlimentos = {
          labels: labels,
          datasets: [{
              data: values,
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], 
              hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'] 
          }]
      };
  
      this.pieOptions = {
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
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], 
              hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'] 
          }]
      };
  
      this.pieOptions = {
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
      const labels = data.map(item => item.paqe_Descripcion);
      const values = data.map(item => item.totalPedidosPaquetes);
  
      this.pieDataPaquetes = {
          labels: labels,
          datasets: [{
              data: values,
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], 
              hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'] 
          }]
      };
  
      this.pieOptions = {
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

  initChartsPostres(data: Graficos[]) {
      const labels = data.map(item => item.post_Descripcion);
      const values = data.map(item => item.totalPedidosPostres);
  
      this.pieDataPostres = {
          labels: labels,
          datasets: [{
              data: values,
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], 
              hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'] 
          }]
      };
  
      this.pieOptions = {
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
