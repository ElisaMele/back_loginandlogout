document.addEventListener('DOMContentLoaded', function() {
    var fechaInput = document.getElementById('fechaInput');

    fechaInput.addEventListener('blur', function() {
        var fechaValue = this.value;
        var isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(fechaValue);

        if (!isValidDate) {
            alert('Formato de fecha inválido. Por favor, usa el formato YYYY-MM-DD.');
            this.value = ''; // Limpia el campo si la fecha no es válida
        }
    });
});