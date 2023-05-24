import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('contacts')
class Contact {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  completeName: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: false, unique: true })
  tellphone: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true, unique: true })
  secondEmail: string;

  @Column({ nullable: true, unique: true })
  secondTellphone: string;

  @ManyToOne(() => User, (user) => user.contacts)
  owner: User;
}

export default Contact;
