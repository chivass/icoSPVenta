using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using icoSPVenta.Datos.Conexion;

namespace icoSPVenta.Datos.Objetos
{
  public  class Base
    {
        public Base(Connection conn)
        {

        }

        private void Validate()
        {
            if (this.TableName() == "NoName")
                throw new NotImplementedException("Debe de implementar la funcion TableName para el tipo " + this.GetType().ToString());
        }
        public virtual string TableName()
        {
            return "NoName";
        }
        public virtual string CampoName()
        {
            return "NoName";
        }
        internal string CrearSqlValidar(string Valor)
        {
            string sql = "SELECT COUNT({0}) FROM {1} WHERE {2}='" + Valor+"'";
            sql = string.Format(sql, CampoName(), TableName(), CampoName());
            return sql;
        }
        public virtual string CrearSqlInsert(List<Campos> CamposInsertar)
        {
           
            Validate();
            string campos = "";
            string valores = "";


            foreach (Campos p in CamposInsertar)
            {
                campos = campos + p.Campo + ",";
                valores = valores + ToSQLValueFormat(p.Valor) + ",";
            }

            campos = campos.Substring(0, campos.Length - 1);
            valores = valores.Substring(0, valores.Length - 1);

            string sql = "INSERT INTO {0} ({1}) VALUES ({2})";
            sql = string.Format(sql, TableName(), campos, valores);

           


            return sql;
        }

        public string ToSQLValueFormat(object obj)
        {
            if (obj == null) return "null";
            string objType = obj.GetType().ToString();
            string strFormat = "null";
            switch (objType)
            {
                case "System.String":
                    strFormat = String.Format("'{0}'", obj);
                    break;
                case "System.Int32":
                    strFormat = obj.ToString();
                    break;
                case "System.Decimal":
                    strFormat = obj.ToString();
                    break;
                case "System.DateTime":
                    strFormat = String.Format("'{0:M/d/yyyy HH:mm:ss}'", obj);
                    break;
                case "System.Boolean":
                    strFormat = String.Format("'{0}'", obj);
                    break;
                default:
                    break;
            }

            return strFormat;
        }









       
    }
    public class Campos
    {
        public string Campo;
        public object Valor;
    }
    }

