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

            service.AddScoped<AlimentoRepository>();
            service.AddScoped<BebidaRepository>();
            service.AddScoped<ComboPersonalRepository>();
            service.AddScoped<ComplementoRepository>();
            service.AddScoped<PaquetePorComidaRepository>();
            service.AddScoped<PaqueteRepository>();
            service.AddScoped<PostreRepository>();
            service.AddScoped<PromocionPorComidaRepository>();
            service.AddScoped<PromocionPorSucursalRepository>();
            service.AddScoped<PromocionRepository>();
            service.AddScoped<SucursalRepository>();
            service.AddScoped<PantallaRepository>();
            service.AddScoped<PantallaPorRolRepository>();
            service.AddScoped<CargoRepository>();
            service.AddScoped<RolRepository>();
            service.AddScoped<UsuarioRepository>();
            service.AddScoped<FacturaRepository>();


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

