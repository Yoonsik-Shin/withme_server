import { IsString } from 'class-validator';
import { SuperCreateDto } from '../../commons/dto/super-create.dto';

export class CreateInquiryResponseDto extends SuperCreateDto {
  @IsString()
  contents: string;
}
