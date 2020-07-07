import { Injectable, Inject } from '@nestjs/common';
import { DispatchRepository } from '../repositories/dispatch.repository';
import { CreateDispatchDto } from '../dto/create-dispatch.dto';
import { IDispatch } from '../interfaces/dispatch.interface';

@Injectable()
export class DispatchService {
  constructor(@Inject(DispatchRepository) private readonly dispatchRepository: DispatchRepository) {  }

  public async createDispatch(createDispatchDto: CreateDispatchDto): Promise<IDispatch> {
    const dispatch = await this.dispatchRepository.createDispatch(createDispatchDto);
    return dispatch;
  }
}
