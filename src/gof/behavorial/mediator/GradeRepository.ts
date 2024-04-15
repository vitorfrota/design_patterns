import Grade from "./Grade";

export default interface GradeRepository {
  listByStudentId(studentId: number): Promise<Grade[]>;
  save(grade: Grade): Promise<void>;
}

export class GradeRepositoryInMemory implements GradeRepository {
  grades: Grade[];

  constructor () {
    this.grades = [];
  }

  async listByStudentId(studentId: number): Promise<Grade[]> {
    const grades = this.grades.filter(grade => grade.studentId === studentId);
    return grades;
  }

  async save(grade: Grade): Promise<void> {
    this.grades.push(grade);
  }

}