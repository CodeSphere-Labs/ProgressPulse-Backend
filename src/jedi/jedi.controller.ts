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
import { CreateJediDto } from './dto/CreateJedi';
import { ResponseCreateJediDto } from './dto/ResponseCreate';

@Controller('jedi')
export class JediController {
  constructor(private readonly jediService: JediService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  @UseInterceptors(new TransformDataInterceptor(ResponseJediDto))
  findAll() {
    return this.jediService.findAll();
  }

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  @UseInterceptors(new TransformDataInterceptor(ResponseCreateJediDto))
  create(@Body() createJediDto: CreateJediDto) {
    return this.jediService.create(createJediDto);
  }
}
