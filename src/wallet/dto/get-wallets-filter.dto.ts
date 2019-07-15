import { IsOptional, IsNotEmpty } from 'class-validator';

export class GetWalletsFilterDto {
  @IsOptional()
  @IsNotEmpty()
  search: string;
}
