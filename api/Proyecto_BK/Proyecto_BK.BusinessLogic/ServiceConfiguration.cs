using Microsoft.Extensions.DependencyInjection;
using Proyecto_BK.DataAccess;
//using Proyecto_BK.DataAccess.Repository;
using Proyecto_BK.BusinessLogic.Services;
using System;
using System.Collections.Generic;
using System.Text;
using Proyecto_BK.DataAccess.Repository;

namespace Proyecto_BK.BusinessLogic.Services
{
    public static class ServiceConfiguration
    {
        public static void DataAcces(this IServiceCollection service, string conn)
        {
            service.AddScoped<DepartamentoRepository>();
            service.AddScoped<EstadoCivilRepository>();
            service.AddScoped<MunicipioRepository>();
            service.AddScoped<ClienteRepository>();
            service.AddScoped<EmpleadoRepository>();
            //service.AddScoped<PantallaRepository>();
            //service.AddScoped<PantallaPorRolRepository>();
            //service.AddScoped<DispositivoRepository>();
            //service.AddScoped<EmpleadoRepositorio>();
            //service.AddScoped<ClienteRepositorio>();
            //service.AddScoped<EmpresaRepository>();
            //service.AddScoped<EstadoCivilRepository>();
            //service.AddScoped<MunicipioRepository>();
            //service.AddScoped<PiezaRepository>();
            //service.AddScoped<ServicioRepository>();
            //service.AddScoped<PaqueteRepository>();
            //service.AddScoped<RolRepositorio>();
            //service.AddScoped<UsuarioRepositorio>();
            Proyecto_BKContext.BuildConnectionString(conn);

        }

        public static void BusinessLogic(this IServiceCollection service)
        {
            service.AddScoped<GeneralServices>();
            service.AddScoped<AccesoServices>();
            service.AddScoped<RestauranteServices>();


        }
    }
}

