import { Controller, Post, Body, UseGuards } from '@nestjs/common';

import { DispatchService } from './services/dispatch.service';
import { CreateDispatchDto } from './dto/create-dispatch.dto';
import { IDispatch } from './interfaces/dispatch.interface';
import { AuthGuard } from '@nestjs/passport';

@Controller('dispatch')
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
}
