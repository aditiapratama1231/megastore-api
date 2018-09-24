import 'automapper-ts/dist/automapper'
import { Injectable } from '@nestjs/common';

@Injectable()
export class MapperService {
    mapper : AutoMapperJs.AutoMapper;

    constructor() {
        this.mapper = automapper
        this.initializeMapper();
    }

    private initializeMapper(): void {
        this.mapper.initialize(MapperService.configure);

    }
    public static configure(config: AutoMapperJs.IConfiguration): void {}

}
