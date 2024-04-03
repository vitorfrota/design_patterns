import FormRepository from "./FormRepository";

export default class CopyForm {
  constructor(readonly formRepository: FormRepository) {}

  async execute(input: Input): Promise<Output> {
    const { fromFormId, newCategory, newDescription } = input;
    const form = await this.formRepository.getById(fromFormId);
    const newForm = form.clone();
    newForm.setCategory(newCategory);
    newForm.setDescription(newDescription);
    await this.formRepository.save(newForm);
    return { 
      formId: newForm.formId 
    };
  }
}

type Input = {
  fromFormId: string;
  newCategory: string;
  newDescription: string;
}

type Output = {
  formId: string;
}