Nombre: Juan José Morales Cadena	
Materia: Interacción Hombre-Maquina
Informe Técnico: Gestión de Eventos Educativos
1.	Introducción

Este documento explica cómo se desarrolló un sistema para la gestión de eventos educativos, buscando facilitar la organización de congresos, talleres y seminarios dentro de una institución. El sistema permite a los usuarios registrarse, organizar y ver detalles de eventos, ubicaciones y contactos, asegurando una experiencia sencilla y eficiente, basándonos en la Interacción Persona-Ordenador.
2.	 Objetivos del Sistema

Registro de Eventos: Permitir que los usuarios ingresen fácilmente datos de eventos, incluyendo título, participantes, fecha y hora, huso horario, descripción, periodicidad, avisos, categoría y dirección. Gestión de Ubicaciones: Facilitar el registro y la consulta de los lugares donde se harán los eventos, incluyendo nombre, dirección y coordenadas geográficas. 
Administración de Contactos: Ofrecer herramientas para manejar contactos importantes para los eventos, como saludo, nombre completo, identificación, correo, teléfono y foto. Interacción Intuitiva: Diseñar una interfaz que haga que usar el sistema sea simple y eficaz. 
3.	 Entregables

El proyecto tuvo tres entregas principales: Aplicación Web Funcional: La aplicación se hizo con HTML, CSS y JavaScript, y está alojada en un servidor web para que los usuarios puedan acceder sin problemas. Código Fuente Compilable: El código fuente se organizó en tres archivos clave: index. html, styles. css y app. js, y se guardó en un repositorio online (como GitHub o GitLab) para su consulta y revisión. Informe Técnico: Este documento contiene descripciones completas de cada parte del sistema, con pruebas gráficas y justificaciones de las decisiones tomadas en el diseño y desarrollo.
4.	Diseño de la Interfaz

El diseño de la interfaz se hizo siguiendo los principios de interacción persona-ordenador, asegurando que la navegación y el uso sean accesibles. Se añadieron estas características: Navegación con Pestañas: Se usaron pestañas para organizar las secciones de Eventos, Ubicaciones y Contactos, permitiendo a los usuarios cambiar entre ellas fácilmente. Formularios Interactivos: Cada sección tiene formularios para ingresar datos, con validaciones en tiempo real que garantizan la exactitud de la información. 
Listados de Registros: Se crearon listados que muestran los eventos, lugares y contactos ingresados, con opciones para cambiar o eliminar cada elemento. 
Mapa Interactivo: Se añadió un mapa usando la biblioteca Leaflet, que permite a los usuarios seleccionar las coordenadas geográficas de las ubicaciones de los eventos. 
5.	Estructura del Código

El código se organizó en tres archivos principales: index. html: Contiene la estructura básica de la aplicación, incluyendo la cabecera, las pestañas de navegación y las secciones de eventos, lugares y contactos. 
También incluye los enlaces a los archivos CSS y JavaScript. styles. css: Este documento contiene todos los estilos visuales de la aplicación, con un diseño adaptable a diferentes tamaños de pantalla.
 Se diseñaron estilos específicos para formularios, botones, tarjetas de eventos y avisos. app. js: Este archivo contiene la lógica principal de la aplicación, incluyendo la inicialización de datos, la gestión de las interacciones del usuario, la manipulación del DOM y la comunicación con el mapa. Se crearon funciones para añadir, editar y eliminar eventos, ubicaciones y contactos, y para filtrar y buscar información. 
6.	 Funcionalidades Implementadas

Registro de Eventos: Los usuarios pueden crear eventos nuevos, actualizar los existentes y eliminarlos. Se verifica la información ingresada para asegurar que todos los campos obligatorios estén completos.
 Gestión de Ubicaciones: Los usuarios pueden agregar ubicaciones, seleccionando las coordenadas a través de un mapa interactivo. 
Administración de Contactos: Los usuarios pueden añadir y gestionar contactos importantes para los eventos, con la opción de incluir imágenes. Búsqueda y Filtrado: Se añadieron funciones de búsqueda y filtrado en las listas de eventos, ubicaciones y contactos, mejorando la experiencia del usuario.
 Notificaciones: Se agregaron notificaciones visuales para informar a los usuarios sobre el éxito o el fracaso de las acciones realizadas.
