import Average from "./Average";

export default interface AverageRepository {
  getByStudentId(studentId: number): Promise<Average | undefined>;
  save(average: Average): Promise<void>;
}

export class AverageRepositoryInMemory implements AverageRepository {
  averages: Average[];

  constructor () {
    this.averages = [];
  }

  async getByStudentId(studentId: number): Promise<Average | undefined> {
    const average = this.averages.find(average => average.studentId === studentId);
    return average;
  }

  async save(average: Average): Promise<void> {
    this.averages.push(average);
  }

}