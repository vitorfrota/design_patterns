import { AverageRepositoryInMemory } from "../AverageRepository";
import CalculateAverage from "../CalculateAverage";
import GetAverage from "../GetAverage";
import { GradeRepositoryInMemory } from "../GradeRepository";
import Mediator from "../Mediator";
import SaveGrade from "../SaveGrade";
import SaveGradeMediator from "../SaveGradeMediator";

test("Deve salvar a nota do aluno e calcular a media", async function(){
  const studentId = Math.round(Math.random() * 100000);
  const gradeRepository = new GradeRepositoryInMemory();
  const averageRepository = new AverageRepositoryInMemory();
  const calculateAverage = new CalculateAverage(gradeRepository, averageRepository);
  const saveGrade = new SaveGrade(gradeRepository, calculateAverage);
  const inputP1 = { studentId, exam: "P1", value: 10 };
  await saveGrade.execute(inputP1);
  const inputP2 = { studentId, exam: "P2", value: 9 };
  await saveGrade.execute(inputP2);
  const inputP3 = { studentId, exam: "P3", value: 8 };
  await saveGrade.execute(inputP3);
  const getAverage = new GetAverage(averageRepository);
  const output = await getAverage.execute(studentId);
  expect(output.average).toBe(9);
});

test.only("Deve salvar a nota do aluno e calcular a media usando o mediator", async function(){
  const studentId = Math.round(Math.random() * 100000);
  const gradeRepository = new GradeRepositoryInMemory();
  const averageRepository = new AverageRepositoryInMemory();
  const mediator = new Mediator();
  const calculateAverage = new CalculateAverage(gradeRepository, averageRepository);
  mediator.register("gradeSaved", async (data: any) => {
    await calculateAverage.execute(data.studentId);
  })
  const saveGrade = new SaveGradeMediator(gradeRepository, mediator);
  const inputP1 = { studentId, exam: "P1", value: 10 };
  await saveGrade.execute(inputP1);
  const inputP2 = { studentId, exam: "P2", value: 9 };
  await saveGrade.execute(inputP2);
  const inputP3 = { studentId, exam: "P3", value: 8 };
  await saveGrade.execute(inputP3);
  const getAverage = new GetAverage(averageRepository);
  const output = await getAverage.execute(studentId);
  expect(output.average).toBe(9);
});