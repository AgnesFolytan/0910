import { Controller, Get, Post, Render, Body, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { datadto } from './data.dto';
import { Response } from 'express';
import { error } from 'console';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    return {
      message: this.appService.getHello()
    };
  }

  @Get('forms')
  @Render('forms')
  getFizetes(){
    return{
        data: {},
        errors: []
    };
  }

  @Post('forms')
  orderPost(
    @Body() datadto: datadto,
    @Res() res: Response){
    let errors = [];

    if (!datadto.name || !datadto.bankcard) {
      errors.push("Mindent ki kell tölteni!");
    }

    if (typeof(datadto.accepted)) {
      errors.push("Bele kell egyezni!")
    }

    if (errors.length > 0) {
      res.render('forms', {
        data: datadto,
        errors
      })
    }
    return res.redirect('/Success')
  }

  @Get('Success')
  Success(){
    return "Sikeres rendelés!"
  }
}
