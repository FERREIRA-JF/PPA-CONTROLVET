// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function () {
    // Elementos del DOM
    const tabs = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('main > section');
    const appointmentForm = document.getElementById('appointmentForm');
    const confirmationContainer = document.getElementById('confirmationContainer');

    // Cambio de pestañas
    tabs.forEach(tab => {
        tab.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.id.replace('Tab', 'Section');
            sections.forEach(section => {
                section.style.display = section.id === targetId ? 'block' : 'none';
            });
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Función para recopilar los datos del formulario
    function getFormData() {
        const selectedTimeButton = document.querySelector('.time-button.selected');
        return {
            ownerName: document.getElementById("ownerName").value,
            petName: document.getElementById("petName").value,
            email: document.getElementById("email").value,
            date: document.getElementById("date").value,
            time: selectedTimeButton ? selectedTimeButton.textContent : '',
            services: Array.from(document.querySelectorAll('input[name="service"]:checked')).map(service => service.value),
            comments: document.getElementById("comments").value
        };
    }

    // Función para crear el mensaje de confirmación
    function createConfirmationMessage(data) {
        return `
            <div class="confirmation-container">
                <h2>Confirmación de Cita</h2>
                <p>Muchas gracias por preferirnos, <strong>${data.ownerName}</strong>. A continuación, los detalles de la cita:</p>
                <p><strong>Mascota:</strong> ${data.petName}</p>
                <p><strong>Fecha:</strong> ${data.date}</p>
                <p><strong>Hora:</strong> ${data.time}</p>
                <p><strong>Servicios seleccionados:</strong> ${data.services.join(", ")}</p>
                ${data.comments ? <p><strong>Comentarios adicionales:</strong> ${data.comments}</p> : ''}
                <button id="backToHome" class="btn">Volver al inicio</button>
            </div>
        `;
    }

    // Función para simular el envío de correo de confirmación
    function sendConfirmationEmail(data) {
        const subject = "Confirmación de tu cita en ControlVet";
        const body = `
            Estimado/a ${data.ownerName},

            Gracias por preferir ControlVet. Aquí tienes la confirmación de la cita para tu mascota ${data.petName}.

            Fecha: ${data.date}
            Hora: ${data.time}
            Servicios solicitados: ${data.services.join(", ")}
            ${data.comments ? Comentarios adicionales: ${data.comments} : ''}

            ¡Te esperamos!

            Atentamente,
            ControlVet - Tu veterinaria de control de confianza.
        `;

        console.log("Correo enviado a:", data.email);
        console.log("Asunto:", subject);
        console.log("Cuerpo del correo:", body);
        
        // Simular el envío del correo
        setTimeout(() => {
            alert(Un correo de confirmación ha sido enviado a ${data.email});
        }, 1000);
    }

    // Evento para el envío del formulario
    appointmentForm.addEventListener("submit", function (event) {
        event.preventDefault();
        if (!document.querySelector('.time-button.selected')) {
            alert("Por favor, selecciona un horario para tu cita.");
            return;
        }

        const formData = getFormData();

        // Mostrar el mensaje de confirmación
        confirmationContainer.innerHTML = createConfirmationMessage(formData);
        confirmationContainer.style.display = 'block';
        appointmentForm.style.display = 'none';

        // Añadir el evento al botón de volver al inicio
        const backToHomeButton = document.getElementById("backToHome");
        if (backToHomeButton) {
            backToHomeButton.addEventListener("click", () => {
                location.reload();
            });
        }

        // Simular el envío del correo
        sendConfirmationEmail(formData);
    });

    // Funciones para la validación de fechas
    function isWeekday(date) {
        const day = date.getDay();
        return day >= 1 && day <= 5;
    }

    function getNextWeekday(date) {
        do {
            date.setDate(date.getDate() + 1);
        } while (!isWeekday(date));
        return date;
    }

    function validateDate(dateString) {
        const selectedDate = new Date(dateString);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        let maxDate = new Date(today);
        let weekdaysCount = 0;
        while (weekdaysCount < 5) {
            maxDate = getNextWeekday(maxDate);
            weekdaysCount++;
        }
        return selectedDate >= today && selectedDate <= maxDate && isWeekday(selectedDate);
    }

    function getMinMaxDates() {
        const today = new Date();
        let maxDate = new Date(today);
        let weekdaysCount = 0;
        while (weekdaysCount < 5) {
            maxDate = getNextWeekday(maxDate);
            weekdaysCount++;
        }
        return {
            min: today.toISOString().split('T')[0],
            max: maxDate.toISOString().split('T')[0]
        };
    }

    // Añadir validación de fecha al formulario
    const dateInput = document.getElementById("date");
    const { min, max } = getMinMaxDates();
    
    dateInput.min = min;
    dateInput.max = max;
    dateInput.addEventListener("change", function() {
        if (!validateDate(this.value)) {
            alert("Por favor, selecciona una fecha dentro de los próximos 5 días hábiles.");
            this.value = "";
        }
    });

    // Función para generar botones de horario
    function generateTimeButtons() {
        const timeContainer = document.createElement('div');
        timeContainer.id = 'timeButtons';
        const hours = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];
        
        hours.forEach(hour => {
            const button = document.createElement('button');
            button.textContent = hour;
            button.classList.add('time-button');
            button.onclick = function() {
                document.querySelectorAll('.time-button').forEach(btn => btn.classList.remove('selected'));
                this.classList.add('selected');
                document.getElementById('time').value = hour;
            };
            timeContainer.appendChild(button);
        });
        
        const timeInput = document.getElementById('time');
        timeInput.style.display = 'none';
        timeInput.parentNode.insertBefore(timeContainer, timeInput.nextSibling);
    }

    // Llamar a la función para generar botones de horario
    generateTimeButtons();

    // Mostrar la sección de información por defecto
    document.getElementById('infoSection').style.display = 'block';
});