using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using icoSPVenta.Datos.Conexion;

namespace icoSPVenta.Datos.Objetos
{
   public class Caja : Base
    {
        public Caja(Connection conn)
            : base(conn)
        {
        }
        public override string TableName()
        {
            return "icoSPVenta.dbo.CatCajas";
        }
        public override string CampoName()
        {
            return "NumeroCaja";
        }
    }
}
