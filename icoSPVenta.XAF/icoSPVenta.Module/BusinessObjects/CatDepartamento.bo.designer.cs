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
  public partial class CatDepartamento : XPObject
  {
    private System.String _descripcionDepartamento;
    public CatDepartamento(DevExpress.Xpo.Session session)
      : base(session)
    {
    }
    public System.String DescripcionDepartamento
    {
      get
      {
        return _descripcionDepartamento;
      }
      set
      {
        SetPropertyValue("DescripcionDepartamento", ref _descripcionDepartamento, value);
      }
    }
  }
}
