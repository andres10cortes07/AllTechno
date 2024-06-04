import { connection } from "./connection.mjs";

const codeForQueryRandom = `(
  SELECT 'cellphones' AS tabla, BIN_TO_UUID(celulares.id) AS id, celulares.marca, celulares.modelo, celulares.precio,
         recursos.url1, recursos.url2, recursos.url3, recursos.url4, recursos.url5, recursos.url6
  FROM celulares
  LEFT JOIN recursos ON celulares.recursos_id_recurso = recursos.id_recurso
  ORDER BY RAND()
  LIMIT 1
)
UNION ALL
(
  SELECT 'powerSupplies' AS tabla, BIN_TO_UUID(fuentesdepoder.id) AS id, fuentesdepoder.marca, fuentesdepoder.modelo, fuentesdepoder.precio,
         recursos.url1, recursos.url2, recursos.url3, recursos.url4, recursos.url5, recursos.url6
  FROM fuentesdepoder
  LEFT JOIN recursos ON fuentesdepoder.recursos_id_recurso = recursos.id_recurso
  ORDER BY RAND()
  LIMIT 1
)
UNION ALL
(
  SELECT 'screens' AS tabla, BIN_TO_UUID(pantallas.id) AS id, pantallas.marca, pantallas.modelo, pantallas.precio,
         recursos.url1, recursos.url2, recursos.url3, recursos.url4, recursos.url5, recursos.url6
  FROM pantallas
  LEFT JOIN recursos ON pantallas.recursos_id_recurso = recursos.id_recurso
  ORDER BY RAND()
  LIMIT 1
)
UNION ALL
(
  SELECT 'laptops' AS tabla, BIN_TO_UUID(portatiles.id) AS id, portatiles.marca, portatiles.modelo, portatiles.precio,
         recursos.url1, recursos.url2, recursos.url3, recursos.url4, recursos.url5, recursos.url6
  FROM portatiles
  LEFT JOIN recursos ON portatiles.recursos_id_recurso = recursos.id_recurso
  ORDER BY RAND()
  LIMIT 1
)
UNION ALL
(
  SELECT 'processors' AS tabla, BIN_TO_UUID(procesadores.id) AS id, procesadores.marca, procesadores.modelo, procesadores.precio,
         recursos.url1, recursos.url2, recursos.url3, recursos.url4, recursos.url5, recursos.url6
  FROM procesadores
  LEFT JOIN recursos ON procesadores.recursos_id_recurso = recursos.id_recurso
  ORDER BY RAND()
  LIMIT 1
)
UNION ALL
(
  SELECT 'ram' AS tabla, BIN_TO_UUID(ram.id) AS id, ram.marca, ram.modelo, ram.precio,
         recursos.url1, recursos.url2, recursos.url3, recursos.url4, recursos.url5, recursos.url6
  FROM ram
  LEFT JOIN recursos ON ram.recursos_id_recurso = recursos.id_recurso
  ORDER BY RAND()
  LIMIT 1
);

`

export class ModelsIndex {
    static getNewProducts = async () => {
        const [newProducts] = await connection.query(codeForQueryRandom)

        if (newProducts.length == 0) return false
        return newProducts
    }

    static getSelledProducts = async () => {
        const [selledProducts] = await connection.query(codeForQueryRandom)

        if (selledProducts.length == 0) return false
        return selledProducts
    }

    static searchProducts = async ({ search }) => {
      const [results] = await connection.query(
        `
        (
          SELECT 'cellphones' AS tabla, BIN_TO_UUID(id) AS id, CONCAT(marca, ' ', modelo) AS union_tablas
          FROM celulares
          WHERE CONCAT(marca, ' ', modelo) LIKE '%${search}%'
          )
          UNION ALL
          (
          SELECT 'powerSupplies' AS tabla, BIN_TO_UUID(id) AS id, CONCAT(marca, ' ', modelo) AS union_tablas
          FROM fuentesdepoder
          WHERE CONCAT(marca, ' ', modelo) LIKE '%${search}%'
          )
          UNION ALL
          (
          SELECT 'screens' AS tabla, BIN_TO_UUID(id) AS id, CONCAT(marca, ' ', modelo) AS union_tablas
          FROM pantallas
          WHERE CONCAT(marca, ' ', modelo) LIKE '%${search}%'
          )
          UNION ALL
          (
          SELECT 'laptops' AS tabla, BIN_TO_UUID(id) AS id, CONCAT(marca, ' ', modelo) AS union_tablas
          FROM portatiles
          WHERE CONCAT(marca, ' ', modelo) LIKE '%${search}%'
          )
          UNION ALL
          (
          SELECT 'processors' AS tabla, BIN_TO_UUID(id) AS id, CONCAT(marca, ' ', modelo) AS union_tablas
          FROM procesadores
          WHERE CONCAT(marca, ' ', modelo) LIKE '%${search}%'
          )
          UNION ALL
          (
          SELECT 'ram' AS tabla, BIN_TO_UUID(id) AS id, CONCAT(marca, ' ', modelo) AS union_tablas
          FROM ram
          WHERE CONCAT(marca, ' ', modelo) LIKE '%${search}%'
          )
        UNION ALL
        (
        SELECT 'desktopComputers' AS tabla, BIN_TO_UUID(id) AS id, CONCAT(procesador, ' ' ,grafica, ' ' ,board, ' ' ,chasis) AS componentesInterior FROM torreescritorio
        WHERE CONCAT(procesador, ' ' ,grafica, ' ' ,board, ' ' ,chasis) LIKE '%${search}%'
        );
        `
      )

      if(results.length == 0) return false
      return results
    }
}