
const socket = io.connect();

const createProductTable = async (products) => {
    const template = await fetch("views/list-products.handlebars");
    const templateText = await template.text();
    const templateCompiled = Handlebars.compile(templateText);
    return templateCompiled({ products });
  };
  
  const addProduct = () => {
    const title = document.getElementById("title");
    const price = document.getElementById("price");
    const thumbnail = document.getElementById("thumbnail");
  
    if (!title.value || !price.value) {
      alert("Debe completar los campos");
    }
  
    socket.emit("add-product", {
      title: title.value,
      price: price.value,
      thumbnail: thumbnail.value,
    });
    title.value = "";
    price.value = "";
    thumbnail.value = "";
  };
  
  document.getElementById("add-product").addEventListener("click", addProduct);
  
  socket.on("products", async (products) => {
    const template = await createProductTable(products);
    document.getElementById("products").innerHTML = template;
  });