const tbody = document.getElementById('tbody'); 
$(document).ready(function(){
        listar();
})


function listar(){
    $.ajax({
        type:"GET",
        url: "http://localhost:8000/api/editoriales",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
        let editoriales = data;
        $('#Table > tbody').empty();
        if(editoriales.length>0){
            $.each(editoriales, function (i, item) {
                let btnEditar ='<button type="button" class="btn btn-warning openModal"  data-op="1" data-id="'+item.codigo_editorial+'" data-nombre="'+item.nombre_editorial+'" data-contacto="'+item.contacto+'"  data-telefono="'+item.telefono+'"   data-bs-toggle="modal" data-bs-target="#ModalEditoriales">Editar</button>';
                let btnEliminar = '<button class="btn btn-danger openModal2"  data-op="2"  data-id="'+item.codigo_editorial+'" data-bs-toggle="modal" data-bs-target="#EliminarEditorial">Eliminar</button>';
                $('#Table > tbody').append(
                    '<tr>'+
                    '<td>'+item.codigo_editorial+'</td>'+
                    '<td>'+item.nombre_editorial+'</td>'+
                    '<td>'+item.contacto+'</td>'+
                    '<td>'+item.telefono+'</td>'+
                    '<td>'+btnEditar+' '+btnEliminar+'</td>'
                )
            });
        }
        },
        failure: function (data) {
        alert(data.responseText);
        },
        error: function (data) {
        alert(data.responseText);
    }
});
}

const buttonEditar = document.querySelector('#guardar')
buttonEditar.addEventListener('click',function(){
    let nombre_editorial = document.getElementById('nombre_editorial').value;
    let codigo_editorial = document.getElementById('codigo_editorial').value;
    let contacto = document.getElementById('contacto').value;
    let telefono = document.getElementById('telefono').value;
    $.ajax({
        url: "http://localhost:8000/api/editoriales",
        type: "Post",
        data: JSON.stringify({
        codigo_editorial: codigo_editorial,
        nombre_editorial: nombre_editorial,
        contacto: contacto,
        telefono: telefono
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
        alert('Registro aregado exitosamente !!!');
        location.reload();
        },
           failure: function (data)
        {
            alert(data.responseText);
           },
           error: function (data)
           {
            alert(data.responseText);
           }
    } );
});


$(document).on('click','.openModal',function(){
    var opcion = $(this).attr('data-op');
    if(opcion=='1'){
        var codigo_editorial=$(this).attr('data-id');
        var nombre_editorial=$(this).attr('data-nombre');
        var contacto=$(this).attr('data-contacto');
        var telefono=$(this).attr('data-telefono');
        $('#codigoInput').val(codigo_editorial);
        $('#nombreInput').val(nombre_editorial);
        $('#telefonoInput').val(telefono);
        $('#contactoInput').val(contacto);
    }
})

const editarButton = document.getElementById('Editar');
editarButton.addEventListener('click',function(){
    nombre_editorial = document.getElementById('nombreInput').value;
    codigo_editorial = document.getElementById('codigoInput').value;
    contacto = document.getElementById('contactoInput').value;
    telefono = document.getElementById('telefonoInput').value;
    $.ajax({
        url: "http://localhost:8000/api/editoriales/"+codigo_editorial,
        type: "PUT",
        data: JSON.stringify({
        codigo_editorial: codigo_editorial,
        nombre_editorial: nombre_editorial,
        contacto: contacto,
        telefono: telefono
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
        alert('modificado  exitosamente !!!');
        location.reload();
        },
           failure: function (data)
        {
            alert('Fallo error');
           },
           error: function (data)
           {
            alert(data.responseText);
           }
    } );
})


$(document).on('click','.openModal2',function(){
    var opcion = $(this).attr('data-op');
    if(opcion=='2'){
        var codigo_editorial=$(this).attr('data-id');
        $('#eliminarId').val(codigo_editorial);
        $('#eliminarId').disabled='true';
    }
})


const eliminar = document.getElementById('Eliminar');
eliminar.addEventListener('click',function() {
    let codigo_editorial = document.getElementById('eliminarId').value;
    $.ajax({
        type:"DELETE",
        url: "http://localhost:8000/api/editoriales/"+codigo_editorial,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
            alert('Editorial elimnada exitosamente');
            location.reload();
        },
        failure: function (data) {
        alert(data.responseText);
        },
        error: function (data) {
        alert(data.responseText);
    }
});
})

