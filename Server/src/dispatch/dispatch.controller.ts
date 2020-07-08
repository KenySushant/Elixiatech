import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  UsePipes,
  ValidationPipe,
  Query 
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { DispatchService } from './services/dispatch.service';
import { CreateDispatchDto } from './dto/create-dispatch.dto';
import { IDispatch } from './interfaces/dispatch.interface';
import { FilterDispatchDto } from './dto/filter-dispatch.dto';

@Controller('dispatches')
export class DispatchController {
  constructor(private readonly dispatchService: DispatchService) {  }

  @Post()
  @UseGuards(AuthGuard())
  public async createDispatch(
    @Body() createDispatchDto: CreateDispatchDto
  ): Promise<IDispatch> {
    const dispatch = await this.dispatchService.createDispatch(createDispatchDto);
    return dispatch;
  }

  @Get()
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  public async filterDispatches(
    @Query() filterDispatchDto: FilterDispatchDto
  ): Promise<IDispatch[]> {
    const dispatches = await this.dispatchService.filterDispatches(filterDispatchDto);
    return dispatches;
  }
}
