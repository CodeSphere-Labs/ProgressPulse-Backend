import { TransformDataInterceptor } from './../interceptors/transform.data';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { JediService } from './jedi.service';
import { ResponseJediDto } from './dto/ResponseJedi';
import { ResponseCreateJediDto } from './dto/ResponseCreate';
import { CreateUserDto } from 'src/database/dto/User.dto';

@Controller('jedi')
export class JediController {
  constructor(private readonly jediService: JediService) {}

  @Get('all')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseInterceptors(new TransformDataInterceptor(ResponseJediDto))
  findAll() {
    return this.jediService.findAll();
  }

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  @UseInterceptors(new TransformDataInterceptor(ResponseCreateJediDto))
  create(@Body() createJediDto: CreateUserDto) {
    return this.jediService.create(createJediDto);
  }
}
