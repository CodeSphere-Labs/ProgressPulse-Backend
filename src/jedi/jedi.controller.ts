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
import { JediService } from './jedi.service';
import { ResponseJediDto } from './dto/ResponseJedi';
import { ResponseCreateJediDto } from './dto/ResponseCreate';
import { CreateUserDto } from 'src/database/dto/User.dto';
import { UpdateJediDto } from 'src/jedi/dto/UpdateJedi';
import { HashPasswordPipe } from '../common/pipes/HashPassword.pipe';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { Roles } from 'src/common/guards/role.guard';

@Controller('jedi')
export class JediController {
  constructor(private readonly jediService: JediService) {}

  @Get('all')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseInterceptors(new TransformDataInterceptor(ResponseJediDto))
  findAll(@Query() params?: { withPadawans?: boolean }) {
    return this.jediService.findAll(params.withPadawans);
  }

  @Post()
  @UsePipes(new HashPasswordPipe())
  @UseInterceptors(ClassSerializerInterceptor)
  @UseInterceptors(new TransformDataInterceptor(ResponseCreateJediDto))
  @Roles(['YODA'])
  @UseGuards(AccessTokenGuard)
  create(@Body() createJediDto: CreateUserDto) {
    return this.jediService.create(createJediDto);
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseInterceptors(new TransformDataInterceptor(ResponseJediDto))
  findOne(
    @Param('id') id: string | number,
    @Query() params?: { withPadawans?: boolean },
  ) {
    return this.jediService.findOne(id, params.withPadawans);
  }

  @Patch(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseInterceptors(new TransformDataInterceptor(ResponseJediDto))
  @Roles(['YODA'])
  @UseGuards(AccessTokenGuard)
  update(
    @Param('id') id: string | number,
    @Body() updateJediDto: UpdateJediDto,
    @Query() params?: { withPadawans?: boolean },
  ) {
    return this.jediService.update(id, updateJediDto, params.withPadawans);
  }

  @Delete(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseInterceptors(new TransformDataInterceptor(ResponseJediDto))
  @Roles(['YODA'])
  @UseGuards(AccessTokenGuard)
  delete(@Param('id') id: string | number) {
    return this.jediService.delete(id);
  }
}
