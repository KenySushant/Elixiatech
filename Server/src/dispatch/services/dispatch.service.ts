import { Injectable, Inject } from '@nestjs/common';
import { DispatchRepository } from '../repositories/dispatch.repository';
import { CreateDispatchDto } from '../dto/create-dispatch.dto';
import { IDispatch } from '../interfaces/dispatch.interface';
import { FilterDispatchDto } from '../dto/filter-dispatch.dto';

@Injectable()
export class DispatchService {
  constructor(@Inject(DispatchRepository) private readonly dispatchRepository: DispatchRepository) {  }

  public async createDispatch(createDispatchDto: CreateDispatchDto): Promise<IDispatch> {
    const dispatch = await this.dispatchRepository.createDispatch(createDispatchDto);
    return dispatch;
  }

  public async filterDispatches(filterDispatchDto: FilterDispatchDto): Promise<IDispatch[]> {
    if (Object.keys(filterDispatchDto).length) {
      const dispatches = await this.dispatchRepository.filterDispatches(filterDispatchDto);
      return dispatches;
    }

    const disapatches = await this.dispatchRepository.getAllDispatches();
    return disapatches;
  }
}
