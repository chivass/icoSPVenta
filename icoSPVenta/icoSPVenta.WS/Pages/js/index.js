
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
    ObtenerUsuarios:'ObtenerUsuarios', 
};





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
    $('#txt1').keypad();
    
});

function launchFullScreen(element) {
    if (element.requestFullScreen) {
        element.requestFullScreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullScreen) {
        element.webkitRequestFullScreen();
    }
}

function mainmenu() {
    // Oculto los submenus
    $(" #nav ul ").css({ display: "none" });
    // Defino que submenus deben estar visibles cuando se pasa el mouse por encima
    $(" #nav li").hover(function () {
        $(this).find('ul:first:hidden').css({ visibility: "visible", display: "none" }).slideDown(400);
    }, function () {
        $(this).find('ul:first').slideUp(400);
    });
}
$(document).ready(function () {
    mainmenu();
});

var li = 1;
$(document).keydown(function (tecla) {

    if (tecla.keyCode == 38) {
        if (li-1 >= 1) {
        li--;
      
            $("#l" + (li+ 1)).removeClass("ui-body-b");
            $("#l" + (li+1)).addClass("ui-body-a");

            $("#l"+li).removeClass("ui-body-a"); //remove old them
            $("#l" + li).addClass("ui-body-b");
        }
    }
    if (tecla.keyCode == 40) {
        li++;
        
            $("#l" + (li - 1)).removeClass("ui-body-b");
            $("#l" + (li - 1)).addClass("ui-body-a");

            $("#l" + li).removeClass("ui-body-a"); //remove old them
            $("#l" + li).addClass("ui-body-b");
        
    }
    if (tecla.keyCode == 112) {
        AbrirVentanaPAgo();

    }
});
var fullscreenElement = document.fullScreenElement || document.mozFullScreenElement || document.webkitFullScreenElement;
var fullscreenEnabled = document.fullScreenEnabled || document.mozScreenEnabled || document.webkitScreenEnabled;


//pagina afanadora
$('#ventas').bind('pagebeforeshow',
            function () {

                var f = new Date();
                $('.pie').text("Bienvenido: usuario    "+f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear() + "   " + f.getHours() + ":" + f.getMinutes() + ":" + f.getSeconds());


                //launchFullScreen(document.getElementById("ventas"));

                
            });

function AbrirVentanaPAgo() {
    $.mobile.changePage("#pago", { transition: 'pop', role: 'dialog' });
}



var Catalogo = {

    Nombre:null,
    Oid:null,
    };

function CrearPaginaCatalogo(Objeto) {

    Catalogo.Nombre = Objeto;
    $('#Catalago').remove();
    $('#body').append('<div data-role="page" id="Catalago">\
                        <div data-role="header" data-theme="b">\
                            <div data-role="navbar">\
                                    <ul>\
		                                <li><a href="#paghome" data-icon="home" data-iconpos="notext">Inicio</a></li>\
                                        <li><a href="javascript:AbrirDetalleCatalogo();" data-icon="plus" data-ajax="false">Agregar</a></li>\
                                    </ul>\
                             </div>\
                           </div>\
                    <div data-role="content">\
                            <h1>'+Catalogo.Nombre+'</h1>\
                    <ul data-role="listview" id="ListaCatalogo" data-inset="true" data-filter="true" data-filter-placeholder="Busqueda...">\
	                </ul>\
	                </div>\
                <div data-role="footer" data-theme="b">\
                         <h1></h1>\
                </div>\
               </div> ');

    $.mobile.changePage("#Catalago");

    ObtenerDatosWSsinParametros(eval(Catalogo.Nombre + '.Obtener'), "CargaCatalogo");
}



function CargaCatalogo(Lista) {
    $('#ListaCatalogo').empty();
    $.each(Lista, function (i, item) {
        var Nombre =eval(Catalogo.Nombre+'.Campo');
        $('#ListaCatalogo').append('<li><a  href="javascript:AbrirDetalleCatalogo(' + Lista[i].OID + ');" data-rel="dialog">' + eval(Nombre) + '</a></li>').listview('refresh');
    });
}



function AbrirDetalleCatalogo(Oid) {



    $('#DetallesCatalogo').remove();
    $('#body').append('<div data-role="page" id="DetallesCatalogo">\
    <div data-role="header" data-theme="b">\
        <h1 class="TituloDetallesCatalogo">' + Catalogo.Nombre + '</h1>\
        <div data-role="navbar">\
       <ul>\
		    <li><a href="javascript:CrearPaginaCatalogo(\'' + Catalogo.Nombre + '\');" data-icon="home" data-iconpos="notext" id="btnGrabarCatalogo">Grabar</a></li>\
            <li><a href="javascript:CatalogoCancelar();" data-icon="plus" data-ajax="false">Cancelar</a></li>\
       </ul>\
    </div>\
  </div>\
    <div data-role="content" id="ContenidoDetalleCatalogo">\
    <h1 class="TituloDetallesCatalogo">' + Catalogo.Nombre + '</h1> \
  </div>\
  <div data-role="footer" data-theme="b">\
     <h1></h1>\
  </div>\
</div> ');

    

    var Controles=eval(Catalogo.Nombre + '.Controles();');
    $.each(Controles, function (i, item) {
        $('#ContenidoDetalleCatalogo').append(' <label for="txt' + Controles[i].Id + '">' + Controles[i].NombreLabel + '</label>\
                                           <input type="' + Controles[i].Tipo + '" id="txt' + Controles[i].Id + '" placeholder="' + Controles[i].placeholder + '">\
                                           ');
    });

    
    

    $.mobile.changePage("#DetallesCatalogo", { transition: 'pop', role: 'dialog' });

    $("#btnGrabarCatalogo").click(function (event) {

       

    });
}

var Usuarios= {
   
    Controles: function () {
        var Controles = new Array();
        Controles[0] = new Object(new Control('NombreUsuario', 'Nombre de Usuario', 'text', 'Capture el nombre de usuario'));
        Controles[1] = new Object(new Control('Contrasena', 'Contraseña', 'password', 'Capture la contraseña'));
        Controles[2] = new Object(new Control('ConfirmarContrasena', 'Repetir contraseña', 'password', 'Repetir contraseña'));
        Controles[3] = new Object(new Control('Nombre', 'Nombre', 'text', 'Capture nombre'));
        Controles[4] = new Object(new Control('Paterno', 'Apellido paterno', 'text', 'Capture apellido paterno'));
        Controles[5] = new Object(new Control('Materno', 'Apellido materno', 'text', 'Capture apellido materno'));
        Controles[6] = new Object(new Control('checkVentas', 'Ventas', 'checkbox', ''));
        Controles[7] = new Object(new Control('checkAdministrar', 'Administrar', 'checkbox', ''));
        Controles[8] = new Object(new Control('checkReportes', 'Reportes', 'checkbox', ''));
        Controles[9] = new Object(new Control('checkCatalogos', 'Catalogos', 'checkbox', ''));
        Controles[9] = new Object(new Control('checkDeshacerVenta', 'Deshacer venta', 'checkbox', ''));
        return Controles;
    },
    Obtener:'ObtenerUsuarios',
    Campo: "Lista[i].Nombre+' '+Lista[i].Paterno+' '+Lista[i].Materno",
    
};
var Cajas = {

    Controles: function () {
        var Controles = new Array();
        Controles[0] = new Object(new Control('NumeroCaja', 'Numero de caja', 'number', 'Ingrese numero de caja'));
        Controles[1] = new Object(new Control('DescripcionCaja', 'Descripcion caja', 'text', 'Capture descripcion de caja'));
        Controles[2] = new Object(new Control('checkDisponible', 'Disponible', 'checkbox', ''));
        Controles[3] = new Object(new Control('checkTicket', 'Ticket', 'checkbox', ''));

        return Controles;
    },
    Obtener: 'ObtenerCajas',
    Campo: 'Lista[i].DescripcionCaja',

};
function Control(Id, NombreLabel, Tipo, placeholder) {

    this.Id = Id;
    this.NombreLabel = NombreLabel;
    this.Tipo = Tipo;
    this.placeholder = placeholder;

}


