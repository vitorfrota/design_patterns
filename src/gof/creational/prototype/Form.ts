import Field from "./Field";
import Prototype from "./Prototype";

export default class Form implements Prototype {
  private fields: Field[];

  constructor(readonly formId: string, private category: string, private description: string){
    this.fields = [];
  }

  static create(category: string, description: string){
    const formId = crypto.randomUUID();
    return new Form(formId, category, description);
  }

  addField(type: string, title: string){
    this.fields.push(Field.create(type, title));
  }

  clone(): Form {
    const newForm = Form.create(this.category, this.description);
    const fields: Field[] = [];
    for(const field of this.fields) {
      fields.push(field.clone());
    }
    newForm.fields = fields;
    return newForm;
  }

  getCategory(){
    return this.category;
  }

  getDescription(){
    return this.description;
  }

  getFields(){
    return this.fields;
  }

  setCategory(category: string){
    this.category = category;
  }

  setDescription(description: string){
    this.description = description;
  }
}