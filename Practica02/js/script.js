$(document).ready(function () {
    // Cambiar entre formularios
    $('#rfc-link').click(function () {
        $('#rfc-form').show();
        $('#api-form').hide();
    });

    $('#api-link').click(function () {
        $('#rfc-form').hide();
        $('#api-form').show();
    });

    // Lógica para generar RFC
    $('#formRFC').submit(function (event) {
        event.preventDefault();
        
        let nombre = $('#nombre').val().trim();
        let apellidoPaterno = $('#apellidoPaterno').val().trim();
        let apellidoMaterno = $('#apellidoMaterno').val().trim();
        let fechaNacimiento = $('#fechaNacimiento').val();

        if (nombre && apellidoPaterno && apellidoMaterno && fechaNacimiento) {
            let rfc = apellidoPaterno.substr(0, 2).toUpperCase() +
                      apellidoMaterno.charAt(0).toUpperCase() +
                      nombre.charAt(0).toUpperCase() +
                      fechaNacimiento.replace(/-/g, '').substr(2, 6);
            
            $('#resultadoRFC').text('RFC generado: ' + rfc);
        } else {
            $('#resultadoRFC').text('Por favor, llena todos los campos.');
        }
    });

    // Lógica para consultar API
    $('#formAPI').submit(function (event) {
        event.preventDefault();
        let userId = $('#userId').val();

        if (userId) {
            $.ajax({
                url: 'https://jsonplaceholder.typicode.com/users/' + userId,
                method: 'GET',
                success: function (data) {
                    $('#apiResult').html(
                        '<p>Usuario: ' + data.username + '</p>' +
                        '<p>Nombre: ' + data.name + '</p>' +                        
                        '<p>Email: ' + data.email + '</p>'
                    );
                },
                error: function () {
                    $('#apiResult').html('<p>No se encontró información para el ID proporcionado.</p>');
                }
            });
        } else {
            $('#apiResult').text('Por favor, ingresa un ID de usuario.');
        }
    });
});
