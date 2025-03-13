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
        const data = new URLSearchParams(new FormData(form));
        const method = form.getAttribute("method");
        const action = form.getAttribute("action");
        const alertId = form.getAttribute("data-alert-id") || "divAlert";
        const alertDiv = document.getElementById(alertId);
        alertDiv.innerHTML = "";

        fetch(action, {
            method: method,
            body: data,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            mode: 'cors',
            cache: 'no-cache'
        })
		.then(response => {
			return response;
		})
        .then(response => response.json().then(data => ({ status: response.status, body: data })))
        .then(response => {
			
            if (response.body.errors) {
                return showAlert({ type: "msg", icon: "danger", title: "Error", text: response.body.errors[0].msg}, alertDiv);
            }
            return showAlert(response.body, alertDiv);
        })
        .catch(error => {
            console.error('Error:', error);
            showAlert({ type: "msg", icon: "danger", title: "Error", text: error }, alertDiv);
        });
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
                        // console.log('Validation errors:', response.body.errors);
                        return showAlert({ type: "msg", icon: "danger", title: "Error", text: response.body.errors.map(error => error.msg).join('\n') }, alertDiv);
                    }
                    return showAlert(response.body, alertDiv);
                })
                .catch(error => {
                    // console.error('Error:', error);
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

async function fetchData(module, query) {
    const response = await fetch(`/api/${module}/search/${query}`);
    const data = await response.json();
    return data;
}

async function filterData(input) {
    const searchQuery = input.value.toLowerCase();
    const [module, idInput, suggestionsList, displayField] = input.dataset.filter.split('-');
    const suggestions = document.getElementById(suggestionsList);

    if (searchQuery.length < 2) {
        suggestions.style.display = 'none';
        return;
    }

    const data = await fetchData(module, searchQuery);
    if (data.length === 0) {
        suggestions.style.display = 'none';
        return;
    }

    suggestions.style.display = 'block';
    suggestions.style.width = `${input.offsetWidth}px`; // Ajustar el ancho de la lista para que coincida con el input

    const existingItems = Array.from(suggestions.children);
    const newItems = data.filter(item => item[displayField] && item[displayField].toLowerCase().includes(searchQuery));

    // Remove items that are no longer in the new data
    existingItems.forEach(item => {
        const itemId = item.getAttribute('data-id');
        if (!newItems.some(newItem => newItem._id === itemId)) {
            suggestions.removeChild(item);
        }
    });

    // Add or update items
    newItems.forEach(item => {
        let listItem = existingItems.find(existingItem => existingItem.getAttribute('data-id') === item._id);
        if (!listItem) {
            listItem = document.createElement('li');
            listItem.setAttribute('data-id', item._id);
            listItem.addEventListener('click', function() {
                input.value = this.textContent;
                document.getElementById(idInput).value = this.getAttribute('data-id');
                suggestions.innerHTML = '';
                suggestions.style.display = 'none';
            });
            suggestions.appendChild(listItem);
        }
        listItem.textContent = item[displayField];
    });
}