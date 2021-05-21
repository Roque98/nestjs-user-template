import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ROLES } from "../entities/user.entity";

export class RegisterUseDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    description: 'Nombre del titular de la cuenta',
    examples: ['ANGEL DAVID', 'ISRAEL ROQUE'],
  })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    description: 'Numero de telefono del titular de la cuenta',
    examples: ['7777870989'],
  })
  readonly phone: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    description: 'Email para acceder a la cuenta',
    examples: ['rogelio@gmail.com', 'matias@hotmail.com']
  })
  readonly  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ 
    required: true,
    description: 'Contraseña para acceder a la cuenta'
  })
  readonly password: string;
}

export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    description: 'Email para acceder a la cuenta',
    examples: ['rogelio@gmail.com', 'matias@hotmail.com']
  })
  readonly  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ 
    required: true,
    description: 'Contraseña para acceder a la cuenta'
  })
  readonly password: string;
}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    required: false,
    description: 'Nombre del titular de la cuenta',
    examples: ['ANGEL DAVID', 'ISRAEL ROQUE'],
  })
  readonly name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ 
    required: false,
    description: 'Numero de telefono del titular de la cuenta',
    examples: ['7777870989'],
  })
  readonly phone: string;
}

export class UpdateUserAdminDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    required: false,
    description: 'Nombre del titular de la cuenta',
    examples: ['ANGEL DAVID', 'ISRAEL ROQUE'],
  })
  readonly name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ 
    required: false,
    description: 'Numero de telefono del titular de la cuenta',
    examples: ['7777870989'],
  })
  readonly phone: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    required: false,
    description: 'Email para acceder a la cuenta',
    examples: ['rogelio@gmail.com', 'matias@hotmail.com']
  })
  readonly  email: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ 
    required: false,
    description: 'Contraseña para acceder a la cuenta'
  })
  readonly password: string;

  @IsEnum(ROLES)
  @IsOptional()
  @ApiProperty({
    required: false,
    description: 'Define el nivel de permisos del usuario',
    enum: ROLES,
    examples: ROLES
  })
  readonly role: ROLES;

  @IsOptional()
  @ApiProperty({
    default: false,
    required: false
  })
  readonly active: boolean;
}