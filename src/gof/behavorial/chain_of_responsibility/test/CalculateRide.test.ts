import { calculateFare } from "../calc";

test("Deve calcular o valor da corrida em horario normal", function(){
  const segments = [
    { distance: 10, date: new Date("2021-03-01T10:00:00") }
  ];

  const fare = calculateFare(segments);
  expect(fare).toBe(21);
});

test("Deve calcular o valor da corrida em horario noturno", function(){
  const segments = [
    { distance: 10, date: new Date("2021-03-01T23:00:00") }
  ];

  const fare = calculateFare(segments);
  expect(fare).toBe(39);
});

test("Deve calcular o valor da corrida em horario domingo", function(){
  const segments = [
    { distance: 10, date: new Date("2021-03-07T14:00:00") }
  ];

  const fare = calculateFare(segments);
  expect(fare).toBe(29);
});

test("Deve calcular o valor da corrida em horario domingo noturno", function(){
  const segments = [
    { distance: 10, date: new Date("2021-03-07T23:00:00") }
  ];

  const fare = calculateFare(segments);
  expect(fare).toBe(50);
});

test("Nao deve calcular o valor da corrida se distancia for invalida", function(){
  const segments = [
    { distance: null, date: new Date("2021-03-07T23:00:00") }
  ];

  expect(()=> calculateFare(segments)).toThrow(new Error("Invalid distance"));
});

test("Nao deve calcular o valor da corrida se data for invalida", function(){
  const segments = [
    { distance: 10, date: null }
  ];

  expect(()=> calculateFare(segments)).toThrow(new Error("Invalid date"));
});