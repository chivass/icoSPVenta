using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using icoSPVenta.Datos.Conexion;

namespace icoSPVenta.Datos.Objetos
{
   public class Usuario : Base
    {

       public Usuario(Connection conn)
            : base(conn)
        {
        }
        public override string TableName()
        {
            return "icoSPVenta.dbo.Usuario";
        }
        public override string CampoName()
        {
            return "NombreUsuario";
        }
    }
}
