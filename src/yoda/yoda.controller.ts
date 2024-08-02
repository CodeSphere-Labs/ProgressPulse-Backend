import { ApiTags } from '@nestjs/swagger';
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
  UsePipes,
} from '@nestjs/common';
import { TransformDataInterceptor } from 'src/common/interceptors/transform.data';
import { ResponseYoda } from 'src/yoda/dto/ResponseYoda';
import { UpdateYodaDto } from 'src/yoda/dto/UpdateYoda';
import { CreateYodaDto } from 'src/yoda/dto/CreateYoda';
import { HashPasswordPipe } from '../common/pipes/HashPassword.pipe';
import { ResponseJWTDto } from '../auth/dto/ResponseJWT.dto';
import { ApiResponse } from '@nestjs/swagger';

@ApiTags('Yoda')
@Controller('yoda')
export class YodaController {
  constructor(private readonly yodaService: YodaService) {}

  @Get('all')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseInterceptors(new TransformDataInterceptor(ResponseYoda))
  @ApiResponse({
    status: 200,
    type: [ResponseYoda],
    description: 'Return all users with role Yoda.',
  })
  findAll() {
    return this.yodaService.findAll();
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseInterceptors(new TransformDataInterceptor(ResponseYoda))
  @ApiResponse({
    status: 200,
    type: [ResponseYoda],
    description: 'Return user with role Yoda.',
  })
  async findOne(@Param('id') id: string | number) {
    return this.yodaService.findOne(id);
  }

  @Post()
  @UsePipes(new HashPasswordPipe())
  @UseInterceptors(ClassSerializerInterceptor)
  @UseInterceptors(new TransformDataInterceptor(ResponseJWTDto))
  @ApiResponse({
    status: 201,
    type: ResponseJWTDto,
    description: 'Return token for user with role Yoda.',
  })
  create(@Body() createYodaDto: CreateYodaDto) {
    return this.yodaService.create(createYodaDto);
  }

  @Patch(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseInterceptors(new TransformDataInterceptor(ResponseYoda))
  @ApiResponse({
    status: 200,
    type: ResponseYoda,
    description: 'Return pathched user with role Yoda.',
  })
  async update(
    @Param('id') id: string | number,
    @Body() updateYodaDto: UpdateYodaDto,
  ) {
    return this.yodaService.update(id, updateYodaDto);
  }

  @Delete(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseInterceptors(new TransformDataInterceptor(ResponseYoda))
  @ApiResponse({
    status: 200,
    type: ResponseYoda,
    description: 'Return deleted user with role Yoda.',
  })
  delete(@Param('id') id: string | number) {
    return this.yodaService.delete(id);
  }
}
