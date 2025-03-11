const form_ajax=document.querySelectorAll(".AjaxForm");
const confirmForm=document.querySelectorAll(".ConfirmForm");
// const divAlert=document.getElementById("divAlert");

form_ajax.forEach(forms => {
	forms.addEventListener("submit",function(e) {
		e.preventDefault();
		let data = new FormData(this);
		
		let method = this.getAttribute("method");
		let action = this.getAttribute("action");
		let alertId = this.getAttribute("data-alert-id") || "divAlert";
		let alertDiv = document.getElementById(alertId);
		alertDiv.innerHTML="";
		let headers = new Headers();
		let config = {
			method : method,
			headers: headers,
			mode   : 'cors',
			cache  : 'no-cache',
			body   : data
		};
		fetch(action,config)
		.then(response=>response.json())
		.then(response => {
			return ajax_alert(response, alertDiv);
		});
	});
});

confirmForm.forEach(forms => {
	forms.addEventListener("submit",function(e) {
		e.preventDefault();
		let alertId = this.getAttribute("data-alert-id") || "divAlert";
		let alertDiv = document.getElementById(alertId);
		alertDiv.innerHTML="";
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
				let data = new FormData(this);
				let method = this.getAttribute("method");
				let action = this.getAttribute("action");
				let headers = new Headers();
				let config = {
					method:method,
					headers:headers,
					mode:'cors',
					cache:'no-cache',
					body:data
				};
				fetch(action,config)
				.then(response=>response.json())
				.then(response => {
					return ajax_alert(response, alertDiv);
				});
		  	}
		});
	});
});

function ajax_alert(alert, alertDiv) {
	if (alert.type=="pop-up") {
		Swal.fire({
			position: alert.position,
			icon: alert.icon,
			title: alert.title,
			text: alert.text,
			showConfirmButton: false,
			confirmButtonColor: "#3085d6",
			timer: alert.timer*1000
		});
		////////////////
		//POSITION    //
		//center      //
		//top         //
		//bottom   	  //
		//xxxxx-end	  //
		//xxx-start	  //
		////////////////
		
		/////////////
		//ICONS    //
		//success  //
		//error    //
		//warning  //
		//info     //
		//question //
		/////////////
	}else if (alert.type=="msg") {
		alertDiv.innerHTML='<div class="alert alert-'+alert.icon+'" role="alert"><b>'+alert.title+':</b> '+alert.text+'</div>';
		if (alert.focus) {
			document.getElementById(alert.focus).focus();
		}


		////////////////
		//TYPE ALERTS //
		//primary     //
		//secondary   //
		//success     //
		//danger      //
		//warning     //
		//info        //
		//light       //
		//dark        //
		////////////////
	}else if (alert.type=="reload") {
		Swal.fire({
			title: alert.title,
			text: alert.text,
			icon: alert.icon,
			position: alert.position,
			confirmButtonColor: "#3085d6",
			confirmButtonText: "Aceptar"
		}).then((result) => {
			location.reload();
		});
	}else if (alert.type=="clean") {
		Swal.fire({
			position: alert.position,
			title: alert.title,
			text: alert.text,
			icon: alert.icon,
			showConfirmButton: false,
			timer: alert.timer*1000
		}).then((result) => {
			document.querySelector(".AjaxForm").reset();
		});
	}else if (alert.type=="redirect") {
		if (!alert.url){
			window.history.back();	
		}else{
			window.location.href=alert.url;
		}
	}else if (alert.type=="newPage") {
		var win = window.open(alert.url, '_blank');
        win.focus();
	}else if (alert.type=="ajax") {
		 $.ajax({
            type: "POST",
            url: alert.url,
            data: alert.data,
            success:function (r) {
                alertDiv.innerHTML=r;
            }
        })
	}
}


