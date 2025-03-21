document.addEventListener("DOMContentLoaded", () => {
    const form_ajax = document.querySelectorAll(".AjaxForm");
    const confirmForm = document.querySelectorAll(".ConfirmForm");
    const filter = document.querySelectorAll(".data-filter");

    filter.forEach(form => {
        form.addEventListener("input", filterData);
        form.addEventListener("click", setData);
    });

    form_ajax.forEach(form => {
        form.addEventListener("submit", handleAjaxFormSubmit);
    });

    confirmForm.forEach(form => {
        form.addEventListener("submit", handleConfirmFormSubmit);
    });

    async function handleAjaxFormSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const data = new URLSearchParams(new FormData(form));
        const method = form.getAttribute("method");
        const action = form.getAttribute("action");

        try {
            const response = await fetch(action, {
                method: method,
                body: data,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                mode: 'cors',
                cache: 'no-cache'
            });
            const responseBody = await response.json();
            if (responseBody.errors) {
                const error = responseBody.errors[0];
                // responseBody.errors.forEach(error => {
                    
                if (error.type === "field") {
                    showAlert({ type: "msg", icon: "warning", title: "Advertencia", text: error.msg, focus: error.path });
                } else {
                    showAlert({ type: "msg", icon: "warning", title: "Error", text: error.msg });
                }
                // })
            } else {
                showAlert(responseBody);
            }
        } catch (error) {
            console.error('Error:', error);
            showAlert({ type: "msg", icon: "danger", title: "Error", text: error });
        }
    }

    async function handleConfirmFormSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const alertId = form.getAttribute("data-alert-id") || "divAlert";
        let alertDiv = document.getElementById(alertId);

        alertDiv = document.createElement('div');
        alertDiv.id = alertId;
        form.appendChild(alertDiv);
        alertDiv.innerHTML = "";

        const result = await Swal.fire({
            title: "¿Está seguro?",
            text: "¿Desea realmente realizar esta acción?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, seguro!",
            cancelButtonText: "No, Cancelar"
        });

        if (result.isConfirmed) {
            try {
                const data = new FormData(form);
                const method = form.getAttribute("method");
                const action = form.getAttribute("action");

                const response = await fetch(action, {
                    method: method,
                    body: data,
                    headers: new Headers(),
                    mode: 'cors',
                    cache: 'no-cache'
                });
                const responseBody = await response.json();
                if (response.status >= 400) {
                    const error = responseBody.errors[0];
                    if (error.type === "field") {
                        const field = form.querySelector(`[name="${error.path}"]`);
                        let fieldAlertDiv = field.nextElementSibling;
                        fieldAlertDiv = document.createElement('div');
                        fieldAlertDiv.classList.add('divAlert');
                        field.insertAdjacentElement('afterend', fieldAlertDiv);
                        showAlert({ type: "msg-field", icon: "danger", title: "Error", text: error.msg }, fieldAlertDiv);
                    } else {
                        showAlert({ type: "msg", icon: "danger", title: "Error", text: error.msg }, alertDiv);
                    }
                } else {
                    showAlert(responseBody, alertDiv);
                }
            } catch (error) {
                showAlert({ type: "msg", icon: "danger", title: "Error", text: "An unexpected error occurred." }, alertDiv);
            }
        }
    }

    function showAlert(alert) {
        const divAlert = document.getElementById("divAlert");
        switch (alert.type) {
            case "pop-up":
                Swal.fire({
                    position: alert.position,
                    icon: alert.icon,
                    title: alert.title,
                    text: alert.text,
                    showConfirmButton: false,
                    confirmButtonColor: "#3085d6",
                    timer: alert.timer * 1000
                });
                break;
            case "msg":
                const alertDiv = document.createElement('div');
                alertDiv.classList.add('alert', `alert-${alert.icon}`);
                divAlert.insertBefore(alertDiv, divAlert.firstChild);
                alertDiv.innerHTML = `<b>${alert.title}:</b> ${alert.text}`;
                if (alert.focus) {
                    document.getElementById(alert.focus).focus();
                }
                setTimeout(() => {
                    if (alertDiv.parentNode) {
                        alertDiv.parentNode.removeChild(alertDiv);
                    }
                }, 6000);
                break;
            case "reload":
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
                break;
            case "clean":
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
                break;
            case "redirect":
                window.location.href = alert.url || window.history.back();
                break;
            case "newPage":
                const win = window.open(alert.url, '_blank');
                win.focus();
                break;
            case "ajax":
                $.ajax({
                    type: "POST",
                    url: alert.url,
                    data: alert.data,
                    success: function(r) {
                        alertDiv.innerHTML = r;
                    }
                });
                break;
        }
    }

    async function searchData(module, query) {
        const response = await fetch(`/api/${module}/search/${query}`);
        return await response.json();
    }

    async function getData(module) {
        const response = await fetch(`/api/${module}/`);
        return await response.json();
    }

    async function setData(event) {
        const input = event.target;
        const [module, idInput, displayField] = input.dataset.filter.split('-');
        let suggestions = input.nextElementSibling;

        if (!suggestions || suggestions.tagName !== 'UL') {
            suggestions = createSuggestionsList(input);
        }

        const data = await getData(module);
        if (data.length === 0) {
            suggestions.remove();
            return;
        }

        updateSuggestionsList(suggestions, data, displayField, input, idInput);
    }

    async function filterData(event) {
        const input = event.target;
        const searchQuery = input.value.toLowerCase();
        const [module, idInput, displayField] = input.dataset.filter.split('-');
        let suggestions = input.nextElementSibling;

        if (!suggestions || suggestions.tagName !== 'UL') {
            suggestions = createSuggestionsList(input);
        }

        if (searchQuery.length < 1) {
            setData(event);
            return;
        }

        const data = await searchData(module, searchQuery);
        if (data.length === 0) {
            suggestions.remove();
            return;
        }

        updateSuggestionsList(suggestions, data, displayField, input, idInput, searchQuery);
    }

    function createSuggestionsList(input) {
        const suggestions = document.createElement('ul');
        suggestions.classList.add('datafilter', 'slide-down');
        suggestions.style.position = 'absolute';
        suggestions.style.zIndex = '1000';
        suggestions.style.left = `${input.offsetLeft}px`;
        suggestions.style.top = `${input.offsetTop + input.offsetHeight + 0.5}px`;
        suggestions.style.overflowY = 'auto';
        suggestions.style.width = `${input.offsetWidth}px`;
        input.parentNode.insertBefore(suggestions, input.nextSibling);
        return suggestions;
    }

    function updateSuggestionsList(suggestions, data, displayField, input, idInput, searchQuery = '') {
        suggestions.style.display = 'block';

        const existingItems = Array.from(suggestions.children);
        const newItems = data.filter(item => item[displayField] && item[displayField].toLowerCase().includes(searchQuery));

        existingItems.forEach(item => {
            const itemId = item.getAttribute('data-id');
            if (!newItems.some(newItem => newItem.id === itemId)) {
                suggestions.removeChild(item);
            }
        });

        newItems.forEach(item => {
            let listItem = existingItems.find(existingItem => existingItem.getAttribute('data-id') === item.id);
            if (!listItem) {
                listItem = document.createElement('li');
                listItem.setAttribute('data-id', item.id);
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

    document.addEventListener('click', function(event) {
        filter.forEach(input => {
            const suggestions = input.nextElementSibling;
            if (suggestions && suggestions.tagName === 'UL' && !input.contains(event.target) && !suggestions.contains(event.target)) {
                suggestions.remove();
            }
        });
    });
});


document.querySelectorAll('th').forEach(header => {
    header.addEventListener('click', () => {
        const table = header.closest('table');
        const tbody = table.querySelector('tbody');
        const rows = Array.from(tbody.querySelectorAll('tr'));
        const column = header.getAttribute('data-column');
        const order = header.getAttribute('data-order');
        const newOrder = order === 'desc' ? 'asc' : 'desc';

        rows.sort((a, b) => {
            const aText = a.querySelector(`td:nth-child(${header.cellIndex + 1})`).textContent.trim();
            const bText = b.querySelector(`td:nth-child(${header.cellIndex + 1})`).textContent.trim();

            if (column === 'index' || column === 'enable') {
                return (order === 'desc' ? 1 : -1) * (aText.localeCompare(bText, 'es', { numeric: true }));
            } else if (column.includes('Date')) {
                return (order === 'desc' ? 1 : -1) * (new Date(aText) - new Date(bText));
            } else {
                return (order === 'desc' ? 1 : -1) * aText.localeCompare(bText, 'es');
            }
        });

        header.setAttribute('data-order', newOrder);
        tbody.innerHTML = '';
        rows.forEach(row => tbody.appendChild(row));
    });
});