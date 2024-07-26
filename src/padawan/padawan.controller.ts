import { UpdatePadawanDto } from 'src/padawan/dto/UpdatePadawan';
import { TransformDataInterceptor } from './../interceptors/transform.data';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { PadawanService } from './padawan.service';
import { ResponsePadawanDto } from 'src/padawan/dto/ResponsePadawan';
import { CreatePadawanDto } from 'src/padawan/dto/CreatePadawan';
import { ResponseCreatePadawanDto } from 'src/padawan/dto/ResponseCreate';
import { HashPasswordPipe } from 'src/pipes/hashPassword.pipe';

@Controller('padawan')
export class PadawanController {
  constructor(private readonly padawanService: PadawanService) {}

  @Get('all')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseInterceptors(new TransformDataInterceptor(ResponsePadawanDto))
  findAll() {
    return this.padawanService.findAll();
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseInterceptors(new TransformDataInterceptor(ResponsePadawanDto))
  async findOne(@Param('id') id: string | number) {
    return this.padawanService.findOne(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseInterceptors(new TransformDataInterceptor(ResponsePadawanDto))
  @Patch(':id')
  async update(
    @Param('id') id: string | number,
    @Body() updatePadawanDto: UpdatePadawanDto,
  ) {
    return this.padawanService.update(id, updatePadawanDto);
  }

  @Post()
  @UsePipes(new HashPasswordPipe())
  @UseInterceptors(ClassSerializerInterceptor)
  @UseInterceptors(new TransformDataInterceptor(ResponseCreatePadawanDto))
  create(@Body() createPadawanDto: CreatePadawanDto) {
    return this.padawanService.create(createPadawanDto);
  }

  @Delete(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseInterceptors(new TransformDataInterceptor(ResponsePadawanDto))
  delete(@Param('id') id: string | number) {
    return this.padawanService.delete(id);
  }
}
