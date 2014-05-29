
function ConvertirFecha(tdate) {

    var fecha = new Date(parseInt(tdate.substring(tdate.indexOf('(') + 1, tdate.indexOf(')'))))
    var yyyy = fecha.getFullYear().toString();
    var mm = (fecha.getMonth() + 1).toString(); // getMonth() is zero-based         
    var dd = fecha.getDate().toString();

    if (mm <= 9) { mm = "0" + mm };
    if (dd <= 9) { dd = "0" + dd };

    return (yyyy+"-"+mm+"-" + dd  );
};
function ObtenerHoras(tdate) {

    var fecha = new Date(parseInt(tdate.substring(tdate.indexOf('(') + 1, tdate.indexOf(')'))))
   
    var hora = fecha.getHours();
   
    if (hora <= 9) hora = "0" + hora;
    return hora;
};
function ObtenerMinutos(tdate) {

    var fecha = new Date(parseInt(tdate.substring(tdate.indexOf('(') + 1, tdate.indexOf(')'))))
    var minutos = fecha.getMinutes();

    if (minutos <= 9) minutos = "0" + minutos;
    return minutos;
};



var wsAddress = 'icoSPVentaWS.asmx/';

var WS = {
    InsertarAfanadora: 'InsertarAfanadora',
    ObtenerAfanadoras: 'ObtenerAfanadoras',
    ObtenerAfanadora:'ObtenerAfanadora',
    ModificarAfanadora: 'ModificarAfanadora',
    ObtenerEnfermeria: 'ObtenerEnfermeria',
    ObtenerMedicos: 'ObtenerMedicos',
    ObtenerQuirofanos: 'ObtenerQuirofanos',
    ObtenerCirugias: 'ObtenerCirugias',
    ObtenerCirugia: 'ObtenerCirugia',
    InsertarCirugia: 'InsertarCirugia',
    ModificarCirugia: 'ModificarCirugia',
    ObtenerEnfermero: 'ObtenerEnfermero',
    InsertarEnfermeria: 'InsertarEnfermeria',
    ModificarEnfermeria: 'ModificarEnfermeria',
    InsertarMedico:'InsertarMedico',
    ObtenerMedico: 'ObtenerMedico',
    ModificarMedico: 'ModificarMedico',
    InsertarQuirofano: 'InsertarQuirofano',
    ModificarQuirofano: 'ModificarQuirofano',
    ObtenerQuirofano: 'ObtenerQuirofano',
    ObtenerProgramaciones: 'ObtenerProgramaciones',
    ObtenerProgramacion: 'ObtenerProgramacion',
    InsertarProgramacion: 'InsertarProgramacion',
    ModificarProgramacion: 'ModificarProgramacion',
    ObtenerProgramacionPorFecha:'ObtenerProgramacionPorFecha',
};
var ObjetAfanadora = {
Oid:0
};
var ObjetEnfermeria = {
    Oid: 0
};
var ObjetCirugia = {
    Oid: 0
};
var ObjetEnfermeria = {
    Oid: 0
};
var ObjetMedico = {
    Oid: 0
};
var ObjetQuirofano = {
    Oid: 0
};
var ObjetProgramacion = {
    Oid: 0
};
var Detalles = {
    Nombre: 0
};
//Variables en memoria






function ObtenerDatosWS(params, WS,funcion) {

        $.ajax({
        type: 'POST',
        crossDomain: true,
        url: wsAddress  + WS,
        data: JSON.stringify(params),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (datos) {
            if (datos.d == 0) {
                //$.mobile.changePage("#pageone", { transition: 'pop', role: 'dialog' }); return;
            }
            try
            {
                eval(funcion + '(jQuery.parseJSON(datos.d))');
            }
            catch(err)
            {
                
                eval(funcion + '(datos.d)');
            }

        },
        error: AjaxError
        }); 
}
function InsertarDatosWs(params, WS) {
    $.ajax({
        type: 'POST',
        asyn:true,
        crossDomain: true,
        url: wsAddress + WS,
        data: JSON.stringify(params),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (msg) {
            if (WS == "InsertarProgramacion");
            {
                ValidarQuirofano(msg);
            }
        },
        error: AjaxError
    });

}
function ObtenerDatosWSsinParametros(WS, funcion) {
    $.ajax({
        type: 'POST',
        crossDomain: true,
       
        url: wsAddress + WS,
        data: '{}',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (datos) {
            //if (datos.d == 0) {
            //    //$.mobile.changePage("#pageone", { transition: 'pop', role: 'dialog' }); return;
            //}
            
            try
            {
                eval(funcion + '(jQuery.parseJSON(datos.d))');
            }
            catch (err) {
                

                eval(funcion + '(datos.d)');
            }

        },
        error: AjaxError
    });
}
function AjaxError(result) {
    alert("ERROR " + result.status + ' ' + result.statusText);
}




//pagi home
$(document).bind("mobileinit", function () {
    $.support.cors = true;
    $.mobile.allowCrossDomainPages = true;
    $.mobile.pushStateEnabled = false;
});
$(document).ready(function () {
  
});


//pagina afanadora
$('#afanadora').bind('pagebeforeshow',
            function () {
                ObtenerDatosWSsinParametros(WS.ObtenerAfanadoras, "CargarAfanadoras");
                
            });

function CargarAfanadoras(Lista) {
    $('#ListaAfanadoras').empty();
    $.each(Lista, function (i, item) {
        $('#ListaAfanadoras').append('<li><a  href="javascript:AbrirDetallesAfanadora(' + Lista[i].OID + ');" data-rel="dialog">' + Lista[i].Nombre + '</a></li>').listview('refresh');
    });

}
function AbrirDetallesAfanadora(OID) {
    ObjetAfanadora.Oid = OID;
    $.mobile.changePage("#DetallesAfanadora", { transition: 'pop', role: 'dialog' });

}

//pagina detallesafanadora
$('#DetallesAfanadora').bind('pagebeforeshow',
            function () {
                
                if (ObjetAfanadora.Oid < 0) {
                    $('#txtNombreAfanadora').val("");
                    $('#txtTelefonoAfanadora').val("");
                    $('#txtFechaNacimientoAfanadora').val("");
                    $('#txtCorreoAfanadora').val("");
                  
                }
                else {
                    var prams = { OidAfanadora: ObjetAfanadora.Oid };
                    ObtenerDatosWS(prams, WS.ObtenerAfanadora, "CargarAfanadora");
                }
            });
function CargarAfanadora(Objeto) {
  
        $('#txtNombreAfanadora').val(Objeto[0].Nombre);
        $('#txtTelefonoAfanadora').val(Objeto[0].Telefono);
        $('#txtFechaNacimientoAfanadora').val(ConvertirFecha(Objeto[0].FechaNacimiento));
        $('#txtCorreoAfanadora').val(Objeto[0].Correo);
        ObjetAfanadora.Oid = Objeto[0].OID;
    
}





/** BOTON DE GRABAR afanadora **/
$("#btnGrabarAfanadora").click(function (event) {

    if (ObjetAfanadora.Oid > 0) {
        var params = {
            OidAfanadora: ObjetAfanadora.Oid,
            Nombre: $('#txtNombreAfanadora').val(),
            Telefono: $('#txtTelefonoAfanadora').val(),
            FechaNacimiento: $('#txtFechaNacimientoAfanadora').val(),
            Correo: $('#txtCorreoAfanadora').val(),

        };

        InsertarDatosWs(params, WS.ModificarAfanadora);
        
    }
    else {

        var params = {
            Nombre: $('#txtNombreAfanadora').val(),
            Telefono: $('#txtTelefonoAfanadora').val(),
            FechaNacimiento: $('#txtFechaNacimientoAfanadora').val(),
            Correo: $('#txtCorreoAfanadora').val(),

        };

        InsertarDatosWs(params, WS.InsertarAfanadora);
    }
    
});


//pagina Enfermeria
$('#enfermeria').bind('pagebeforeshow',
            function () {
                ObtenerDatosWSsinParametros(WS.ObtenerEnfermeria, "CargarEnfermeria");
                ObjetEnfermeria.Oid = 0;
            });

function CargarEnfermeria(Lista) {
    $('#ListaEnfermeria').empty();
    $.each(Lista, function (i, item) {
        $('#ListaEnfermeria').append('<li><a  href="javascript:AbrirDetallesEnfermeria(' + Lista[i].OID + ');" data-rel="dialog">' + Lista[i].Nombre + '</a></li>').listview('refresh');
    });
}

//pagina detallesenfermeria
$('#DetallesEnfermeria').bind('pagebeforeshow',
            function () {

                if (ObjetEnfermeria.Oid < 0) {
                    $('#txtNombreEnfermeria').val("");
                    $('#txtFechaNacimientoEnfermeria').val("");
                    $('#txtTelefonoEnfermeria').val("");
                    $('#txtEspecialidadEnfermeria').val("");
                    $('#txtCorreoEnfermeria').val("");
                }
                else {
                    var prams = { OidEnfermeria: ObjetEnfermeria.Oid };
                    ObtenerDatosWS(prams, WS.ObtenerEnfermero, "CargaEnfermero");
                }

            });

function CargaEnfermero(Objeto) {
   
    $('#txtEspecialidadCirugia').val(Objeto[0].Especialidad);
    $('#txtNombreEnfermeria').val(Objeto[0].Nombre);
    $('#txtFechaNacimientoEnfermeria').val(ConvertirFecha(Objeto[0].FechaNacimiento));
    $('#txtTelefonoEnfermeria').val(Objeto[0].Telefono);
    $('#txtEspecialidadEnfermeria').val(Objeto[0].Especialidad);
    $('#txtCorreoEnfermeria').val(Objeto[0].Correo);
}
function AbrirDetallesEnfermeria(OID) {
    ObjetEnfermeria.Oid = OID;
    $.mobile.changePage("#DetallesEnfermeria", { transition: 'pop', role: 'dialog' });

}
$("#btnGrabaraEnfermeria").click(function (event) {

    if (ObjetEnfermeria.Oid < 0) {
        var params = {

            
           Nombre : $('#txtNombreEnfermeria').val(),
            FechaNacimiento: $('#txtFechaNacimientoEnfermeria').val(),
            Telefono:   $('#txtTelefonoEnfermeria').val(),
            Especialidad: $('#txtEspecialidadEnfermeria').val(),
            Correo: $('#txtCorreoEnfermeria').val(),


        };

        InsertarDatosWs(params, WS.InsertarEnfermeria);

    }
    else {

        var params = {
            OidEnfermeria: ObjetEnfermeria.Oid,
            Nombre: $('#txtNombreEnfermeria').val(),
            FechaNacimiento: $('#txtFechaNacimientoEnfermeria').val(),
            Telefono: $('#txtTelefonoEnfermeria').val(),
            Especialidad: $('#txtEspecialidadEnfermeria').val(),
            Correo: $('#txtCorreoEnfermeria').val(),


        };

        InsertarDatosWs(params, WS.ModificarEnfermeria);
    }

});









//pagina Medicos
$('#medicos').bind('pagebeforeshow',
            function () {
                ObtenerDatosWSsinParametros(WS.ObtenerMedicos, "CargarMedicos");
                ObjetEnfermeria.Oid = 0;
            });

function CargarMedicos(Lista) {
    $('#ListaMedicos').empty();
    $.each(Lista, function (i, item) {
        $('#ListaMedicos').append('<li><a  href="javascript:AbrirDetallesMedico(' + Lista[i].OID + ');" data-rel="dialog">' + Lista[i].Nombre + '</a></li>').listview('refresh');
    });
}

//pagina detallesedico
$('#DetallesMedico').bind('pagebeforeshow',
            function () {
                ResetControlesMedico();
                if (ObjetMedico.Oid < 0) {
                    $('#txtNombreMedico').val("");
                    $('#txtFechaNacimientoMedico').val("");
                    $('#txtTelefonoMedico').val("");
                    $('#txtEspecialidadMedico').val("");
                    $('#txtCedulaMedico').val("");
                    $('#txtCorreoMedico').val("");
                }
                else {
                    var prams = { OidMedico: ObjetMedico.Oid };
                    ObtenerDatosWS(prams, WS.ObtenerMedico, "CargaMedico");
                }

            });

function CargaMedico(Objeto) {

    
    $('#txtNombreMedico').val(Objeto[0].Nombre);
    $('#txtFechaNacimientoMedico').val(ConvertirFecha(Objeto[0].FechaNacimiento));
    $('#txtTelefonoMedico').val(Objeto[0].Telefono);
    $('#txtEspecialidadMedico').val(Objeto[0].Especialidad);
    $('#txtCorreoMedico').val(Objeto[0].Correo);
    $('#txtCedulaMedico').val(Objeto[0].Cedula);
}


function AbrirDetallesMedico(OID) {
    ObjetMedico.Oid = OID;
    $.mobile.changePage("#DetallesMedico", { transition: 'pop', role: 'dialog' });

}

$("#btnGrabarMedico").click(function (event) {
    var errors = ValidarMedico();
    if (errors > 0) {
        $("#erroresmedicos").text("Tienes " + errors + " errores, por favor llena todo los campos correctamente");
        $("#erroresmedicos").addClass("errortext");
        return false;
    }
    if (ObjetMedico.Oid < 0) {
        var params = {


            Nombre: $('#txtNombreMedico').val(),
            FechaNacimiento: $('#txtFechaNacimientoMedico').val(),
            Telefono: $('#txtTelefonoMedico').val(),
            Cedula: $('#txtCedulaMedico').val(),
            Especialidad: $('#txtEspecialidadMedico').val(),
            Correo: $('#txtCorreoMedico').val(),


        };

        InsertarDatosWs(params, WS.InsertarMedico);

    }
    else {

        var params = {
            OidMedico: ObjetMedico.Oid,
            Nombre: $('#txtNombreMedico').val(),
            FechaNacimiento: $('#txtFechaNacimientoMedico').val(),
            Telefono: $('#txtTelefonoMedico').val(),
            Especialidad: $('#txtEspecialidadMedico').val(),
            Correo: $('#txtCorreoMedico').val(),
            Cedula: $('#txtCedulaMedico').val(),


        };

        InsertarDatosWs(params, WS.ModificarMedico);
    }

});

function ValidarMedico() {


    var errors = 0;
    var v_telefono = /^[0-9]{2,3}-? ?[0-9]{6,7}$/

    if ($('#txtCedulaMedico').val() == "") {
        document.getElementById("txtCedulaMedico").style.border = "3px solid red";
        errors++;
    }
    else {
        document.getElementById("txtCedulaMedico").style.border = "";
    }
    if ($('#txtNombreMedico').val() == "") {
        document.getElementById("txtNombreMedico").style.border = "3px solid red";
        errors++;
    }
    else {
        document.getElementById("txtNombreMedico").style.border = "";
    }
    if ($('#txtFechaNacimientoMedico').val() == "") {
        document.getElementById("txtFechaNacimientoMedico").style.border = "3px solid red";
        errors++;
    }
    else {
        document.getElementById("txtFechaNacimientoMedico").style.border = "";
    }

    if ($('#txtFechaNacimientoMedico').val() == "") {
        document.getElementById("txtFechaNacimientoMedico").style.border = "3px solid red";
        errors++;
    }
    else {
        document.getElementById("txtFechaNacimientoMedico").style.border = "";
    }
    if (!v_telefono.test($('#txtTelefonoMedico').val())) {
        document.getElementById("txtTelefonoMedico").style.border = "3px solid red";
        errors++;
    }
    else {
        document.getElementById("txtTelefonoMedico").style.border = "";
    }

    return errors;
}
function ResetControlesMedico() {

    $("#erroresmedicos").text("");
    document.getElementById("txtNombreMedico").style.border = "";
    document.getElementById("txtCedulaMedico").style.border = "";
    document.getElementById("txtFechaNacimientoMedico").style.border = "";
}










//pagina quirofanos
$('#quirofano').bind('pagebeforeshow',
            function () {
                ObtenerDatosWSsinParametros(WS.ObtenerQuirofanos, "CargarQuirofano");
                ObjetEnfermeria.Oid = 0;
            });

function CargarQuirofano(Lista) {
    $('#ListaQuirofano').empty();
    $.each(Lista, function (i, item) {
        $('#ListaQuirofano').append('<li><a  href="javascript:AbrirDetallesQuirofano(' + Lista[i].OID + ');" data-rel="dialog">' + Lista[i].Nombre + '</a></li>').listview('refresh');
    });
}


//pagina detallesquirofano
$('#DetallesQuirofano').bind('pagebeforeshow',
            function () {
                ResetControlesQuirofano();
                if (ObjetQuirofano.Oid < 0) {
                    $('#txtNombreQuirofano').val("");
                   
                }
                else {
                    var prams = { OidQuirofano: ObjetQuirofano.Oid };
                    ObtenerDatosWS(prams, WS.ObtenerQuirofano, "CargaQuirofano");
                }

            });

function CargaQuirofano(Objeto) {
    $('#txtNombreQuirofano').val(Objeto[0].Nombre);
 
}
function AbrirDetallesQuirofano(OID) {
    ObjetQuirofano.Oid = OID;
    $.mobile.changePage("#DetallesQuirofano", { transition: 'pop', role: 'dialog' });

}
$("#btnGrabaQuirofano").click(function (event) {
    var errors = ValidarQuirofanoo();
    if (errors > 0) {
        $("#erroresquierofano").text("Tienes " + errors + " errores, por favor llena todo los campos correctamente");
        $("#erroresquierofano").addClass("errortext");
        return false;
    }
    if (ObjetQuirofano.Oid < 0) {
        var params = {

            Nombre: $('#txtNombreQuirofano').val(),
         


        };

        InsertarDatosWs(params, WS.InsertarQuirofano);

    }
    else {

        var params = {
            OidQuirofan: ObjetQuirofano.Oid,
            Nombre: $('#txtNombreQuirofano').val(),
            


        };

        InsertarDatosWs(params, WS.ModificarQuirofano);
    }

});

function ValidarQuirofanoo() {


    var errors = 0;
    

    if ($('#txtNombreQuirofano').val() == "") {
        document.getElementById("txtNombreQuirofano").style.border = "3px solid red";
        errors++;
    }
    else {
        document.getElementById("txtNombreQuirofano").style.border = "";
    }
  
    return errors;
}
function ResetControlesQuirofano() {

    $("#erroresquierofano").text("");
    document.getElementById("txtNombreQuirofano").style.border = "";

}








//pagina cirugias
$('#cirugia').bind('pagebeforeshow',
            function () {
                ObtenerDatosWSsinParametros(WS.ObtenerCirugias, "CargarCirugias");
                ObjetEnfermeria.Oid = 0;
            });

function CargarCirugias(Lista) {
    $('#ListaCirugias').empty();
    $.each(Lista, function (i, item) {
        $('#ListaCirugias').append('<li><a  href="javascript:AbrirDetallesCirugia(' + Lista[i].OID + ');" data-rel="dialog">' + Lista[i].Nombre + '</a></li>').listview('refresh');
    });
}

//pagina detallesacirugia
$('#DetallesCirugia').bind('pagebeforeshow',
function () {

    ResetControlesCirugia();
                if (ObjetCirugia.Oid < 0) {
                    $('#txtNombreCirugia').val("");
                    $('#txtEspecialidadCirugia').val("");
                }
                else {
                    var prams = {OidCirugia:ObjetCirugia.Oid};
                    ObtenerDatosWS(prams, WS.ObtenerCirugia, "CargaCirugia");
                }

            });

function CargaCirugia(Objeto) {
    $('#txtNombreCirugia').val(Objeto[0].Nombre);
    $('#txtEspecialidadCirugia').val(Objeto[0].Especialidad);
}

function AbrirDetallesCirugia(OID) {
    ObjetCirugia.Oid = OID;
    $.mobile.changePage("#DetallesCirugia", { transition: 'pop', role: 'dialog' });
    
}

$("#btnGrabaCirugia").click(function (event) {
    var errors = ValidarCirugia();
    if (errors > 0) {
        $("#erorresCirugia").text("Tienes " + errors + " errores, por favor llena todo los campos correctamente");
        $("#erorresCirugia").addClass("errortext");
        return false;
    }

    if (ObjetCirugia.Oid < 0) {
        var params = {
            
            Nombre: $('#txtNombreCirugia').val(),
            Especialidad: $('#txtEspecialidadCirugia').val(),
      

        };

        InsertarDatosWs(params, WS.InsertarCirugia);

    }
    else {

        var params = {
            OidACirugia:ObjetCirugia.Oid,
            Nombre: $('#txtNombreCirugia').val(),
            Especialidad: $('#txtEspecialidadCirugia').val(),
            

        };

        InsertarDatosWs(params, WS.ModificarCirugia);
    }

});
function ValidarCirugia() {


    var errors = 0;

    if ($('#txtNombreCirugia').val() == "") {
        document.getElementById("txtNombreCirugia").style.border = "3px solid red";
        errors++;
    }
    else {
        document.getElementById("txtNombreCirugia").style.border = "";
    }



    return errors;
}
function ResetControlesCirugia() {

    $("#erorresCirugia").text("");
    document.getElementById("txtHoraProgramacion").style.border = "";
    document.getElementById("txtNombreCirugia").style.border = "";

}

//pagina programacion
$('#programacion').bind('pagebeforeshow',
            function () {
                ObtenerDatosWSsinParametros(WS.ObtenerProgramaciones, "CargarProgramacion");
               
            });

function CargarProgramacion(Lista) {
    $('#ListaProgramacion').empty();
    $('#ListaProgramacion').append('<li data-icon="none" data-theme="b"><a href="" ><div class="Fecha">Fecha</div><div class="Hora">Hora</div><div class="Quirofano">Quirofano</div><div class="Cirujano">Cirujano</div><div class="Duracion">Duraccion</div><div class="Duracion">Cirugia</div></a></li>').listview('refresh');
    $.each(Lista, function (i, item) {

        if (Lista[i].Quirofano == "") var Quirofano = "Sin seleccionar"; else Quirofano = Lista[i].Quirofano;
        if (Lista[i].Cirugia == "") var Cirugia = "Sin seleccionar"; else Cirugia = Lista[i].Cirugia;
        if (Lista[i].Cirujano == "") var Cirujano = "Sin seleccionar"; else Cirujano = Lista[i].Cirujano;

        $('#ListaProgramacion').append('<li><a  href="javascript:AbrirDetallesProgramacion(' + Lista[i].OID + ');" data-rel="dialog"><div class="Fecha">' + ConvertirFecha(Lista[i].FechayHora) + ' </div><div class="Hora">' + ObtenerHoras(Lista[i].FechayHora) + ':' + ObtenerMinutos(Lista[i].FechayHora) + '</div><div class="Quirofano">' + Quirofano + '</div><div class="Cirujano">' + Cirujano + '</div><div class="Duracion">' + Lista[i].TiempoDeCirugia + ' Horas</div><div class="Duracion">' + Cirugia + '</div></a></li>').listview('refresh');
    });
}
function AbrirDetallesProgramacion(OID) {
    ObjetProgramacion.Oid = OID;
    $.mobile.changePage("#DetallesProgramacion", { transition: 'pop', role: 'dialog' });

}

//pagina detallesprogramacion
$('#DetallesProgramacion').bind('pagebeforeshow',
            function () {
                ResetControles();
                $("#errorProgramacion").text("");
                document.getElementById("txtHoraProgramacion").style.border = "";
                if (ObjetProgramacion.Oid < 0) {
                    if (ObjetProgramacion.Oid == 0) {
                        $('#txtFechaProgramacion').val("");
                        $('#txtHoraProgramacion').val("");
                        $('#txtTiempo').val("");
                        $('#txtNombrePaciente').val("");
                        $('#txtFechaNacimientoPaciente').val("");
                        $('#txtCirugia').val("");
                        $('#txtQuirofano').val("");
                        $('#txtCirujano').val("");
                        $('#txtAnestesia').val("");
                        $('#txtAyudante1').val("");
                        $('#txtAyudante2').val("");
                        $('#txtAyudante3').val("");
                        $('#txtInstrumentista').val("");
                        $('#txtCirculante1').val("");
                        $('#txtCirculante2').val("");
                        $('#txtAfanadora').val("");
                    }
                    
                }
                else {
                    var prams = { OidProgramacion: ObjetProgramacion.Oid };
                    ObtenerDatosWS(prams, WS.ObtenerProgramacion, "CargaProgramacion");
                }

            });

function CargaProgramacion(Objeto) {
    var hora = ObtenerHoras(Objeto[0].FechayHora) + ":" + ObtenerMinutos(Objeto[0].FechayHora);

    $('#txtFechaProgramacion').val(ConvertirFecha(Objeto[0].FechayHora));
    $('#txtHoraProgramacion').val(hora);
    $('#txtTiempo').val(Objeto[0].TiempoDeCirugia);
    $('#txtNombrePaciente').val(Objeto[0].NombrePaciente);
    $('#txtFechaNacimientoPaciente').val(ConvertirFecha(Objeto[0].FechaNacimientoPaciente));
    $('#txtCirugia').val(Objeto[0].Cirugia);
    $('#txtQuirofano').val(Objeto[0].Quirofano);
    $('#txtCirujano').val(Objeto[0].Cirujano);
    $('#txtAnestesia').val(Objeto[0].Anestesia);
    $('#txtAyudante1').val(Objeto[0].Ayudante1);
    $('#txtAyudante2').val(Objeto[0].Ayudante2);
    $('#txtAyudante3').val(Objeto[0].Ayudante3);
    $('#txtInstrumentista').val(Objeto[0].Instrumentista);
    $('#txtCirculante1').val(Objeto[0].Circulante);
    $('#txtCirculante2').val(Objeto[0].Circulante2);
    $('#txtAfanadora').val(Objeto[0].Afanadora);
}

$("#btnGrabaProgramacion").click(function (event) {

    var errors = ValidarProgramacion();
    if (errors > 0) {
        $("#errorProgramacion").text("Tienes " + errors + " errores, por favor llena todo los campos correctamente");
        $("#errorProgramacion").addClass("errortext");
        return false;
    }

    if (ObjetProgramacion.Oid <= 0) {
        var params = {

            FechayHora:$('#txtFechaProgramacion').val()+" "+$('#txtHoraProgramacion').val(),
            
            TiempoDeCirugia:$('#txtTiempo').val(),
            NombrePaciente: $('#txtNombrePaciente').val(),
            FechaNacimientoPaciente: $('#txtFechaNacimientoPaciente').val(),
        Cirugia:$('#txtCirugia').val(),
       Quirofano: $('#txtQuirofano').val(),
      Cirujano:  $('#txtCirujano').val(),
       Anestesia: $('#txtAnestesia').val(),
       Ayudante1: $('#txtAyudante1').val(),
       Ayudante2: $('#txtAyudante2').val(),
       Ayudante3: $('#txtAyudante3').val(),
       Instrumentista: $('#txtInstrumentista').val(),
       Circulante1: $('#txtCirculante1').val(),
       Circulante2: $('#txtCirculante2').val(),
       Afanadora: $('#txtAfanadora').val(),


        };

        InsertarDatosWs(params, WS.InsertarProgramacion);

    }
    else {

        var params = {
            OidProgramacion: ObjetProgramacion.Oid,

            FechayHora: $('#txtFechaProgramacion').val() + " " + $('#txtHoraProgramacion').val(),

            TiempoDeCirugia: $('#txtTiempo').val(),
            NombrePaciente: $('#txtNombrePaciente').val(),
            FechaNacimientoPaciente: $('#txtFechaNacimientoPaciente').val(),
            Cirugia: $('#txtCirugia').val(),
            Quirofano: $('#txtQuirofano').val(),
            Cirujano: $('#txtCirujano').val(),
            Anestesia: $('#txtAnestesia').val(),
            Ayudante1: $('#txtAyudante1').val(),
            Ayudante2: $('#txtAyudante2').val(),
            Ayudante3: $('#txtAyudante3').val(),
            Instrumentista: $('#txtInstrumentista').val(),
            Circulante1: $('#txtCirculante1').val(),
            Circulante2: $('#txtCirculante2').val(),
            Afanadora: $('#txtAfanadora').val(), Nombre: $('#txtNombreCirugia').val(),
            Especialidad: $('#txtEspecialidadCirugia').val(),


        };

        InsertarDatosWs(params, WS.ModificarProgramacion);
    }

});
function ValidarProgramacion() {

  
    var errors = 0;

    if ($('#txtFechaProgramacion').val() == "") {
        document.getElementById("txtFechaProgramacion").style.border = "3px solid red";
        errors++;
    }
    else {
        document.getElementById("txtFechaProgramacion").style.border = "";
    }

    if ($('#txtHoraProgramacion').val() == "") {
        document.getElementById("txtHoraProgramacion").style.border = "3px solid red";
        errors++;
    }
    else {
        document.getElementById("txtHoraProgramacion").style.border = "";
    }
    if ($('#txtTiempo').val() == "") {
        document.getElementById("txtTiempo").style.border = "3px solid red";
        errors++;
    }
    else {
        document.getElementById("txtTiempo").style.border = "";
    }
    if ($('#txtNombrePaciente').val() == "") {
        document.getElementById("txtNombrePaciente").style.border = "3px solid red";
        errors++;
    }
    else {
        document.getElementById("txtNombrePaciente").style.border = "";
    }
    if ($('#txtCirugia').val() == "") {
        document.getElementById("txtCirugia").style.border = "3px solid red";
        errors++;
    }
    else {
        document.getElementById("txtCirugia").style.border = "";
    }
    if ($('#txtQuirofano').val() == "") {
        document.getElementById("txtQuirofano").style.border = "3px solid red";
        errors++;
    }
    else {
        document.getElementById("txtQuirofano").style.border = "";
    }
    if ($('#txtCirujano').val() == "") {
        document.getElementById("txtCirujano").style.border = "3px solid red";
        errors++;
    }
    else {
        document.getElementById("txtCirujano").style.border = "";
    }

    return errors;
}
function ResetControles() {

  
    document.getElementById("txtCirujano").style.border = "";
    document.getElementById("txtQuirofano").style.border = "";
    document.getElementById("txtCirugia").style.border = "";
    document.getElementById("txtNombrePaciente").style.border = "";
    document.getElementById("txtHoraProgramacion").style.border = "";
    document.getElementById("txtFechaProgramacion").style.border = "";
    document.getElementById("txtTiempo").style.border = "";

}
function AbrirDetalles(NombreDetalle) {
    $('.NombreDetalle').text(NombreDetalle);
    Detalles.Nombre = NombreDetalle
    $.mobile.changePage("#Detalles", { transition: 'pop', role: 'dialog' });

}

//pagina detalles
$('#Detalles').bind('pagebeforeshow',
            function () {
                if (Detalles.Nombre == "Anestesia" || Detalles.Nombre == "Ayudante1" || Detalles.Nombre == "Ayudante2" || Detalles.Nombre == "Ayudante3" || Detalles.Nombre == "Instrumentista" || Detalles.Nombre == "Circulante1" || Detalles.Nombre == "Circulante2") {
                    ObtenerDatosWSsinParametros("ObtenerEnfermeria", "CargarDetalles");
                }
                else {
                    ObtenerDatosWSsinParametros("Obtener" + Detalles.Nombre, "CargarDetalles");
                }

            });

function CargarDetalles(Lista) {
    $('#ListaDetalles').empty();

    $.each(Lista, function (i, item) {
        $('#ListaDetalles').append('<li><a  href="javascript:SeleccionDetalle(\'' + Lista[i].Nombre + '\');" data-rel="dialog">' + Lista[i].Nombre + '</a></li>').listview('refresh');
    });
}
function SeleccionDetalle(Nombre) {
    if (ObjetProgramacion.Oid > 0) {
        if (Detalles.Nombre == "Medicos") Detalles.Nombre = "Cirujanos";

        var parametros = {
            OidProgramacion: ObjetProgramacion.Oid,
            CampoActualizar: Nombre,
        };
        InsertarDatosWs(parametros, "ModificarProgramacion" + Detalles.Nombre);

        $('[data-role=dialog]').dialog("close");

    }
    else {
        if (Detalles.Nombre == "Cirugias") {
            $('#txtCirugia').val(Nombre);
            $('[data-role=dialog]').dialog("close");
        }
        if (Detalles.Nombre == "Quirofanos") {
            $('#txtQuirofano').val(Nombre);
            $('[data-role=dialog]').dialog("close");
        }
        if (Detalles.Nombre == "Medicos") {
            $('#txtCirujano').val(Nombre);
            $('[data-role=dialog]').dialog("close");
        }
        if (Detalles.Nombre == "Anestesia") {
            $('#txtAnestesia').val(Nombre);
            $('[data-role=dialog]').dialog("close");
        }
        if (Detalles.Nombre == "Ayudante1") {
            $('#txtAyudante1').val(Nombre);
            $('[data-role=dialog]').dialog("close");
        }
        if (Detalles.Nombre == "Ayudante2") {
            $('#txtAyudante2').val(Nombre);
            $('[data-role=dialog]').dialog("close");
        }
        if (Detalles.Nombre == "Ayudante3") {
            $('#txtAyudante3').val(Nombre);
            $('[data-role=dialog]').dialog("close");
        }
        if (Detalles.Nombre == "Instrumentista") {
            $('#txtInstrumentista').val(Nombre);
            $('[data-role=dialog]').dialog("close");
        }
        if (Detalles.Nombre == "Circulante1") {
            $('#txtCirculante1').val(Nombre);
            $('[data-role=dialog]').dialog("close");
        }
        if (Detalles.Nombre == "Circulante2") {
            $('#txtCirculante2').val(Nombre);
            $('[data-role=dialog]').dialog("close");
        }
        if (Detalles.Nombre == "Afanadoras") {
            $('#txtAfanadora').val(Nombre);
            $('[data-role=dialog]').dialog("close");
        }
        ObjetProgramacion.Oid = 0;
    }
}



function ValidarQuirofano(msg) {
    if (msg.d == "0") {
        $("#errorProgramacion").text("Horario ocupado");
        $("#errorProgramacion").addClass("errortext");
        document.getElementById("txtHoraProgramacion").style.border = "3px solid red";
    }
    else {
        $('[data-role=dialog]').dialog("close");

    }
}
$('#Reportes').bind('pagebeforeshow',
            function () {
                $('#TablaReportes').empty();

            });

function CargarProgramacionPorFecha(Lista) {
    $('#DivTablaReporte').empty();
    $('#DivTablaReporte').append('  <table data-role="table" id="TablaReportes"  class="ui-responsive table-stroke ui-table ui-table-columntoggle" ></table>');

    $('#TablaReportes').append('<thead><tr><th>Fecha</th><th>Hora</th><th>Quirofano</th><th>Cirujano</th><th>Duracion</th><th>Cirugia</th></tr></thead>');

    //$('#listaReportes').append('<li data-icon="none" data-theme="b"><a href="" ><div class="Fecha">Fecha</div><div class="Hora">Hora</div><div class="Quirofano">Quirofano</div><div class="Cirujano">Cirujano</div><div class="Duracion">Duraccion</div><div class="Duracion">Cirugia</div></a></li>').listview('refresh');
    $('#TablaReportes').append('<tbody id="RowReportes"></tbody>')
    $.each(Lista, function (i, item) {

        if (Lista[i].Quirofano == "") var Quirofano = "Sin seleccionar"; else Quirofano = Lista[i].Quirofano;
        if (Lista[i].Cirugia == "") var Cirugia = "Sin seleccionar"; else Cirugia = Lista[i].Cirugia;
        if (Lista[i].Cirujano == "") var Cirujano = "Sin seleccionar"; else Cirujano = Lista[i].Cirujano;

        //$('#listaReportes').append('<li><a  href="" data-rel="dialog"><div class="Fecha">' + ConvertirFecha(Lista[i].FechayHora) + ' </div><div class="Hora">' + ObtenerHoras(Lista[i].FechayHora) + ':' + ObtenerMinutos(Lista[i].FechayHora) + '</div><div class="Quirofano">' + Quirofano + '</div><div class="Cirujano">' + Cirujano + '</div><div class="Duracion">' + Lista[i].TiempoDeCirugia + ' Horas</div><div class="Duracion">' + Cirugia + '</div></a></li>').listview('refresh');
        $('#RowReportes').append('<tr><td>' + ConvertirFecha(Lista[i].FechayHora) + '</td><td>' + ObtenerHoras(Lista[i].FechayHora) + ':' + ObtenerMinutos(Lista[i].FechayHora) + '</td><td>' + Quirofano + '</td><td>' + Cirujano + '</td><td >' + Lista[i].TiempoDeCirugia + '</td><td >' + Cirugia + '</td></tr>');
    });
}
$(".target").change(function () {
    var param = {
        Fecha: $('#txtFechaReporte').val(),
    };
    ObtenerDatosWS(param, WS.ObtenerProgramacionPorFecha, "CargarProgramacionPorFecha");
});
$("#btnImprimir").click(function (event) {

    
        var uri = 'data:application/vnd.ms-excel;base64,'
          , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
          , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
          , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }

        var table = "TablaReportes";
        var name = "Reporte de cirugias";
            if (!table.nodeType) table = document.getElementById(table)
            var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML }
            window.location.href = uri + base64(format(template, ctx))
        
    
});