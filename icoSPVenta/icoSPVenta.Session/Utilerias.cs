using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using icoSPVenta.Datos.Conexion;
using icoSPVenta.Datos.Objetos;

namespace icoSPVenta.Session
{
  public class Utilerias
    {
      public static void InsertarObjeto(Type tipo, List<Campos> CamposInsertar)
      {
          Connection conn = new Connection(Session.CONNECTION_STRING);
          Base obj = System.Activator.CreateInstance(tipo, conn) as Base;
          conn.insertarObjeto(obj, CamposInsertar);
      }
      public static int ValidarObjeto(Type tipo, string Valor)
      {
          Connection conn = new Connection(Session.CONNECTION_STRING);
          Base obj = System.Activator.CreateInstance(tipo, conn) as Base;
         return conn.validarObjeto(obj, Valor);
      }
    
   
     

      private static string ToJSON(DataTable table)
      {
          System.Web.Script.Serialization.JavaScriptSerializer serializer = new

             System.Web.Script.Serialization.JavaScriptSerializer();
          List<Dictionary<string, object>> rows =
            new List<Dictionary<string, object>>();
          Dictionary<string, object> row = null;

          foreach (DataRow dr in table.Rows)
          {
              row = new Dictionary<string, object>();
              foreach (DataColumn col in table.Columns)
              {
                  if (dr[col] is System.DBNull)
                      row.Add(col.ColumnName.Trim(), "");
                  else
                      row.Add(col.ColumnName.Trim(), dr[col]);
              }
              rows.Add(row);
          }
          return serializer.Serialize(rows);
      }

      public static int ValidarNombreUsuario(string Valor)
      {
          int resultado = ValidarObjeto(typeof(Usuario), Valor);
          return resultado;
      }




      public static void InsertarUsuarios(string NombreUsuario, string ContrasenaUsuario, string Paterno, string Materno, string Nombre, bool Ventas, bool Administrar, bool Reportes, bool Catalogos, bool Consultas, bool DeshacerVenta)
      {
          List<Campos> CamposInsertar = new List<Campos>();
          CamposInsertar.Add(new Campos() { Campo = "NombreUsuario", Valor = NombreUsuario });
          CamposInsertar.Add(new Campos() { Campo = "ContrasenaUsuario", Valor = ContrasenaUsuario });
          CamposInsertar.Add(new Campos() { Campo = "Paterno", Valor = Paterno });
          CamposInsertar.Add(new Campos() { Campo = "Materno", Valor = Materno });
          CamposInsertar.Add(new Campos() { Campo = "Nombre", Valor = Nombre });
          CamposInsertar.Add(new Campos() { Campo = "Ventas", Valor = Ventas });
          CamposInsertar.Add(new Campos() { Campo = "Administrar", Valor = Administrar });
          CamposInsertar.Add(new Campos() { Campo = "Reportes", Valor = Reportes });
          CamposInsertar.Add(new Campos() { Campo = "Catalogos", Valor = Catalogos });
          CamposInsertar.Add(new Campos() { Campo = "Consultas", Valor = Consultas });
          CamposInsertar.Add(new Campos() { Campo = "DeshacerVenta", Valor = DeshacerVenta });

          InsertarObjeto(typeof(Usuario), CamposInsertar);
      }


      public static void InsertarCajas(int NumeroCaja, string Descripcion, bool Disponible, string NombreUsuario, bool Ticket)
      {
          List<Campos> CamposInsertar = new List<Campos>();
          CamposInsertar.Add(new Campos() { Campo = "NumeroCaja", Valor = NumeroCaja });
          CamposInsertar.Add(new Campos() { Campo = "Descripcion", Valor = Descripcion });
          CamposInsertar.Add(new Campos() { Campo = "Disponible", Valor = Disponible });
          CamposInsertar.Add(new Campos() { Campo = "NombreUsuario", Valor = NombreUsuario });
          CamposInsertar.Add(new Campos() { Campo = "Ticket", Valor = Ticket });
        

          InsertarObjeto(typeof(Usuario), CamposInsertar);
      }
    }
}
