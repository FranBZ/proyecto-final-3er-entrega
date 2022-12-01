# TERCERA ENTREGA DEL PROYECTO FINAL
Avance de la aplicación eCommerce Backend correspondiente a la tercera entrega del proyecto final.

## Se debe entregar:

### Un menú de registro y autenticación de usuarios basado en passport local, guardando en la base de datos las credenciales y el resto de los datos ingresados al momento del registro.
- El registro de usuario consiste en crear una cuenta en el servidor almacenada en la base de
datos, que contenga el email y password de usuario, además de su nombre, dirección, edad,
número de teléfono (debe contener todos los prefijos internacionales) y foto ó avatar. La
contraseña se almacenará encriptada en la base de datos.
- La imagen se podrá subir al servidor y se guardará en una carpeta pública del mismo a la cual
se tenga acceso por url.

### Envío de un email y un mensaje de whatsapp al administrador desde el servidor, a un número de contacto almacenado en una constante global.
- El usuario iniciará la acción de pedido en la vista del carrito.
- Será enviado una vez finalizada la elección para la realizar la compra de productos.
- El email contendrá en su cuerpo la lista completa de productos a comprar y en el asunto la frase
'nuevo pedido de ' y el nombre y email del usuario que los solicitó. En el mensaje de whatsapp
se debe enviar la misma información del asunto del email.
- El usuario recibirá un mensaje de texto al número que haya registrado, indicando que su pedido
ha sido recibido y se encuentra en proceso.

## Aspectos a incluir:
- El servidor trabajará con una base de datos DBaaS (Ej. MongoDB Atlas) y estará preparado
para trabajar en forma local o en la nube a través de la plataforma PaaS Heroku.
- Habilitar el modo cluster para el servidor, como opcional a través de una constante global.
- Utilizar alguno de los loggers ya vistos y así reemplazar todos los mensajes a consola por logs
eficientes hacia la misma consola. En el caso de errores moderados ó graves el log tendrá
además como destino un archivo elegido.
- Realizar una prueba de performance en modo local, con y sin cluster, utilizando Artillery en el
endpoint del listado de productos (con el usuario vez logueado). Verificar los resultados.

<sup>
- Formato: link a un repositorio en Github con el proyecto cargado.
- Sugerencia: no incluir los node_modules
</sup>

## Como ejecutar el proyecto

### En tu pc
- Antes que nada debes tener instalado en tu pc node.js, debes tener una cuenta en twilio con un numero configurado para wsp y sms, y una cuenta de gmail configurada para poder utilizar nodemailer
- Debes clonar el repositorio
- Abrir una terminal y en ella dirigirte a la carpeta con el nombre del proyecto
- Ejecutar el comando ``` npm install ```
- Deves configurar un archivo ``` .env ``` con los siguientes datos
    ```
    MONGO_USER = "< usuario de mongo atlas >"
    MONGO_PASS = "< contraseña de mongo atlas >"
    MONGO_ATLAS_ENDPOINT = "< @cluster0.aaa111.mongodb.net/db >"

    ACCOUNT_SID = "< account sid de twilio >"
    AUTH_TOKEN = "< auth token de twilio >"
    NRO_WSP = "< numero de twilio configurado para recibir WSP >"
    NRO_TWILIO = "< numero de twilio configurado para recibir SMS >"

    TEST_MAIL = "< cuenta de gmail para los test >"
    TEST_MAIL_PASS = "< password que brinda gmail para utilizar el servicio >"
    ```
- Una vez finalizado el punto anterior, ejecutar el comando ``` npm run start ``` para modo FORK
- Para poder pejecutar el MODO CLUSTER debes pasar como parametro N° de puerto y la opcion CLUSTER, ej: ``` npm run start -- 8080 CLUSTER  ```
- Luego puedes utilizar Postman, insomia o tu programa favorito para testear los diferentes endpoints