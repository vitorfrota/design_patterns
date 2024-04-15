import AverageRepository from "./AverageRepository";

export default class GetAverage {
  constructor (readonly averageRepository: AverageRepository) {}
  
  async execute(studentId: number): Promise<Output> {
    const average = await this.averageRepository.getByStudentId(studentId);
    if(!average) throw new Error("Average not found");
    return {
      average: average.value
    }
  }
}

type Output = {
  average: number;
}