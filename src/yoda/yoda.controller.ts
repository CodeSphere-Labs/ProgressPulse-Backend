import { YodaService } from 'src/yoda/yoda.service';
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
} from '@nestjs/common';
import { TransformDataInterceptor } from 'src/interceptors/transform.data';
import { ResponseYoda } from 'src/yoda/dto/ResponseYoda';
import { UpdateYodaDto } from 'src/yoda/dto/UpdateYoda';
import { CreateYodaDto } from 'src/yoda/dto/CreateYoda';

@Controller('yoda')
export class YodaController {
  constructor(private readonly yodaService: YodaService) {}

  @Get('all')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseInterceptors(new TransformDataInterceptor(ResponseYoda))
  findAll() {
    return this.yodaService.findAll();
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseInterceptors(new TransformDataInterceptor(ResponseYoda))
  async findOne(@Param('id') id: string | number) {
    return this.yodaService.findOne(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseInterceptors(new TransformDataInterceptor(ResponseYoda))
  @Patch(':id')
  async update(
    @Param('id') id: string | number,
    @Body() updateYodaDto: UpdateYodaDto,
  ) {
    return this.yodaService.update(id, updateYodaDto);
  }

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  @UseInterceptors(new TransformDataInterceptor(ResponseYoda))
  create(@Body() createYodaDto: CreateYodaDto) {
    return this.yodaService.create(createYodaDto);
  }

  @Delete(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseInterceptors(new TransformDataInterceptor(ResponseYoda))
  delete(@Param('id') id: string | number) {
    return this.yodaService.delete(id);
  }
}
