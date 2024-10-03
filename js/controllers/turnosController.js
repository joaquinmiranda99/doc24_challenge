(function () {
    'use strict';

    angular
        .module('miApp')
        .controller('TurnosController', TurnosController);

    TurnosController.$inject = ['$scope', 'TurnosService'];

    function TurnosController($scope, TurnosService) {
        var vm = this;
        vm.especialidades = [];
        vm.profesionales = [];
        vm.horarios = [];
        vm.turno = {
            nombre: '',
            apellido: '',
            direccion: '',
            telefono: '',
            comentario: ''
        };
        vm.especialidadSeleccionada = null;
        vm.profesionalSeleccionado = null;
        vm.horarioSeleccionado = null;
        vm.formularioEnviado = false;

        // Obtener las especialidades
        TurnosService.obtenerEspecialidades()
            .then(function (data) {
                vm.especialidades = data;
            })
            .catch(function (error) {
                console.error('Error al cargar especialidades:', error);
            });

        // Cargar profesionales cuando se selecciona una especialidad
        vm.cargarProfesionales = function () {
            if (vm.especialidadSeleccionada) {
                TurnosService.obtenerProfesionales(vm.especialidadSeleccionada.id)
                    .then(function (data) {
                        vm.profesionales = data;
                    })
                    .catch(function (error) {
                        console.error('Error al cargar profesionales:', error);
                    });
            }
        };

        // Cargar horarios cuando se selecciona un profesional
        vm.cargarHorarios = function () {
            if (vm.profesionalSeleccionado) {
                vm.horarios = vm.profesionalSeleccionado.horarios;
            }
        };

        // Enviar los datos del formulario
        vm.solicitarTurno = function () {
            var datosTurno = {
                nombre: vm.turno.nombre,
                apellido: vm.turno.apellido,
                direccion: vm.turno.direccion,
                telefono: vm.turno.telefono,
                comentario: vm.turno.comentario,
                especialidadId: vm.especialidadSeleccionada.id,
                profesionalId: vm.profesionalSeleccionado.id,
                horario: vm.horarioSeleccionado
            };

            TurnosService.enviarSolicitudTurno(datosTurno)
                .then(function (response) {
                    if (response.success) {
                        vm.formularioEnviado = true;
                        vm.mensajeExito = response.message;
                        $scope.$apply();
                    }
                })
                .catch(function (error) {
                    console.error('Error al enviar solicitud de turno:', error);
                });
        };
    }
})();
