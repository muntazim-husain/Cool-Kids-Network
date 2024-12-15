import { Controller, Get, Query, ParseIntPipe } from '@nestjs/common';
import { CharactersService } from './characters.service';

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Get('my-character')
  async getCharacter(@Query('userId', ParseIntPipe) userId: number) {
    return this.charactersService.getCharacterByUserId(userId);
  }
}
