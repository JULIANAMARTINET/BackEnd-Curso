import fs from "fs";

class Container {
  constructor(fileName) {
    this.filePath = `__dirname+"/"${fileName}.json`;
  }

  generateId() {
    return new Date().getTime().toString();
  }

  async getAll() {
    try {
      const file = await fs.promises.readFile(this.filePath);
      const elements = JSON.parse(file);

      return elements;
    } catch (error) {
      console.log(error);
      if (error.code === "ENOENT") {
        await fs.promises.writeFile(this.filePath, JSON.stringify([], null, 3));
      }
      return [];
    }
  }
  async update(id, objMod) {
    try {
      objMod["id"] = id;
      const elementos = await this.getAll();
      const obj = elementos.find((el) => el.id == id);
      if (!obj) throw new Error("no existe el id " + id);
      const elementosModificados = elementos.map((item) => {
        if (item.id == id) return objMod;
        return item;
      });
      this.writeData(elementosModificados);
      return objMod;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }

  async getById(id) {
    try {
      const elements = await this.getAll();
      const foundElement = elements.find((element) => element.id == id);

      if (!foundElement) return null;

      return foundElement;
    } catch (error) {
      console.log(error);
    }
  }

  async create(element) {
    try {
      const readFile = await this.getAll();
      element.id = this.generateId();
      readFile.push(element);
      this.writeData(readFile);
      return element;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }


  async delete(id) {
    try {
        const objects=await this.getAll()
        const filterObjects= objects.filter(el =>  el.id != id );
        this.writeData(filterObjects);
    } catch (err) {
        throw new Error(err);
    }
}

  async deleteAll() {
    try {
      await fs.promises.writeFile(this.filePath, JSON.stringify([], null, 3));
    } catch (error) {
      console.log(error);
    } 
  }

  readData(path) {
    const data = JSON.parse(fs.readFileSync(path, "utf-8") || "[]");
    return data;
  }
  writeData(objects) {
    fs.writeFileSync(this.fileName, JSON.stringify(objects, null, 2));
  }
}

export { Container };
