const products =[
    {
        id: "1",
        name: "1 pregunta al tarot",
        price:2300,
        category: "lecturas",
        image:"https://d2r9epyceweg5n.cloudfront.net/stores/002/691/752/products/foto-1-preg11-471fe291a42e62c60316720904453948-1024-1024.webp",
        description:"ncluye una respuesta completa a una pregunta específica al tarot y consejos. Te recomiendo este servicio si queres preguntar sobre: proyectos, trabajo, alguna otra situación específica.",
    },
    {
        id: "2",
        name: "conectando brujas",
        price:14500,
        category:"cursos",
        image:"https://d2r9epyceweg5n.cloudfront.net/stores/002/691/752/products/dsc07487-143c8a81150d9d869517013651914339-480-0.webp",
        description:"Consta de tres partes y algunos regalitos: clase sobre la energía de los colores, ritual y meditación  para conectar con la creatividad, y el pintado de una tote bag que podrás quedarte! 🎀🛍",
    },
    {
        id: "3",
        name: "Mazo conectar",
        price:"14000",
        category:"conectar",
        image:"https://d2r9epyceweg5n.cloudfront.net/stores/002/691/752/products/ea0b1ecf-8d5f-45d1-b52c-ee4a9e8c83e6-9294f3eda82bc955f316961006910925-480-0.webp",
        description:"Conectar es un mazo de 29 cartas con mensajes evolutivos. Cada una tiene una palabra clave, un mensaje y una recomendación de cristal para trabajar la temática de la carta.",
    },
]

export const getProducts=()=>{
    return new Promise ((resolve)=>{
        setTimeout(()=>{
            resolve(products)
        },20)
    })
}

export const getProductById = (productId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Products array:", products);
            console.log("Requested productId:", productId);

            const product = products.find((prod) => prod.id === productId);

            console.log("Resolved product:", product);

            resolve(product);
        }, 20);
    });
};


  
  export const getProductByCategory = (productCategory) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(products.filter((prod) => prod.category === productCategory));
      }, 20);
    });
  };
  