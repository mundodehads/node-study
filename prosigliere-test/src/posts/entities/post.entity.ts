import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'BlogPost' })
export class Post {
  @PrimaryColumn({ length: 255 })
  id: string;

  @Column({ length: 255 })
  title: string;

  @Column({ length: 255 })
  content: string;
}
