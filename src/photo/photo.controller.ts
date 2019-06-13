import { Controller, Get, UseGuards } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { Photo } from './photo.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('photo')
// @UseGuards(AuthGuard())
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Get('/:id')
  findOne(): string {
    return 'porr';
  }

  @Get()
  findAll(): Promise<Photo[]> {
    return this.photoService.findAll();
  }
}
