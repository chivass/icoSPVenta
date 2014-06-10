using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;

namespace icoSPVenta.WS.Pages
{
    /// <summary>
    /// Descripción breve de icoSPVentaWS
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
    [System.Web.Script.Services.ScriptService]
    public class icoSPVentaWS : System.Web.Services.WebService
    {
        #region Usuarios
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string InsertarUsuarios(string NombreUsuario,string ContrasenaUsuario,string Paterno,string Materno,string Nombre,bool Ventas, bool Administrar, bool Reportes, bool Catalogos,bool Consultas, bool DeshacerVenta)
        {
            if (icoSPVenta.Session.Utilerias.ValidarNombreUsuario(NombreUsuario)>=1)
            {
                return "Usuario ya existe";
            }
            icoSPVenta.Session.Utilerias.InsertarUsuarios(NombreUsuario, ContrasenaUsuario, Paterno, Materno, Nombre, Ventas, Administrar, Reportes, Catalogos, Consultas,DeshacerVenta);
            return "1";

        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string ObtenerUsuarios()
        {

            string Resultado = icoSPVenta.Session.Utilerias.ObtenerUsuarios();

            return Resultado;
        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string ObtenerUsuario(int OidUsuario)
        {

            string Resultado = icoSPVenta.Session.Utilerias.ObtenerUsuario(OidUsuario);

            return Resultado;
        }
        #endregion


        #region Cajas

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string InsertarCajas(int NumeroCaja, string Descripcion, bool Disponible, string NombreUsuario, bool Ticket)
        {
            //if (icoSPVenta.Session.Utilerias.ValidarNombreUsuario(NombreUsuario) >= 1)
            //{
            //    return "Usuario ya existe";
            //}
            icoSPVenta.Session.Utilerias.InsertarCajas(NumeroCaja, Descripcion, Disponible, NombreUsuario, Ticket);
            return "1";

        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string ObtenerCajas()
        {

            string Resultado = icoSPVenta.Session.Utilerias.ObtenerCajas();

            return Resultado;
        }
        #endregion

        //apurate perro 
     
    }
}
