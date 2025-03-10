document.addEventListener("DOMContentLoaded", () => {
    const form_ajax = document.querySelectorAll(".AjaxForm");
    const confirmForm = document.querySelectorAll(".ConfirmForm");

    form_ajax.forEach(form => {
        form.addEventListener("submit", handleAjaxFormSubmit);
    });

    confirmForm.forEach(form => {
        form.addEventListener("submit", handleConfirmFormSubmit);
    });

    function handleAjaxFormSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const data = new FormData(form);
        const method = form.getAttribute("method");
        const action = form.getAttribute("action");
        const alertId = form.getAttribute("data-alert-id") || "divAlert";
        const alertDiv = document.getElementById(alertId);
        alertDiv.innerHTML = "";

        fetch(action, {
            method: method,
            body: data,
            headers: new Headers(),
            mode: 'cors',
            cache: 'no-cache'
        })
			.then(response => {
				console.log(response);
				return response.json();
			})
        // .then(response => response.json().then(data => ({ status: response.status, body: data })))
        // .then(response => {
			
		// 	console.log(response);
        //     if (response.status >= 400) {
        //         console.log('Validation errors:', response.body.errors);
        //         return showAlert({ type: "msg", icon: "danger", title: "Error", text: response.body.errors.map(error => error.msg).join('\n') }, alertDiv);
        //     }
        //     return showAlert(response.body, alertDiv);
        // })
        // .catch(error => {
        //     console.error('Error:', error);
        //     showAlert({ type: "msg", icon: "danger", title: "Error", text: "An unexpected error occurred." }, alertDiv);
        // });
    }

    function handleConfirmFormSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const alertId = form.getAttribute("data-alert-id") || "divAlert";
        const alertDiv = document.getElementById(alertId);
        alertDiv.innerHTML = "";

        Swal.fire({
            title: "¿Está seguro?",
            text: "¿Desea realmente realizar esta acción?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, seguro!",
            cancelButtonText: "No, Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                const data = new FormData(form);
                const method = form.getAttribute("method");
                const action = form.getAttribute("action");

                fetch(action, {
                    method: method,
                    body: data,
                    headers: new Headers(),
                    mode: 'cors',
                    cache: 'no-cache'
                })
                .then(response => response.json().then(data => ({ status: response.status, body: data })))
                .then(response => {
                    if (response.status >= 400) {
                        console.log('Validation errors:', response.body.errors);
                        return showAlert({ type: "msg", icon: "danger", title: "Error", text: response.body.errors.map(error => error.msg).join('\n') }, alertDiv);
                    }
                    return showAlert(response.body, alertDiv);
                })
                .catch(error => {
                    console.error('Error:', error);
                    showAlert({ type: "msg", icon: "danger", title: "Error", text: "An unexpected error occurred." }, alertDiv);
                });
            }
        });
    }

    function showAlert(alert, alertDiv) {
        if (alert.type === "pop-up") {
            Swal.fire({
                position: alert.position,
                icon: alert.icon,
                title: alert.title,
                text: alert.text,
                showConfirmButton: false,
                confirmButtonColor: "#3085d6",
                timer: alert.timer * 1000
            });
        } else if (alert.type === "msg") {
            alertDiv.innerHTML = `<div class="alert alert-${alert.icon}" role="alert"><b>${alert.title}:</b> ${alert.text}</div>`;
            if (alert.focus) {
                document.getElementById(alert.focus).focus();
            }
        } else if (alert.type === "reload") {
            Swal.fire({
                title: alert.title,
                text: alert.text,
                icon: alert.icon,
                position: alert.position,
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Aceptar"
            }).then(() => {
                location.reload();
            });
        } else if (alert.type === "clean") {
            Swal.fire({
                position: alert.position,
                title: alert.title,
                text: alert.text,
                icon: alert.icon,
                showConfirmButton: false,
                timer: alert.timer * 1000
            }).then(() => {
                document.querySelector(".AjaxForm").reset();
            });
        } else if (alert.type === "redirect") {
            if (!alert.url) {
                window.history.back();
            } else {
                window.location.href = alert.url;
            }
        } else if (alert.type === "newPage") {
            const win = window.open(alert.url, '_blank');
            win.focus();
        } else if (alert.type === "ajax") {
            $.ajax({
                type: "POST",
                url: alert.url,
                data: alert.data,
                success: function(r) {
                    alertDiv.innerHTML = r;
                }
            });
        }
    }
});


