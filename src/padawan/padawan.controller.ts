import { UpdatePadawanDto } from 'src/padawan/dto/UpdatePadawan';
import { TransformDataInterceptor } from '../common/interceptors/transform.data';
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
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { PadawanService } from './padawan.service';
import { ResponsePadawanDto } from 'src/padawan/dto/ResponsePadawan';
import { CreatePadawanDto } from 'src/padawan/dto/CreatePadawan';
import { HashPasswordPipe } from '../common/pipes/HashPassword.pipe';
import { AccessTokenGuard } from '../common/guards/accessToken.guard';

@Controller('padawan')
export class PadawanController {
  constructor(private readonly padawanService: PadawanService) {}

  @Get('all')
  @UseGuards(AccessTokenGuard)
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
  @UsePipes(new HashPasswordPipe())
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
