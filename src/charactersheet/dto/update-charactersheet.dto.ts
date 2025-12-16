import { PartialType } from '@nestjs/mapped-types';
import { CreateCharactersheetDto } from './create-charactersheet.dto';

export class UpdateCharactersheetDto extends PartialType(CreateCharactersheetDto) {}
