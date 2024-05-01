using AutoMapper;
using Proyecto_BK.Common.Models;
using Proyecto_BK.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Proyecto_BK.API.Extensions
{
    public class MappingProfileExtensions : Profile
    {
        public MappingProfileExtensions()
        {
            CreateMap<DepartamentoViewModel, tbDepartamentos>().ReverseMap();
            CreateMap<MunicipioViewModel, tbMunicipios>().ReverseMap();
            CreateMap<EstadoCivilViewModel, tbEstadosCiviles>().ReverseMap();
            CreateMap<ClienteViewModel, tbClientes>().ReverseMap();
            CreateMap<EmpleadoViewModel, tbEmpleados>().ReverseMap();

            CreateMap<AlimentoViewModel, tbAlimentos>().ReverseMap();
            CreateMap<BebidaViewModel, tbBebidas>().ReverseMap();
            CreateMap<ComboPersonalViewModel, tbCombosPersonales>().ReverseMap();
            CreateMap<ComplementoViewModel, tbComplementos>().ReverseMap();
            CreateMap<PaquetePorComidaViewModel, tbPaquetesPorComidas>().ReverseMap();
            CreateMap<PaqueteViewModel, tbPaquetes>().ReverseMap();
            CreateMap<PostreViewModel, tbPostres>().ReverseMap();
            CreateMap<PromocionPorComidaViewModel, tbPromocionesPorComidas>().ReverseMap();
            CreateMap<PromocionPorSucursalViewModel, tbPromocionesPorSusursales>().ReverseMap();
            CreateMap<PromocionViewModel, tbPromociones>().ReverseMap();
            CreateMap<SucursalViewModel, tbSucursales>().ReverseMap();

        }
    }
}
