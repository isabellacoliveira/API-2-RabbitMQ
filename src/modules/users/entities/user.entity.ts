import { Exclude } from 'class-transformer';
import { randomUUID } from 'node:crypto'; // pacote do node

export class User {
  readonly id: string;
  name: string;
  email: string;
  // remover a password do retorno da nossa requisição
  @Exclude()
  password: string;

  constructor() {
    // quando a classe for instanciada dentro do construtor, queremos gerar o id
    this.id = randomUUID();
  }
}
