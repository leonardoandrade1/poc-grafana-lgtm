import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Customer')
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  public static New(
    name: string,
    email: string,
    phoneNumber: string,
  ): Customer {
    const entity = new Customer();
    entity.name = name;
    entity.email = email;
    entity.phoneNumber = phoneNumber;
    return entity;
  }
}
