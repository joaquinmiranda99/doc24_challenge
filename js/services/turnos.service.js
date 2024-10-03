(function () {
    'use strict';

    angular
        .module('miApp')
        .service('TurnosService', TurnosService);

    TurnosService.$inject = ['$http'];

    function TurnosService($http) {
        this.obtenerEspecialidades = function () {
            return $http.get('/data/especialidades.json')
                .then(function (response) {
                    return response.data;
                })
                .catch(function (error) {
                    console.error('Error al obtener especialidades:', error);
                    throw error;
                });
        };

        this.obtenerProfesionales = function (especialidadId) {
            return $http.get('/data/profesionales/' + especialidadId + '.json')
                .then(function (response) {
                    return response.data;
                })
                .catch(function (error) {
                    console.error('Error al obtener profesionales:', error);
                    throw error;
                });
        };

        this.enviarSolicitudTurno = function (datosTurno) {
            console.log('datosTurno: ', datosTurno);

            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    // Mockeamos una respuesta exitosa
                    var respuestaMock = {
                        success: true,
                        message: "Turno solicitado exitosamente."
                    };
                    resolve(respuestaMock);
                }, 1000); // Simulamos una demora de 1 segundo
            });
        };
    }
})();
