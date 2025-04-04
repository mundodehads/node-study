import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Post } from './post.entity';

@Entity()
export class Comment {
  @PrimaryColumn({ length: 255 })
  id: string;

  @Column({ length: 255 })
  content: string;

  @ManyToOne(() => Post, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'blogpost_id' })
  blogpost: Post;
}
