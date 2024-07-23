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
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { PadawanService } from './padawan.service';
import { ResponsePadawanDto } from 'src/padawan/dto/ResponsePadawan';
import { CreatePadawanDto } from 'src/padawan/dto/CreatePadawan';

@Controller('padawan')
export class PadawanController {
  constructor(private readonly padawanService: PadawanService) {}

  @Get('all')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseInterceptors(new TransformDataInterceptor(ResponsePadawanDto))
  findAll(@Query() params?: { withJedi?: boolean }) {
    return this.padawanService.findAll(params.withJedi);
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseInterceptors(new TransformDataInterceptor(ResponsePadawanDto))
  async findOne(
    @Param('id') id: string | number,
    @Query() params?: { withJedi?: boolean },
  ) {
    return this.padawanService.findOne(id, params.withJedi);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseInterceptors(new TransformDataInterceptor(ResponsePadawanDto))
  @Patch(':id')
  async update(
    @Param('id') id: string | number,
    @Body() updatePadawanDto: UpdatePadawanDto,
    @Query() params?: { withJedi?: boolean },
  ) {
    return this.padawanService.update(id, updatePadawanDto, params.withJedi);
  }

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  @UseInterceptors(new TransformDataInterceptor(ResponsePadawanDto))
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
