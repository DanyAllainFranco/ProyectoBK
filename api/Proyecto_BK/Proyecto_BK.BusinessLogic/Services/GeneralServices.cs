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
        public ServiceResult LlenarDepto(string Dept_Codigo)
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
        public ServiceResult LlenarMuni(string Muni_Codigo)
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

        #region Estado Civil
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
        public ServiceResult LlenarEstado(int Esta_Id)
        {
            var result = new ServiceResult();
            try
            {
                var list = _estadocivilRepository.Find(Esta_Id);

                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error("Error de capa 8");
            }
        }
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
        public ServiceResult EditarEstado(tbEstadosCiviles item)
        {
            var result = new ServiceResult();
            try
            {
                var reponse = _estadocivilRepository.Update(item);
                if (reponse.CodeStatus == 1)
                {
                    return result.Ok($"Estado Civil {item.Esta_Id} editado con éxito", reponse);
                }
                else
                {
                    return result.Error("Ya existe un Estado Civil con ese nombre");
                }
            }
            catch (Exception ex)
            {
                return result.Error("Error de capa 8");
            }
        }
        public ServiceResult EliminarEstado(int Esta_Id)
        {
            var result = new ServiceResult();
            try
            {
                var reponse = _departamentosRepository.Delete(Esta_Id);
                if (reponse.CodeStatus == 1)
                {
                    return result.Ok($"Estado Civil {Esta_Id} eliminado con éxito", reponse);
                }
                else
                {
                    return result.Error("No se encontró el Estado Civil a eliminar");
                }
            }
            catch (Exception ex)
            {
                return result.Error("Error de capa 8");
            }
        }
        #endregion

        #region Clientes
        public ServiceResult ListCliente()
        {
            var result = new ServiceResult();
            try
            {
                var list = _clienteRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error("Error en la capa de servicio al listar clientes");
            }
        }

        public ServiceResult LlenarCliente(int Clie_Id)
        {
            var result = new ServiceResult();
            try
            {
                var cliente = _clienteRepository.Find(Clie_Id);
                if (cliente != null)
                {
                    return result.Ok(cliente);
                }
                else
                {
                    return result.Error($"No se encontró el cliente con ID {Clie_Id}");
                }
            }
            catch (Exception ex)
            {
                return result.Error($"Error al buscar el cliente con ID {Clie_Id}");
            }
        }

        public ServiceResult CrearCliente(tbClientes item)
        {
            var result = new ServiceResult();
            try
            {
                var response = _clienteRepository.Insert(item);
                if (response.CodeStatus == 1)
                {
                    return result.Ok("Cliente creado con éxito", response);
                }
                else
                {
                    return result.Error("Por favor rellene todos los campos");
                }
            }
            catch (Exception ex)
            {
                return result.Error("Error al guardar la información del cliente");
            }
        }

        public ServiceResult EditarCliente(tbClientes item)
        {
            var result = new ServiceResult();
            try
            {
                var response = _clienteRepository.Update(item);
                if (response.CodeStatus == 1)
                {
                    return result.Ok("Cliente editado con éxito", response);
                }
                else
                {
                    return result.Error("Error al editar el cliente");
                }
            }
            catch (Exception ex)
            {
                return result.Error("Error al editar el cliente");
            }
        }

        public ServiceResult EliminarCliente(int Clie_Id)
        {
            var result = new ServiceResult();
            try
            {
                var response = _clienteRepository.Delete(Clie_Id);
                if (response.CodeStatus == 1)
                {
                    return result.Ok("Cliente eliminado con éxito", response);
                }
                else
                {
                    return result.Error("Error al eliminar el cliente");
                }
            }
            catch (Exception ex)
            {
                return result.Error("Error al eliminar el cliente");
            }
        }
        #endregion

        #region Empleados
        public ServiceResult ListEmpleado()
        {
            var result = new ServiceResult();
            try
            {
                var list = _empleadoRepository.List();

                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error("Error de capa 8");
            }
        }
        public ServiceResult LlenarEmpleado(int Empl_Id)
        {
            var result = new ServiceResult();
            try
            {
                var votante = _empleadoRepository.Find(Empl_Id);
                if (votante != null)
                {
                    return result.Ok(votante);
                }
                else
                {
                    return result.Error($"No se encontró el Empleado con ID {Empl_Id}");
                }
            }
            catch (Exception ex)
            {
                return result.Error($"No se encontró el Empleado con ID {Empl_Id}");
            }
        }

        public ServiceResult CrearEmpleado(tbEmpleados item)
        {
            var result = new ServiceResult();
            try
            {
                var response = _empleadoRepository.Insert(item);
                if (response.CodeStatus == 1)
                {
                    return result.Ok("Empleado creado con exito", response);
                }
                else
                {
                    return result.Error("Por favor rellene todos los campos");
                }
            }
            catch (Exception ex)
            {
                return result.Error("Error al guardar la informacion del Empleado");
            }
        }

        public ServiceResult EditarEmpleado(tbEmpleados item)
        {
            var result = new ServiceResult();
            try
            {
                var list = _empleadoRepository.Update(item);
                if (list.CodeStatus > 0)
                {
                    return result.Ok(list);
                }
                else
                {
                    list.MessageStatus = (list.CodeStatus == 0) ? "Ya existe un Empleado con ese nombre" : list.MessageStatus;
                    return result.Error(list);
                }
            }
            catch (Exception ex)
            {
                return result.Error("Error de capa 8");
            }
        }
        public ServiceResult EliminarEmpleado(int Empl_Id)
        {
            var result = new ServiceResult();
            try
            {
                var list = _empleadoRepository.Delete(Empl_Id);
                if (list.CodeStatus > 0)
                {
                    return result.Ok(list);
                }
                else
                {
                    list.MessageStatus = (list.CodeStatus == 0) ? "No se encontró el Empleado a eliminar" : list.MessageStatus;
                    return result.Error(list);
                }
            }
            catch (Exception ex)
            {
                return result.Error("Error de capa 8");
            }
        }
        #endregion
    }
}
