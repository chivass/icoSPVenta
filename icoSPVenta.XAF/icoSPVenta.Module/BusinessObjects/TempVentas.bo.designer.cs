//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DevExpress.ExpressApp.DC;
using DevExpress.Persistent.Base;
using DevExpress.Persistent.BaseImpl;
using DevExpress.Xpo;
namespace icoSPVenta.Module.BusinessObjects
{
  [DefaultClassOptions]
  public partial class TempVentas : XPObject
  {
    private System.Decimal _precioUnitario;
    private System.Int32 _iVA;
    private System.Int32 _cantidad;
    private System.Int32 _codigoProducto;
    private System.String _nombreUsuario;
    public TempVentas(DevExpress.Xpo.Session session)
      : base(session)
    {
    }
    public System.Int32 CodigoProducto
    {
      get
      {
        return _codigoProducto;
      }
      set
      {
        SetPropertyValue("CodigoProducto", ref _codigoProducto, value);
      }
    }
    public System.String NombreUsuario
    {
      get
      {
        return _nombreUsuario;
      }
      set
      {
        SetPropertyValue("NombreUsuario", ref _nombreUsuario, value);
      }
    }
    public System.Int32 Cantidad
    {
      get
      {
        return _cantidad;
      }
      set
      {
        SetPropertyValue("Cantidad", ref _cantidad, value);
      }
    }
    public System.Decimal PrecioUnitario
    {
      get
      {
        return _precioUnitario;
      }
      set
      {
        SetPropertyValue("PrecioUnitario", ref _precioUnitario, value);
      }
    }
    public System.Int32 IVA
    {
      get
      {
        return _iVA;
      }
      set
      {
        SetPropertyValue("IVA", ref _iVA, value);
      }
    }
  }
}
