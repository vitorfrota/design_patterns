import pgp from "pg-promise";
import ParkingTicket from "./ParkingTicket";

export default interface ParkingTicketRepository {
  getByPlate(plate: string): Promise<ParkingTicket | undefined>;
  save(parkingTicket: ParkingTicket): Promise<void>;
  update(parkingTicket: ParkingTicket): Promise<void>;
}

export class ParkingTicketRepositoryMemory implements ParkingTicketRepository {
  parkingTickets: ParkingTicket[];

  constructor() {
    this.parkingTickets = [];
  }

  async getByPlate(plate: string): Promise<ParkingTicket | undefined> {
    const parkingTicket = this.parkingTickets.find(parkingTicket => parkingTicket.plate === plate);
    return parkingTicket;
  }

  async save(parkingTicket: ParkingTicket): Promise<void> {
    this.parkingTickets.push(parkingTicket);
  }

  async update(parkingTicket: ParkingTicket): Promise<void> {
    const index = this.parkingTickets.findIndex(item => item.plate === parkingTicket.plate);
    this.parkingTickets.slice(index, 1);
    this.parkingTickets.push(parkingTicket);
  }

}

export class ParkingTicketRepositoryDatabase implements ParkingTicketRepository {
  URI_DATABASE = "postgres://postgres:postgres@localhost:5433/cccat16";
  async getByPlate(plate: string): Promise<ParkingTicket | undefined> {
    const connection = pgp()(this.URI_DATABASE);
    const [parkingTicketData] = await connection.query("select * from design_patterns.parking_ticket where plate = $1", [plate]);
    await connection.$pool.end();
    return new ParkingTicket(parkingTicketData.plate, parkingTicketData.checkin_date, parkingTicketData.location);
  }

  async save(parkingTicket: ParkingTicket): Promise<void> {
    const connection = pgp()(this.URI_DATABASE);
    await connection.query("insert into design_patterns.parking_ticket (plate, checkin_date, location, fare) values($1, $2, $3, $4)", [parkingTicket.plate, parkingTicket.checkinDate, parkingTicket.location, parkingTicket.fare]);
    await connection.$pool.end();
  }

  async update(parkingTicket: ParkingTicket): Promise<void> {
    const connection = pgp()(this.URI_DATABASE);
    await connection.query("update design_patterns.parking_ticket set checkout_date = $1, fare = $2 where plate = $3", [parkingTicket.checkoutDate, parkingTicket.fare,parkingTicket.plate]);
    await connection.$pool.end();
  }
  
}