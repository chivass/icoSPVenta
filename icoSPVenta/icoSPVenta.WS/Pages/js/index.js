
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




