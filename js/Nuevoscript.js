//LISTA DE PRODUCTOS DADA

var productos = [
    {
        id: 1,
        stock:18,
        nombre: "harina",
        precioUnitario: 35,

    },
    {
        id:2,
        stock:18,
        nombre: "pan",
        precioUnitario: 25,

    },
    {
        id: 3,
        stock:18,
        nombre: "papa",
        precioUnitario: 52,

    },
    {
        id: 4,
        stock:18,
        nombre: "palta",
        precioUnitario: 55,

    },
    {
        id: 5,
        stock:18,
        nombre: "fideos",
        precioUnitario: 85,

    },
    {
        id: 6,
        stock:18,
        nombre: "aceite",
        precioUnitario: 350,

    },
    {
        id: 7,
        stock:18,
        nombre: "sopa",
        precioUnitario: 86,

    },
    {
        id: 8,
        stock:18,
        nombre: "mermelada",
        precioUnitario: 108,

    },
    {
        id: 9,
        stock:18,
        nombre: "porotos",
        precioUnitario: 69,

    },
    {
        id: 10,
        stock:18,
        nombre: "lentejas",
        precioUnitario: 85,

    },
    {
        id: 11,
        stock:18,
        nombre: "mandarina",
        precioUnitario: 43,

    },
    {
        id: 12,
        stock:18,
        nombre: "banana",
        precioUnitario: 79,

    },
    {
        id: 13,
        stock:18,
        nombre: "leche de almendras",
        precioUnitario: 145,

    },
    {
        id: 14,
        stock:18,
        nombre: "papel higienico",
        precioUnitario: 147,

    },
    {
        id: 15,
        stock:18,
        nombre: "lavandina",
        precioUnitario: 55,

    },
    {
        id: 16,
        stock:18,
        nombre: "alcohol en gel",
        precioUnitario: 66,

    },
    {
        id: 17,
        stock:18,
        nombre: "shampoo",
        precioUnitario: 400,

    },
    {
        id: 18,
        stock:18,
        nombre: "arroz",
        precioUnitario: 66,
    },
    {
        id: 19,
        stock:18,
        nombre: "harina",
        precioUnitario: 35,
    },
    {
        id: 20,
        stock:18,
        nombre: "salsa de tomate",
        precioUnitario: 35,
    },
];


//Funcion para generar el contenido de la tabla de productos
function AgregarProuctos(producto){
    
    //Nombre Producto
    var tdNombre=document.createElement('td');
    var txtNombre=document.createTextNode(producto.nombre);
    tdNombre.appendChild(txtNombre);
    tdNombre.setAttribute('class', 'nombre')


    //STOCK
    var tdStock=document.createElement('td');
    var txtStock=document.createTextNode(producto.stock);
    tdStock.appendChild(txtStock);


    //Precio unitario
    var tdPrecio=document.createElement('td');
    var txtPrecio=document.createTextNode(producto.precioUnitario);
    tdPrecio.appendChild(txtPrecio);


    //Input(sera para el ingreso de cantidad por el usuario)
    var tdPedido=document.createElement('td');
    var inputPedido=document.createElement('input');
    inputPedido.setAttribute('type', 'text');
    inputPedido.setAttribute('placeHolder', 'Ingrese cantidad aca');
    tdPedido.appendChild(inputPedido);


    //Boton que tomara que  ejecuta la funcion "AGREGAR AL CARRITO"
    var tdBoton=document.createElement('td');
    var boton=document.createElement('button');
    var txtBoton=document.createTextNode('Agregar');
    boton.appendChild(txtBoton);
    tdBoton.appendChild(boton);
    boton.addEventListener('click', agregarCarrito);
    boton.setAttribute('id', producto.id);
    boton.setAttribute('class', 'btn btn-success btn-sm');


    //Aca se crea un tr para cotener los 'td' hechos
    var tr=document.createElement('tr');
    tr.appendChild(tdNombre);
    tr.appendChild(tdStock);
    tr.appendChild(tdPrecio);
    tr.appendChild(tdPedido);
    tr.appendChild(tdBoton);


    //Aca se agrega el tr al tbody que ya existe
    var tbody=document.getElementById("stock");
    tbody.appendChild(tr);

}

//Aca se genera la tabla de productos basada en la estructura
productos.forEach(item=>{
    AgregarProuctos(item);
})


var carritoDeCompras=[];

var id=[];

function agregarCarrito(e){
    var idProducto=e.target.id;
    
    if(id.indexOf(idProducto)== -1){
        //Busco el producto elegido dentro de la estructura de Productos
        var productoElegido=productos.findIndex(item=>item.id==idProducto);
        //Busco los nodos que contienen la cantidad Ingresada y el stock del producto
        var input=e.target.parentNode.previousSibling.firstChild;
        var stock=input.parentNode.previousSibling.previousSibling.firstChild;
        input=input.value;
        //calculo el sub total de  compra del producto  y cantidad elegidos para despues mostrar
        var subTotal=input*productos[productoElegido].precioUnitario;
        stock=parseInt(stock.textContent);


        //ESTO ERA UN OPCIONAL, CUANDO EL PRODUCTO SE CARGA AL CARRITO EL VALOR INGRESADO DESAPARECE DEL INPUT
        //e.target.parentNode.previousSibling.firstChild.value='';



        //Aca controlo que el producto  no haya sido ingresado antes
        var idProductosComprados = carritoDeCompras.findIndex(item => item.id == idProducto);
            if (idProductosComprados != -1){
                alert('el producto que queres Ingresar ya esta en tu carrito');
                return;
            }

        //Aca baja el stock de productos dependiendo de algunas condiciones
        var  stockProducto= productos.findIndex(item=>item.id==idProducto);

            if(input=='' || isNaN(input) ){
                alert("ASEGURATE DE INGRESAR UN VALOR NUMERICO");
                return;
            }
            if(input<=0){
                alert('ASEGURATE DE INGRESAR UN VALOR MAYOR A 0(CERO)');
                return;
            }
            if(stock>=input){
                //aca resto al  stock actual la cantidad pedida por el usuario
                stock=stock-input;
                productos[stockProducto].stock=stock;//se modifica el stock de la estructura
                //cambia el stock en pantalla
                var cambioDeStock=e.target.parentNode.previousSibling.previousSibling.previousSibling.firstChild;
                cambioDeStock.textContent=stock;
            }else{
                alert('no contamos con stock el stock suficiente de: '+ productos[stockProducto].nombre);
                return;
            }

    /**********ACA GENERO MI NUEVA TABLA PARA EL CARRITO*************************/

        // Elemento tabla
        //nombre producto
        var tdNombre=document.createElement('td');
        var txtNombre=document.createTextNode(productos[productoElegido].nombre);
        tdNombre.appendChild(txtNombre);
        tdNombre.setAttribute('class', 'nombre')

        //contidad pedida
        var tdCantidad=document.createElement('td');
        var txtCantidad=document.createTextNode(input);
        tdCantidad.appendChild(txtCantidad);

        //Precio unitario
        var tdPrecio=document.createElement('td');
        var txtPrecio=document.createTextNode(productos[productoElegido].precioUnitario);
        tdPrecio.appendChild(txtPrecio);

        //Precio SubTotal
        var tdSubtotal=document.createElement('td');
        var txtSubtotal=document.createTextNode(subTotal);
        tdSubtotal.appendChild(txtSubtotal);
        tdSubtotal.setAttribute('class','subtotal');

        //boton SACAR DEL CARRITO
        var tdBoton=document.createElement('td');
        var boton=document.createElement('button');
        var txtBoton=document.createTextNode('Sacar');
        boton.appendChild(txtBoton);
        tdBoton.appendChild(boton);
        boton.addEventListener('click', sacarDelCarrito);
        boton.setAttribute('id', 'carrito-'+idProducto);
        boton.setAttribute('class', 'btn btn-success btn-sm');

        //se crea un tr los nodos hechos al nodo tr de tabla
        var tr=document.createElement('tr');
        tr.appendChild(tdNombre);
        tr.appendChild(tdCantidad);
        tr.appendChild(tdPrecio);
        tr.appendChild(tdSubtotal);
        tr.appendChild(tdBoton);

        //se agrega el tr al tbody que ya existe
        var tbody=document.getElementById("pedido");
        tbody.appendChild(tr);

    /************************************************************/

    //Aca se genera la nueva estructura del carrito de compras
    var elArticuloElegido={
        nombre:productos[productoElegido].nombre,
        cantidad:input,
        precioUnitario:productos[productoElegido].precioUnitario,
        subtotal:subTotal,
        id:productos[productoElegido].id,
    };
        //Ingresamos el producto al carrito
        carritoDeCompras.push(elArticuloElegido);
    }

}


//FUNCION para sacar items del CARRITO de compras
function sacarDelCarrito(e){
    //El id del producto sobre el que avamos a trabajar en la funcion
    var identificador=e.target.id;

    var numeroID=identificador.slice(8);
    numeroID=parseInt(numeroID);

    //borro el item de la estructura carrito
    var borrarProducto=carritoDeCompras.findIndex(item=>item.id==numeroID);
    carritoDeCompras.splice(borrarProducto, 1);

    //Aca borramos el producto del carrito  que se ve en pantalla
    var boton=document.getElementById(identificador);
    var nodoABorrar=boton.parentNode.parentNode;
    nodoABorrar.remove();


    //Aca sacamos las unidades del producto a Devolver
    var cantidadADevolver=e.target.parentNode.previousSibling.previousSibling.previousSibling.firstChild;
    cantidadADevolver=parseInt(cantidadADevolver.textContent);

    //Aca reponemos el STOCK del producto en su estructura de ARRAY ORIGINAL
    var  reponerStock= productos.findIndex(item=>item.id==numeroID);
    var stockPreDevolucion=productos[reponerStock].stock;
    var nuevoStock=stockPreDevolucion+cantidadADevolver;
    productos[reponerStock].stock=nuevoStock;

    //El stock vuelve a su cantidad INICIAL
    var tbody=document.getElementById('stock');

    productos.forEach(item=>{
        var ubicacionDelStock=tbody.childNodes[numeroID].firstChild.nextSibling;
        ubicacionDelStock.textContent=nuevoStock;
    })

}

//FUNCION que NOS retona Nuestro Total de compra
var total=0;
function finalizarCompra(e){
    carritoDeCompras.forEach(item=>{
        total+=item.subtotal;
        });
    //console.log('el total es'+total);
    var elTotal=document.querySelector('h3');
    elTotal.innerHTML="El total de tu compra es: $"+total;
    //vuelvo a dar valor Cero al total para que no siga sumando sobre el mismo valor y actualice si saco algun producto
    total=0;
}

console.log(productos);
console.log(carritoDeCompras);





