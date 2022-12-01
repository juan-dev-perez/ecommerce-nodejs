const socket = io();

// se asigna a variables elementos html mediante el id
const sendMess = document.getElementById('sendMess');
const texto = document.getElementById('texto');
const divMensajes = document.getElementById('mensajes');
const resMess = document.getElementById('resMess');
const hUser = document.getElementById('hUser');
const divResMess = document.getElementById('divResMess');

// captura el evento de submite del formulario y lo desactiva pero sirve para tomar los datos
sendMess.addEventListener('submit',(e) => {
    e.preventDefault();
    const fyh = new Date();
    const mensaje = { 
        id: 0,
        email: email,
        tipoUser: '',
        fyh: `${fyh.getDate()}/${(fyh.getMonth() + 1)}/${fyh.getFullYear()} ${fyh.getHours()}:${fyh.getMinutes()}`,
        text: texto.value
    };

    socket.emit('nuevoMensaje', mensaje);
    socket.on('historialGlobal',data => {
        render(data);
    });
    texto.value = '';
});

//este trae y muestra todos los menajes apenas se carga la pagina
socket.on('historialChat', data => {
    if(data.length !== 0){
        render(data);
    }else{
        divMensajes.innerHTML = '';
        formChat.reset();
    }
});

// esta funcion muestra en la vista los mensajes, sea mensaje normal o respuesta de un mensaje
// tambien verifica si es usuario administrador o cliente
function render(data){
    const html = data
        .map((elem) => {
            let admin = '';
            let user = elem.email+':';
            let resp = '';
            if(elem.tipoUser == 'Administrador'){
                admin = 'Administrador:';
                user = '';
            }
            if(elem.respuesta.length !== 0){
                let adminRes = '';
                let userRes = elem.respuesta[0].email+':';
                if(elem.respuesta[0].tipoUser == 'Administrador'){
                    adminRes = 'Administrador:';
                    userRes = '';
                }
                resp = `<div style="margin-left:50px; margin-top:-20px">
                <button class="btn btn-outline-secondary" >
                <span style="color: blue">${userRes}<b>${adminRes}</b></span>
                <b> <i>${elem.respuesta[0].text}</i> </b>
                </button>
                <span style="font-size:12px; color:green">${elem.respuesta[0].fyh} </span>
                </div><br>`
            }
            return `<div>
                <button onclick="messageById(${elem.id})" class="btn btn-outline-secondary" >
                    <span style="color: blue">${user}<b>${admin}</b></span>
                    <b> <i>${elem.text}</i> </b>
                    </button>
                    <span style="font-size:12px; color:green">${elem.fyh} </span>
            </div><br>
            ${resp}`
        })
        .join(' ');
        divMensajes.innerHTML = html;
}

async function messageById(id){
    const response = await axios.get(`/mensajes/${id}`);
    if(response.data.respuesta.length == 0){
        renderResponMessage(response.data);
    }
}

function renderResponMessage(data){
    let user = data.email;
    resMess.reset();
    divResMess.style.display = '';
    if(data.tipoUser == 'Administrador'){
        user = 'Administrador:';
    }
    hUser.innerHTML = `<div>
                        <b>${user}: </b>
                        ${data.text}
                    </div>`;
    resMess[0].value = data.id;
}

function cancelResMess(){
    resMess.reset();
    divResMess.style.display = 'none';
    
}

resMess.addEventListener('submit',(e) => {
    e.preventDefault();

    const idMensaje = resMess[0].value;
    const fyh = new Date();
    const mensaje = { 
        email: email,
        tipoUser: '',
        fyh: `${fyh.getDate()}/${(fyh.getMonth() + 1)}/${fyh.getFullYear()} ${fyh.getHours()}:${fyh.getMinutes()}`,
        text: resMess[1].value
    };

    socket.emit('responderMensaje', {idMensaje, mensaje});
    socket.on('historialGlobal',data => {
        render(data);
    });

    resMess[1].value = '';
    divResMess.style.display = 'none';
});
