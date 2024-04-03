import CopyForm from "../CopyForm";
import Form from "../Form";
import { FormRepositoryMemory } from "../FormRepository";

test("Deve copiar um formulário", async function (){
  const formRepository = new FormRepositoryMemory();
  const form = Form.create("Marketing", "Leads v1");
  form.addField("text", "name");
  form.addField("text", "email");
  form.addField("text", "phoneNumber");
  form.addField("text", "age");
  await formRepository.save(form);
  const copyFormUsecase = new CopyForm(formRepository);
  const input = {
    fromFormId: form.formId,
    newCategory: "Marketing",
    newDescription: "Leads v2"
  };

  const output = await copyFormUsecase.execute(input);
  const newForm = await formRepository.getById(output.formId);
  expect(newForm.getDescription()).toBe("Leads v2");
  expect(newForm.getFields()).toHaveLength(4);
  expect(newForm.getFields()[0].title).toBe("name");
  expect(newForm.getFields()[1].title).toBe("email");
});