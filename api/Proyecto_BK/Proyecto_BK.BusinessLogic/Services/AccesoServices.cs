using Proyecto_BK.DataAccess.Repository;
using Proyecto_BK.Entities;
using Proyecto_BK.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proyecto_BK.BusinessLogic.Services
{
    public class AccesoServices
    {
        private readonly CargoRepository _cargoRepository;
        private readonly PantallaRepository _pantallaRepository;
        private readonly PantallaPorRolRepository _pantallaPorRolRepository;
        private readonly RolRepository _rolRepository;
        private readonly UsuarioRepository _usuarioRepository;


        public AccesoServices(
               CargoRepository cargoRepository,
               PantallaRepository pantallaRepository,
               PantallaPorRolRepository pantallaPorRolRepository,
               RolRepository rolRepository,
               UsuarioRepository usuarioRepository)

        {
            _cargoRepository = cargoRepository;
            _pantallaRepository = pantallaRepository;
            _pantallaPorRolRepository = pantallaPorRolRepository;
            _rolRepository = rolRepository;
            _usuarioRepository = usuarioRepository;
        }


        #region Cargos
        public ServiceResult ListCargo()
        {
            var result = new ServiceResult();
            try
            {
                var list = _cargoRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error("Error en la capa de servicio al listar cargos");
            }
        }

        public ServiceResult LlenarCargo(int Carg_Id)
        {
            var result = new ServiceResult();
            try
            {
                var cargo = _cargoRepository.Find(Carg_Id);
                if (cargo != null)
                {
                    return result.Ok(cargo);
                }
                else
                {
                    return result.Error($"No se encontró el cargo con ID {Carg_Id}");
                }
            }
            catch (Exception ex)
            {
                return result.Error($"Error al buscar el cargo con ID {Carg_Id}");
            }
        }

        public ServiceResult CrearCargo(tbCargos item)
        {
            var result = new ServiceResult();
            try
            {
                var response = _cargoRepository.Insert(item);
                if (response.CodeStatus == 1)
                {
                    return result.Ok("Cargo creado con éxito", response);
                }
                else
                {
                    return result.Error("Por favor rellene todos los campos");
                }
            }
            catch (Exception ex)
            {
                return result.Error("Error al guardar la información del cargo");
            }
        }

        public ServiceResult EditarCargo(tbCargos item)
        {
            var result = new ServiceResult();
            try
            {
                var response = _cargoRepository.Update(item);
                if (response.CodeStatus > 0)
                {
                    return result.Ok("Cargo actualizado con éxito", response);
                }
                else
                {
                    return result.Error("No se pudo actualizar el cargo");
                }
            }
            catch (Exception ex)
            {
                return result.Error("Error al actualizar el cargo");
            }
        }

        public ServiceResult EliminarCargo(int Carg_Id)
        {
            var result = new ServiceResult();
            try
            {
                var response = _cargoRepository.Delete(Carg_Id);
                if (response.CodeStatus > 0)
                {
                    return result.Ok("Cargo eliminado con éxito", response);
                }
                else
                {
                    return result.Error("No se encontró el cargo a eliminar");
                }
            }
            catch (Exception ex)
            {
                return result.Error("Error al eliminar el cargo");
            }
        }
        #endregion

        #region Pantallas
        public ServiceResult ListPantalla()
        {
            var result = new ServiceResult();
            try
            {
                var list = _pantallaRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error("Error en la capa de servicio al listar pantallas");
            }
        }

        public ServiceResult LlenarPantalla(int Pant_Id)
        {
            var result = new ServiceResult();
            try
            {
                var pantalla = _pantallaRepository.Find(Pant_Id);
                if (pantalla != null)
                {
                    return result.Ok(pantalla);
                }
                else
                {
                    return result.Error($"No se encontró la pantalla con ID {Pant_Id}");
                }
            }
            catch (Exception ex)
            {
                return result.Error($"Error al buscar la pantalla con ID {Pant_Id}");
            }
        }

        public ServiceResult CrearPantalla(tbPantallas item)
        {
            var result = new ServiceResult();
            try
            {
                var response = _pantallaRepository.Insert(item);
                if (response.CodeStatus == 1)
                {
                    return result.Ok("Pantalla creada con éxito", response);
                }
                else
                {
                    return result.Error("Por favor rellene todos los campos");
                }
            }
            catch (Exception ex)
            {
                return result.Error("Error al guardar la información de la pantalla");
            }
        }

        public ServiceResult EditarPantalla(tbPantallas item)
        {
            var result = new ServiceResult();
            try
            {
                var response = _pantallaRepository.Update(item);
                if (response.CodeStatus > 0)
                {
                    return result.Ok("Pantalla actualizada con éxito", response);
                }
                else
                {
                    return result.Error("No se pudo actualizar la pantalla");
                }
            }
            catch (Exception ex)
            {
                return result.Error("Error al actualizar la pantalla");
            }
        }

        public ServiceResult EliminarPantalla(int Pant_Id)
        {
            var result = new ServiceResult();
            try
            {
                var response = _pantallaRepository.Delete(Pant_Id);
                if (response.CodeStatus > 0)
                {
                    return result.Ok("Pantalla eliminada con éxito", response);
                }
                else
                {
                    return result.Error("No se encontró la pantalla a eliminar");
                }
            }
            catch (Exception ex)
            {
                return result.Error("Error al eliminar la pantalla");
            }
        }
        #endregion

        #region PantallasPorRoles
        public ServiceResult ListPantallasPorRoles()
        {
            var result = new ServiceResult();
            try
            {
                var list = _pantallaPorRolRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error("Error en la capa de servicio al listar pantallas por roles");
            }
        }

        public ServiceResult LlenarPantallaPorRol(int Paro_Id)
        {
            var result = new ServiceResult();
            try
            {
                var pantallaPorRol = _pantallaPorRolRepository.Find(Paro_Id);
                if (pantallaPorRol != null)
                {
                    return result.Ok(pantallaPorRol);
                }
                else
                {
                    return result.Error($"No se encontró la pantalla por rol con ID {Paro_Id}");
                }
            }
            catch (Exception ex)
            {
                return result.Error($"Error al buscar la pantalla por rol con ID {Paro_Id}");
            }
        }

        public ServiceResult CrearPantallaPorRol(tbPantallasPorRoles item)
        {
            var result = new ServiceResult();
            try
            {
                var response = _pantallaPorRolRepository.Insert(item);
                if (response.CodeStatus == 1)
                {
                    return result.Ok("Pantalla por rol creada con éxito", response);
                }
                else
                {
                    return result.Error("Por favor rellene todos los campos");
                }
            }
            catch (Exception ex)
            {
                return result.Error("Error al guardar la información de la pantalla por rol");
            }
        }

        public ServiceResult EditarPantallaPorRol(tbPantallasPorRoles item)
        {
            var result = new ServiceResult();
            try
            {
                var response = _pantallaPorRolRepository.Update(item);
                if (response.CodeStatus > 0)
                {
                    return result.Ok("Pantalla por rol actualizada con éxito", response);
                }
                else
                {
                    return result.Error("No se pudo actualizar la pantalla por rol");
                }
            }
            catch (Exception ex)
            {
                return result.Error("Error al actualizar la pantalla por rol");
            }
        }

        public ServiceResult EliminarPantallaPorRol(int Rol_Id)
        {
            var result = new ServiceResult();
            try
            {
                var response = _rolRepository.EliminarPantaPorRol(Rol_Id);
                if (response.CodeStatus > 0)
                {
                    return result.Ok("Pantalla por rol eliminada con éxito", response);
                }
                else
                {
                    return result.Error("No se encontró la pantalla por rol a eliminar");
                }
            }
            catch (Exception ex)
            {
                return result.Error("Error al eliminar la pantalla por rol");
            }
        }
        #endregion

        #region Roles
        public ServiceResult ListRoles() //RolesDDL
        {
            var result = new ServiceResult();
            try
            {
                var list = _rolRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error("Error en la capa de servicio al listar roles");
            }
        }
        public ServiceResult ListPantallas2(int RolId) //RolesDDL
        {
            var result = new ServiceResult();
            try
            {
                var list = _rolRepository.ListPanta2(RolId);
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error("Error en la capa de servicio al listar roles");
            }
        }
        public ServiceResult ListaPantallasPorRoles(int Role_Id)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _rolRepository.List1(Role_Id);
                if (lost.Count() > 0)
                {
                    return result.Ok(lost);
                }
                else
                {
                    return result.Error();
                }

            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);

            }
        }
        public ServiceResult ListPantallas() //RolesDDL
        {
            var result = new ServiceResult();
            try
            {
                var list = _rolRepository.ListPanta();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error("Error en la capa de servicio al listar roles");
            }
        }


        public ServiceResult InsertarRol(tbRoles item, out int ingrId)
        {
            var result = new ServiceResult();
            ingrId = 0;
            try
            {
                var (lost, idGenerado) = _rolRepository.Insertar(item);
                if (lost.CodeStatus > 0)
                {
                    ingrId = idGenerado;
                    return result.Ok(lost);
                }
                else
                {
                    lost.MessageStatus = (lost.CodeStatus == 0) ? "401 Error de Consulta" : lost.MessageStatus;
                    return result.Error(lost);
                }

            }
            catch (Exception ex)
            {

                return result.Error(ex.Message);
            }
        }

        public ServiceResult RolesDDL() //RolesDDL
        {
            var result = new ServiceResult();
            try
            {
                var list = _rolRepository.RolesDDL();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error("Error en la capa de servicio al listar roles");
            }
        }

        public ServiceResult DetallasRol(int Rol_Id)
        {
            var result = new ServiceResult();
            try
            {
                var rol = _rolRepository.Detalle(Rol_Id);
                if (rol != null)
                {
                    return result.Ok(rol);
                }
                else
                {
                    return result.Error($"No se encontró el rol con ID {Rol_Id}");
                }
            }
            catch (Exception ex)
            {
                return result.Error($"Error al buscar el rol con ID {Rol_Id}");
            }
        }

        public ServiceResult LlenarRol(int Rol_Id)
        {
            var result = new ServiceResult();
            try
            {
                var rol = _rolRepository.Find(Rol_Id);
                if (rol != null)
                {
                    return result.Ok(rol);
                }
                else
                {
                    return result.Error($"No se encontró el rol con ID {Rol_Id}");
                }
            }
            catch (Exception ex)
            {
                return result.Error($"Error al buscar el rol con ID {Rol_Id}");
            }
        }

        public (ServiceResult, int) InsertarRoles(tbRoles item)
        {
            var result = new ServiceResult();
            int rolid = 0;
            try
            {
                var lost = _rolRepository.Insertar(item);
                rolid = lost.Item2;

                if (lost.Item1.CodeStatus > 0)
                {
                    return (result.Ok(lost), rolid);

                }
                else
                {
                    return (result.Error(lost), rolid);
                }
            }
            catch (Exception ex)
            {
                return (result.Error(ex.Message), rolid);
            }
        }

        public ServiceResult EditarRol(tbRoles item)
        {
            var result = new ServiceResult();
            try
            {
                var response = _rolRepository.Update(item);
                if (response.CodeStatus > 0)
                {
                    return result.Ok("Rol actualizado con éxito", response);
                }
                else
                {
                    return result.Error("No se pudo actualizar el rol");
                }
            }
            catch (Exception ex)
            {
                return result.Error("Error al actualizar el rol");
            }
        }

        public ServiceResult InsertarPAntxROle(List<int> PantIds, int Rol_Id, int usuaModifica)
        {
            var result = new ServiceResult();
            try
            {
                foreach (var Pant_Id in PantIds)
                {
                    var lost = _rolRepository.InsertarPor(Pant_Id, Rol_Id, usuaModifica);
                    if (lost.CodeStatus > 0)
                    {
                       
                    }
                    else
                    {
                        lost.MessageStatus = (lost.CodeStatus == 0) ? "401 Error de Consulta" : lost.MessageStatus;
                        return result.Error(lost);
                    }
                }

                return result.Ok(); // Si todo fue exitoso
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EliminarRol(int Rol_Id)
        {
            var result = new ServiceResult();
            try
            {
                var response = _rolRepository.Delete(Rol_Id);
                if (response.CodeStatus > 0)
                {
                    return result.Ok("Rol eliminado con éxito", response);
                }
                else
                {
                    return result.Error("No se encontró el rol a eliminar");
                }
            }
            catch (Exception ex)
            {
                return result.Error("Error al eliminar el rol");
            }
        }
        #endregion

        #region Usuarios
        public ServiceResult ListUsuarios()
        {
            var result = new ServiceResult();
            try
            {
                var list = _usuarioRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error("Error en la capa de servicio al listar usuarios");
            }
        }

        public ServiceResult LlenarUsuario(int Usua_Id)
        {
            var result = new ServiceResult();
            try
            {
                var usuario = _usuarioRepository.Find(Usua_Id);
                if (usuario != null)
                {
                    return result.Ok(usuario);
                }
                else
                {
                    return result.Error($"No se encontró el usuario con ID {Usua_Id}");
                }
            }
            catch (Exception ex)
            {
                return result.Error($"Error al buscar el usuario con ID {Usua_Id}");
            }
        }

        public ServiceResult UsuarioLogin(string Usua_Usuario , string Usua_Contra)
        {
            var result = new ServiceResult();
            try
            {
                var usuario = _usuarioRepository.Login(Usua_Usuario, Usua_Contra);
                if (usuario != null)
                {
                    return result.Ok(usuario);
                }
                else
                {
                    return result.Error($"No se encontró el usuario {Usua_Usuario}");
                }
            }
            catch (Exception ex)
            {
                return result.Error($"Error al buscar el usuario  {Usua_Usuario}");
            }
        }

        public ServiceResult CrearUsuario(tbUsuarios item)
        {
            var result = new ServiceResult();
            try
            {
                var response = _usuarioRepository.Insert(item);
                if (response.CodeStatus == 1)
                {
                    return result.Ok("Usuario creado con éxito", response);
                }
                else
                {
                    return result.Error("Por favor rellene todos los campos");
                }
            }
            catch (Exception ex)
            {
                return result.Error("Error al guardar la información del usuario");
            }
        }

        public ServiceResult EditarUsuario(tbUsuarios item)
        {
            var result = new ServiceResult();
            try
            {
                var response = _usuarioRepository.Update(item);
                if (response.CodeStatus > 0)
                {
                    return result.Ok("Usuario actualizado con éxito", response);
                }
                else
                {
                    return result.Error("No se pudo actualizar el usuario");
                }
            }
            catch (Exception ex)
            {
                return result.Error("Error al actualizar el usuario");
            }
        }

        public ServiceResult EliminarUsuario(int Usua_Id)
        {
            var result = new ServiceResult();
            try
            {
                var response = _usuarioRepository.Delete(Usua_Id);
                if (response.CodeStatus > 0)
                {
                    return result.Ok("Usuario eliminado con éxito", response);
                }
                else
                {
                    return result.Error("No se encontró el usuario a eliminar");
                }
            }
            catch (Exception ex)
            {
                return result.Error("Error al eliminar el usuario");
            }
        }
        #endregion

    }
}
