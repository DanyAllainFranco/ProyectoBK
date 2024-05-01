using Proyecto_BK.DataAccess.Repository;
using Proyecto_BK.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proyecto_BK.BusinessLogic.Services
{
    public class GeneralServices
    {
        private readonly DepartamentoRepository _departamentosRepository;
        private readonly MunicipioRepository _municipioRepository;
        private readonly EstadoCivilRepository _estadocivilRepository;
        private readonly ClienteRepository _clienteRepository;
        private readonly EmpleadoRepository _empleadoRepository;


        public GeneralServices(
               DepartamentoRepository departamentosRepository,
               MunicipioRepository municipioRepository,
               EstadoCivilRepository estadoCivilRepository,
               ClienteRepository clienteRepository,
               EmpleadoRepository empleadoRepository)

        {
            _departamentosRepository = departamentosRepository;
            _municipioRepository = municipioRepository;
            _estadocivilRepository = estadoCivilRepository;
            _clienteRepository = clienteRepository;
            _empleadoRepository = empleadoRepository;
        }


        #region Departamentos
        public ServiceResult ListDepto()
        {
            var result = new ServiceResult();
            try
            {
                var list = _departamentosRepository.List();

                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error("Error de capa 8");
            }
        }
        public ServiceResult ListDepto(string Dept_Codigo)
        {
            var result = new ServiceResult();
            try
            {
                var list = _departamentosRepository.List(Dept_Codigo);

                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error("Error de capa 8");
            }
        }
        public ServiceResult CrearDepto(tbDepartamentos item)
        {
            var result = new ServiceResult();
            try
            {
                var reponse = _departamentosRepository.Insert(item);
                if (reponse.CodeStatus == 1)
                {
                    return result.Ok("Departamento creado con exito", reponse);
                }
                else
                {
                    return result.Error("Ya existe un departamento con ese codigo o con ese nombre");
                }
            }
            catch (Exception ex)
            {
                return result.Error("Error de capa 8");
            }
        }
        public ServiceResult EditarDepto(tbDepartamentos item)
        {
            var result = new ServiceResult();
            try
            {
                var reponse = _departamentosRepository.Update(item);
                if (reponse.CodeStatus == 1)
                {
                    return result.Ok($"Departamento {item.Dept_Codigo} editado con éxito", reponse);
                }
                else
                {
                    return result.Error("Ya existe un departamento con ese nombre");
                }
            }
            catch (Exception ex)
            {
                return result.Error("Error de capa 8");
            }
        }
        public ServiceResult EliminarDepto(string Dept_Codigo)
        {
            var result = new ServiceResult();
            try
            {
                var reponse = _departamentosRepository.Delete(Dept_Codigo);
                if (reponse.CodeStatus == 1)
                {
                    return result.Ok($"Departamento {Dept_Codigo} eliminado con éxito", reponse);
                }
                else
                {
                    return result.Error("No se encontró el departamento a eliminar");
                }
            }
            catch (Exception ex)
            {
                return result.Error("Error de capa 8");
            }
        }
        #endregion

        #region Municipios
        public ServiceResult ListMuni()
        {
            var result = new ServiceResult();
            try
            {
                var list = _municipioRepository.List();

                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error("Error de capa 8");
            }
        }
        public ServiceResult Listmuni(string Muni_Codigo)
        {
            var result = new ServiceResult();
            try
            {
                var list = _municipioRepository.Find(Muni_Codigo);

                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error("Error de capa 8");
            }
        }
        public ServiceResult CrearMuni(tbMunicipios item)
        {
            var result = new ServiceResult();
            try
            {
                var reponse = _municipioRepository.Insert(item);
                if (reponse.CodeStatus == 1)
                {
                    return result.Ok("Municipio creado con exito", reponse);
                }
                else
                {
                    return result.Error("Ya existe un Municipio con ese codigo o con ese nombre");
                }
            }
            catch (Exception ex)
            {
                return result.Error("Error de capa 8");
            }
        }
        public ServiceResult EditarMuni(tbMunicipios item)
        {
            var result = new ServiceResult();
            try
            {
                var reponse = _municipioRepository.Update(item);
                if (reponse.CodeStatus == 1)
                {
                    return result.Ok($"Municipio {item.Muni_Codigo} editado con éxito", reponse);
                }
                else
                {
                    return result.Error("Ya existe un Municipio con ese nombre");
                }
            }
            catch (Exception ex)
            {
                return result.Error("Error de capa 8");
            }
        }
        public ServiceResult Eliminarmuni(string Muni_Codigo)
        {
            var result = new ServiceResult();
            try
            {
                var reponse = _municipioRepository.Delete(Muni_Codigo);
                if (reponse.CodeStatus == 1)
                {
                    return result.Ok($"Municipio {Muni_Codigo} eliminado con éxito", reponse);
                }
                else
                {
                    return result.Error("No se encontró el Municipio a eliminar");
                }
            }
            catch (Exception ex)
            {
                return result.Error("Error de capa 8");
            }
        }
        #endregion

        #region Departamentos
        public ServiceResult ListEstado()
        {
            var result = new ServiceResult();
            try
            {
                var list = _estadocivilRepository.List();

                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error("Error de capa 8");
            }
        }
        //public ServiceResult ListEstado(string Esta_Id)
        //{
        //    var result = new ServiceResult();
        //    try
        //    {
        //        var list = _estadocivilRepository.Find(Esta_Id);

        //        return result.Ok(list);
        //    }
        //    catch (Exception ex)
        //    {
        //        return result.Error("Error de capa 8");
        //    }
        //}
        public ServiceResult CrearEstado(tbEstadosCiviles item)
        {
            var result = new ServiceResult();
            try
            {
                var reponse = _estadocivilRepository.Insert(item);
                if (reponse.CodeStatus == 1)
                {
                    return result.Ok("Estado Civil creado con exito", reponse);
                }
                else
                {
                    return result.Error("Ya existe un Estado Civil con ese codigo o con ese nombre");
                }
            }
            catch (Exception ex)
            {
                return result.Error("Error de capa 8");
            }
        }
        public ServiceResult EditarEstado(tbDepartamentos item)
        {
            var result = new ServiceResult();
            try
            {
                var reponse = _departamentosRepository.Update(item);
                if (reponse.CodeStatus == 1)
                {
                    return result.Ok($"Departamento {item.Dept_Codigo} editado con éxito", reponse);
                }
                else
                {
                    return result.Error("Ya existe un departamento con ese nombre");
                }
            }
            catch (Exception ex)
            {
                return result.Error("Error de capa 8");
            }
        }
        //public ServiceResult EliminarDepto(string Dept_Codigo)
        //{
        //    var result = new ServiceResult();
        //    try
        //    {
        //        var reponse = _departamentosRepository.Delete(Dept_Codigo);
        //        if (reponse.CodeStatus == 1)
        //        {
        //            return result.Ok($"Departamento {Dept_Codigo} eliminado con éxito", reponse);
        //        }
        //        else
        //        {
        //            return result.Error("No se encontró el departamento a eliminar");
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        return result.Error("Error de capa 8");
        //    }
        //}
        #endregion
    }
}
