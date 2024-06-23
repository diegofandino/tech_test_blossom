# Aplicación rick and morty characterers

## Inicio de aplicación

```
1. Descargar(pull) el proyecto desde el repositorio de github: https://github.com/diegofandino/tech_test_blossom
2. Realizar npm install para instalar todas las dependencias del proyecto
3. Dirigirse al puerto http://localhost:5000 en donde se encontrará la app ya en funcionamiento.
```

## Vercel server
```
Se realiza el deploy del aplicativo en:
[Vercel - Test blossom react - typescript](https://tech-test-blossom.vercel.app/ )
```

## Uso API GRAPHQL para traer información
```
1. Principalmente se añade el provider de apollo que es el cliente que nos ayuda a hacer consultas con graphql y al endpoint donde se traerá toda la información
2. se añade una carpeta llamada queries, aquí se encuentran los schemas para hacer la consulta (ya sea general o para el detalle del usuario)
3. dentro del archivo donde lo vamos a usar, hacemos referencia al useQuery proporcionando el archivo donde está la consulta y controlando los eventos (loading, errores y data) con el cual vamos a trabajar
4. esta lista la consulta para poder manipular la información.
```

## Utils
```
En utils estan los archivos más generales como los strings del proyecto (esto hace que sea dinámico) y no tengamos textos hardcodeados, lo mismo para algunos colores personalizados 
```

## Uso de zustand como estado global
```
Como redux, encontramos muchas más librerías que nos permiten manejar el estado global de nuestro aplicativo, en este caso utilicé zustand por la facilidad y la rapidez, además que nos permite usarlo muy bien en este tipo de aplicativos
```

## Modelos
```
Encontramos todas las interfaces y los tipos de datos que utilizamos a lo largo del aplicativo
```

## Components
```
Se utiliza atomic design como patrón de diseño para tener una manera más óptima de obtener información, manipular los datos y las vistas.
```