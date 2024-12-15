import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { CharactersModule } from './characters/characters.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(), 
    UsersModule, 
    CharactersModule,
    AuthModule
  ],
})
export class AppModule {}
