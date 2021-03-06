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
  public partial class CatProductos : XPObject
  {
    private System.Decimal _iVA;
    private System.Int32 _codigoProducto;
    private System.Decimal _precioUnitarioMayoreo;
    private System.Int32 _cantidadMinima;
    private icoSPVenta.Module.BusinessObjects.CatDepartamento _oidDepartamento;
    private System.Decimal _precioUnitarioVenta;
    private System.Decimal _precioUnitarioCompra;
    private System.Int32 _cantidad;
    private icoSPVenta.Module.BusinessObjects.CatUnidadMedida _oidUnidadMedida;
    private System.String _descripcionProducto;
    public CatProductos(DevExpress.Xpo.Session session)
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
    public System.String DescripcionProducto
    {
      get
      {
        return _descripcionProducto;
      }
      set
      {
        SetPropertyValue("DescripcionProducto", ref _descripcionProducto, value);
      }
    }
    public icoSPVenta.Module.BusinessObjects.CatUnidadMedida OidUnidadMedida
    {
      get
      {
        return _oidUnidadMedida;
      }
      set
      {
        SetPropertyValue("OidUnidadMedida", ref _oidUnidadMedida, value);
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
    public System.Decimal PrecioUnitarioCompra
    {
      get
      {
        return _precioUnitarioCompra;
      }
      set
      {
        SetPropertyValue("PrecioUnitarioCompra", ref _precioUnitarioCompra, value);
      }
    }
    public System.Decimal PrecioUnitarioVenta
    {
      get
      {
        return _precioUnitarioVenta;
      }
      set
      {
        SetPropertyValue("PrecioUnitarioVenta", ref _precioUnitarioVenta, value);
      }
    }
    public icoSPVenta.Module.BusinessObjects.CatDepartamento OidDepartamento
    {
      get
      {
        return _oidDepartamento;
      }
      set
      {
        SetPropertyValue("OidDepartamento", ref _oidDepartamento, value);
      }
    }
    public System.Int32 CantidadMinima
    {
      get
      {
        return _cantidadMinima;
      }
      set
      {
        SetPropertyValue("CantidadMinima", ref _cantidadMinima, value);
      }
    }
    public System.Decimal IVA
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
    public System.Decimal PrecioUnitarioMayoreo
    {
      get
      {
        return _precioUnitarioMayoreo;
      }
      set
      {
        SetPropertyValue("PrecioUnitarioMayoreo", ref _precioUnitarioMayoreo, value);
      }
    }
  }
}
