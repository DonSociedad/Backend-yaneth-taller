import { 
    Controller, 
    Get, 
    Post, 
    Body, 
    Patch, 
    Param, 
    Delete, 
    UseGuards, 
    HttpCode, 
    HttpStatus 
  } from '@nestjs/common';
  import { UsersService } from './users.service';
  import { 
    CreateUserDto, 
    UpdateUserDto, 
    LoginDto, 
    RefreshTokenDto, 
    ChangePasswordDto, 
    VerifyPhoneDto,
    VerifyEmailDto 
  } from './dto/user.dto';
  import { JwtAuthGuard } from './guards/jwt-auth.guard';
  
  @Controller('users')
  export class UsersController {
    constructor(private readonly usersService: UsersService) {}
  
    @Post('signup')
    async create(@Body() createUserDto: CreateUserDto) {
      await this.usersService.create(createUserDto);
      return { message: 'User registered successfully. Please check your email for verification code.' };
    }
  
    @Post('sign')
    verifyEmail(@Body() verifyPhoneDto: VerifyEmailDto) {
      return this.usersService.verifyEmail(verifyPhoneDto);
    }
  
    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body() loginDto: LoginDto) {
      return this.usersService.login(loginDto);
    }

    @Post('signin/verify-code')
    verifyPhone(@Body() verifyPhoneDto: VerifyPhoneDto) {
      return this.usersService.verifyPhone(verifyPhoneDto);
    }  
  
    @HttpCode(HttpStatus.OK)
    @Post('refresh-token')
    refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
      return this.usersService.refreshToken(refreshTokenDto.refreshToken);
    }
  
    @UseGuards(JwtAuthGuard)
    @Get()
    findAll() {
      return this.usersService.findAll();
    }
  
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.usersService.findOne(id);
    }
  
    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
      return this.usersService.update(id, updateUserDto);
    }
  
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.usersService.remove(id);
    }
  
    @UseGuards(JwtAuthGuard)
    @Post(':id/change-password')
    changePassword(
      @Param('id') id: string,
      @Body() changePasswordDto: ChangePasswordDto,
    ) {
      return this.usersService.changePassword(id, changePasswordDto);
    }
  }
  