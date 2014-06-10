using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using icoSPVenta.Datos.Objetos;

namespace icoSPVenta.Datos.Conexion
{
    public class Connection
    {

        SqlConnection _SQLConn;

        public Connection(string connectionString)
        {
            _connectionString = connectionString;
            _SQLConn = new SqlConnection(_connectionString);
            _SQLConn.Open();
        }

        private string _connectionString;

        public string ConnectionString
        {
            get { return _connectionString; }
        }

        List<Base> ObjectsToSave;


        public int validarObjeto(Base obj, string Valor)
        {
            SqlCommand cmd;
            int count = 0;
            string sql= obj.CrearSqlValidar(Valor);

            try
            {
                cmd = new SqlCommand(sql, _SQLConn);
                count = Convert.ToInt32(cmd.ExecuteScalar());
                cmd.Dispose();

            }
            catch { }
            return count;
        }
       
      

        public void insertarObjeto(Base obj, List<Campos> CamposInsertar)
        {
            SqlCommand cmd;
            int count = 0;
            string sql = obj.CrearSqlInsert(CamposInsertar);

            try
            {
                cmd = new SqlCommand(sql, _SQLConn);
               count = Convert.ToInt32(cmd.ExecuteScalar());
                cmd.Dispose();

            }
            catch { }
        }
        public DataTable obtenerColeccionObjeto(Base obj)
        {
            SqlCommand cmd;
            string sql = obj.CrearSqlObtenerColeccion();
            DataTable dataTable = null;
            try
            {
                cmd = new SqlCommand(sql, _SQLConn);
                SqlDataReader dataReader = cmd.ExecuteReader();

                dataTable = new DataTable();
                dataTable.Load(dataReader);

            }
            catch
            {
                return null;
            }
            dataTable.TableName = obj.TableName();
            return dataTable;
        }
        public DataTable obetenerObjeto(int OidObjeto, Base obj)
        {
            SqlCommand cmd;
            string sql = obj.CrearSqlObtener(OidObjeto);
            DataTable dataTable = null;
            try
            {
                cmd = new SqlCommand(sql, _SQLConn);
                SqlDataReader dataReader = cmd.ExecuteReader();

                dataTable = new DataTable();
                dataTable.Load(dataReader);

            }
            catch
            {
                return null;
            }
            dataTable.TableName = obj.TableName();
            return dataTable;
        }


      


     
        

        public void Close()
        {
        }













       
    }
}
