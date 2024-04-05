import { NormalFareCalculator, OvernightFareCalculator, SundayFareCalculator, SundayOvernightFareCalculator } from "../FareCalculator";
import Ride from "../Ride";

test("Deve calcular o valor da corrida em horario normal", function(){
  const sundayOvernightCalcultaor = new SundayOvernightFareCalculator();
  const sundayFareCalculator = new SundayFareCalculator(sundayOvernightCalcultaor);
  const overnightFareCalculator = new OvernightFareCalculator(sundayFareCalculator);  
  const normalFareCalculator = new NormalFareCalculator(overnightFareCalculator);
  const ride = new Ride(normalFareCalculator);
  ride.addSegment(10, new Date("2021-03-01T10:00:00"));
  ride.calculateFare();
  expect(ride.getFare()).toBe(21);
});